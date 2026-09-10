import {properties,groups,sources} from './data.mjs';
import {questions} from './questions.mjs';
import {history as groupHistory,formatDate} from './history.mjs';
import {datedSignatures} from './timeline.mjs';
const datedGroups=new Map(datedSignatures().map(s=>[s.group.id,s.facts]));
import {byId,label,propertyId,classify,explanation,signatures,witnessProof} from './engine.mjs';
const $=selector=>document.querySelector(selector);
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const defaultProperties=['fp','intermediate','hyp','rf','!rf','amenable','!amenable','t','sofic','!sofic','hyperlinear','mf','!mf'];
const state={query:[],properties:[...defaultProperties],cell:null};
let pickerTarget='properties';
const activeQuery=()=>[...new Set([...state.query,...(state.cell||[])])];
const statusLabel={exists:'Example exists',impossible:'Impossible',unresolved:'Unknown'};
function sourceHTML(id){const s=sources[id];return s.url?`<a class="source" href="${escape(s.url)}" target="_blank" rel="noopener">${escape(s.title)} ↗</a>`:`<span class="source">${escape(s.title)} · ${escape(s.note)}</span>`;}
// A named question applies only to the exact set of selected requirements.
const questionKey=literals=>[...new Set(literals)].sort().join(',');
const questionFor=query=>questions.find(item=>questionKey(item.literals)===questionKey(query));
const questionStatusLabel={open:'Open question',solved:'Answered',impossible:'Excluded by theorem'};
const questionSummary=item=>item.status==='solved'?`Answered ${formatDate(item.resolved.date)} · ${item.resolved.by}`:item.status==='open'?`Stated open in the cited sources, assessed ${formatDate(item.assessed)}`:'Excluded by a recorded theorem';
const questionSources=item=>[...new Set([item.posed?.source,...(item.sources||[]),item.resolved?.source,item.obstruction?.source].filter(Boolean))];
function questionDatesHTML(item){
 const parts=[];
 if(item.posed)parts.push(`Asked${item.posed.date?' '+escape(formatDate(item.posed.date)):''} · ${escape(item.posed.by)}`);
 if(item.resolved)parts.push(`Answered ${escape(formatDate(item.resolved.date))} · ${escape(item.resolved.by)} · catalog witness: ${escape(groups.find(g=>g.id===item.resolved.witness).name)}`);
 if(item.status==='open')parts.push(`Stated open in the cited sources · assessed ${escape(formatDate(item.assessed))}`);
 if(item.status==='impossible')parts.push('Excluded by the recorded rules');
 return parts.map(part=>`<span>${part}</span>`).join('');
}
function questionHTML(item){return `<div class="question-card ${item.status}"><div class="question-head"><span class="eyebrow">NAMED QUESTION</span><span class="status-badge question-${item.status}">${questionStatusLabel[item.status]}</span></div><p class="question-text">${escape(item.question)}</p><div class="question-dates">${questionDatesHTML(item)}</div><p class="question-note">${escape(item.note)}</p>${questionSources(item).map(sourceHTML).join('')}</div>`;}
function renderQuestions(){
 const headings={open:'Still open',solved:'Answered',impossible:'Excluded by theorem'};
 $('#question-list').innerHTML=Object.keys(headings).map(status=>{
  const items=questions.filter(q=>q.status===status);
  return `<div class="question-group"><h3>${headings[status]} <span>${items.length}</span></h3>`+items.map(item=>`<article class="question-row ${item.status}"><button class="question-open" data-question="${item.id}" aria-label="Show on the map: ${escape(item.question)}"><strong>${escape(item.question)}</strong><span class="question-literals">${item.literals.map(lit=>`<span class="chip ${lit[0]==='!'?'negative':''}">${escape(label(lit))}</span>`).join('')}</span></button><div class="question-dates">${questionDatesHTML(item)}</div><p class="question-note">${escape(item.note)}</p><div class="question-sources">${questionSources(item).map(sourceHTML).join('')}</div></article>`).join('')+'</div>';
 }).join('');
 $('#question-count').textContent=`${questions.length} questions · assessed ${formatDate(questions[0].assessed)}`;
}
function showQuestion(item){
 state.properties=[...new Set([...state.properties,...item.literals])];
 const cell=[item.literals[0],item.literals[1]||item.literals[0]].sort((a,b)=>state.properties.indexOf(a)-state.properties.indexOf(b));
 state.query=item.literals.slice(2);state.cell=cell;render();
 $('.matrix-scroll').scrollIntoView({block:'start'});
 document.querySelector(`[data-cell="${cell.join(',')}"]`)?.focus({preventScroll:true});hideHover();
}
function historyHTML(group){
 const h=groupHistory[group.id];
 let html=`<details class="provenance"><summary><span>${escape(h.dateKind)}</span><strong>${escape(formatDate(h.firstProof))}</strong></summary><p>${escape(h.note)}</p>${sourceHTML(h.source)}`;
 if(h.milestones.length)html+='<ol class="timeline">'+h.milestones.map(m=>`<li><time>${escape(formatDate(m.date))}</time><div><strong>${escape(m.kind)}</strong><p>${escape(m.claim)}</p>${sourceHTML(m.source)}</div></li>`).join('')+'</ol>';
 if(h.priority)html+=`<p><strong>${escape(h.priority.claim)}</strong> · ${escape(h.priority.attribution)}<br>${escape(h.priority.note)}</p>`;
 if(h.formal)html+=`<div class="formal-record"><strong>Registered formal proof · v${h.formal.version}</strong><p>${escape(h.formal.assurance)}</p><code>${escape(h.formal.theorem)}</code><div class="record-links"><a href="${escape(h.formal.statement)}" target="_blank" rel="noopener">Pinned statement ↗</a><a href="${escape(h.formal.proof)}" target="_blank" rel="noopener">Pinned proof ↗</a><a href="${escape(h.formal.record)}" target="_blank" rel="noopener">Registry data ↗</a></div></div>`;
 return html+'</details>';
}
function factDateHTML(group,literal){
 const milestones=groupHistory[group.id].milestones.filter(m=>m.facts.includes(literal));
 const derived=datedGroups.get(group.id).get(literal);
 if(!milestones.length&&derived)return `<div class="fact-date">Derived by ${escape(formatDate(derived.date))}${derived.sources.map(sourceHTML).join('')}</div>`;
 return milestones.length?milestones.map(m=>`<div class="fact-date">${escape(m.kind)} · ${escape(formatDate(m.date))}${sourceHTML(m.source)}</div>`).join(''):'<span class="source">First proof date: unknown.</span>';
}

