// A dated literature assessment of named existence questions about countable
// discrete groups: "is there a group with exactly these properties?"
// Each entry names the exact signed literals it concerns. The atlas decides the
// mathematical status of that conjunction from its own witnesses and rules, and
// the tests require the recorded status to agree: an open entry has neither a
// witness nor an obstruction here, a solved entry names its catalog witness,
// and an impossible entry follows from the recorded rules. "Open" records that
// the cited sources state the question as unresolved on the assessment date;
// it is not a proof of openness, and it is never inferred from a gap in the grid.
const question=(id,literals,text,status,fields)=>({id,literals:literals.split(' '),question:text,status,assessed:'2026-09-09',...fields});
export const questions=[
 // Still open.
 question('fp-torsion','fp torsion !finite','Is there an infinite finitely presented torsion group?','open',{
  posed:{date:null,by:'folklore; Sapir attributes the torsion form to Kurosh',source:'sapirProblems'},
  sources:['sapirProblems'],
  note:'Sapir’s Problem 1.1 asks for finitely presented monsters, and he records that infinite finitely presented torsion groups are not known even without bounded exponent. Finitely generated examples exist: Golod–Shafarevich and Grigorchuk.'}),
 question('fp-exponent','fp exponent !finite','Is there an infinite finitely presented group of bounded exponent?','open',{
  posed:{date:null,by:'folklore; Sapir, Problem 1.1, type (2)',source:'sapirProblems'},
  sources:['sapirProblems'],
  note:'Stronger than the torsion question. By Zel’manov’s theorem (below) an example could not be residually finite. Ol’shanskii and Sapir built a finitely presented ascending HNN extension of an infinite group of bounded exponent, which is not itself a torsion group.'}),
 question('fp-intermediate','fp intermediate','Can a finitely presented group have intermediate growth?','open',{
  posed:{date:'1968',by:'Milnor asked for intermediate growth; the finitely presented case is Sapir’s Problem 1.1, type (7)',source:'milnor1968'},
  sources:['growthQuestion','sapirProblems','juschenkoProblems'],
  note:'A longstanding open question on group growth, stated as open in the cited 2025 paper. Every known group of intermediate growth is infinitely presented; Juschenko’s Conjecture C.2 predicts a finitely presented one.'}),
 question('fp-simple-amenable','fp simple amenable !finite','Is there an infinite finitely presented simple amenable group?','open',{
  posed:{date:'2013',by:'Juschenko–Monod',source:'juschenkoMonod2013'},
  sources:['juschenkoMonod2013','juschenkoProblems'],
  note:'Juschenko and Monod name this as the next problem after their finitely generated examples, which are never finitely presented (Matui, Theorem 5.7); Juschenko’s problem list conjectures that such a group exists.'}),
 question('hyperbolic-not-rf','hyp !rf','Is every hyperbolic group residually finite?','open',{
  posed:{date:'1987',by:'Gromov',source:'hyperbolicQuestion'},
  sources:['hyperbolicQuestion'],
  note:'This cell asks for a counterexample to Gromov’s residual-finiteness question, stated as open in the cited 2025 paper.'}),
 question('fp-divisible','fp divisible !trivial','Is there a nontrivial finitely presented divisible group?','open',{
  posed:{date:null,by:'folklore; Sapir, Problem 1.1, type (5)',source:'sapirProblems'},
  sources:['sapirProblems'],
  note:'Listed among Sapir’s finitely presented monsters as “complete” groups. No later solution was located for this assessment. Guba’s finitely generated example is recorded below.'}),
 question('amenable-exponent','fg amenable exponent !finite','Is there an infinite finitely generated amenable group of bounded exponent?','open',{
  posed:{date:null,by:'Grigorchuk, as recorded in Juschenko’s Question C.6; also Sapir (2007)',source:'juschenkoProblems'},
  sources:['sapirProblems','nekrashevych2016','juschenkoProblems'],
  note:'Free Burnside groups of large odd exponent are non-amenable (Adian), and Nekrashevych records in 2016 that every known infinite finitely generated group of bounded exponent is non-amenable. The same question with simplicity added is asked alongside it; a simple example would answer both.'}),
 // Formerly open, now answered by a catalog witness.
 question('fg-torsion','fg torsion !finite','Is there an infinite finitely generated torsion group?','solved',{
  posed:{date:'1902',by:'Burnside',source:'burnsideHistory'},
  resolved:{date:'1964',by:'Golod–Shafarevich',source:'golod1964',witness:'grigorchuk'},
  note:'The general Burnside problem. Golod’s 1964 groups are not in this catalog; the recorded witness is Grigorchuk’s 1980 group.'}),
 question('fg-exponent','fg exponent !finite','Is there an infinite finitely generated group of bounded exponent?','solved',{
  posed:{date:'1902',by:'Burnside',source:'burnsideHistory'},
  resolved:{date:'1968',by:'Novikov–Adian',source:'novikovAdian1968',witness:'burnside'},
  note:'The Burnside problem for bounded exponent. The free Burnside groups B(m, n) are infinite for odd n ≥ 4381 (1968) and, by Adian’s later work, for odd n ≥ 665. Whether B(2, 5) is infinite is still unknown.'}),
 question('intermediate-growth','intermediate','Is there a finitely generated group of intermediate growth?','solved',{
  posed:{date:'1968',by:'Milnor, Problem 5603',source:'milnor1968'},
  resolved:{date:'1984',by:'Grigorchuk',source:'grigorchuk1984',witness:'grigorchuk'},
  note:'Announced in 1983; the detailed proof was published in 1984.'}),
 question('amenable-not-ea','amenable !ea','Is there an amenable group that is not elementary amenable?','solved',{
  posed:{date:'1957',by:'Day',source:'day1957'},
  resolved:{date:'1984',by:'Grigorchuk',source:'grigorchuk1984',witness:'grigorchuk'},
  note:'Day’s question. Groups of intermediate growth are amenable and not elementary amenable.'}),
 question('fp-amenable-not-ea','fp amenable !ea','Is there a finitely presented amenable group that is not elementary amenable?','solved',{
  resolved:{date:'1998',by:'Grigorchuk',source:'grigorchuk98',witness:'grigorchuk98'},
  note:'Finite presentability alone does not force elementary amenability; compare the finitely presented questions that remain open above.'}),
 question('nonamenable-no-free','!amenable !f2','Is there a non-amenable group without a free subgroup of rank two?','solved',{
  posed:{date:'1957',by:'Day, after von Neumann',source:'day1957'},
  resolved:{date:'1980',by:'Ol’shanskii',source:'olshanskii1980',witness:'burnside'},
  note:'The von Neumann–Day problem. Ol’shanskii’s Tarski monsters (1980) were the first counterexamples and are not in this catalog; Adian proved in 1982 that free Burnside groups of large odd exponent are non-amenable, and that is the recorded witness.'}),
 question('fp-nonamenable-no-free','fp !amenable !f2','Is there a finitely presented non-amenable group without a free subgroup of rank two?','solved',{
  posed:{date:null,by:'folklore; Sapir, Problem 1.1, type (1)',source:'sapirProblems'},
  resolved:{date:'2002-08-30',by:'Ol’shanskii–Sapir',source:'olshanskiiSapir2002',witness:'olshanskiiSapir'},
  note:'The finitely presented von Neumann–Day problem.'}),
 question('fg-simple-amenable','fg simple amenable !finite','Is there an infinite finitely generated simple amenable group?','solved',{
  resolved:{date:'2012-04',by:'Juschenko–Monod',source:'juschenkoMonod2012',witness:'juschenkoMonod'},
  note:'The commutator subgroup of the topological full group of a minimal subshift: simple and finitely generated by Matui, amenable by Juschenko and Monod.'}),
 question('simple-intermediate','simple intermediate','Is there a simple group of intermediate growth?','solved',{
  resolved:{date:'2016-01-06',by:'Nekrashevych',source:'nekrashevych2016',witness:'nekrashevych'},
  note:'The catalog witness is Nekrashevych’s 2020 construction containing the first Grigorchuk group; the first examples are in the 2016 paper.'}),
 question('torsion-rf','fg torsion rf !finite','Is there an infinite finitely generated residually finite torsion group?','solved',{
  posed:{date:'1902',by:'Burnside',source:'burnsideHistory'},
  resolved:{date:'1964',by:'Golod',source:'golod1964',witness:'grigorchuk'},
  note:'Golod’s groups are residually finite p-groups by construction. The recorded witness is Grigorchuk’s group.'}),
 question('torsion-rf-kazhdan','torsion rf t !finite','Is there an infinite residually finite torsion group with property (T)?','solved',{
  posed:{date:null,by:'de la Harpe asked for residually finite torsion non-amenable groups',source:'ershov2008'},
  resolved:{date:'2008',by:'Ershov',source:'ershov2008',witness:'ershov'},
  note:'Proposition 8.4 of the cited paper; its Corollary 8.5 answers de la Harpe’s question.'}),
 question('fg-divisible','fg divisible !trivial','Is there a nontrivial finitely generated divisible group?','solved',{
  resolved:{date:'1986',by:'Guba',source:'guba1986',witness:'guba'},
  note:'A two-generated example with unique extraction of roots. The finitely presented version remains open above.'}),
 question('fp-nonhopfian-kazhdan','fp !hopfian t','Is there a finitely presented non-Hopfian group with property (T)?','solved',{
  posed:{date:null,by:'Ollivier–Wise',source:'cornulier2007'},
  resolved:{date:'2005-02',by:'de Cornulier',source:'cornulier2007',witness:'cornulier'},
  note:'Such a group is not residually finite by Mal’cev’s theorem, so it also shows that property (T) does not force residual finiteness.'}),
 question('nonsofic','!sofic','Is there a non-sofic group?','solved',{
  posed:{date:'1999',by:'Gromov; the term is due to Weiss',source:'approximation'},
  resolved:{date:'2026-08-01',by:'OpenAI',source:'openaiAnnouncement',witness:'openai'},
  note:'Open from Gromov’s 1999 paper until OpenAI’s announcement. Non-soficity decides nothing here about hyperlinearity or the MF property.'}),
 question('fp-nonsofic','fp !sofic','Is there a finitely presented non-sofic group?','solved',{
  resolved:{date:'2026-08-02',by:'OpenAI (Lean certificate); Fournier-Facio’s remark',source:'openaiLean',witness:'openaiFP'},
  note:'Soficity is closed in the space of marked groups and passes to subgroups, so a non-sofic group has a finitely presented non-sofic truncation. OpenAI’s Lean file proves this passage; Fournier-Facio states it in print.'}),
 question('tf-nonsofic','tf !sofic','Is there a torsion-free non-sofic group?','solved',{
  resolved:{date:'2026-08-03',by:'Fournier-Facio',source:'fournierFacio2026',witness:'fournierFacio'},
  note:'A preprint of August 2026 relying on OpenAI’s criterion. The unit group of a Leavitt algebra always has torsion.'}),
 // Excluded by theorems recorded as rules.
 question('simple-rf','simple rf !finite','Is there an infinite simple residually finite group?','impossible',{
  obstruction:{source:'elementary'},
  note:'A finite quotient separating a nonidentity element has a proper normal kernel, which simplicity forces to be trivial.'}),
 question('rf-exponent','fg rf exponent !finite','Is there an infinite finitely generated residually finite group of bounded exponent?','impossible',{
  obstruction:{source:'zelmanov1991'},
  note:'Zel’manov’s positive solution of the restricted Burnside problem. Finitely generated infinite groups of bounded exponent exist, and finitely presented ones would have to fail residual finiteness.'}),
 question('amenable-kazhdan','amenable t !finite','Is there an infinite amenable group with property (T)?','impossible',{
  obstruction:{source:'kazhdan'},
  note:'Amenable groups have the Haagerup property, and a discrete group with both property (T) and the Haagerup property is finite.'}),
 question('rf-nonhopfian','fg rf !hopfian','Is there a finitely generated residually finite non-Hopfian group?','impossible',{
  obstruction:{source:'robinson'},
  note:'Mal’cev’s theorem. Finitely presented non-Hopfian groups exist, for instance de Cornulier’s Kazhdan example above.'}),
 question('subexp-nonamenable','subexp !amenable','Is there a finitely generated group of subexponential growth that is not amenable?','impossible',{
  obstruction:{source:'growth'},
  note:'Balls of subexponential growth contain Følner sets.'}),
 question('amenable-free','amenable f2','Is there an amenable group containing a free subgroup of rank two?','impossible',{
  obstruction:{source:'neumann1929'},
  note:'Amenability passes to subgroups and the free group of rank two is not amenable. This is what made the converse, the von Neumann–Day problem above, interesting.'})
];
