import assert from 'node:assert/strict';
import {test} from 'node:test';
import {history,formatDate} from './history.mjs';
import {properties,rules,groups,sources} from './data.mjs';
import {propertyId,negate,propagate,consistent,classify,explanation,signatures} from './engine.mjs';
import {questions,namedQuestion} from './questions.mjs';
test('catalog references and signatures are internally consistent',()=>{
 const ids=new Set(properties.map(p=>p.id));assert.equal(ids.size,properties.length);
 assert.equal(new Set(groups.map(g=>g.id)).size,groups.length);
 assert.equal(new Set(rules.map(r=>r.id)).size,rules.length);
 for(const p of properties)assert.ok(sources[p.source],p.id);
 for(const rule of rules){assert.ok(sources[rule.source]);for(const lit of [...rule.when,rule.then])assert.ok(ids.has(propertyId(lit)),lit);}
 for(const group of groups){assert.ok(sources[group.source]);for(const lit of group.facts)assert.ok(ids.has(propertyId(lit)),lit);assert.ok(consistent(group.facts),group.name);}
 for(const source of Object.values(sources))if(source.url)assert.equal(new URL(source.url).protocol,'https:');
});
test('named deep intersections have real witnesses',()=>{
 assert.ok(classify(['simple','!finite','torsion','intermediate']).witnesses.some(g=>g.id==='nekrashevych'));
 assert.ok(classify(['fp','amenable','!ea']).witnesses.some(g=>g.id==='grigorchuk98'));
 assert.ok(classify(['intermediate','!rf']).witnesses.some(g=>g.id==='erschler'));
 assert.ok(classify(['acyclic','tf','fp','!rf']).witnesses.some(g=>g.id==='higman'));
 assert.ok(classify(['fg','!finite','exponent','!amenable','!f2','!rf']).witnesses.some(g=>g.id==='burnside'));
 assert.ok(classify(['fp','!amenable','!f2','!tf','!torsion']).witnesses.some(g=>g.id==='olshanskiiSapir'));
 assert.ok(classify(['fg','simple','amenable','!finite','!fp','!rf']).witnesses.some(g=>g.id==='juschenkoMonod'));
 assert.ok(classify(['rf','torsion','t','!finite','!amenable','!exponent']).witnesses.some(g=>g.id==='ershov'));
 assert.ok(classify(['fg','divisible','!trivial','!finite']).witnesses.some(g=>g.id==='guba'));
 assert.ok(classify(['fp','!hopfian','t','!rf']).witnesses.some(g=>g.id==='cornulier'));
 assert.ok(classify(['fp','!sofic']).witnesses.some(g=>g.id==='openaiFP'));
 assert.ok(classify(['fp','tf','!sofic']).witnesses.some(g=>g.id==='fournier_facio'));
 assert.equal(classify(['fg','rf','exponent','!finite']).status,'impossible');
 assert.notEqual(classify(['rf','exponent','!finite']).status,'impossible','Zel’manov’s theorem needs finite generation.');
 assert.equal(classify(['torsion','f2']).status,'impossible');
 const burnside=signatures.find(s=>s.group.id==='burnside');
 for(const literal of ['t','!t','fp','!fp','simple','!simple'])assert.ok(!burnside.facts.has(literal),`Not decided for free Burnside groups: ${literal}`);
});
test('named questions agree with the catalog and carry dated sources',()=>{
 const ids=new Set(properties.map(p=>p.id)),dateShape=/^\d{4}(-\d{2}(-\d{2})?)?$/;
 assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
 for(const item of questions){
  assert.match(item.reviewed,/^\d{4}-\d{2}-\d{2}$/,item.id);
  assert.equal(new Set(item.requirements).size,item.requirements.length,item.id);
  for(const lit of item.requirements)assert.ok(ids.has(propertyId(lit)),`${item.id} ${lit}`);
  assert.ok(item.question&&item.note,item.id);
  if(item.posed){assert.ok(sources[item.posed.source],item.id);assert.ok(item.posed.by,item.id);if(item.posed.date!==null)assert.match(item.posed.date,dateShape,item.id);}
  for(const id of item.sources||[])assert.ok(sources[id]?.url,`${item.id} ${id}`);
  const result=classify(item.requirements);
  if(item.status==='open'){
   assert.equal(result.status,'unresolved',`${item.id} is recorded open but the catalog decides it`);
   assert.ok(sources[item.source]?.url,item.id);assert.match(item.sourceDate,dateShape,item.id);
   assert.ok(!item.resolved&&!item.obstruction,item.id);
  }else if(item.status==='solved'){
   assert.equal(result.status,'exists',item.id);
   assert.ok(result.witnesses.some(g=>g.id===item.resolved.witness),`${item.id} witness ${item.resolved.witness}`);
   assert.ok(sources[item.resolved.source]?.url,item.id);assert.match(item.resolved.date,dateShape,item.id);assert.ok(item.resolved.by,item.id);
   assert.ok(history[item.resolved.witness],item.id);
  }else if(item.status==='impossible'){
   assert.equal(result.status,'impossible',item.id);
   assert.ok(sources[item.obstruction.source],item.id);
  }else assert.fail(`${item.id}: unknown status ${item.status}`);
  assert.equal(namedQuestion(item.requirements)?.id,item.id,`${item.id} must match its own requirements`);
 }
 assert.ok(questions.some(q=>q.id==='hyperbolic_rf'&&q.status==='open'));
 assert.ok(questions.some(q=>q.id==='fp_growth'&&q.status==='open'));
 assert.ok(questions.some(q=>q.id==='nonsofic'&&q.status==='solved'&&q.resolved.witness==='openai'));
 assert.ok(questions.some(q=>q.id==='rf_exponent'&&q.status==='impossible'));
 assert.equal(namedQuestion(['!sofic','!sofic'])?.id,'nonsofic');
 assert.equal(namedQuestion(['intermediate','fg'])?.id,'intermediate_growth');
 assert.equal(namedQuestion(['fg','torsion','!finite','intermediate']),undefined,'A stronger answered query is not the same question.');
 assert.equal(namedQuestion(['t','amenable','!finite'])?.id,'amenable_kazhdan');
 assert.equal(namedQuestion(['t','amenable']),undefined,'Finite groups have both properties.');
 assert.equal(namedQuestion(['fp','!sofic'])?.id,'fp_nonsofic');
});
test('multi-premise implications preserve all hypotheses and contrapositives',()=>{
 assert.equal(classify(['fp','lef','!rf']).status,'impossible');
 assert.equal(classify(['fp','!rf']).status,'exists');
 assert.equal(classify(['lef','!rf']).status,'exists');
 assert.ok(propagate(['lef','!rf']).facts.has('!fp'));
 assert.equal(classify(['t','amenable','!finite']).status,'impossible');
 assert.equal(classify(['finite','tf','!trivial']).status,'impossible');
});
test('trivial group and negative properties respect definitions',()=>{
 assert.equal(classify(['torsion','tf']).status,'exists');
 assert.equal(classify(['simple','trivial']).status,'impossible');
 assert.equal(classify(['torsion','!tf']).status,'exists');
 assert.equal(classify(['!torsion','!tf']).status,'exists');
 assert.equal(classify(['finite','!finite']).status,'impossible');
});
test('unknown facts do not become false or fictional group witnesses',()=>{
 const f=signatures.find(s=>s.group.id==='thompson');
 assert.ok(!f.facts.has('amenable'));assert.ok(!f.facts.has('!amenable'));
 assert.equal(classify(['hyp','!rf']).status,'unresolved');
 assert.equal(consistent(['hyp','!rf']),true);
});
test('obstruction reports a minimal set of selected assumptions',()=>{
 const proof=explanation(['fp','lef','!rf','fg']);
 assert.equal(consistent(proof.core),false);
 for(const lit of proof.core)assert.ok(consistent(proof.core.filter(x=>x!==lit)));
 assert.ok(!proof.core.includes('fg'));
 assert.ok(proof.steps.every(step=>sources[step.rule.source]));
});
test('DPLL agrees with exhaustive truth tables, including contradictions requiring cases',()=>{
 let seed=123456;
 const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed;};
 for(let sample=0;sample<150;sample++){
  const theory=Array.from({length:1+rand()%10},(_,i)=>({rule:{id:i},literals:[...new Set(Array.from({length:1+rand()%3},()=>`${rand()%2?'!':''}${['a','b','c'][rand()%3]}`))]}));
  const brute=Array.from({length:8},(_,n)=>new Set(['a','b','c'].map((x,i)=>n&(1<<i)?x:negate(x)))).some(facts=>theory.every(c=>c.literals.some(lit=>facts.has(lit))));
  assert.equal(consistent([],theory),brute);
 }
 const theory=[['a','b'],['a','!b'],['!a','b'],['!a','!b']].map((literals,i)=>({literals,rule:{id:i}}));
 assert.equal(propagate([],theory).conflict,null);assert.equal(consistent([],theory),false);
});
test('every displayed witness satisfies the entire query',()=>{
 for(const a of properties)for(const b of properties){
  const query=[a.id,negate(b.id)];const result=classify(query);
  for(const group of result.witnesses){const s=signatures.find(s=>s.group.id===group.id);assert.ok(query.every(lit=>s.facts.has(lit)));}
 }
});
console.log(`${properties.length} properties, ${rules.length} rules, ${groups.length} groups`);

