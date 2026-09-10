import {classify,propagate} from './engine.mjs';

// Literature assessments, not existence or impossibility certificates.
// Each entry names the exact signed requirements it concerns and one of three
// statuses. "open": the cited source states the question as unresolved on its
// source date, and it was reviewed on the review date; this is a statement
// about the literature, never inferred from a gap in the grid. "solved": a
// formerly open question, with the date and author of the answer and the
// catalog witness that realises it (possibly a later example than the first
// solution). "impossible": excluded by a theorem recorded as a rule. The tests
// require every status to agree with the classifier.
const question=(id,requirements,text,status,fields)=>({id,requirements:requirements.split(' '),question:text,status,reviewed:'2026-09-09',...fields});
export const questions=[
 // Still open.
 question('fp_growth','fp intermediate','Can a finitely presented group have intermediate growth?','open',{
  posed:{date:'1968',by:'Milnor asked for intermediate growth; the finitely presented case is Sapir’s Problem 1.1, type (7)',source:'milnor1968'},
  source:'growthQuestion',sourceDate:'2025',sources:['sapirProblems','juschenkoProblems'],
  note:'The finite-presentation requirement is essential. Every known group of intermediate growth is infinitely presented; Juschenko’s Conjecture C.2 predicts a finitely presented one.'}),
 question('hyperbolic_rf','hyp !rf','Is every hyperbolic group residually finite?','open',{
  posed:{date:'1987',by:'Gromov',source:'hyperbolicQuestion'},
  source:'hyperbolicQuestion',sourceDate:'2025',
  note:'This cell asks for a counterexample to Gromov’s residual-finiteness question.'}),
 question('nonhyperlinear','!hyperlinear','Does a non-hyperlinear group exist?','open',{
  source:'hyperlinearQuestion',sourceDate:'2025-07-30',
  note:'Non-soficity does not decide hyperlinearity. The cited paper states the group question as open.'}),
 question('automatic_biautomatic','automatic !biautomatic','Is every automatic group biautomatic?','open',{
  source:'rees2022',sourceDate:'2022-05-30',
  note:'Automatic means synchronous automatic in the usual group-theoretic sense.'}),
 question('automatic_conjugacy','automatic !conjugacy','Does every automatic group have a decidable conjugacy problem?','open',{
  source:'rees2022',sourceDate:'2022-05-30',
  note:'The word problem is decidable for automatic groups; the conjugacy question remains separate.'}),
 question('cat0_automatic','cat0 !automatic','Is every CAT(0) group automatic?','open',{
  source:'rees2022',sourceDate:'2022-05-30',
  note:'Known CAT(0) groups that are not biautomatic do not settle automaticity.'}),
 question('solvable_automatic','solvable automatic !vabelian','Is every solvable automatic group virtually abelian?','open',{
  source:'rees2022',sourceDate:'2022-05-30',
  note:'Both solvability and automaticity are required.'}),
 question('rf_cat0_biautomatic','rf cat0 !biautomatic','Is every residually finite CAT(0) group biautomatic?','open',{
  source:'rfCat0Question',sourceDate:'2025-09-08',
  note:'The 2025 paper explicitly retains the residual-finiteness hypothesis.'}),
 question('ordered_kazhdan','lo t !trivial','Is there a nontrivial left-orderable group with property (T)?','open',{
  source:'orderTQuestion',sourceDate:'2020-11-22',
  note:'The trivial group has both properties, so nontriviality cannot be omitted.'}),
 question('fp_torsion','fp torsion !finite','Is there an infinite finitely presented torsion group?','open',{
  posed:{date:null,by:'folklore; Sapir attributes the torsion form to Kurosh',source:'sapirProblems'},
  source:'torsionQuestion',sourceDate:'2025-07-11',sources:['sapirProblems'],
  note:'Torsion means every element has finite order. Infinite and finitely presented are both required. Sapir records that such groups are unknown even without bounded exponent; finitely generated examples exist (Golod–Shafarevich, Grigorchuk).'}),
 question('fp_exponent','fp exponent !finite','Is there an infinite finitely presented group of bounded exponent?','open',{
  posed:{date:null,by:'folklore; Sapir, Problem 1.1, type (2)',source:'sapirProblems'},
  source:'sapirProblems',sourceDate:'2007-04-22',
  note:'Stronger than the torsion question. By Zel’manov’s theorem (below) an example could not be residually finite. Ol’shanskii and Sapir built a finitely presented ascending HNN extension of an infinite group of bounded exponent, which is not itself a torsion group.'}),
 question('fp_simple_amenable','fp simple amenable !finite','Is there an infinite finitely presented simple amenable group?','open',{
  posed:{date:'2013',by:'Juschenko–Monod',source:'juschenkoMonod2013'},
  source:'zaremskyQuestions',sourceDate:'2026-07-12',sources:['juschenkoMonod2013','juschenkoProblems'],
  note:'Finite cyclic groups of prime order do not answer the infinite-group question. Juschenko and Monod name this as the next problem after their finitely generated examples, which are never finitely presented (Matui, Theorem 5.7); Juschenko’s problem list conjectures that such a group exists.'}),
 question('finfty_amenable','finfty amenable !ea','Is there an amenable group of type F∞ that is not elementary amenable?','open',{
  source:'zaremskyQuestions',sourceDate:'2026-07-12',
  note:'Type F∞ is stronger than finite presentation. Zaremsky lists this as problem 12. Grigorchuk’s finitely presented example (answered below) shows that finite presentation alone does not suffice.'}),
 question('fp_sofic_kazhdan','fp sofic t !rf','Is there a finitely presented sofic group with property (T) that is not residually finite?','open',{
  source:'alekseevThom2026',sourceDate:'2026-08-05',
  note:'Open problem 6.1. Thom’s LEF example is not finitely presented; all four requirements matter.'}),
 question('fp_divisible','fp divisible !trivial','Is there a nontrivial finitely presented divisible group?','open',{
  posed:{date:null,by:'folklore; Sapir, Problem 1.1, type (5)',source:'sapirProblems'},
  source:'sapirProblems',sourceDate:'2007-04-22',
  note:'Listed among Sapir’s finitely presented monsters as “complete” groups. No later solution was located for this assessment. Guba’s finitely generated example is recorded below.'}),
 question('amenable_exponent','fg amenable exponent !finite','Is there an infinite finitely generated amenable group of bounded exponent?','open',{
  posed:{date:null,by:'Grigorchuk, as recorded in Juschenko’s Question C.6; also Sapir (2007)',source:'juschenkoProblems'},
  source:'nekrashevych2016',sourceDate:'2016-01-06',sources:['sapirProblems','juschenkoProblems'],
  note:'Free Burnside groups of large odd exponent are non-amenable (Adian), and Nekrashevych records in 2016 that every known infinite finitely generated group of bounded exponent is non-amenable. The same question with simplicity added is asked alongside it; a simple example would answer both.'}),
 // Formerly open, now answered by a catalog witness.
 question('fg_torsion','fg torsion !finite','Is there an infinite finitely generated torsion group?','solved',{
  posed:{date:'1902',by:'Burnside',source:'burnsideHistory'},
  resolved:{date:'1964',by:'Golod–Shafarevich',source:'golod1964',witness:'grigorchuk'},
  note:'The general Burnside problem. Golod’s 1964 groups are not in this catalog; the recorded witness is Grigorchuk’s 1980 group.'}),
 question('fg_exponent','fg exponent !finite','Is there an infinite finitely generated group of bounded exponent?','solved',{
  posed:{date:'1902',by:'Burnside',source:'burnsideHistory'},
  resolved:{date:'1968',by:'Novikov–Adian',source:'novikovAdian1968',witness:'burnside'},
  note:'The Burnside problem for bounded exponent. The free Burnside groups B(m, n) are infinite for odd n ≥ 4381 (1968) and, by Adian’s later work, for odd n ≥ 665. Whether B(2, 5) is infinite is still unknown.'}),
 question('intermediate_growth','intermediate','Is there a finitely generated group of intermediate growth?','solved',{
  posed:{date:'1968',by:'Milnor, Problem 5603',source:'milnor1968'},
  resolved:{date:'1984',by:'Grigorchuk',source:'grigorchuk1984',witness:'grigorchuk'},
  note:'Announced in 1983; the detailed proof was published in 1984.'}),
 question('amenable_not_ea','amenable !ea','Is there an amenable group that is not elementary amenable?','solved',{
  posed:{date:'1957',by:'Day',source:'day1957'},
  resolved:{date:'1984',by:'Grigorchuk',source:'grigorchuk1984',witness:'grigorchuk'},
  note:'Day’s question. Groups of intermediate growth are amenable and not elementary amenable.'}),
 question('fp_amenable_not_ea','fp amenable !ea','Is there a finitely presented amenable group that is not elementary amenable?','solved',{
  resolved:{date:'1998',by:'Grigorchuk',source:'grigorchuk98',witness:'grigorchuk98'},
  note:'Finite presentability alone does not force elementary amenability; compare the type F∞ question that remains open above.'}),
 question('nonamenable_no_free','!amenable !f2','Is there a non-amenable group without a free subgroup of rank two?','solved',{
  posed:{date:'1957',by:'Day, after von Neumann',source:'day1957'},
  resolved:{date:'1980',by:'Ol’shanskii',source:'olshanskii1980',witness:'burnside'},
  note:'The von Neumann–Day problem. Ol’shanskii’s Tarski monsters (1980) were the first counterexamples and are not in this catalog; Adian proved in 1982 that free Burnside groups of large odd exponent are non-amenable, and that is the recorded witness.'}),
 question('fp_nonamenable_no_free','fp !amenable !f2','Is there a finitely presented non-amenable group without a free subgroup of rank two?','solved',{
  posed:{date:null,by:'folklore; Sapir, Problem 1.1, type (1)',source:'sapirProblems'},
  resolved:{date:'2002-08-30',by:'Ol’shanskii–Sapir',source:'olshanskiiSapir2002',witness:'olshanskiiSapir'},
  note:'The finitely presented von Neumann–Day problem.'}),
 question('fg_simple_amenable','fg simple amenable !finite','Is there an infinite finitely generated simple amenable group?','solved',{
  resolved:{date:'2012-04',by:'Juschenko–Monod',source:'juschenkoMonod2012',witness:'juschenkoMonod'},
  note:'The commutator subgroup of the topological full group of a minimal subshift: simple and finitely generated by Matui, amenable by Juschenko and Monod.'}),
 question('simple_intermediate','simple intermediate','Is there a simple group of intermediate growth?','solved',{
  resolved:{date:'2016-01-06',by:'Nekrashevych',source:'nekrashevych2016',witness:'nekrashevych'},
  note:'The catalog witness is Nekrashevych’s 2020 construction containing the first Grigorchuk group; the first examples are in the 2016 paper.'}),
 question('torsion_rf','fg torsion rf !finite','Is there an infinite finitely generated residually finite torsion group?','solved',{
  posed:{date:'1902',by:'Burnside',source:'burnsideHistory'},
  resolved:{date:'1964',by:'Golod',source:'golod1964',witness:'grigorchuk'},
  note:'Golod’s groups are residually finite p-groups by construction. The recorded witness is Grigorchuk’s group.'}),
 question('torsion_rf_kazhdan','torsion rf t !finite','Is there an infinite residually finite torsion group with property (T)?','solved',{
  posed:{date:null,by:'de la Harpe asked for residually finite torsion non-amenable groups',source:'ershov2008'},
  resolved:{date:'2008',by:'Ershov',source:'ershov2008',witness:'ershov'},
  note:'Proposition 8.4 of the cited paper; its Corollary 8.5 answers de la Harpe’s question.'}),
 question('fg_divisible','fg divisible !trivial','Is there a nontrivial finitely generated divisible group?','solved',{
  resolved:{date:'1986',by:'Guba',source:'guba1986',witness:'guba'},
  note:'A two-generated example with unique extraction of roots. The finitely presented version remains open above.'}),
 question('fp_nonhopfian_kazhdan','fp !hopfian t','Is there a finitely presented non-Hopfian group with property (T)?','solved',{
  posed:{date:null,by:'Ollivier–Wise',source:'cornulier2007'},
  resolved:{date:'2005-02',by:'de Cornulier',source:'cornulier2007',witness:'cornulier'},
  note:'Such a group is not residually finite by Mal’cev’s theorem, so it also shows that property (T) does not force residual finiteness.'}),
 question('nonsofic','!sofic','Is there a non-sofic group?','solved',{
  posed:{date:'1999',by:'Gromov; the term is due to Weiss',source:'approximation'},
  resolved:{date:'2026-08-01',by:'OpenAI',source:'openaiAnnouncement',witness:'openai'},
  note:'Open from Gromov’s 1999 paper until OpenAI’s announcement. Non-soficity decides nothing here about hyperlinearity or the MF property.'}),
 question('fp_nonsofic','fp !sofic','Is there a finitely presented non-sofic group?','solved',{
  resolved:{date:'2026-08-02',by:'OpenAI (Lean certificate); Fournier-Facio’s remark and construction',source:'openaiLean',witness:'openaiFP'},
  note:'Soficity is closed in the space of marked groups and passes to subgroups, so a non-sofic group has a finitely presented non-sofic truncation. OpenAI’s Lean file proves this passage; Fournier-Facio states it in print and gives an explicit finitely presented example.'}),
 question('tf_nonsofic','tf !sofic','Is there a torsion-free non-sofic group?','solved',{
  resolved:{date:'2026-08-03',by:'Fournier-Facio',source:'ff2026',witness:'fournier_facio'},
  note:'A preprint of August 2026 relying on OpenAI’s criterion. The unit group of a Leavitt algebra always has torsion.'}),
 // Excluded by theorems recorded as rules.
 question('simple_rf','simple rf !finite','Is there an infinite simple residually finite group?','impossible',{
  obstruction:{source:'elementary'},
  note:'A finite quotient separating a nonidentity element has a proper normal kernel, which simplicity forces to be trivial.'}),
 question('rf_exponent','fg rf exponent !finite','Is there an infinite finitely generated residually finite group of bounded exponent?','impossible',{
  obstruction:{source:'zelmanov1991'},
  note:'Zel’manov’s positive solution of the restricted Burnside problem. Finitely generated infinite groups of bounded exponent exist, and finitely presented ones would have to fail residual finiteness.'}),
 question('amenable_kazhdan','amenable t !finite','Is there an infinite amenable group with property (T)?','impossible',{
  obstruction:{source:'kazhdan'},
  note:'Amenable groups have the Haagerup property, and a discrete group with both property (T) and the Haagerup property is finite.'}),
 question('rf_nonhopfian','fg rf !hopfian','Is there a finitely generated residually finite non-Hopfian group?','impossible',{
  obstruction:{source:'robinson'},
  note:'Mal’cev’s theorem. Finitely presented non-Hopfian groups exist, for instance de Cornulier’s Kazhdan example above.'}),
 question('subexp_nonamenable','subexp !amenable','Is there a finitely generated group of subexponential growth that is not amenable?','impossible',{
  obstruction:{source:'growth'},
  note:'Balls of subexponential growth contain Følner sets.'}),
 question('amenable_free','amenable f2','Is there an amenable group containing a free subgroup of rank two?','impossible',{
  obstruction:{source:'neumann1929'},
  note:'Amenability passes to subgroups and the free group of rank two is not amenable. This is what made the converse, the von Neumann–Day problem above, interesting.'})
];
export const openQuestions=questions.filter(q=>q.status==='open');

const expectedStatus={unresolved:'open',exists:'solved',impossible:'impossible'};
const closures=questions.map(question=>({question,facts:propagate(question.requirements).facts,key:[...new Set(question.requirements)].sort().join(',')}));
const cache=new Map();
// A query names a recorded question only when the two are equivalent under the
// map's implications: a stronger unsolved query is not automatically the same
// open problem. This also handles repeated diagonals and filters. Contradictory
// queries have no closure to compare, so excluded questions match exactly.
export function namedQuestion(query){
 const normalized=[...new Set(query)].sort(),key=normalized.join(',');
 if(cache.has(key))return cache.get(key);
 const result=classify(normalized),status=expectedStatus[result.status];
 const match=closures.find(({question,facts,key:questionKey})=>question.status===status&&(status==='impossible'?questionKey===key:
  question.requirements.every(lit=>result.closure.facts.has(lit))&&normalized.every(lit=>facts.has(lit))))?.question;
 cache.set(key,match);
 return match;
}
export function openQuestion(query){
 const match=namedQuestion(query);
 return match?.status==='open'?match:undefined;
}
