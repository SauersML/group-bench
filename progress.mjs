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
  const first=data.series.length?Math.floor(year(data.series[0].date)/10)*10:new Date().getUTCFullYear()-1;
  const last=Math.max(new Date().getUTCFullYear()+1,data.series.length?Math.ceil(year(data.series.at(-1).date)):0);
  const left=60,top=18,bottom=278,height=320;
  let width=0,right=0;
  const xYear=value=>left+(1-Math.log1p(last-value)/Math.log1p(last-first))*(right-left);
  const x=date=>xYear(year(date));
  const yPercent=value=>bottom-Math.log1p(value)/Math.log1p(100)*(bottom-top);
  const y=count=>yPercent(100*count/data.total);
  $('#progress-plot').innerHTML=`<svg role="group" aria-labelledby="chart-title chart-description"><title id="chart-title">Pairs solved over time — logarithmic axes</title><desc id="chart-description">Step line with vertical jumps at recorded proof dates and logarithmic spacing on both axes: log(1 + years before ${last}) reversed for chronological order, and log(1 + percentage). Zero to one hundred percent, out of ${data.total} pairs. The curve reaches ${data.dated} dated pairs, ${percent(data.dated,data.total)}. ${data.undated} solved pairs have no established date.</desc><g class="chart-axes"></g><path class="chart-line" tabindex="0" role="slider" aria-label="Proof date; use arrow keys to explore, Enter for sources" aria-valuemin="0" aria-valuemax="${Math.max(0,data.series.length-1)}" aria-valuenow="${Math.max(0,data.series.length-1)}"/></svg><p id="progress-detail"></p>`;
  function draw(){
   const nextWidth=$('#progress-plot').clientWidth;
   if(nextWidth===width)return;
   width=nextWidth;right=width-26;
   let path=`M${left},${bottom}`;
   for(const event of data.series)path+=` H${x(event.date)} V${y(event.cumulative)}`;
   const ticks=[0,1,2,5,10,25,50,100].map(p=>{const pos=yPercent(p);return `<line x1="${left}" y1="${pos}" x2="${right}" y2="${pos}" class="chart-grid"/><text x="${left-9}" y="${pos+5}" text-anchor="end">${p}%</text>`;}).join('');
   const candidates=[...new Set([first,...Array.from({length:Math.max(0,Math.floor(last/10)-Math.ceil(first/10)+1)},(_,i)=>(Math.ceil(first/10)+i)*10),last-5,last-2,last-1])].filter(n=>n>=first&&n<last).sort((a,b)=>a-b);
   const years=[];
   for(const n of candidates)if((!years.length||xYear(n)-xYear(years.at(-1))>=64)&&right-xYear(n)>=64)years.push(n);
   years.push(last);
   const xticks=years.map(n=>`<text x="${xYear(n)}" y="310" text-anchor="middle">${n}</text>`).join('');
   $('#progress-plot svg').setAttribute('viewBox',`0 0 ${width} ${height}`);
   $('#progress-plot .chart-axes').innerHTML=ticks+xticks;
   $('.chart-line').setAttribute('d',path);
  }
  draw();
  new ResizeObserver(draw).observe($('#progress-plot'));
  function renderRecords(){
   if($('#progress-table').dataset.loaded)return;
  $('#progress-table').innerHTML='<table><thead><tr><th>Proof date</th><th>Pair</th><th>Example and sources</th></tr></thead><tbody>'+data.series.flatMap((event,i)=>event.pairs.map((proof,j)=>`<tr ${j===0?`id="proof-event-${i}"`:''}><td>${escape(proof.kind)}<br>${escape(formatDate(proof.date))}</td><td><button data-pair="${proof.pair.join(',')}">${escape(proof.pair.map(label).join(' AND '))}</button></td><td>${proof.group?escape(groups.find(g=>g.id===proof.group).name):'Impossible'}${proof.sources.map(id=>`<a href="${escape(sources[id].url)}" target="_blank" rel="noopener">${escape(sources[id].title)} ↗</a>`).join('')}${proof.rules.length?`<details><summary>Proof steps</summary>${proof.rules.map(id=>{const rule=rules.find(r=>r.id===id);return `<p>${escape(rule.when.map(label).join(' AND '))} ⇒ ${escape(label(rule.then))}<br>${escape(rule.reason)}</p>`;}).join('')}</details>`:''}</td></tr>`)).join('')+'</tbody></table>';
   $('#progress-table').dataset.loaded='true';
  }
  $('#progress-records').addEventListener('toggle',()=>{if($('#progress-records').open)renderRecords();});
  const plot=$('#progress-plot svg'),line=$('.chart-line');
  let selected=Math.max(0,data.series.length-1);
  const describe=()=>{
   const event=data.series[selected];if(!event)return;
   const description=`${formatDate(event.date)} · ${event.pairs.length} newly dated pairs · ${event.cumulative} / ${number(data.total)} (${percent(event.cumulative,data.total)})`;
   $('#progress-detail').textContent=description;
   line.setAttribute('aria-valuenow',selected);line.setAttribute('aria-valuetext',description);
  };
  const locate=event=>{
   const rect=plot.getBoundingClientRect(),position=(event.clientX-rect.left)*width/rect.width;
   if(position<left||position>right||!data.series.length)return false;
   selected=data.series.reduce((best,item,i)=>Math.abs(x(item.date)-position)<Math.abs(x(data.series[best].date)-position)?i:best,0);
   describe();return true;
  };
  const reveal=()=>{if(!data.series.length)return;describe();$('#progress-records').open=true;renderRecords();$(`#proof-event-${selected}`).scrollIntoView({block:'nearest'});};
  plot.addEventListener('pointermove',locate);
  plot.addEventListener('click',event=>{if(locate(event))reveal();});
  line.addEventListener('focus',describe);
  line.addEventListener('keydown',event=>{
   if(['Enter',' '].includes(event.key)){event.preventDefault();reveal();return;}
   const offset={ArrowLeft:-1,ArrowDown:-1,ArrowRight:1,ArrowUp:1}[event.key];
   if(offset!==undefined){event.preventDefault();selected=Math.max(0,Math.min(data.series.length-1,selected+offset));describe();}
   else if(['Home','End'].includes(event.key)){event.preventDefault();selected=event.key==='Home'?0:Math.max(0,data.series.length-1);describe();}
  });
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