test('every property has a usable logical complement, including all approximation axes',()=>{
 for(const id of ['mf','hyperlinear','sofic'])assert.ok(properties.some(p=>p.id===id));
 for(const p of properties){
  assert.equal(negate(negate(p.id)),p.id);
  assert.equal(classify([p.id,negate(p.id)]).status,'impossible');
  const result=classify([negate(p.id)]);
  for(const g of result.witnesses)assert.ok(signatures.find(s=>s.group.id===g.id).facts.has(negate(p.id)));
 }
 assert.equal(classify(['sofic','!mf']).status,'exists');
 assert.ok(classify(['!sofic','!amenable','!rf']).witnesses.some(g=>g.id==='openai'));
 const openai=signatures.find(s=>s.group.id==='openai');
 for(const literal of ['hyperlinear','!hyperlinear','fp','!fp'])assert.ok(!openai.facts.has(literal),`Not decided for the Leavitt unit group: ${literal}.`);
 for(const literal of ['!sofic','!mf','simple','t','fg','perfect','!tf'])assert.ok(openai.facts.has(literal),`Recorded for the Leavitt unit group: ${literal}.`);
 assert.ok(classify(['!sofic','!mf']).witnesses.some(g=>g.id==='openai'));
 assert.ok(classify(['tf','!mf','cstar','t']).witnesses.some(g=>g.id==='sauers_q'));
 assert.ok(classify(['sofic','!mf','!centerless','!t']).witnesses.some(g=>g.id==='sauers_w'));
 assert.ok(classify(['fp','sofic','hyperlinear','!mf']).witnesses.some(g=>g.id==='sauers'));
 assert.equal(classify(['amenable','!mf']).status,'impossible');
});

