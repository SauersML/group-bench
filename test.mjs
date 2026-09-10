import assert from 'node:assert/strict';
import {test} from 'node:test';
import {history,formatDate} from './history.mjs';
import {properties,rules,groups,sources} from './data.mjs';
import {propertyId,negate,propagate,consistent,classify,explanation,signatures} from './engine.mjs';
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
});
test('multi-premise implications preserve all hypotheses and contrapositives',()=>{
 assert.equal(classify(['fp','lef','!rf']).status,'impossible');
 assert.equal(classify(['fp','!rf']).status,'exists');
 assert.equal(classify(['lef','!rf']).status,'unresolved');
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
 for(const literal of ['mf','!mf','hyperlinear','!hyperlinear','fp'])assert.ok(!openai.facts.has(literal),`Non-soficity alone does not decide ${literal}.`);
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
