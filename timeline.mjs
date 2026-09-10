import {properties,groups} from './data.mjs';
import {history,compareDates} from './history.mjs';
import {classify,negate,propagate,consistent} from './engine.mjs';
import {ruleHistory,structuralRules} from './rule-history.mjs';
const datedById=new Map(ruleHistory.map(entry=>[entry.rule.id,entry]));
const toClause=rule=>({rule,literals:[...rule.when.map(negate),rule.then]});
const structural=structuralRules.map(toClause);
const theory=[...structural,...ruleHistory.map(({rule})=>toClause(rule))];
const union=values=>[...new Set(values.flat())];

// Dates flow through every premise. Undated facts/theorems never acquire a
// date from a group's construction, and a later theorem cannot act earlier.
export function datedSignatures(){
 return groups.map(group=>{
  const facts=new Map();
  const record=(literal,proof)=>{
   const old=facts.get(literal);
   if(!old||compareDates(proof.date,old.date)<0||(proof.date===old.date&&proof.rules.length<old.rules.length)){facts.set(literal,proof);return true;}
   return false;
  };
  for(const milestone of history[group.id].milestones)for(const literal of milestone.facts)record(literal,{date:milestone.date,sources:[milestone.source],rules:[],kind:milestone.kind});
  let changed=true;
  while(changed){
   changed=false;
   for(const clause of theory)for(const literal of clause.literals){
    const parents=clause.literals.filter(lit=>lit!==literal).map(lit=>facts.get(negate(lit)));
    if(parents.some(p=>!p))continue;
    const dated=datedById.get(clause.rule.id);
    const date=[...parents.map(p=>p.date),...(dated?[dated.date]:[])].sort(compareDates).at(-1);
    if(!date)continue;
    const sources=union([...parents.map(p=>p.sources),...(dated?[[dated.source,...dated.dependencies]]:[])]);
    const rules=union([...parents.map(p=>p.rules),[clause.rule.id]]);
    if(record(literal,{date,sources,rules,kind:'Derived from dated proofs'}))changed=true;
   }
  }
  return {group,facts};
 });
}
export function datedWitnessPairs(){
 const earliest=new Map();
 for(const {group,facts} of datedSignatures()){
  const literals=[...facts.keys()].sort();
  for(let i=0;i<literals.length;i++)for(let j=i+1;j<literals.length;j++){
   const pair=[literals[i],literals[j]],key=pair.join(','),evidence=pair.map(lit=>facts.get(lit));
   const date=evidence.map(f=>f.date).sort(compareDates).at(-1),rules=union(evidence.map(f=>f.rules));
   if(!earliest.has(key)||compareDates(date,earliest.get(key).date)<0)earliest.set(key,{pair,date,group:group.id,status:'exists',sources:union(evidence.map(f=>f.sources)),rules,kind:rules.length?'Derived by':'Proof recorded'});
  }
 }
 return earliest;
}
function contradictionProof(pair,date){
 const available=[...structural,...ruleHistory.filter(r=>compareDates(r.date,date)<=0).map(({rule})=>toClause(rule))];
 if(consistent(pair,available))return null;
 const proof=propagate(pair,available),used=new Set();
 if(proof.conflict){
  const seen=new Set();
  const visit=literal=>{if(seen.has(literal))return;seen.add(literal);const fact=proof.facts.get(literal);if(!fact)return;if(fact.rule)used.add(fact.rule.id);fact.parents.forEach(visit);};
  proof.conflict.forEach(visit);if(proof.rule)used.add(proof.rule.id);
 }else{
  let minimal=available;
  for(const clause of available){const candidate=minimal.filter(c=>c!==clause);if(!consistent(pair,candidate))minimal=candidate;}
  minimal.forEach(c=>used.add(c.rule.id));
 }
 const dated=[...used].map(id=>datedById.get(id)).filter(Boolean);
 if(!dated.length)return null; // Pure logical obstructions have no invented date.
 return {pair,date:dated.map(r=>r.date).sort(compareDates).at(-1),status:'impossible',sources:union(dated.map(r=>[r.source,...r.dependencies])),rules:[...used],kind:'Derived by'};
}
export function buildTimeline(){
 const literals=properties.flatMap(p=>[p.id,'!'+p.id]).sort();
 const dates=datedWitnessPairs(),counts={exists:0,impossible:0,unresolved:0},events=new Map();
 const theoremDates=[...new Set(ruleHistory.map(r=>r.date))].sort(compareDates);
 for(let i=0;i<literals.length;i++)for(let j=i+1;j<literals.length;j++){
  const pair=[literals[i],literals[j]],result=classify(pair);counts[result.status]++;
  let proof=dates.get(pair.join(','));
  if(proof&&(result.status!=='exists'||!result.witnesses.some(g=>g.id===proof.group)))throw new Error('Dated pair has no matching witness: '+pair);
  if(result.status==='impossible'&&consistent(pair,structural)){
   // Monotonicity permits binary search for the first dated theory that rules
   // the pair out. This uses exactly the same logic as the main classifier.
   let low=0,high=theoremDates.length;
   while(low<high){const middle=Math.floor((low+high)/2);if(contradictionProof(pair,theoremDates[middle]))high=middle;else low=middle+1;}
   if(low<theoremDates.length)proof=contradictionProof(pair,theoremDates[low]);
  }
  if(proof){if(!events.has(proof.date))events.set(proof.date,[]);events.get(proof.date).push(proof);}
 }
 const total=literals.length*(literals.length-1)/2,solved=counts.exists+counts.impossible;
 let cumulative=0;
 const series=[...events.entries()].sort(([a],[b])=>compareDates(a,b)).map(([date,pairs])=>({date,pairs,cumulative:cumulative+=pairs.length}));
 return {total,solved,counts,dated:cumulative,undated:solved-cumulative,series};
}
