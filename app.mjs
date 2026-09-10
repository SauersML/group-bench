import {properties,rules,groups,sources,collections,presets} from './data.mjs';
import {history,formatDate} from './history.mjs';
import {byId,label,propertyId,classify,explanation,signatures,witnessProof} from './engine.mjs';
const $=selector=>document.querySelector(selector);
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const state={query:[],collection:'Approximation',row:1,column:1,cell:null};
function sourceHTML(id){const s=sources[id];return s.url?`<a class="source" href="${escape(s.url)}" target="_blank" rel="noopener">${escape(s.title)} ↗</a>`:`<span class="source">${escape(s.title)} · ${escape(s.note)}</span>`;}
function historyHTML(group){
 const h=history[group.id];
 let html=`<details class="provenance"><summary><span>${escape(h.dateKind)}</span><strong>${escape(formatDate(h.firstProof))}</strong></summary><p>${escape(h.note)}</p>${sourceHTML(h.source)}`;
 if(h.milestones.length)html+='<ol class="timeline">'+h.milestones.map(m=>`<li><time>${escape(formatDate(m.date))}</time><div><strong>${escape(m.kind)}</strong><p>${escape(m.claim)}</p>${sourceHTML(m.source)}</div></li>`).join('')+'</ol>';
 if(h.priority)html+=`<p><strong>${escape(h.priority.claim)}</strong> · ${escape(h.priority.attribution)}<br>${escape(h.priority.note)}</p>`;
 if(h.formal)html+=`<div class="formal-record"><strong>Registered formal proof · v${h.formal.version}</strong><p>${escape(h.formal.assurance)}</p><code>${escape(h.formal.theorem)}</code><div class="record-links"><a href="${escape(h.formal.statement)}" target="_blank" rel="noopener">Pinned statement ↗</a><a href="${escape(h.formal.proof)}" target="_blank" rel="noopener">Pinned proof ↗</a><a href="${escape(h.formal.record)}" target="_blank" rel="noopener">Registry data ↗</a></div></div>`;
 return html+'</details>';
}
function factDateHTML(group,literal){
 const milestones=history[group.id].milestones.filter(m=>m.facts.includes(literal));
 return milestones.length?milestones.map(m=>`<div class="fact-date">${escape(m.kind)} · ${escape(formatDate(m.date))}${sourceHTML(m.source)}</div>`).join(''):'<span class="source">First proof date of this property is not established in the atlas.</span>';
}
const signed=(id,sign)=>sign===1?id:`!${id}`;
const activeQuery=()=>[...new Set([...state.query,...(state.cell||[])])];
function readURL(){
 const params=new URLSearchParams(location.hash.slice(1));
 const raw=(params.get('q')||'').split(',').filter(Boolean);
 const invalid=raw.filter(lit=>!byId[propertyId(lit)]);
 state.query=location.hash?raw.filter(lit=>byId[propertyId(lit)]):['!finite'];
 const name=params.get('map');state.collection=Object.hasOwn(collections,name)?name:'Approximation';
 state.row=params.get('r')==='-1'?-1:1;state.column=params.get('c')==='-1'?-1:1;
 const cell=(params.get('cell')||'').split(',').filter(Boolean);
 state.cell=cell.length===2&&cell.every(lit=>byId[propertyId(lit)])?cell:null;
 if(invalid.length) $('#copy-status').textContent='Unknown properties in link were omitted.';
}
function saveURL(){
 const params=new URLSearchParams();
 if(state.query.length)params.set('q',state.query.join(','));
 params.set('map',state.collection);params.set('r',state.row);params.set('c',state.column);
 if(state.cell)params.set('cell',state.cell.join(','));
 history.replaceState(null,'',`${location.pathname}${location.search}#${params}`);
}
function renderPalette(){
 const search=$('#search').value.trim().toLowerCase().replace(/^(?:not\s+|¬\s*|!\s*)/, '');
 const families=[...new Set(properties.map(p=>p.family))];
 const open=new Map([...document.querySelectorAll('.family')].map(d=>[d.dataset.family,d.open]));
 $('#property-list').innerHTML=families.map(family=>{
  const matching=properties.filter(p=>p.family===family&&`${p.name} ${p.id} ${p.definition}`.toLowerCase().includes(search));
  if(!matching.length)return '';
  return `<details class="family" data-family="${escape(family)}" ${search||open.get(family)!==false?'open':''}><summary>${escape(family)} <span>${matching.length}</span></summary>${matching.map(p=>`<div class="property"><button class="property-name" data-define="${p.id}" title="Read definition">${escape(p.name)}</button>${[1,-1].map(sign=>`<button class="sign" data-property="${p.id}" data-sign="${sign}" aria-label="${sign===1?'Require':'Exclude'} ${escape(p.name)}" aria-pressed="${state.query.includes(signed(p.id,sign))}">${sign===1?'+':'−'}</button>`).join('')}</div>`).join('')}</details>`;
 }).join('')||'<p class="empty">No matching properties. Try “growth” or “order”.</p>';
}
function renderQuery(){
 $('#query-chips').innerHTML=state.query.length?state.query.map(lit=>`<span class="chip ${lit[0]==='!'?'negative':''}">${escape(label(lit))}<button data-remove="${lit}" aria-label="Remove ${escape(label(lit))}">×</button></span>`).join(''):'<span class="empty">All countable discrete groups. Add a property to narrow the map.</span>';
}
function renderMap(){
 const ids=collections[state.collection];
 const counts={exists:0,impossible:0,unresolved:0};
 let html='<div class="corner">ROW<br>AND COLUMN ↗</div>'+ids.map(id=>`<div class="column-name" title="${escape(label(signed(id,state.column)))}"><span>${state.column===-1?'¬ ':''}${escape(byId[id].name)}</span></div>`).join('');
 for(const row of ids){
  html+=`<div class="row-name">${state.row===-1?'¬ ':''}${escape(byId[row].name)}</div>`;
  for(const col of ids){
   const cell=[signed(row,state.row),signed(col,state.column)];
   const result=classify([...state.query,...cell]);counts[result.status]++;
   const title=`${cell.map(label).join(' AND ')}: ${result.status}${result.witnesses[0]?` — ${result.witnesses[0].name}`:''}`;
   const selected=state.cell&&state.cell.join(',')===cell.join(',');
   html+=`<button class="cell ${result.status} ${row===col?'diagonal':''} ${selected?'selected':''}" data-cell="${cell.join(',')}" aria-label="${escape(title)}" aria-pressed="${!!selected}" title="${escape(title)}">${result.status==='exists'?`<span class="symbol">${escape(result.witnesses[0].symbol)}</span>`:result.status==='impossible'?'×':'?'}</button>`;
  }
 }
 $('#matrix').innerHTML=html;
 $('#map-summary').textContent=`${counts.exists} inhabited · ${counts.impossible} empty · ${counts.unresolved} unresolved`;
}
function renderEvidence(){
 const query=activeQuery(), result=classify(query);
 const titles={exists:result.witnesses.length===1?'A group lives here.':`${result.witnesses.length} examples live here.`,impossible:'No group can live here.',unresolved:'An uncharted region.'};
 let html=`<div class="evidence-head"><div><div class="eyebrow">${state.cell?'SELECTED INTERSECTION':'YOUR REGION'}</div><h2 class="evidence-title">${titles[result.status]}</h2></div><span class="status-badge ${result.status}">${result.status}</span></div>`;
 html+=`<div class="evidence-query">${query.map(lit=>`<span>${escape(label(lit))}</span>`).join('')||'<span>No restrictions</span>'}</div>`;
 if(state.cell)html+='<button class="quiet" id="clear-cell">← Inspect your region without this cell</button>';
 if(result.status==='exists'){
  html+='<div class="witnesses">'+result.witnesses.map((g,i)=>`<details class="witness" ${i===0?'open':''}><summary><span class="group-symbol">${escape(g.symbol)}</span><span>${escape(g.name)}</span></summary><p>${escape(g.description)}</p>${historyHTML(g)}${sourceHTML(g.source)}<div class="facts">${(query.length?query:g.facts.slice(0,7)).map(lit=>`<button class="fact ${lit[0]==='!'?'negative':''}" data-proof="${g.id}|${lit}" title="Show why this property holds">${escape(label(lit))} ↗</button>`).join('')}</div><button class="quiet" data-group="${g.id}">Explore all recorded properties →</button></details>`).join('')+'</div>';
 }else if(result.status==='impossible'){
  const proof=explanation(query);
  html+=`<p class="detail-copy">These requirements already conflict: <strong>${proof.core.map(lit=>escape(label(lit))).join(' + ')}</strong>.${proof.byCases?' The following rules exclude every Boolean case.':''}</p>`;
  html+='<ol class="proof-list">'+proof.steps.map(step=>`<li><strong>${step.literal?escape(label(step.literal)):escape(step.rule.when.map(label).join(' + '))+' ⇒ '+escape(label(step.rule.then))}</strong><br>${escape(step.rule.reason)}${sourceHTML(step.rule.source)}</li>`).join('')+'</ol>';
  if(!proof.steps.length)html+='<p class="detail-copy">The same property is both required and excluded.</p>';
 }else html+='<p class="detail-copy">The catalog has no example with all these properties, and the recorded theorems do not rule the combination out. This may be a gap in the catalog or a research problem; it is not a claim that a group exists.</p>';
 if(result.status!=='impossible'){
  const inferred=[...result.closure.facts.keys()].filter(lit=>!query.includes(lit));
  if(inferred.length)html+=`<details class="inferences"><summary>${inferred.length} further properties forced by your requirements</summary><div class="facts">${inferred.map(lit=>`<button class="fact ${lit[0]==='!'?'negative':''}" data-inference="${lit}">${escape(label(lit))} ↗</button>`).join('')}</div></details>`;
 }
 $('#evidence').innerHTML=html;
}
function render(){
 const focused=document.activeElement?.dataset;
 renderPalette();renderQuery();renderMap();renderEvidence();
 $('#collection').value=state.collection;$('#row-sign').value=state.row;$('#column-sign').value=state.column;saveURL();
 if(focused?.property)document.querySelector(`[data-property="${focused.property}"][data-sign="${focused.sign}"]`)?.focus();
}
function openDetail(title,html){
 const dialog=document.createElement('dialog');
 dialog.innerHTML=`<div class="dialog-head"><span class="eyebrow">ATLAS EVIDENCE</span><button aria-label="Close evidence">✕</button></div><h2>${escape(title)}</h2>${html}`;
 dialog.querySelector('button').onclick=()=>dialog.close();
 dialog.addEventListener('close',()=>dialog.remove());
 document.body.append(dialog);dialog.showModal();
}
$('#census').innerHTML=[[properties.length,'properties'],[groups.length,'groups'],[rules.length,'rules']].map(([n,name])=>`<div><strong>${n}</strong><span>${name}</span></div>`).join('');
$('#collection').innerHTML=Object.keys(collections).map(name=>`<option>${escape(name)}</option>`).join('');
$('#presets').innerHTML=presets.map((p,i)=>`<button class="trail" data-preset="${i}"><strong>${escape(p.name)} ↗</strong><span>${escape(p.description)}</span></button>`).join('');
$('#search').addEventListener('input',renderPalette);
$('#clear').onclick=()=>{state.query=[];state.cell=null;render();};
$('#collection').onchange=e=>{state.collection=e.target.value;state.cell=null;render();};
$('#row-sign').onchange=e=>{state.row=Number(e.target.value);state.cell=null;render();};
$('#column-sign').onchange=e=>{state.column=Number(e.target.value);state.cell=null;render();};
$('#about-button').onclick=()=>$('#about').showModal();$('#close-about').onclick=()=>$('#about').close();
$('#copy').onclick=async()=>{try{await navigator.clipboard.writeText(location.href);$('#copy-status').textContent='Link copied';}catch{$('#copy-status').textContent='Copy the URL from your address bar.';}};
window.addEventListener('hashchange',()=>{readURL();render();});
document.addEventListener('click',event=>{
 const el=event.target.closest('button');if(!el)return;
 if(el.dataset.property){
  const literal=signed(el.dataset.property,Number(el.dataset.sign)),already=state.query.includes(literal);
  state.query=state.query.filter(lit=>propertyId(lit)!==el.dataset.property);
  if(!already)state.query.push(literal);state.cell=null;render();
 }else if(el.dataset.remove){state.query=state.query.filter(lit=>lit!==el.dataset.remove);state.cell=null;render();}
 else if(el.dataset.cell){state.cell=el.dataset.cell.split(',');renderMap();renderEvidence();saveURL();$('#evidence').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});}
 else if(el.id==='clear-cell'){state.cell=null;render();}
 else if(el.dataset.preset!==undefined){const p=presets[Number(el.dataset.preset)];state.query=[...p.query];state.collection=p.collection;state.row=1;state.column=1;state.cell=null;render();$('#evidence').scrollIntoView({block:'nearest'});}
 else if(el.dataset.define){const p=byId[el.dataset.define];openDetail(p.name,`<p>${escape(p.definition)}</p>${sourceHTML(p.source)}`);}
 else if(el.dataset.proof){
  const [id,literal]=el.dataset.proof.split('|'),group=groups.find(g=>g.id===id);
  const steps=witnessProof(group,literal);
  openDetail(`${group.name}: ${label(literal)}`,`<ol class="proof-list">${steps.map(step=>`<li><strong>${escape(label(step.literal))}</strong><br>${escape(step.rule?step.rule.reason:group.description)}${sourceHTML(step.rule?step.rule.source:group.source)}${step.rule?'':factDateHTML(group,step.literal)}</li>`).join('')}</ol>`);
 }else if(el.dataset.group){
  const signature=signatures.find(s=>s.group.id===el.dataset.group);
  const facts=[...signature.facts.keys()].sort((a,b)=>label(a).localeCompare(label(b)));
  openDetail(signature.group.name,`<p>${escape(signature.group.description)}</p>${historyHTML(signature.group)}<p>${facts.length} recorded or inferred facts. Unlisted properties are unknown in this atlas.</p><div class="facts">${facts.map(lit=>`<button class="fact ${lit[0]==='!'?'negative':''}" data-proof="${signature.group.id}|${lit}">${escape(label(lit))} ↗</button>`).join('')}</div>`);
 }else if(el.dataset.inference){
  const closure=classify(activeQuery()).closure,steps=[],seen=new Set();
  const visit=lit=>{if(seen.has(lit))return;seen.add(lit);const fact=closure.facts.get(lit);fact.parents.forEach(visit);steps.push(fact);};visit(el.dataset.inference);
  openDetail(label(el.dataset.inference),`<ol class="proof-list">${steps.map(step=>`<li><strong>${escape(label(step.literal))}</strong><br>${step.rule?escape(step.rule.reason)+sourceHTML(step.rule.source):'Selected requirement.'}</li>`).join('')}</ol>`);
 }
});
// Arrow keys complement Tab navigation through the intersection matrix.
$('#matrix').addEventListener('keydown',event=>{
 const cell=event.target.closest('[data-cell]');if(!cell)return;
 const cells=[...document.querySelectorAll('[data-cell]')],index=cells.indexOf(cell),n=collections[state.collection].length;
 const offset={ArrowRight:1,ArrowLeft:-1,ArrowDown:n,ArrowUp:-n}[event.key];
 if(offset!==undefined){event.preventDefault();cells[Math.max(0,Math.min(cells.length-1,index+offset))].focus();}
});
readURL();render();
