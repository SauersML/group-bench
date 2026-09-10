// Generates the README table that lists every documented open question and
// every unresolved pair of the map, one row each, so the README cannot drift
// from questions.mjs or the engine. Run `node open-questions.mjs --write`
// after changing data.mjs or questions.mjs; the tests fail while README.md is
// stale. The only collapsed rows are the cells that pair "not hyperlinear"
// with something strictly stronger than the non-hyperlinear question: they all
// wait on that one question and are counted rather than listed.
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
export const conditions=lits=>lits.map((lit,i)=>name(lit,i===0)).join(' and ');
// Positive literal first when naming a cell; question hypotheses keep their curated order.
const ordered=pair=>[...pair].sort((a,b)=>(a[0]==='!')-(b[0]==='!')||name(a).localeCompare(name(b)));
const cell=pair=>conditions(ordered(pair));
const escape=text=>String(text).replace(/\|/g,'\\|').replace(/\s+/g,' ');
const link=id=>`[${escape(sources[id].title)}](${sources[id].url})`;
// README prose writes 30 July 2025; keep that style here rather than the app's short form.
const date=value=>{
 if(value===null)return formatDate(null);
 if(/^\d{4}$/.test(value))return value;
 const long=new Intl.DateTimeFormat('en-GB',{year:'numeric',month:'long',...(value.length>7?{day:'numeric'}:{}),timeZone:'UTC'});
 return long.format(new Date(`${value.length===7?value+'-01':value}T12:00:00Z`));
};
const key=pair=>[...pair].sort().join(',');

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
// One row per documented open question, followed by any further cell that is
// equivalent to it; then the collapsed hyperlinear block; then one row per
// unresolved pair without a literature record. Every unresolved pair is
// accounted for by exactly one row.
export function rows(){
 const pairs=unresolvedPairs(),out=[];
 for(const question of openQuestions){
  const cells=pairs.filter(p=>p.question===question.id);
  const own=cells.filter(p=>p.pair.includes(HYPER)||key(p.pair)===key(question.requirements));
  out.push({kind:'question',question,cells:own});
  for(const p of cells.filter(p=>!own.includes(p)).sort((a,b)=>cell(a.pair).localeCompare(cell(b.pair))))out.push({kind:'equivalent',question,pair:p.pair});
 }
 const gaps=pairs.filter(p=>!p.question);
 const hyper=gaps.filter(p=>p.pair.includes(HYPER));
 out.push({kind:'hyperlinear',cells:hyper});
 for(const p of gaps.filter(p=>!p.pair.includes(HYPER)).sort((a,b)=>cell(a.pair).localeCompare(cell(b.pair))))out.push({kind:'gap',pair:p.pair});
 return out;
}
export function render(){
 const c=counts(),table=rows(),fmt=n=>n.toLocaleString('en');
 const questions=table.filter(r=>r.kind==='question'),equivalent=table.filter(r=>r.kind==='equivalent').length,hyper=table.find(r=>r.kind==='hyperlinear').cells.length,gaps=table.filter(r=>r.kind==='gap').length;
 const sameQuestion=questions.find(r=>r.question.requirements.length===1&&r.question.requirements[0]===HYPER)?.cells.length??0;
 const lines=[
  `Of the ${fmt(c.total)} unordered pairs of distinct signed properties, ${fmt(c.exists)} exist, ${fmt(c.impossible)} are impossible and ${fmt(c.unresolved)} are unresolved. Every unresolved pair has exactly one row below: ${questions.length} rows are documented open questions (the non-hyperlinear row stands for ${sameQuestion} cells, and ${questions.filter(r=>r.question.requirements.length>2).length} questions need filters because they have three or more conditions), ${equivalent} further cell is equivalent to one of them, one row counts the ${hyper} cells strictly stronger than the non-hyperlinear question, and ${gaps} rows are pairs with no literature record.`,
  '','| Conditions | Question | Source | Source date |','| --- | --- | --- | --- |'];
 for(const row of table){
  if(row.kind==='question'){
   const q=row.question,posed=q.posed?` Posed${q.posed.date?` (${date(q.posed.date)})`:''}: ${escape(q.posed.by)}.`:'';
   const hyperNote=q.requirements.length===1&&q.requirements[0]===HYPER?` This row also stands for the ${row.cells.length} cells that pair not hyperlinear with one of its consequences, such as not sofic.`:'';
   lines.push(`| ${conditions(q.requirements)} | ${escape(q.question)}${posed}${hyperNote} | ${link(q.source)} | ${date(q.sourceDate)} |`);
  }else if(row.kind==='equivalent'){
   lines.push(`| ${cell(row.pair)} | Equivalent to the question above under the recorded implications. | ${link(row.question.source)} | ${date(row.question.sourceDate)} |`);
  }else if(row.kind==='hyperlinear'){
   lines.push(`| Not hyperlinear and one further condition | ${row.cells.length} cells, each strictly stronger than the non-hyperlinear question and waiting on it; not listed individually. | | |`);
  }else lines.push(`| ${cell(row.pair)} | No literature record. | | |`);
 }
 return lines.join('\n');
}
export function updateReadme(readme){
 const start=readme.indexOf(START),end=readme.indexOf(END);
 if(start<0||end<start)throw new Error('README.md lacks the open-questions markers');
 return readme.slice(0,start+START.length)+'\n'+render()+'\n'+readme.slice(end);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const path=new URL('./README.md',import.meta.url);
 if(process.argv.includes('--write')){writeFileSync(path,updateReadme(readFileSync(path,'utf8')));console.log('README.md open-question table regenerated');}
 else process.stdout.write(render()+'\n');
}
