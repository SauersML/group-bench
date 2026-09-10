import {properties, rules, groups} from './data.mjs';
export const byId = Object.fromEntries(properties.map(p => [p.id,p]));
export const negate = literal => literal.startsWith('!') ? literal.slice(1) : `!${literal}`;
export const propertyId = literal => literal.replace(/^!/, '');
export const label = literal => `${literal.startsWith('!') ? 'Not ' : ''}${byId[propertyId(literal)].name}`;
export const clauses = rules.map(rule => ({literals:[...rule.when.map(negate),rule.then],rule}));

// Unit propagation retains a proof DAG. Contraposition is just unit propagation
// on a clause, so a multi-premise implication cannot lose its hypotheses.
export function propagate(literals, theory=clauses) {
 const facts = new Map();
 for(const literal of literals) {
  if(facts.has(negate(literal))) return {facts, conflict:[literal,negate(literal)], rule:null};
  facts.set(literal,{literal,rule:null,parents:[]});
 }
 let changed = true;
 while(changed) {
  changed = false;
  for(const clause of theory) {
   if(clause.literals.some(lit=>facts.has(lit))) continue;
   const remaining = clause.literals.filter(lit=>!facts.has(negate(lit)));
   const parents = clause.literals.filter(lit=>facts.has(negate(lit))).map(negate);
   if(!remaining.length) return {facts,conflict:parents,rule:clause.rule};
   if(remaining.length===1) {
    facts.set(remaining[0],{literal:remaining[0],rule:clause.rule,parents});
    changed = true;
   }
  }
 }
 return {facts,conflict:null,rule:null};
}
// Propositional consistency is NOT existence of a group. DPLL is used only
// to certify impossibility; positive answers require an actual group witness.
export function consistent(literals, theory=clauses) {
 const result = propagate(literals,theory);
 if(result.conflict) return false;
 const pending = theory.filter(c=>!c.literals.some(lit=>result.facts.has(lit)))
  .map(c=>c.literals.filter(lit=>!result.facts.has(negate(lit))))
  .sort((a,b)=>a.length-b.length);
 if(!pending.length) return true;
 const literal = pending[0][0];
 const known = [...result.facts.keys()];
 return consistent([...known,literal],theory) || consistent([...known,negate(literal)],theory);
}
export const signatures = groups.map(group=>({group,...propagate(group.facts)}));
const cache = new Map();
export function classify(query) {
 const normalized = [...new Set(query)].sort();
 const key = normalized.join(',');
 if(cache.has(key)) return cache.get(key);
 const closure = propagate(normalized);
 let result;
 if(closure.conflict || !consistent(normalized)) result={status:'impossible',witnesses:[],closure};
 else {
  const witnesses = signatures.filter(s=>normalized.every(lit=>s.facts.has(lit))).map(s=>s.group);
  result={status:witnesses.length?'exists':'unresolved',witnesses,closure};
 }
 cache.set(key,result);
 return result;
}
export function explanation(query) {
 const result = classify(query);
 if(result.status!=='impossible') return [];
 // Produce a subset-minimal conflicting set of selected requirements.
 let core=[...new Set(query)];
 for(const literal of [...core]) {
  const candidate=core.filter(lit=>lit!==literal);
  if(!consistent(candidate)) core=candidate;
 }
 const proof = propagate(core);
 const steps=[],seen=new Set();
 function visit(lit) {
  if(seen.has(lit)) return;
  seen.add(lit);
  const fact=proof.facts.get(lit);
  if(!fact) return;
  fact.parents.forEach(visit);
  if(fact.rule) steps.push(fact);
 }
 if(proof.conflict) {
  proof.conflict.forEach(visit);
  if(proof.rule) steps.push({literal:null,rule:proof.rule,parents:proof.conflict});
  return {core,steps,byCases:false};
 }
 // If branching was needed, minimize the theorem set as a checkable certificate.
 let needed=[...clauses];
 for(const clause of [...needed]) {
  const candidate=needed.filter(c=>c!==clause);
  if(!consistent(core,candidate)) needed=candidate;
 }
 return {core,steps:needed.map(c=>({literal:null,rule:c.rule,parents:[]})),byCases:true};
}
export function witnessProof(group, literal) {
 const signature=signatures.find(s=>s.group.id===group.id), steps=[], seen=new Set();
 function visit(lit) {
  if(seen.has(lit)) return;
  seen.add(lit);
  const fact=signature.facts.get(lit);
  if(!fact) return;
  fact.parents.forEach(visit);
  steps.push(fact);
 }
 visit(literal);
 return steps;
}
