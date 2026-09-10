// Generates the README section that lists every documented open question and
// accounts for every unresolved pair of the map exactly once, so the README
// cannot drift from questions.mjs or the engine. Run
// `node open-questions.mjs --write` after changing data.mjs or questions.mjs;
// the tests fail while README.md is stale. Cells involving "not hyperlinear"
// all wait on the single non-hyperlinear question and are counted, not listed.
import {readFileSync,writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {properties,sources} from './data.mjs';
import {classify,label} from './engine.mjs';
import {openQuestions,namedQuestion} from './questions.mjs';
import {formatDate} from './history.mjs';

export const START='<!-- open-questions:start -->',END='<!-- open-questions:end -->';
export const HYPER='!hyperlinear';
const literals=properties.flatMap(p=>[p.id,'!'+p.id]).sort();
const properNouns=new Set(['Hopfian','Co-Hopfian','Haagerup']);
// "Not Hyperlinear" reads badly in prose; lower the first letter of a name
// unless it is an acronym, a symbol, or a proper noun.
const lower=text=>/^[A-Z][a-z]/.test(text)&&!properNouns.has(text.split(' ')[0])?text[0].toLowerCase()+text.slice(1):text;
export const name=(lit,first=true)=>{const text=label(lit);if(lit[0]==='!')return `${first?'Not':'not'} ${lower(text.slice(4))}`;return first?text:lower(text);};
export const conjunction=lits=>lits.map((lit,i)=>name(lit,i===0)).join(' ∧ ');
const escape=text=>String(text).replace(/\|/g,'\\|').replace(/\s+/g,' ');
const link=id=>`[${escape(sources[id].title)}](${sources[id].url})`;
const plural=(n,word)=>`${n} ${word}${n===1?'':'s'}`;
// README prose writes 30 July 2025; keep that style here rather than the app's short form.
const date=value=>{
 if(value===null)return formatDate(null);
 if(/^\d{4}$/.test(value))return value;
 const long=new Intl.DateTimeFormat('en-GB',{year:'numeric',month:'long',...(value.length>7?{day:'numeric'}:{}),timeZone:'UTC'});
 return long.format(new Date(`${value.length===7?value+'-01':value}T12:00:00Z`));
};
// Positive literal first when naming a cell; question hypotheses keep their curated order.
const cell=pair=>conjunction([...pair].sort((a,b)=>(a[0]==='!')-(b[0]==='!')||name(a).localeCompare(name(b))));

export function counts(){
 const tally={exists:0,impossible:0,unresolved:0};
 for(let i=0;i<literals.length;i++)for(let j=i+1;j<literals.length;j++)tally[classify([literals[i],literals[j]]).status]++;
 return {...tally,total:literals.length*(literals.length-1)/2};
}
export function unresolvedPairs(){
 const pairs=[];
 for(let i=0;i<literals.length;i++)for(let j=i+1;j<literals.length;j++){
  const pair=[literals[i],literals[j]];
  if(classify(pair).status==='unresolved')pairs.push({pair,question:namedQuestion(pair)?.id});
 }
 return pairs;
}
// One row per documented open question, with the map cells equivalent to it.
export function openQuestionTable(){
 const pairs=unresolvedPairs();
 return openQuestions.map(question=>{
  const cells=pairs.filter(p=>p.question===question.id);
  return {question,cells,hyper:cells.filter(p=>p.pair.includes(HYPER)),listed:cells.filter(p=>!p.pair.includes(HYPER))};
 });
}
// Unresolved pairs that match no documented question. The hyperlinear block is
// returned separately; the rest is grouped greedily by the property that
// covers the most remaining pairs, so each pair appears in exactly one row.
export function gapRows(){
 const pairs=unresolvedPairs().filter(p=>!p.question);
 const hyper=pairs.filter(p=>p.pair.includes(HYPER));
 const remaining=new Map(pairs.filter(p=>!p.pair.includes(HYPER)).map(p=>[p.pair.join(','),p.pair]));
 const rows=[];
 while(remaining.size){
  const tally=new Map();
  for(const pair of remaining.values())for(const lit of pair)tally.set(lit,(tally.get(lit)||0)+1);
  const [literal]=[...tally.entries()].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]))[0];
  const partners=[];
  for(const [key,pair] of [...remaining])if(pair.includes(literal)){partners.push(pair.find(lit=>lit!==literal));remaining.delete(key);}
  rows.push({literal,partners:partners.sort((a,b)=>name(a).localeCompare(name(b)))});
 }
 return {hyper,rows};
}
export function render(){
 const c=counts(),table=openQuestionTable(),{hyper,rows}=gapRows();
 const hyperQuestion=table.find(t=>t.question.requirements.length===1&&t.question.requirements[0]===HYPER);
 const equivalent=table.reduce((n,t)=>n+t.listed.length,0),sameQuestion=hyperQuestion?.hyper.length??0,gaps=rows.reduce((n,r)=>n+r.partners.length,0);
 const fmt=n=>n.toLocaleString('en');
 const lines=[
  `Of the ${fmt(c.total)} unordered pairs of distinct signed properties, ${fmt(c.exists)} exist, ${fmt(c.impossible)} are impossible and ${fmt(c.unresolved)} are unresolved. Each unresolved pair is counted once below: ${equivalent} are equivalent to a documented open question, ${sameQuestion} are the non-hyperlinear question itself, ${hyper.length} are strictly stronger than it, and ${gaps} have no literature record in this catalog.`,
  '','### Documented open questions','',
  '| Complete conjunction | Question | Source | Source date | Cells on the map |','| --- | --- | --- | --- | --- |'];
 for(const {question:q,hyper:h,listed} of table){
  const posed=q.posed?` Posed${q.posed.date?` (${date(q.posed.date)})`:''}: ${escape(q.posed.by)}.`:'';
  const cells=q.requirements.length===1&&q.requirements[0]===HYPER?`${plural(h.length,'cell')}, one for each consequence of not being hyperlinear, such as not sofic or not residually finite`:
   listed.length?listed.map(p=>cell(p.pair)).join('; '):'None: needs filters';
  lines.push(`| ${conjunction(q.requirements)} | ${escape(q.question)}${posed} | ${link(q.source)} | ${date(q.sourceDate)} | ${cells} |`);
 }
 lines.push('','### Unresolved pairs without a literature record','','| Property | Unresolved partners | Cells |','| --- | --- | --- |');
 lines.push(`| ${name(HYPER)} | ${plural(hyper.length,'cell')} strictly stronger than the non-hyperlinear question, not listed individually | ${hyper.length} |`);
 for(const row of rows)lines.push(`| ${name(row.literal)} | ${row.partners.map(lit=>name(lit,false)).join(', ')} | ${row.partners.length} |`);
 return lines.join('\n');
}
export function updateReadme(readme){
 const start=readme.indexOf(START),end=readme.indexOf(END);
 if(start<0||end<start)throw new Error('README.md lacks the open-questions markers');
 return readme.slice(0,start+START.length)+'\n'+render()+'\n'+readme.slice(end);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const path=new URL('./README.md',import.meta.url);
 if(process.argv.includes('--write')){writeFileSync(path,updateReadme(readFileSync(path,'utf8')));console.log('README.md open-question tables regenerated');}
 else process.stdout.write(render()+'\n');
}