function readURL(){
 const params=new URLSearchParams(location.hash.slice(1));
 const literals=key=>[...new Set((params.get(key)||'').split(',').filter(lit=>/^!?[^!]+$/.test(lit)&&byId[propertyId(lit)]))];
 state.query=literals('q');
 state.properties=params.has('properties')?literals('properties'):[...defaultProperties];
 const cell=(params.get('cell')||'').split(',');
 state.cell=cell.length===2&&state.properties.includes(cell[0])&&state.properties.includes(cell[1])?cell.sort((a,b)=>state.properties.indexOf(a)-state.properties.indexOf(b)):null;
}
function saveURL(){
 const params=new URLSearchParams({properties:state.properties.join(',')});
 if(state.query.length)params.set('q',state.query.join(','));
 if(state.cell)params.set('cell',state.cell.join(','));
 window.history.replaceState(null,'',`${location.pathname}${location.search}#${params}`);
}
function renderPicker(){
 const search=$('#search').value.trim().toLowerCase().replace(/^(?:not\s+|¬\s*|!\s*)/,'');
 const matching=properties.filter(p=>`${p.name} ${p.id} ${p.definition}`.toLowerCase().includes(search)).sort((a,b)=>a.name.localeCompare(b.name));
 $('#property-list').innerHTML=matching.map(p=>`<div class="picker-property"><div><button class="property-name" data-define="${p.id}">${escape(p.name)}</button><p>${escape(p.definition)}</p></div>${[p.id,'!'+p.id].map(lit=>`<label class="property-choice"><input type="checkbox" data-pick="${lit}" ${state[pickerTarget].includes(lit)?'checked':''} aria-label="${lit[0]==='!'?'Does not have':'Has'} ${escape(p.name)}"><span class="sr-only">${lit[0]==='!'?'Does not have':'Has'} ${escape(p.name)}</span></label>`).join('')}</div>`).join('')||'<p>No matching properties.</p>';
 $('#picker-count').textContent=`${state[pickerTarget].length} selected`;
}
function openPicker(target){
 hideHover();pickerTarget=target;
 $('#picker-title').textContent=target==='query'?'Filter every cell':'Add properties';
 $('#picker-help').textContent=target==='query'?'Every cell must satisfy every selected filter. Clear the filters to compare rows and columns alone.':'Each selection appears on both axes. Choose either or both versions.';
 $('#picker-all').hidden=target==='query';
 $('#search').value='';renderPicker();$('#picker').showModal();$('#search').focus();
}
function renderQuery(){
 $('#query-chips').innerHTML=state.query.length?state.query.map(lit=>`<span class="chip ${lit[0]==='!'?'negative':''}">${escape(label(lit))}<button data-remove="${lit}" aria-label="Remove ${escape(label(lit))}">×</button></span>`).join(''):'';
 $('#clear').hidden=!state.query.length;
}
function axisHTML(literal,axis){return `<button class="${axis}-name ${literal[0]==='!'?'negative':''}" data-define="${propertyId(literal)}" data-hover-property="${literal}"><span>${escape(label(literal))}</span></button>`;}
function fitMap(){
 const matrix=$('#matrix'),width=$('.matrix-scroll').clientWidth-6,n=Math.max(1,state.properties.length);
 const labelWidth=Math.min(136,Math.max(72,width*.18)),gap=Math.min(3,12/n);
 const columnWidth=Math.max(1,(width-labelWidth-n*gap)/n);
 const cellHeight=Math.max(1,Math.min(48,columnWidth,(innerHeight*.72-112-n*gap)/n));
 matrix.style.setProperty('--label-width',`${labelWidth}px`);
 matrix.style.setProperty('--cell-size',`${cellHeight}px`);
 matrix.style.setProperty('--cell-gap',`${gap}px`);
 matrix.style.setProperty('--axis-font',`${Math.min(12,cellHeight*.6)}px`);
 matrix.style.setProperty('--cell-font',`${Math.min(9,cellHeight*.35,columnWidth/6)}px`);
 matrix.style.setProperty('--column-font',`${Math.min(11,columnWidth*.65)}px`);
}
function renderMap(){
 $('#property-count').textContent=`${state.properties.length} properties · ${state.properties.length*(state.properties.length+1)/2} cells`;
 $('#matrix').style.gridTemplateColumns=`var(--label-width) repeat(${Math.max(1,state.properties.length)}, minmax(0, 1fr))`;
 if(!state.properties.length){$('#matrix').innerHTML='<p class="map-empty">Add a property to start the grid.</p>';return;}
 let html='<div class="corner" aria-hidden="true"></div>'+state.properties.map(lit=>axisHTML(lit,'column')).join('');
 for(const [rowIndex,row] of state.properties.entries()){
  html+=axisHTML(row,'row').replace('<button ',`<button style="grid-row:${rowIndex+2};grid-column:1" `);
  for(let colIndex=rowIndex;colIndex<state.properties.length;colIndex++){
   const col=state.properties[colIndex];
   const cell=[row,col],result=classify([...state.query,...cell]);
   const title=`${cell.map(label).join(' AND ')}: ${statusLabel[result.status]}`;
   const selected=state.cell&&state.cell.join(',')===cell.join(',');
   html+=`<button style="grid-row:${rowIndex+2};grid-column:${colIndex+2}" class="cell ${result.status} ${selected?'selected':''}" data-cell="${cell.join(',')}" aria-label="${escape(title)}" aria-pressed="${!!selected}">${result.status==='exists'?`<span class="symbol">${escape(result.witnesses[0].symbol)}</span>`:result.status==='impossible'?'Impossible':'Unknown'}</button>`;
  }
 }
 $('#matrix').innerHTML=html;
 fitMap();
}
function renderEvidence(){
 $('#evidence').hidden=!state.cell;
 if(!state.cell)return;
 const query=activeQuery(), result=classify(query);
 const titles={exists:result.witnesses.length===1?'An example exists.':`${result.witnesses.length} examples match.`,impossible:'This combination is impossible.',unresolved:'Unknown'};
 let html=`<div class="evidence-head"><div><div class="eyebrow">SELECTED INTERSECTION</div><h2 class="evidence-title">${titles[result.status]}</h2></div><span class="status-badge ${result.status}">${statusLabel[result.status]}</span></div>`;
 html+=`<div class="evidence-query">${query.map(lit=>`<span>${escape(label(lit))}</span>`).join('')||'<span>No restrictions</span>'}</div>`;
 html+='<button class="quiet" id="clear-cell">Close evidence</button>';
 const question=questionFor(query);
 if(question)html+=questionHTML(question);
 if(result.status==='exists'){
  html+='<div class="witnesses">'+result.witnesses.map((g,i)=>`<details class="witness" ${i===0?'open':''}><summary><span class="group-symbol">${escape(g.symbol)}</span><span>${escape(g.name)}</span></summary><p>${escape(g.description)}</p>${historyHTML(g)}${sourceHTML(g.source)}<div class="facts">${(query.length?query:g.facts.slice(0,7)).map(lit=>`<button class="fact ${lit[0]==='!'?'negative':''}" data-proof="${g.id}|${lit}" title="Show why this property holds">${escape(label(lit))} ↗</button>`).join('')}</div><button class="quiet" data-group="${g.id}">Explore all recorded properties →</button></details>`).join('')+'</div>';
 }else if(result.status==='impossible'){
  const proof=explanation(query);
  html+=`<p class="detail-copy">These requirements already conflict: <strong>${proof.core.map(lit=>escape(label(lit))).join(' AND ')}</strong>.${proof.byCases?' The following rules exclude every Boolean case.':''}</p>`;
  html+='<ol class="proof-list">'+proof.steps.map(step=>`<li><strong>${step.literal?escape(label(step.literal)):escape(step.rule.when.map(label).join(' AND '))+' ⇒ '+escape(label(step.rule.then))}</strong><br>${escape(step.rule.reason)}${sourceHTML(step.rule.source)}</li>`).join('')+'</ol>';
  if(!proof.steps.length)html+='<p class="detail-copy">The same property is both required and excluded.</p>';
 }else if(!question)html+='<p class="detail-copy">No matching example or impossibility proof is recorded. This does not necessarily mean an open problem.</p>';
 if(result.status!=='impossible'){
  const inferred=[...result.closure.facts.keys()].filter(lit=>!query.includes(lit));
  if(inferred.length)html+=`<details class="inferences"><summary>${inferred.length} further properties forced by your requirements</summary><div class="facts">${inferred.map(lit=>`<button class="fact ${lit[0]==='!'?'negative':''}" data-inference="${lit}">${escape(label(lit))} ↗</button>`).join('')}</div></details>`;
 }
 $('#evidence').innerHTML=html;
}

