import assert from 'node:assert/strict';
import {test} from 'node:test';
import {properties,rules,sources} from './data.mjs';
import {compareDates,dateBoundary} from './history.mjs';
import {ruleHistory} from './rule-history.mjs';
import {buildTimeline,datedSignatures,datedWitnessPairs} from './timeline.mjs';
import {signatures,consistent,negate,classify} from './engine.mjs';
const dates=datedSignatures(),pairs=datedWitnessPairs();
test('dated deductions stay within established group signatures and retain support',()=>{
 for(const {group,facts} of dates){
  const signature=signatures.find(s=>s.group.id===group.id);
  for(const [literal,proof] of facts){
   assert.ok(signature.facts.has(literal),group.id+': '+literal);
   assert.ok(proof.sources.length);assert.ok(proof.sources.every(id=>sources[id]));
   assert.ok(proof.rules.every(id=>rules.some(r=>r.id===id)));
   for(const id of proof.rules){const premise=ruleHistory.find(r=>r.rule.id===id);if(premise)assert.ok(compareDates(proof.date,premise.date)>=0);}
  }
 }
 assert.equal(dates.find(s=>s.group.id==='one').facts.size,0,'Undated classical examples stay undated.');
 assert.equal(dates.find(s=>s.group.id==='q8').facts.size,0,'Algebra construction is not a blanket date for group properties.');
 const openai=dates.find(s=>s.group.id==='openai').facts;
 assert.equal(openai.get('!sofic').date,'2026-08-01');
 assert.equal(openai.get('!amenable').date,'2026-08-01');
 assert.equal(pairs.get(['!sofic','!amenable'].sort().join(',')).date,'2026-08-01');
 const sauers=dates.find(s=>s.group.id==='sauers').facts;
 assert.equal(sauers.get('!amenable').date,'2026-08-24');
 assert.equal(sauers.get('hyperlinear').date,'2026-08-24');
 assert.equal(dates.find(s=>s.group.id==='grigorchuk98').facts.get('mf').date,'2015-09-28','Later theorems delay derived facts.');
 assert.ok(compareDates(pairs.get(['!mf','sofic'].sort().join(',')).date,'2026-08-24')===0);
});
test('date precision preserves conservative temporal order',()=>{
 assert.equal(dateBoundary('1980'),'1980-12-31');assert.equal(dateBoundary('1980-02'),'1980-02-29');
 assert.ok(compareDates('1980-01','1980')<0);
 assert.ok(compareDates('1980','1981-01-01')<0);
});
test('global timeline counts each distinct signed pair once and verifies every dated certificate',()=>{
 const data=buildTimeline(),n=2*properties.length;
 assert.equal(data.total,n*(n-1)/2);assert.equal(data.total,6441);
 assert.equal(Object.values(data.counts).reduce((a,b)=>a+b,0),data.total);
 assert.equal(data.solved,data.counts.exists+data.counts.impossible);
 assert.equal(data.dated+data.undated,data.solved);
 const seen=new Set();let previous=0;
 for(const event of data.series){
  assert.equal(event.cumulative,previous+event.pairs.length);previous=event.cumulative;
  for(const proof of event.pairs){
   assert.equal(proof.pair.length,2);assert.notEqual(...proof.pair);
   const key=[...proof.pair].sort().join(',');assert.ok(!seen.has(key));seen.add(key);
   assert.equal(proof.status,classify(proof.pair).status);
   assert.ok(proof.sources.every(id=>sources[id]?.url));
   if(proof.status==='exists'){
    const group=dates.find(s=>s.group.id===proof.group);assert.ok(group);
    for(const literal of proof.pair)assert.ok(compareDates(group.facts.get(literal).date,proof.date)<=0);
   }else{
    const theory=proof.rules.map(id=>{const rule=rules.find(r=>r.id===id);return {rule,literals:[...rule.when.map(negate),rule.then]};});
    assert.equal(consistent(proof.pair,theory),false);
    assert.ok(proof.rules.some(id=>ruleHistory.some(r=>r.rule.id===id)));
   }
  }
 }
 assert.equal(previous,data.dated);assert.ok(data.dated>755);
 assert.ok(data.series.some(e=>e.pairs.some(p=>p.status==='impossible')));
 assert.ok(data.series.some(e=>e.pairs.some(p=>p.pair.includes('!mf'))));
 console.log(`${data.dated} dated pairs / ${data.total}; ${data.undated} solved pairs await dates.`);
});