test('each example has explicit provenance without invented dates',()=>{
 assert.deepEqual(Object.keys(history).sort(),groups.map(g=>g.id).sort());
 for(const g of groups){
  const h=history[g.id];assert.ok(h.note&&h.dateKind);assert.ok(sources[h.source]);
  if(h.firstProof!==null)assert.match(h.firstProof,/^\d{4}(-\d{2}(-\d{2})?)?$/);
  for(const m of h.milestones){assert.ok(sources[m.source]);for(const lit of m.facts)assert.ok(signatures.find(s=>s.group.id===g.id).facts.has(lit),`${g.id} ${lit}`);}
 }
 assert.equal(formatDate('1980'),'1980');assert.equal(formatDate(null),'Not established');
 assert.equal(history.sauers.firstProof,'2026-08-24');assert.equal(history.sauers.formal.version,1);
 assert.equal(history.grigorchuk.firstProof,'1980');
 assert.ok(history.grigorchuk.milestones.some(m=>m.date==='1984'&&m.facts.includes('intermediate')));
});

import {openQuestions,openQuestion} from './questions.mjs';
test('documented open questions retain complete hypotheses and dated primary sources',()=>{
 assert.equal(new Set(openQuestions.map(q=>q.id)).size,openQuestions.length);
 for(const q of openQuestions){
  assert.ok(sources[q.source]?.url,q.id);
  assert.match(q.reviewed,/^\d{4}-\d{2}-\d{2}$/);
  assert.ok(q.sourceDate<=q.reviewed);
  assert.equal(classify(q.requirements).status,'unresolved',q.id);
  assert.equal(openQuestion(q.requirements)?.id,q.id);
 }
 assert.equal(openQuestion(['!hyperlinear','!hyperlinear'])?.id,'nonhyperlinear');
 assert.equal(openQuestion(['hyp','!lef'])?.id,'hyperbolic_rf');
 assert.equal(openQuestion(['fp','intermediate','fg'])?.id,'fp_growth');
 assert.equal(openQuestion(['fp','intermediate','simple']),undefined);
 assert.equal(openQuestion(['lo','t']),undefined);
 assert.equal(openQuestion(['lo','t','!trivial'])?.id,'ordered_kazhdan');
 assert.equal(openQuestion(['fp','torsion']),undefined);
 assert.equal(openQuestion(['fp','simple','amenable']),undefined);
 assert.equal(openQuestion(['sofic','t','!rf']),undefined);
 assert.equal(openQuestion(['fp','sofic','t','!rf'])?.id,'fp_sofic_kazhdan');
 for(const query of [['!sofic'],['!mf'],['cat0','!biautomatic'],['fp','lef','!rf']])assert.equal(openQuestion(query),undefined);
});
test('recent and historical additions certify only their recorded group properties',()=>{
 for(const [id,query] of [['fournier_facio',['fp','tf','t','!sofic']],['kun_thom',['fg','!sofic','!tf']],['fisher_lodha',['li','tf','!fg']],['thom_lef',['lef','t','!rf']],['leary_minasyan',['cat0','!biautomatic','tf']]]){
  assert.ok(classify(query).witnesses.some(g=>g.id===id));
  assert.ok(history[id].milestones.some(m=>query.every(lit=>m.facts.includes(lit))));
 }
 for(const id of ['fournier_facio','kun_thom']){
  const s=signatures.find(g=>g.group.id===id);
  for(const lit of ['hyperlinear','!hyperlinear'])assert.ok(!s.facts.has(lit),`${id}: ${lit}`);
 }
 for(const lit of ['mf','!mf'])assert.ok(!signatures.find(g=>g.group.id==='fournier_facio').facts.has(lit));
 assert.ok(signatures.find(g=>g.group.id==='kun_thom').facts.has('!mf'),'Eckhardt’s theorem applies to the Kun–Thom pair.');
 assert.equal(history.kun_thom.firstProof,'2026-08-20');
 assert.equal(history.fisher_lodha.firstProof,'2026-08-26');
});

