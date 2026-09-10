import {classify,propagate} from './engine.mjs';

// Literature assessments, not existence or impossibility certificates.
export const openQuestions = [
 {
  "id": "fp_growth",
  "requirements": [
   "fp",
   "intermediate"
  ],
  "question": "Can a finitely presented group have intermediate growth?",
  "note": "The finite-presentation requirement is essential.",
  "source": "growthQuestion",
  "sourceDate": "2025",
  "reviewed": "2026-09-09"
 },
 {
  "id": "hyperbolic_rf",
  "requirements": [
   "hyp",
   "!rf"
  ],
  "question": "Is every hyperbolic group residually finite?",
  "note": "This cell asks for a counterexample to Gromov’s residual-finiteness question.",
  "source": "hyperbolicQuestion",
  "sourceDate": "2025",
  "reviewed": "2026-09-09"
 },
 {
  "id": "nonhyperlinear",
  "requirements": [
   "!hyperlinear"
  ],
  "question": "Does a non-hyperlinear group exist?",
  "note": "Non-soficity does not decide hyperlinearity. The cited paper states the group question as open.",
  "source": "hyperlinearQuestion",
  "sourceDate": "2025-07-30",
  "reviewed": "2026-09-09"
 },
 {
  "id": "automatic_biautomatic",
  "requirements": [
   "automatic",
   "!biautomatic"
  ],
  "question": "Is every automatic group biautomatic?",
  "note": "Automatic means synchronous automatic in the usual group-theoretic sense.",
  "source": "rees2022",
  "sourceDate": "2022-05-30",
  "reviewed": "2026-09-09"
 },
 {
  "id": "automatic_conjugacy",
  "requirements": [
   "automatic",
   "!conjugacy"
  ],
  "question": "Does every automatic group have a decidable conjugacy problem?",
  "note": "The word problem is decidable for automatic groups; the conjugacy question remains separate.",
  "source": "rees2022",
  "sourceDate": "2022-05-30",
  "reviewed": "2026-09-09"
 },
 {
  "id": "cat0_automatic",
  "requirements": [
   "cat0",
   "!automatic"
  ],
  "question": "Is every CAT(0) group automatic?",
  "note": "Known CAT(0) groups that are not biautomatic do not settle automaticity.",
  "source": "rees2022",
  "sourceDate": "2022-05-30",
  "reviewed": "2026-09-09"
 },
 {
  "id": "solvable_automatic",
  "requirements": [
   "solvable",
   "automatic",
   "!vabelian"
  ],
  "question": "Is every solvable automatic group virtually abelian?",
  "note": "Both solvability and automaticity are required.",
  "source": "rees2022",
  "sourceDate": "2022-05-30",
  "reviewed": "2026-09-09"
 },
 {
  "id": "rf_cat0_biautomatic",
  "requirements": [
   "rf",
   "cat0",
   "!biautomatic"
  ],
  "question": "Is every residually finite CAT(0) group biautomatic?",
  "note": "The 2025 paper explicitly retains the residual-finiteness hypothesis.",
  "source": "rfCat0Question",
  "sourceDate": "2025-09-08",
  "reviewed": "2026-09-09"
 },
 {
  "id": "ordered_kazhdan",
  "requirements": [
   "lo",
   "t",
   "!trivial"
  ],
  "question": "Is there a nontrivial left-orderable group with property (T)?",
  "note": "The trivial group has both properties, so nontriviality cannot be omitted.",
  "source": "orderTQuestion",
  "sourceDate": "2020-11-22",
  "reviewed": "2026-09-09"
 },
 {
  "id": "fp_torsion",
  "requirements": [
   "fp",
   "torsion",
   "!finite"
  ],
  "question": "Is there an infinite finitely presented torsion group?",
  "note": "Torsion means every element has finite order. Infinite and finitely presented are both required.",
  "source": "torsionQuestion",
  "sourceDate": "2025-07-11",
  "reviewed": "2026-09-09"
 },
 {
  "id": "fp_simple_amenable",
  "requirements": [
   "fp",
   "simple",
   "amenable",
   "!finite"
  ],
  "question": "Is there an infinite finitely presented simple amenable group?",
  "note": "Finite cyclic groups of prime order do not answer the infinite-group question.",
  "source": "zaremskyQuestions",
  "sourceDate": "2026-07-12",
  "reviewed": "2026-09-09"
 },
 {
  "id": "finfty_amenable",
  "requirements": [
   "finfty",
   "amenable",
   "!ea"
  ],
  "question": "Is there an amenable group of type F∞ that is not elementary amenable?",
  "note": "Type F∞ is stronger than finite presentation. Zaremsky lists this as problem 12.",
  "source": "zaremskyQuestions",
  "sourceDate": "2026-07-12",
  "reviewed": "2026-09-09"
 },
 {
  "id": "fp_sofic_kazhdan",
  "requirements": [
   "fp",
   "sofic",
   "t",
   "!rf"
  ],
  "question": "Is there a finitely presented sofic group with property (T) that is not residually finite?",
  "note": "Open problem 6.1. Thom’s LEF example is not finitely presented; all four requirements matter.",
  "source": "alekseevThom2026",
  "sourceDate": "2026-08-05",
  "reviewed": "2026-09-09"
 }
];

const closures = openQuestions.map(question=>({question,facts:propagate(question.requirements).facts}));
const cache = new Map();
export function openQuestion(query) {
 const normalized=[...new Set(query)].sort(),key=normalized.join(',');
 if(cache.has(key))return cache.get(key);
 const result=classify(normalized);
 // Require both implications: a stronger unsolved query is not automatically
 // the same open problem. This also handles repeated diagonals and filters.
 const match=result.status==='unresolved'?closures.find(({question,facts})=>
  question.requirements.every(lit=>result.closure.facts.has(lit))&&normalized.every(lit=>facts.has(lit)))?.question:undefined;
 cache.set(key,match);
 return match;
}
