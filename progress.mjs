import {label} from './engine.mjs';
import {groups,sources,rules} from './data.mjs';
import {formatDate,dateBoundary} from './history.mjs';
const $=s=>document.querySelector(s);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const number=n=>n.toLocaleString('en');
const percent=(n,total)=>(100*n/total).toFixed(2)+'%';
const year=date=>{const [y]=date.split('-').map(Number);return y+(Date.parse(dateBoundary(date)+'T00:00:00Z')-Date.UTC(y,0,1))/(Date.UTC(y+1,0,1)-Date.UTC(y,0,1));};
async function renderProgress(){
 try{
  const response=await fetch('./pair-history.json');if(!response.ok)throw new Error('Proof dates could not be loaded.');
  const data=await response.json();
  $('#progress-total').textContent=`${number(data.total)} total pairs = 100%`;
  $('#progress-summary').innerHTML=`<span><strong>${number(data.solved)}</strong> solved (${percent(data.solved,data.total)})</span><span><strong>${number(data.dated)}</strong> with proof dates</span><span><strong>${number(data.undated)}</strong> solved, date unknown</span>`;
  $('#progress-note').textContent='Earliest supported dates from recorded proofs and dated deductions; undated pairs are not placed on the curve. Each distinct pair counts once, including negations. The total does not change with the grid.';
  const first=data.series.length?Math.floor(year(data.series[0].date)/10)*10:new Date().getUTCFullYear()-1;
  const last=Math.max(new Date().getUTCFullYear()+1,data.series.length?Math.ceil(year(data.series.at(-1).date)):0);
  const left=48,right=928,top=18,bottom=206;
  const xYear=value=>left+(1-Math.log1p(last-value)/Math.log1p(last-first))*(right-left);
  const x=date=>xYear(year(date));
  const yPercent=value=>bottom-Math.log1p(value)/Math.log1p(100)*(bottom-top);
  const y=count=>yPercent(100*count/data.total);
  let path=`M${left},${bottom}`;
  for(const event of data.series)path+=` L${x(event.date)},${y(event.cumulative)}`;
  const ticks=[0,1,2,5,10,25,50,100].map(p=>{const pos=yPercent(p);return `<line x1="${left}" y1="${pos}" x2="${right}" y2="${pos}" class="chart-grid"/><text x="${left-9}" y="${pos+4}" text-anchor="end">${p}%</text>`;}).join('');
  const candidates=[...new Set([first,...Array.from({length:Math.max(0,Math.floor(last/10)-Math.ceil(first/10)+1)},(_,i)=>(Math.ceil(first/10)+i)*10),last-5,last-2,last-1])].filter(n=>n>=first&&n<last).sort((a,b)=>a-b);
  const years=[];
  for(const n of candidates)if((!years.length||xYear(n)-xYear(years.at(-1))>=52)&&right-xYear(n)>=52)years.push(n);
  years.push(last);
  const xticks=years.map(n=>`<text x="${xYear(n)}" y="230" text-anchor="middle">${n}</text>`).join('');
  const dots=data.series.map((event,i)=>`<circle cx="${x(event.date)}" cy="${y(event.cumulative)}" r="5" tabindex="0" role="button" data-event="${i}" aria-label="${escape(formatDate(event.date))}: ${event.cumulative} pairs solved, ${percent(event.cumulative,data.total)}"><title>${escape(formatDate(event.date))}: ${event.pairs.length} newly dated pairs; ${event.cumulative} cumulative (${percent(event.cumulative,data.total)})</title></circle>`).join('');
  $('#progress-plot').innerHTML=`<svg viewBox="0 0 960 244" role="group" aria-labelledby="chart-title chart-description"><title id="chart-title">Pairs solved over time</title><desc id="chart-description">Line plot with logarithmic spacing on both axes: log(1 + years before ${last}) reversed for chronological order, and log(1 + percentage). Zero to one hundred percent, out of ${data.total} pairs. The curve reaches ${data.dated} dated pairs, ${percent(data.dated,data.total)}. ${data.undated} solved pairs have no established date.</desc>${ticks}${xticks}<path d="${path}" class="chart-line"/>${dots}</svg><p class="progress-scale" title="Time: reversed log(1 + years before ${last}). Percentage: log(1 + percentage), so zero stays visible.">Logarithmic axes · recent years and lower percentages expanded.</p><p id="progress-detail">Hover over a point for its proof date. Select it to see the pairs and sources.</p>`;
  function renderRecords(){
   if($('#progress-table').dataset.loaded)return;
  $('#progress-table').innerHTML='<table><thead><tr><th>Proof date</th><th>Pair</th><th>Example and sources</th></tr></thead><tbody>'+data.series.flatMap((event,i)=>event.pairs.map((proof,j)=>`<tr ${j===0?`id="proof-event-${i}"`:''}><td>${escape(proof.kind)}<br>${escape(formatDate(proof.date))}</td><td><button data-pair="${proof.pair.join(',')}">${escape(proof.pair.map(label).join(' AND '))}</button></td><td>${proof.group?escape(groups.find(g=>g.id===proof.group).name):'Impossible'}${proof.sources.map(id=>`<a href="${escape(sources[id].url)}" target="_blank" rel="noopener">${escape(sources[id].title)} ↗</a>`).join('')}${proof.rules.length?`<details><summary>Proof steps</summary>${proof.rules.map(id=>{const rule=rules.find(r=>r.id===id);return `<p>${escape(rule.when.map(label).join(' AND '))} ⇒ ${escape(label(rule.then))}<br>${escape(rule.reason)}</p>`;}).join('')}</details>`:''}</td></tr>`)).join('')+'</tbody></table>';
   $('#progress-table').dataset.loaded='true';
  }
  $('#progress-records').addEventListener('toggle',()=>{if($('#progress-records').open)renderRecords();});
  const describe=target=>{const event=data.series[Number(target.dataset.event)];$('#progress-detail').textContent=`${formatDate(event.date)} · ${event.pairs.length} newly dated pairs · ${event.cumulative} / ${number(data.total)} (${percent(event.cumulative,data.total)})`;};
  const reveal=target=>{describe(target);$('#progress-records').open=true;renderRecords();$(`#proof-event-${target.dataset.event}`).scrollIntoView({block:'nearest'});};
  $('#progress-plot').addEventListener('pointerover',e=>{if(e.target.dataset.event!==undefined)describe(e.target);});
  $('#progress-plot').addEventListener('focusin',e=>{if(e.target.dataset.event!==undefined)describe(e.target);});
  $('#progress-plot').addEventListener('click',e=>{if(e.target.dataset.event!==undefined)reveal(e.target);});
  $('#progress-plot').addEventListener('keydown',e=>{if(e.target.dataset.event!==undefined&&['Enter',' '].includes(e.key)){e.preventDefault();reveal(e.target);}});
  $('#progress-table').addEventListener('click',e=>{
   const button=e.target.closest('[data-pair]');if(!button)return;
   const pair=button.dataset.pair.split(','),params=new URLSearchParams(location.hash.slice(1));
   const selected=(params.get('properties')||'').split(',').filter(Boolean);
   params.set('properties',[...new Set([...selected,...pair])].join(','));params.set('cell',pair.join(','));params.delete('q');location.hash=params.toString();
   document.querySelector('.matrix-scroll').scrollIntoView({block:'start'});
  });
 }catch(error){$('#progress-summary').textContent=error.message;}
}
await renderProgress();