import {readFileSync} from 'node:fs';
import {render,START,END,unresolvedPairs,openQuestionTable,gapRows,counts,HYPER} from './open-questions.mjs';
test('README open-question tables are generated from the catalog and account for every unresolved pair once',()=>{
 const readme=readFileSync(new URL('./README.md',import.meta.url),'utf8');
 const start=readme.indexOf(START),end=readme.indexOf(END);
 assert.ok(start>=0&&end>start,'README.md lacks the open-questions markers');
 assert.equal(readme.slice(start+START.length,end).trim(),render().trim(),'README.md is stale: run `node open-questions.mjs --write`');
 const pairs=unresolvedPairs(),table=openQuestionTable(),{hyper,rows}=gapRows();
 assert.equal(pairs.length,counts().unresolved);
 assert.equal(table.reduce((n,t)=>n+t.cells.length,0)+hyper.length+rows.reduce((n,r)=>n+r.partners.length,0),pairs.length);
 const seen=new Set();
 for(const key of [...table.flatMap(t=>t.cells),...hyper].map(p=>p.pair.join(','))){assert.ok(!seen.has(key),key);seen.add(key);}
 for(const row of rows)for(const partner of row.partners){const key=[row.literal,partner].sort().join(',');assert.ok(!seen.has(key),key);seen.add(key);}
 assert.equal(seen.size,pairs.length);
 for(const t of table)if(t.question.requirements.length<=2)assert.ok(t.cells.length>=1,`${t.question.id} names no cell on the map`);
 assert.ok(hyper.every(p=>p.pair.includes(HYPER))&&!rows.some(r=>r.literal===HYPER||r.partners.includes(HYPER)));
 for(const t of table)assert.ok(render().includes(t.question.question),t.question.id);
});
