// All statements concern countable discrete groups. Missing facts are unknown.
export const sources = {
 openaiNonsofic:{title:'OpenAI — Nonsofic groups exist, Ten Advances, Chapter 3 (1 August 2026, original manuscript)',url:'https://cdn.openai.com/pdf/ten-proofs-oai-original.pdf'},
 openaiAnnouncement:{title:'OpenAI — Ten advances in mathematics and theoretical computer science (1 August 2026)',url:'https://openai.com/index/ten-advances-in-mathematics/'},
 growthQuestion:{title:'Babenko–Sabourau — Minimal volume entropy and fiber growth (2025), §2.8',url:'https://jep.centre-mersenne.org/item/10.5802/jep.295.pdf'},
 hyperbolicQuestion:{title:'Schesler — Finitely generated infinite torsion groups that are residually finite simple (2025), Introduction',url:'https://doi.org/10.1016/j.aim.2025.110441'},
 openaiLean:{title:'OpenAI — ten-proofs, NonSoficGroup.lean: exists_finitelyPresented_nonsofic_group (Lean 4 certificate, committed 2 August 2026)',url:'https://github.com/openai/ten-proofs/blob/main/NonSoficGroup.lean'},
 fournierFacio2026:{title:'Fournier-Facio — A torsion-free non-sofic group (arXiv:2608.02025, 3 August 2026; revised 14 August 2026)',url:'https://arxiv.org/abs/2608.02025'},
 sapirProblems:{title:'Sapir — Some group theory problems (2007), Problems 1.1 and 1.2',url:'https://arxiv.org/abs/0704.2899'},
 juschenkoProblems:{title:'Juschenko — Amenability of discrete groups by examples (2017 lecture notes), Appendix C: conjectures and open problems',url:'https://metaphor.ethz.ch/x/2017/hs/401-3370-67L/sc/Juschenko.pdf'},
 milnor1968:{title:'Grigorchuk — Milnor’s problem on the growth of groups and its consequences (2011 survey; Milnor, Problem 5603, Amer. Math. Monthly 75 (1968))',url:'https://arxiv.org/abs/1111.0512'},
 burnsideHistory:{title:'MacTutor History of Mathematics — A history of the Burnside problem',url:'https://mathshistory.st-andrews.ac.uk/HistTopics/Burnside_problem/'},
 golod1964:{title:'Golod — On nil-algebras and finitely approximable p-groups (1964)',url:'https://www.mathnet.ru/php/archive.phtml?wshow=paper&jrnid=im&paperid=2956&option_lang=eng'},
 novikovAdian1968:{title:'Novikov–Adian — Infinite periodic groups. I (1968)',url:'https://www.mathnet.ru/php/archive.phtml?wshow=paper&jrnid=im&paperid=2699&option_lang=eng'},
 adian1982:{title:'Adian — Random walks on free periodic groups (1982)',url:'https://www.mathnet.ru/php/archive.phtml?wshow=paper&jrnid=im&paperid=1699&option_lang=eng'},
 zelmanov1990:{title:'Zel’manov — Solution of the restricted Burnside problem for groups of odd exponent (1990; translation 1991)',url:'https://iopscience.iop.org/article/10.1070/IM1991v036n01ABEH001946'},
 zelmanov1991:{title:'Zel’manov — A solution of the restricted Burnside problem for 2-groups (1991)',url:'https://www.mathnet.ru/eng/sm1311'},
 day1957:{title:'Day — Amenable semigroups (1957)',url:'https://doi.org/10.1215/ijm/1255380675'},
 olshanskii1980:{title:'Ol’shanskii — On the problem of the existence of an invariant mean on a group (1980)',url:'https://www.mathnet.ru/eng/rm3788'},
 olshanskiiSapir2002:{title:'Ol’shanskii–Sapir — Non-amenable finitely presented torsion-by-cyclic groups (arXiv, 30 August 2002)',url:'https://arxiv.org/abs/math/0208237'},
 olshanskiiSapir2003:{title:'Ol’shanskii–Sapir — Non-amenable finitely presented torsion-by-cyclic groups, Publ. Math. IHÉS 96 (2003)',url:'https://numdam.org/item/PMIHES_2003__96__43_0.pdf'},
 matui2006:{title:'Matui — Some remarks on topological full groups of Cantor minimal systems (April 2004 preprint; Internat. J. Math. 17 (2006))',url:'https://arxiv.org/abs/math/0404117'},
 juschenkoMonod2012:{title:'Juschenko–Monod — Cantor systems, piecewise translations and simple amenable groups (arXiv, April 2012)',url:'https://arxiv.org/abs/1204.2132'},
 juschenkoMonod2013:{title:'Juschenko–Monod — Cantor systems, piecewise translations and simple amenable groups, Ann. of Math. 178 (2013)',url:'https://doi.org/10.4007/annals.2013.178.2.7'},
 ershov2008:{title:'Ershov — Golod–Shafarevich groups with property (T) and Kac–Moody groups, Duke Math. J. 145 (2008)',url:'https://doi.org/10.1215/00127094-2008-053'},
 guba1986:{title:'Guba — A finitely generated complete group (1986; translation 1987)',url:'https://www.mathnet.ru/eng/im1540'},
 cornulier2007:{title:'de Cornulier — Finitely presentable, non-Hopfian groups with Kazhdan’s Property (T) and infinite outer automorphism group (February 2005 preprint; Proc. Amer. Math. Soc. 135 (2007))',url:'https://arxiv.org/abs/math/0502140'},
 bdh1980:{title:'Baumslag–Dyer–Heller — The topology of discrete groups (1980)',url:'https://doi.org/10.1016/0022-4049(80)90040-7'},
 cde2012:{title:'Carrión–Dadarlat–Eckhardt — On groups with quasidiagonal C*-algebras (2012)',url:'https://arxiv.org/abs/1210.4050v1'},
 tww2015:{title:'Tikuisis–White–Winter — Quasidiagonality of nuclear C*-algebras (2015)',url:'https://arxiv.org/abs/1509.08318v1'},
 elek2004:{title:'Elek–Szabó — Hyperlinearity and the sofic property (2004 preprint; 2005 publication)',url:'https://arxiv.org/abs/math/0408400'},
 vershik1997:{title:'Vershik–Gordon — Groups locally embeddable in finite groups (1997)',url:'https://www.mathnet.ru/eng/aa751'},
 gromov1981:{title:'Gromov — Groups of polynomial growth and expanding maps (1981)',url:'https://numdam.org/item/PMIHES_1981__53__53_0/'},
 neumann1929:{title:'von Neumann — Zur allgemeinen Theorie des Masses (1929)',url:'https://eudml.org/doc/211921'},
 powers1975:{title:'Powers — Simplicity of the C*-algebra of the free group on two generators (1975)',url:'https://doi.org/10.1215/S0012-7094-75-04213-1'},
 haagerup1979:{title:'Haagerup — An example of a non nuclear C*-algebra (1979)',url:'https://eudml.org/doc/142617'},
 palomar:{title:'Sauers — PALOMAR-2026-08-24-000006 v1',url:'https://palomar-registry.org/entry?id=PALOMAR-2026-08-24-000006&version=1'},
 hamilton:{title:'Hamilton — On Quaternions; original communication in 1843',url:'https://www.maths.tcd.ie/pub/HistMath/People/Hamilton/Quatern2/Quatern2.html'},
 dyck1882:{title:'Dyck — Gruppentheoretische Studien (1882)',url:'https://eudml.org/doc/157013'},
 prufer1923:{title:'Prüfer — Untersuchungen über die Zerlegbarkeit… (1923)',url:'https://eudml.org/doc/167727'},
 grigorchuk1980:{title:'Grigorchuk — Burnside problem on periodic groups (1980)',url:'https://www.mathnet.ru/eng/faa1772'},
 grigorchuk1983:{title:'Grigorchuk — On the Milnor problem of group growth (1983)',url:'https://www.mathnet.ru/eng/dan10037'},
 grigorchuk1984:{title:'Grigorchuk — Degrees of growth and invariant means (1984)',url:'https://www.mathnet.ru/eng/im1503'},
 higman1951:{title:'Higman — A Finitely Generated Infinite Simple Group (1951)',url:'https://doi.org/10.1112/jlms/s1-26.1.61'},
 kazhdan1967:{title:'Kazhdan — Connection of the dual space… (1967)',url:'https://www.mathnet.ru/eng/faa2807'},
 baumslag1961:{title:'Baumslag — Wreath products and finitely presented groups (1961)',url:'https://doi.org/10.1007/BF01211007'},
 erschler2002:{title:'Erschler — IHÉS/M/02/32 (May 2002)',url:'https://cds.cern.ch/record/589859/files/CM-P00040315.pdf'},
 nekrashevych2016:{title:'Nekrashevych — Palindromic subshifts… (6 January 2016)',url:'https://arxiv.org/abs/1601.01033v1'},
 nekrashevych2020:{title:'Nekrashevych — Substitutional subshifts… (11 August 2020)',url:'https://arxiv.org/abs/2008.04983v1'},
 brown1984:{title:'Brown & Geoghegan — An infinite-dimensional torsion-free FP∞ group (1984)',url:'https://eudml.org/doc/143150'},
 elementary: {title:'Elementary proofs', note:'Proofs are written on the individual rule or example; no external theorem is required.'},
 robinson: {title:'Robinson — A Course in the Theory of Groups', url:'https://doi.org/10.1007/978-1-4419-8594-1'},
 ggt: {title:'Bowditch — A course on geometric group theory', url:'https://www.math.unl.edu/~jkettinger2/ggt.pdf'},
 approximation: {title:'Pestov — Hyperlinear and sofic groups: a brief guide', url:'https://arxiv.org/abs/0804.3968'},
 lef: {title:'Bradford — Controlling LEF growth in some group extensions', url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC12945987/'},
 mf: {title:'Korchagin — MF-property for countable discrete groups', url:'https://arxiv.org/abs/1704.06906'},
 kazhdan: {title:'Bekka, de la Harpe, Valette — Kazhdan’s Property (T)', url:'https://metaphor.ethz.ch/x/2017/hs/401-3370-67L/sc/Bekka.pdf'},
 growth: {title:'Grigorchuk & Pak — Groups of Intermediate Growth', url:'https://arxiv.org/abs/math/0607384'},
 orders: {title:'Chouraqui — Left orders in Garside groups', url:'https://arxiv.org/abs/1507.08106'},
 finiteness: {title:'Patil — Finiteness properties and relatively hyperbolic groups', url:'https://arxiv.org/abs/2308.08353'},
 cstar: {title:'Breuillard, Kalantar, Kennedy, Ozawa — C*-simplicity and the unique trace property', url:'https://arxiv.org/abs/1410.2518'},
 higman: {title:'Leary — Higman’s group, Theorem 8 and Corollary 9', url:'https://math.osu.edu/sites/math.osu.edu/files/2005-3-preprint.pdf'},
 nekrashevych: {title:'Nekrashevych — Substitutional subshifts and growth of groups', url:'https://ems.press/content/serial-article-files/51167'},
 erschler: {title:'Erschler — Not residually finite groups of intermediate growth', url:'https://doi.org/10.1016/j.jalgebra.2002.11.005'},
 grigorchuk98: {title:'Grigorchuk — A finitely presented amenable group outside EG', url:'https://m.mathnet.ru/eng/sm293'},
 thompson: {title:'Cannon, Floyd, Parry — Introductory notes on Richard Thompson’s groups', url:'https://doi.org/10.5169/seals-41728'},
 free: {title:'Lyndon & Schupp — Combinatorial Group Theory', url:'https://doi.org/10.1007/978-3-642-61896-3'}
};
const p = (id, name, definition, source) => ({id,name,definition,source});
export const properties = [
 p('trivial','Trivial','Has exactly one element.','elementary'),
 p('finite','Finite','Has finitely many elements.','elementary'),
 p('fg','Finitely generated','Some finite subset generates the whole group.','elementary'),
 p('fp','Finitely presented','Has a presentation with finitely many generators and relators.','ggt'),
 p('finfty','Type F∞','Has a classifying space with finitely many cells in each dimension.','finiteness'),
 p('fp2','Type FP₂(ℤ)','The trivial ℤG-module ℤ has a projective resolution finitely generated through degree 2.','finiteness'),
 p('finite_cd','Finite cd over ℤ','Has finite integral cohomological dimension.','ggt'),
 p('cyclic','Cyclic','Generated by one element, allowing the trivial group.','elementary'),
 p('abelian','Abelian','Every two elements commute.','elementary'),
 p('nilpotent','Nilpotent','The lower central series reaches the trivial subgroup in finitely many steps.','robinson'),
 p('solvable','Solvable','The derived series reaches the trivial subgroup in finitely many steps.','robinson'),
 p('polycyclic','Polycyclic','Has a finite subnormal series with cyclic factors.','robinson'),
 p('vabelian','Virtually abelian','Has an abelian subgroup of finite index.','robinson'),
 p('vnilpotent','Virtually nilpotent','Has a nilpotent subgroup of finite index.','robinson'),
 p('perfect','Perfect','Equals its commutator subgroup.','elementary'),
 p('simple','Simple','Nontrivial, with no proper nontrivial normal subgroup.','elementary'),
 p('centerless','Centerless','Its center consists only of the identity.','elementary'),
 p('acyclic','Acyclic over ℤ','All positive-degree integral group homology vanishes.','higman'),
 p('torsion','Torsion','Every element has finite order. This is stronger than merely having torsion.','robinson'),
 p('tf','Torsion-free','The identity is the only element of finite order.','elementary'),
 p('exponent','Bounded exponent','There is a positive integer n with gⁿ = 1 for every g.','robinson'),
 p('locfinite','Locally finite','Every finitely generated subgroup is finite.','robinson'),
 p('divisible','Divisible','For every g and positive n there is an x with xⁿ = g.','robinson'),
 p('rf','Residually finite','Every nonidentity element survives in some finite quotient.','lef'),
 p('rn','Residually nilpotent','Every nonidentity element survives in some nilpotent quotient.','robinson'),
 p('rs','Residually solvable','Every nonidentity element survives in some solvable quotient.','robinson'),
 p('hopfian','Hopfian','Every surjective endomorphism is injective.','robinson'),
 p('cohopfian','Co-Hopfian','Every injective endomorphism is surjective.','robinson'),
 p('lef','LEF','Every finite subset embeds multiplicatively into a finite group.','lef'),
 p('lea','LEA','Every finite subset embeds multiplicatively into an amenable group.','approximation'),
 p('sofic','Sofic','Admits asymptotically faithful finite permutation models in normalized Hamming distance.','approximation'),
 p('hyperlinear','Hyperlinear','Admits asymptotically faithful unitary matrix models in normalized Hilbert–Schmidt distance.','approximation'),
 p('mf','MF','Embeds in the unitary group of a matrix norm ultraproduct; this is the group property, not a reduced C*-algebra assertion.','mf'),
 p('linear','Linear over ℂ','Embeds in GL(n, ℂ) for some finite n.','robinson'),
 p('amenable','Amenable','Has a left-invariant finitely additive probability measure on all subsets.','kazhdan'),
 p('ea','Elementary amenable','Belongs to the smallest class containing finite and abelian groups and closed under subgroups, quotients, extensions, and directed unions.','growth'),
 p('t','Property (T)','Every unitary representation with almost invariant vectors has a nonzero invariant vector.','kazhdan'),
 p('haagerup','Haagerup','Admits a proper affine isometric action on a Hilbert space.','kazhdan'),
 p('cstar','C*-simple','Its reduced group C*-algebra is simple.','cstar'),
 p('utrace','Unique trace','Its reduced group C*-algebra has exactly one tracial state.','cstar'),
 p('tar','Trivial amenable radical','Has no nontrivial amenable normal subgroup.','cstar'),
 p('free','Free','Is free on some finite or countable set; includes the trivial group.','free'),
 p('f2','Contains F₂','Contains a free subgroup of rank two.','free'),
 p('hyp','Hyperbolic','Is finitely generated and has a Gromov-hyperbolic Cayley graph.','ggt'),
 p('cat0','CAT(0) group','Acts properly and cocompactly by isometries on a proper geodesic CAT(0) space.','ggt'),
 p('automatic','Automatic','Has a finite generating set and a regular normal-form language with the synchronous fellow-traveller property.','ggt'),
 p('biautomatic','Biautomatic','Has an automatic structure satisfying both left and right fellow-traveller conditions.','ggt'),
 p('poly_growth','Polynomial growth','Is finitely generated and its word-metric balls have a polynomial upper bound.','growth'),
 p('subexp','Subexponential growth','Is finitely generated and its word growth is slower than every exponential.','growth'),
 p('intermediate','Intermediate growth','Is finitely generated with subexponential but not polynomial growth.','growth'),
 p('exp','Exponential growth','Is finitely generated and has exponential word growth.','growth'),
 p('word','Decidable word problem','Has a finite generating set for which equality of words is decidable.','ggt'),
 p('conjugacy','Decidable conjugacy problem','Has a finite generating set for which conjugacy of words is decidable.','ggt'),
 p('lo','Left-orderable','Has a total order invariant under left multiplication.','orders'),
 p('bo','Bi-orderable','Has a total order invariant under both left and right multiplication.','orders'),
 p('li','Locally indicable','Every nontrivial finitely generated subgroup surjects onto ℤ.','orders'),
 p('up','Unique product','For any two nonempty finite subsets A, B, some element of AB has a unique expression ab.','orders')
];
const rule = (id, when, then, reason, source) => ({id,when,then,reason,source});
export const rules = [];
const add = (a,b,reason,source='elementary') => rules.push(rule(`r${rules.length+1}`,a.split(' '),b,reason,source));
const chain = (ids,reason,source) => ids.slice(0,-1).forEach((id,i)=>add(id,ids[i+1],reason,source));
chain(['cyclic','abelian','nilpotent','solvable','ea','amenable'],'Standard inclusions of these group classes.','robinson');
add('amenable','haagerup','Every countable amenable group has the Haagerup property.','kazhdan');
chain(['finite','locfinite','torsion'],'A finitely generated subgroup of a finite group is finite; apply local finiteness to cyclic subgroups.','elementary');
add('finite','exponent','Lagrange’s theorem gives g^|G| = 1.');
add('exponent','torsion','The order of each element divides the common exponent.');
for(const id of ['fg','fp','finfty','rf','linear','t','ea','hopfian','cohopfian','vabelian','poly_growth','hyp','cat0','biautomatic','conjugacy']) add('finite',id,'Finite groups have this property. Finite groups admit finite presentations, finite-type bar constructions, faithful permutation representations, and bounded Cayley graphs.','ggt');
add('locfinite','ea','A locally finite group is a directed union of finite groups.','robinson');
add('torsion tf','trivial','Every element has finite order, so torsion-freeness forces every element to be the identity.');
add('finite divisible','trivial','If n = |G|, every nth power is the identity; divisibility then forces G = 1.');
add('trivial','finite','A singleton is finite.');
for(const id of ['cyclic','tf','perfect','centerless','divisible','free','acyclic','finite_cd','bo','tar']) add('trivial',id,'The one-element group satisfies this condition directly from its definition.');
add('simple','!trivial','Our convention requires simple groups to be nontrivial.');
add('simple !abelian','perfect','The commutator subgroup is nontrivial and normal.');
add('simple !abelian','centerless','The center is normal and cannot be the whole nonabelian group.');
add('simple rf','finite','A finite quotient separating a nonidentity element has a proper normal kernel; simplicity makes that kernel trivial.');
add('simple abelian','finite','A nontrivial element generates a nontrivial normal subgroup, so the group is cyclic; a simple cyclic group has prime order.');
add('perfect solvable','trivial','A perfect group’s derived series is constant; a solvable one’s reaches 1.');
add('centerless abelian','trivial','In an abelian group the center is the whole group.');
add('acyclic','perfect','H₁(G; ℤ) is the abelianization.','higman');
chain(['abelian','vabelian','vnilpotent'],'The group itself has index one; abelian groups are nilpotent.','elementary');
add('nilpotent','vnilpotent','The group itself is a nilpotent subgroup of index one.');
add('vnilpotent','ea','Nilpotent groups are solvable, and elementary amenability is preserved by finite extensions.','robinson');
add('polycyclic','solvable','A finite series with cyclic factors gives solvability.','robinson');
add('polycyclic','fg','Lift one generator from each cyclic factor.','robinson');
add('fg nilpotent','polycyclic','Every finitely generated nilpotent group is polycyclic.','robinson');
add('polycyclic','rf','Polycyclic groups are residually finite.','robinson');
add('polycyclic','fp','Polycyclic groups admit finite presentations.','robinson');
add('fg vnilpotent','poly_growth','Finitely generated virtually nilpotent groups have polynomial growth.','growth');
add('poly_growth','vnilpotent','Gromov’s polynomial growth theorem.','growth');
chain(['poly_growth','subexp','amenable'],'Polynomial growth is subexponential; subexponential growth yields Følner sets.','growth');
add('intermediate','subexp','This is part of the definition of intermediate growth.');
add('intermediate','!poly_growth','Intermediate growth is not polynomial growth.');
add('subexp !poly_growth','intermediate','These two conditions define intermediate growth.');
add('exp','!subexp','Exponential growth is not subexponential growth.');
add('fg !subexp','exp','Submultiplicativity of growth gives the exponential/subexponential dichotomy.','growth');
for(const id of ['poly_growth','subexp','exp','word','conjugacy','automatic','hyp','cat0']) add(id,'fg','Finite generation is part of this property’s convention.');
add('fg locfinite','finite','Apply local finiteness to the subgroup generated by a finite generating set of G.');
chain(['finfty','fp','fg'],'Type F∞ implies F₂; F₂ is finite presentability, which implies finite generation.','finiteness');
add('fp','fp2','A finite presentation supplies the first three finitely generated terms of a resolution.','finiteness');
add('fp2','fg','Type FP₂ implies FP₁, which is finite generation.','finiteness');
add('finite_cd','tf','A nontrivial finite cyclic subgroup has infinite integral cohomological dimension.','ggt');
chain(['nilpotent','rn','rs'],'Use the identity quotient, then the fact that nilpotent groups are solvable.','robinson');
add('solvable','rs','Use the identity quotient.');
chain(['rf','lef','lea','sofic','hyperlinear'],'The standard local and metric approximation inclusions.','approximation');
add('amenable','lea','A finite subset embeds into the amenable group itself.');
add('amenable','mf','Every countable amenable group is MF (Korchagin, Theorem 9, using quasidiagonality).','mf');
add('lef','mf','Local finite models give matrix models in operator norm via regular representations.','mf');
add('fp lef','rf','A local model containing all relators extends to a homomorphism of the finitely presented group.','lef');
add('fg rf','hopfian','Mal’cev’s Hopficity theorem for finitely generated residually finite groups.','robinson');
add('fg linear','rf','Mal’cev’s residual finiteness theorem for finitely generated linear groups.','robinson');
add('t','fg','Discrete groups with property (T) are finitely generated.','kazhdan');
add('t haagerup','finite','Property (T) and the Haagerup property together force compactness; a discrete compact group is finite.','kazhdan');
add('amenable','!f2','Amenability passes to subgroups, and F₂ is nonamenable.','kazhdan');
chain(['bo','li','lo','up','tf'],'Standard implications between orderability, local indicability, and unique product.','orders');
for(const id of ['tf','rf','rn','bo','haagerup','finite_cd']) add('free',id,'Free groups have this property. The assertions include free groups of countably infinite rank.','free');
add('free fg','hyp','The Cayley graph for a finite free basis is a tree.');
add('free !cyclic','f2','A free basis has at least two elements.');
chain(['hyp','biautomatic','automatic','fp'],'Hyperbolic groups are biautomatic; automatic groups are finitely presented.','ggt');
add('automatic','word','Automatic structures give an algorithm to solve the word problem.','ggt');
add('hyp','conjugacy','Hyperbolic groups have a decidable conjugacy problem.','ggt');
add('conjugacy','word','A word is the identity exactly when it is conjugate to the identity.');
add('cat0','fp','A geometric action on a proper CAT(0) space gives finite presentability.','ggt');
add('cstar','utrace','C*-simplicity implies the unique trace property.','cstar');
add('utrace','tar','The unique trace property is equivalent to triviality of the amenable radical.','cstar');
add('tar','utrace','The unique trace property is equivalent to triviality of the amenable radical.','cstar');
add('tar amenable','trivial','An amenable group is its own amenable radical.');
add('tar','centerless','The center is an abelian, hence amenable, normal subgroup.');
add('simple !amenable','tar','Any amenable normal subgroup would have to be trivial or the entire group.');
add('fg rf exponent','finite','Zel’manov’s positive solution of the restricted Burnside problem, with the Hall–Higman reduction and the classification of finite simple groups, bounds the order of every finite m-generator group of exponent n. A finitely generated group has finitely many normal subgroups of index below that bound; in a residually finite group of exponent n their intersection is trivial, so the group is finite.','zelmanov1991');
add('torsion','!f2','A free subgroup of rank two contains elements of infinite order.');

const g = (id,name,symbol,description,facts,source) => ({id,name,symbol,description,facts:facts.split(' '),source});
export const groups = [
 g('one','Trivial group','1','The one-element group. All its properties here follow directly from the definitions.','trivial','elementary'),
 g('c2','Cyclic group of order 2','C₂','Addition modulo two. Its nonidentity element has order two; its only subgroups are 1 and itself.','finite cyclic simple !tf !perfect !centerless !divisible','elementary'),
 g('c4','Cyclic group of order 4','C₄','Addition modulo four. The subgroup {0, 2} is proper and nontrivial.','finite cyclic !simple !tf !perfect !centerless !divisible','elementary'),
 g('v4','Klein four-group','C₂²','The product C₂ × C₂. Every element squares to 1, but no element generates the group.','finite abelian !cyclic !simple !tf !centerless !perfect','elementary'),
 g('s3','Symmetric group on three letters','S₃','A₃ is a cyclic normal subgroup with cyclic quotient. The group is nonabelian and centerless, hence not nilpotent.','finite solvable !abelian !nilpotent !simple centerless !perfect !tf','elementary'),
 g('q8','Quaternion group','Q₈','The eight units ±1, ±i, ±j, ±k. It is nilpotent of class two, with center {±1}.','finite nilpotent !abelian !simple !centerless !perfect !tf','elementary'),
 g('a5','Alternating group on five letters','A₅','The smallest nonabelian simple group. Its simplicity follows by counting conjugacy classes.','finite simple !abelian !tf','robinson'),
 g('z','Infinite cyclic group','ℤ','The additive integers. Multiplication by two is injective but not surjective; 1 has no square root.','!finite cyclic tf free !cohopfian !divisible !perfect !centerless !simple finfty cat0','elementary'),
 g('z2','Integer lattice','ℤ²','The additive integer plane. It acts geometrically on the Euclidean plane; it cannot be generated by one element.','!finite fg abelian tf !cyclic !free bo finfty finite_cd cat0 biautomatic conjugacy !cohopfian !divisible !perfect !centerless !simple','ggt'),
 g('q','Additive rational numbers','ℚ','Every element has an nth root. A finitely generated subgroup has a common denominator and is cyclic; no finite quotient is nontrivial.','!finite !fg abelian tf divisible li bo !rf !cyclic !perfect !centerless !simple hopfian cohopfian','elementary'),
 g('prufer','Prüfer 2-group','C₂∞','All complex roots of unity of 2-power order. Finite subsets lie in cyclic 2-groups. Squaring is onto with nontrivial kernel; every proper subgroup is finite.','!finite !fg abelian locfinite divisible !exponent !tf !rf !hopfian cohopfian !simple !perfect !centerless','elementary'),
 g('free2','Free group of rank two','F₂','Reduced words in two generators. Its Cayley graph is a regular tree.','free fg !cyclic !finite f2 exp finfty cat0 !cohopfian !perfect !simple cstar','free'),
 g('freeinf','Free group of countable rank','F∞','Reduced words on a countably infinite basis. Shifting the basis gives non-Hopfian and non-co-Hopfian endomorphisms.','free !fg !finite !cyclic !hopfian !cohopfian f2 !perfect !simple','free'),
 g('dihedral','Infinite dihedral group','D∞','The free product C₂ * C₂, or the symmetries of the integer line. Its translations form an infinite cyclic subgroup of index two.','!finite fg vabelian solvable !abelian !tf !torsion centerless hyp cat0 !cohopfian !perfect !simple','ggt'),
 g('heisenberg','Integral Heisenberg group','H₃(ℤ)','Upper triangular 3 × 3 integer matrices with diagonal entries 1. Nilpotent of class two, with a central copy of ℤ.','!finite fg nilpotent !abelian tf bo linear !vabelian !automatic !cat0 finfty finite_cd !simple !perfect !centerless','ggt'),
 g('lamplighter','Lamplighter group','C₂ ≀ ℤ','A finitely supported row of two-state lamps, together with a shift. A metabelian group with exponential growth.','!finite fg solvable !nilpotent !tf !torsion rf !fp exp !perfect !simple centerless','robinson'),
 g('grigorchuk','First Grigorchuk group','𝔊','An infinite, finitely generated torsion 2-group acting on the binary rooted tree. The first example of intermediate growth.','!finite fg torsion !exponent rf intermediate !ea !fp !simple word','growth'),
 g('sl3z','Special linear group SL₃(ℤ)','SL₃(ℤ)','The determinant-one 3 × 3 integer matrices. A basic infinite linear group with Kazhdan’s property (T).','t linear !finite !tf !torsion','kazhdan'),
 g('higman','Higman group','H','The four-generator group ⟨a,b,c,d | aᵇ=a², bᶜ=b², cᵈ=c², dᵃ=d²⟩. Its presentation complex is a finite classifying space; it has no nontrivial finite quotients.','!trivial fp tf acyclic finite_cd finfty !rf','higman'),
 g('grigorchuk98','Grigorchuk’s finitely presented extension','𝔊̃','A finitely presented amenable extension constructed outside the elementary amenable class.','fp amenable !ea','grigorchuk98'),
 g('erschler','Erschler’s intermediate-growth example','E','A construction separating intermediate growth from residual finiteness.','intermediate !rf','erschler'),
 g('nekrashevych','Nekrashevych’s simple torsion group','N','An infinite finitely generated simple torsion group of intermediate growth containing the first Grigorchuk group.','!finite fg simple torsion intermediate !exponent','nekrashevych'),
 g('openai','OpenAI’s non-sofic Leavitt unit group','L₂×','The countable unit group of the binary Leavitt algebra L_F₂(1,2). OpenAI’s Chapter 3 proves that this group is not sofic.','!sofic','openaiNonsofic'),
 g('sauers','Sauers’ sofic non-MF group','E','The explicit finitely presented group in Palomar record PALOMAR-2026-08-24-000006 v1. The pinned theorem proves soficity and failure of the CDE operator-norm MF property.','fp sofic !mf','palomar'),
 g('thompson','Thompson’s group F','F','Piecewise-linear dyadic homeomorphisms of the unit interval. Amenability is deliberately not assigned here.','!finite fp finfty tf !abelian !ea !rf !f2 bo exp !simple','thompson'),
 g('burnside','Free Burnside group B(2, n), n odd ≥ 4381','B(2,n)','The quotient of the free group of rank two by the normal subgroup generated by all nth powers, for a fixed odd exponent n ≥ 4381. Novikov and Adian proved it infinite; Adian proved it non-amenable. Adian later lowered the bound for infiniteness to odd n ≥ 665, which is not separately sourced here. Finite presentability, simplicity and property (T) are not assigned.','fg !finite exponent !amenable','novikovAdian1968'),
 g('olshanskiiSapir','Ol’shanskii–Sapir group','Gₙ','For a sufficiently large odd n, a finitely presented ascending HNN extension of a finitely generated infinite group of exponent n (Theorem 1.1). It contains a free Burnside group of exponent n, so it has torsion, and it maps onto an infinite cyclic group, so it is not a torsion group. It is non-amenable and has no free subgroup of rank two.','fp !amenable !f2 !tf !torsion','olshanskiiSapir2003'),
 g('juschenkoMonod','Juschenko–Monod simple amenable group','[[T]]′','The commutator subgroup of the topological full group of a minimal Cantor subshift. Matui proved it simple, finitely generated and never finitely presented; Juschenko and Monod proved that topological full groups of minimal Cantor systems are amenable.','!finite fg simple amenable !fp','juschenkoMonod2013'),
 g('ershov','Ershov’s residually finite torsion Kazhdan group','Γ₀','The image in its pro-p completion of a p-torsion Golod–Shafarevich quotient of a Golod–Shafarevich group with property (T). It is infinite, residually finite and torsion, and property (T) passes to quotients (Proposition 8.4).','!finite rf torsion t','ershov2008'),
 g('guba','Guba’s finitely generated divisible group','Gᵤ','A nontrivial two-generated group in which every element has a root of every degree, with unique extraction of roots. Unique roots force torsion-freeness: gⁿ = 1 = 1ⁿ gives g = 1.','fg divisible !trivial tf','guba1986'),
 g('cornulier','de Cornulier’s non-Hopfian Kazhdan group','Γ_dC','A finitely presented group with Kazhdan’s property (T) admitting a surjective endomorphism that is not injective. By Mal’cev’s theorem it is not residually finite.','fp !hopfian t','cornulier2007'),
 g('openaiFP','A finitely presented non-sofic group','Γ_fp','A finitely presented group built from finitely many elements of OpenAI’s non-sofic binary Leavitt elementary group with the relations of their partial multiplication table. Soficity passes to subgroups and is closed under limits of marked groups, so a large enough table gives a finitely presented non-sofic group. OpenAI’s Lean file proves exactly this passage (exists_finitelyPresented_nonsofic_group); Fournier-Facio states it in print. No further property is assigned.','fp !sofic','openaiLean'),
 g('fournierFacio','Fournier-Facio’s torsion-free non-sofic group','Γ_FF','A finitely presented torsion-free group built in an August 2026 preprint by small-cancellation steps from an embedding of a universal finitely presented torsion-free group into a Kazhdan group. A copy of Thompson’s group V inside it would have to be LEF if the group were sofic (Theorem 1.3).','fp tf !sofic','fournierFacio2026')
];

// Named open, answered and excluded questions live in questions.mjs; they never supply certificates.