function render(){hideHover();renderQuery();renderMap();renderEvidence();saveURL();}
function openDetail(title,html){
 const dialog=document.createElement('dialog');
 dialog.innerHTML=`<div class="dialog-head"><span class="eyebrow">EVIDENCE</span><button aria-label="Close evidence">✕</button></div><h2>${escape(title)}</h2>${html}`;
 dialog.querySelector('button').onclick=()=>dialog.close();
 dialog.addEventListener('close',()=>dialog.remove());
 document.body.append(dialog);dialog.showModal();
}

let hoverAnchor=null;
function hideHover(){if(hoverAnchor)hoverAnchor.removeAttribute('aria-describedby');hoverAnchor=null;$('#hover-card').hidden=true;}
function showHover(anchor){
 hideHover();hoverAnchor=anchor;
 let html='';
 if(anchor.dataset.hoverProperty){
  const lit=anchor.dataset.hoverProperty,p=byId[propertyId(lit)];
  html=`<strong>${escape(label(lit))}</strong><p>${lit[0]==='!'?'Does not satisfy the following property: ':''}${escape(p.definition)}</p>`;
 }else{
  const query=[...new Set([...state.query,...anchor.dataset.cell.split(',')])],result=classify(query),question=questionFor(query);
  html=`<strong>${escape(query.map(label).join(' AND '))}</strong><p class="text-${result.status}">${statusLabel[result.status]}</p>`;
  if(question)html+=`<p><strong>${escape(question.question)}</strong><br>${escape(questionSummary(question))}</p>`;
  if(result.status==='exists'){
   const g=result.witnesses[0],h=groupHistory[g.id];
   html+=`<strong>${escape(g.name)}</strong><p>${escape(g.description)}</p><p>${escape(h.dateKind)}: ${escape(formatDate(h.firstProof))}</p>`;
   const milestones=h.milestones.filter(m=>m.facts.some(lit=>query.includes(lit)));
   html+=milestones.map(m=>`<p>${escape(m.claim)} — ${escape(formatDate(m.date))}</p>`).join('');
   html+=`<small>Source: ${escape(sources[h.source].title)}</small>`;
  }else if(result.status==='impossible'){
   const proof=explanation(query);
   html+=`<p>Conflicting requirements: ${escape(proof.core.map(label).join(' AND '))}.</p>`;
   const step=proof.steps.at(-1);
   html+=step?`<p>${escape(step.rule.reason)}</p><small>Source: ${escape(sources[step.rule.source].title)}</small>`:'<p>A property and its negation cannot both hold.</p>';
  }else html+=question?`<p>${escape(question.note)}</p><small>Source: ${escape(sources[question.sources[0]].title)}</small>`:'<p>No matching example or impossibility proof is recorded.</p>';
  html+='<p class="hover-hint">Click the cell for full evidence and source links.</p>';
 }
 const card=$('#hover-card');card.innerHTML=html;card.hidden=false;anchor.setAttribute('aria-describedby','hover-card');
 const rect=anchor.getBoundingClientRect(),box=card.getBoundingClientRect();
 const left=Math.max(8,Math.min(rect.left,innerWidth-box.width-8));
 const top=rect.bottom+8+box.height<innerHeight?rect.bottom+8:Math.max(8,rect.top-box.height-8);
 card.style.left=`${left}px`;card.style.top=`${top}px`;
}
$('#search').addEventListener('input',renderPicker);
$('#add-properties').onclick=()=>openPicker('properties');$('#edit-filters').onclick=()=>openPicker('query');
$('#close-picker').onclick=()=>$('#picker').close();
$('#picker-all').onclick=()=>{state[pickerTarget]=properties.map(p=>p.id);state.cell=null;render();renderPicker();};
$('#picker-clear').onclick=()=>{state[pickerTarget]=[];state.cell=null;render();renderPicker();};
$('#property-list').addEventListener('change',event=>{
 const lit=event.target.dataset.pick;if(!lit)return;
 if(event.target.checked)state[pickerTarget].push(lit);else state[pickerTarget]=state[pickerTarget].filter(x=>x!==lit);
 state.cell=null;render();$('#picker-count').textContent=`${state[pickerTarget].length} selected`;
});
$('#clear').onclick=()=>{state.query=[];state.cell=null;render();};
$('#about-button').onclick=()=>$('#about').showModal();$('#close-about').onclick=()=>$('#about').close();
$('#copy').onclick=async()=>{try{await navigator.clipboard.writeText(location.href);$('#copy-status').textContent='Link copied';}catch{$('#copy-status').textContent='Copy the URL from your address bar.';}};
window.addEventListener('hashchange',()=>{readURL();render();});
$('#matrix').addEventListener('pointerover',event=>{const anchor=event.target.closest('[data-cell],[data-hover-property]');if(anchor&&anchor!==hoverAnchor)showHover(anchor);});
$('#matrix').addEventListener('pointerout',event=>{if(!event.relatedTarget?.closest?.('[data-cell],[data-hover-property]')&&!$('#hover-card').contains(event.relatedTarget))hideHover();});
$('#hover-card').addEventListener('pointerleave',hideHover);
$('#matrix').addEventListener('focusin',event=>{const anchor=event.target.closest('[data-cell],[data-hover-property]');if(anchor)showHover(anchor);});
$('#matrix').addEventListener('focusout',hideHover);
window.addEventListener('scroll',event=>{if(!$('#hover-card').contains(event.target))hideHover();},true);window.addEventListener('resize',()=>{hideHover();fitMap();});
new ResizeObserver(fitMap).observe($('.matrix-scroll'));
document.addEventListener('keydown',event=>{if(event.key==='Escape')hideHover();});
document.addEventListener('click',event=>{
 const el=event.target.closest('button');if(!el)return;
 if(el.dataset.remove){state.query=state.query.filter(lit=>lit!==el.dataset.remove);state.cell=null;render();}
 else if(el.dataset.cell){hideHover();state.cell=el.dataset.cell.split(',');renderMap();renderEvidence();saveURL();document.querySelector(`[data-cell="${el.dataset.cell}"]`)?.focus({preventScroll:true});hideHover();}
 else if(el.id==='clear-cell'){state.cell=null;render();}
 else if(el.dataset.question){showQuestion(questions.find(q=>q.id===el.dataset.question));}
 else if(el.dataset.define){const p=byId[el.dataset.define];openDetail(p.name,`<p>${escape(p.definition)}</p>${sourceHTML(p.source)}`);}
 else if(el.dataset.proof){
  const [id,literal]=el.dataset.proof.split('|'),group=groups.find(g=>g.id===id);
  const steps=witnessProof(group,literal);
  openDetail(`${group.name}: ${label(literal)}`,`<ol class="proof-list">${steps.map(step=>`<li><strong>${escape(label(step.literal))}</strong><br>${escape(step.rule?step.rule.reason:group.description)}${sourceHTML(step.rule?step.rule.source:group.source)}${factDateHTML(group,step.literal)}</li>`).join('')}</ol>`);
 }else if(el.dataset.group){
  const signature=signatures.find(s=>s.group.id===el.dataset.group);
  const facts=[...signature.facts.keys()].sort((a,b)=>label(a).localeCompare(label(b)));
  openDetail(signature.group.name,`<p>${escape(signature.group.description)}</p>${historyHTML(signature.group)}<p>${facts.length} recorded or inferred facts. Unlisted properties are unknown.</p><div class="facts">${facts.map(lit=>`<button class="fact ${lit[0]==='!'?'negative':''}" data-proof="${signature.group.id}|${lit}">${escape(label(lit))} ↗</button>`).join('')}</div>`);
 }else if(el.dataset.inference){
  const closure=classify(activeQuery()).closure,steps=[],seen=new Set();
  const visit=lit=>{if(seen.has(lit))return;seen.add(lit);const fact=closure.facts.get(lit);fact.parents.forEach(visit);steps.push(fact);};visit(el.dataset.inference);
  openDetail(label(el.dataset.inference),`<ol class="proof-list">${steps.map(step=>`<li><strong>${escape(label(step.literal))}</strong><br>${step.rule?escape(step.rule.reason)+sourceHTML(step.rule.source):'Selected requirement.'}</li>`).join('')}</ol>`);
 }
});

$('#matrix').addEventListener('keydown',event=>{
 const cell=event.target.closest('[data-cell]');if(!cell)return;
 const direction={ArrowRight:[0,1],ArrowLeft:[0,-1],ArrowDown:[1,0],ArrowUp:[-1,0]}[event.key];
 if(!direction)return;
 event.preventDefault();
 const [row,col]=cell.dataset.cell.split(',').map((literal,i)=>state.properties.indexOf(literal)+direction[i]);
 if(row<0||col<row||col>=state.properties.length)return;
 document.querySelector(`[data-cell="${state.properties[row]},${state.properties[col]}"]`).focus();
});
readURL();render();renderQuestions();
