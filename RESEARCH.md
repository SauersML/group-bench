# Group Bench literature review — 9 September 2026

Group Bench now distinguishes **documented open questions** from gaps in its collection of examples and theorems. Thirteen questions have explicit literature records, including their complete hypotheses. Five additional group examples supply dated witnesses. Black borders identify the recorded open questions; the underlying cell still says **Unknown**.

The recent-paper window for this review is **9 August–9 September 2026**, inclusive. First submissions, subsequent revisions, and registry dates are distinguished below. Papers just outside that window are included when they directly explain an August development. This is a curated review of the properties represented in Group Bench, not an exhaustive bibliography of group theory.

## Documented open questions

Each conjunction below asks whether a group satisfying **every** listed condition exists. The table gives the date of the source used to document the question, not the date the question was first posed. Every entry was reviewed on 9 September 2026. For older sources, targeted searches for subsequent resolutions did not identify a replacement result; that is a literature assessment, not a proof that no resolution exists.

| Complete conjunction | Question and primary source | Source date |
| --- | --- | --- |
| Finitely presented ∧ intermediate growth | Existence of a finitely presented intermediate-growth group. [Babenko–Sabourau, §2.8](https://jep.centre-mersenne.org/item/10.5802/jep.295.pdf). | 2025 |
| Hyperbolic ∧ not residually finite | Whether every hyperbolic group is residually finite. [Schesler, Introduction](https://doi.org/10.1016/j.aim.2025.110441). | 2025 |
| Not hyperlinear | Existence of a non-hyperlinear group. [Taller–Vidick, Introduction](https://arxiv.org/html/2507.22444v1). | 30 July 2025 |
| Automatic ∧ not biautomatic | Whether automaticity implies biautomaticity. [Rees, §6](https://arxiv.org/pdf/2205.14911). | 30 May 2022 |
| Automatic ∧ undecidable conjugacy problem | Whether automatic groups have decidable conjugacy problem. [Rees, §§2.2, 6](https://arxiv.org/pdf/2205.14911). | 30 May 2022 |
| CAT(0) ∧ not automatic | Whether CAT(0) implies automaticity. [Rees, §6](https://arxiv.org/pdf/2205.14911). | 30 May 2022 |
| Solvable ∧ automatic ∧ not virtually abelian | The solvable automatic-group question. [Rees, §6](https://arxiv.org/pdf/2205.14911). | 30 May 2022 |
| Residually finite ∧ CAT(0) ∧ not biautomatic | The residual-finiteness restriction remains unresolved. [Shepherd–Valiunas, Introduction](https://doi.org/10.1007/s10711-025-01037-y). | 8 September 2025 |
| Left-orderable ∧ property (T) ∧ nontrivial | Existence of a nontrivial ordered Kazhdan group. [Cornulier, Proposition 3.3](https://www.normalesup.org/~cornulier/FW_piecewise_short.pdf), referring to Bekka–de la Harpe–Valette, question 7.8. | 22 November 2020 |
| Finitely presented ∧ torsion ∧ infinite | Existence of a finitely presented infinite torsion group. [Haettel–Osajda, §2.2(IX)](https://arxiv.org/html/2110.12431v3). | 11 July 2025 revision |
| Finitely presented ∧ simple ∧ amenable ∧ infinite | Existence with all four conditions. [Zaremsky, §1, problem 10](https://zaremsky.github.io/open_problems.pdf). | 12 July 2026 |
| Type F∞ ∧ amenable ∧ not elementary amenable | Existence with this stronger finiteness condition. [Zaremsky, §1, problem 12](https://zaremsky.github.io/open_problems.pdf). | 12 July 2026 |
| Finitely presented ∧ sofic ∧ property (T) ∧ not residually finite | Explicitly posed as [Alekseev–Thom, Open problem 6.1](https://arxiv.org/html/2608.05362v1). | 5 August 2026 |

The requirements involving three or four properties are available through the existing filters. For example, add **finitely presented** and **sofic** as filters, then inspect **property (T) ∧ not residually finite**. Without those filters, that broader combination already has a witness.

The trivial group prevents left-orderable ∧ property (T) from being an existence problem. Finite cyclic groups of prime order likewise prevent finitely presented ∧ simple ∧ amenable from expressing the infinite-group problem. The map retains these distinctions structurally.

## Papers and records from the recent window

| Work | First public archive or registration | Activity in the window | Integration |
| --- | --- | --- | --- |
| [Fournier-Facio, *A torsion-free non-sofic group*](https://arxiv.org/abs/2608.02025) | 3 August 2026, arXiv v1 | v2 on 14 August | New witness from Theorem 1.3 and §2; certificate dated to v1. |
| [Kun–Thom, *Nonsofic wreath products of residually finite groups*](https://arxiv.org/abs/2608.06222) | 6 August 2026, v1 | v2 on 19 August; v3 on 20 August | New explicit wreath-product witness, using the revised Theorems A and E. |
| [Sauers, Palomar record v1](https://palomar-registry.org/entry?id=PALOMAR-2026-08-24-000006&version=1) | 24 August 2026 | First registration | Existing finitely presented, sofic, non-MF witness retained. |
| [Fisher–Lodha, *A note on normal generation and the first ℓ²-Betti number*](https://arxiv.org/abs/2608.25988v1) | 26 August 2026, v1 | New submission | New locally indicable, torsion-free, non-finitely-generated witness Γ₁. |

Fournier-Facio’s construction also has property (T). Its August 3 archived version supplies all four recorded seed facts. A later acknowledgement reports a homepage note on August 1; the timeline uses the verifiable archive date and records that earlier report separately. [Original theorem and construction](https://arxiv.org/html/2608.02025v1), [revised paper](https://arxiv.org/html/2608.02025v2).

For Kun–Thom, Group Bench fixes q = 2 and r = d = 3 in Theorem E, then takes the C₂ wreath product over the resulting coset action. Finite generation follows from the transitive action and finite generation of the acting group; a lamp supplies torsion. Because versions 2 and 3 changed Theorem A, the certificate uses August 20 conservatively. [Pinned v3](https://arxiv.org/html/2608.06222v3).

Fisher–Lodha’s n = 1 example addresses normal rank and the first ℓ²-Betti number. Their counterexamples are not finitely generated, so they do not resolve the finitely generated version of that conjecture. Local freeness is not a claim that the entire group is free. The represented facts are recorded even though those additional numerical invariants are not axes in Group Bench. [Paper](https://arxiv.org/html/2608.25988v1).

Alekseev–Thom’s August 5 paper lies **four days before** the window. It is included as immediate context because it supplies the new four-condition open problem. Its residual-finiteness theorem assumes additional structure of a sofic embedding’s centralizer. That hypothesis is not one of the current axes, so the theorem is not converted into an unrestricted rule saying finitely presented sofic Kazhdan groups are residually finite. [Theorem statement and §6](https://arxiv.org/html/2608.05362v1).

## Known examples recovered during the review

Two older constructions prevent catalog gaps from being mistaken for open problems:

- **Thom’s LEF Kazhdan group**, with archived proof dated **13 October 2008**, is LEF and not residually finite. It is therefore sofic; finite presentability would contradict the standard finitely presented LEF ⇒ residually finite theorem. This explains why the recent four-condition problem still includes finite presentability. [Thom’s original preprint](https://arxiv.org/abs/0810.2180v1).
- **Leary–Minasyan’s G₁,₂**, with preprint dated **8 July 2019**, is CAT(0) and not biautomatic. Example 9.4 provides its presentation. Torsion-freeness follows from its HNN construction over ℤ². Automaticity is left unassigned. [Original paper, Example 9.4](https://arxiv.org/pdf/1907.03515v1).

## Distinctions that affect the map

**Non-sofic groups are no longer marked open.** The existing OpenAI witness remains, dated to the August 1 public result. Its non-soficity alone supplies no MF or hyperlinearity conclusion. [OpenAI announcement](https://openai.com/index/ten-advances-in-mathematics/), [original manuscript, Chapter 3](https://cdn.openai.com/pdf/ten-proofs-oai-original.pdf).

**A non-sofic action is not a non-sofic acting group.** Kun–Thom obtain non-sofic actions of groups that are themselves residually finite. Group Bench assigns failure of soficity to their constructed wreath product, not to the acting group. [Theorems A–E](https://arxiv.org/html/2608.06222v3).

**Hyperlinear, MF, and other matrix approximation notions remain distinct.** Taller–Vidick describe an additional perfect-completeness result that would imply a non-hyperlinear group; their theorem does not provide that group. The newer stability approach of Dogon–Vigdorovich is also conditional. [Taller–Vidick](https://arxiv.org/html/2507.22444v1), [Dogon–Vigdorovich](https://arxiv.org/abs/2506.20843).

The operator-norm MF fact attached to the Sauers example uses the specified Palomar statement. The registry reports mechanical verification and automated statement review; it explicitly does not certify novelty. The author's “first non-MF group” attribution remains identified as a priority claim. [Immutable registry record](https://palomar-registry.org/entry?id=PALOMAR-2026-08-24-000006&version=1).

**Questions about a particular group need that identity.** Thompson F's amenability remains an unassigned fact, and Zaremsky lists it as open. It does not justify marking every matching pair of general properties as open: another group could answer that pair. [Zaremsky, §2, problem 1](https://zaremsky.github.io/open_problems.pdf).

## Matching, dating, and review limits

The black-border matcher requires an unresolved cell and a conjunction equivalent to a recorded question under the map’s implications. It checks implication in both directions, using the union of row, column, and filters. Duplicate literals on the diagonal are removed. Redundant conditions are allowed; arbitrary stronger requirements are not automatically highlighted. The matching is intentionally conservative: unit propagation can miss an equivalence that would need an additional theorem.

Open-question review dates never enter the solved-pairs timeline. A new example contributes dated seed facts; derived dates also account for the theorem dates needed to obtain them. A revision date is not silently presented as the first historical proof. The total remains all **6,441 distinct unordered signed pairs**, independent of displayed columns or filters.

Research used primary papers, author problem lists, publisher records, arXiv version histories, and the pinned registry statement. Searches covered approximation properties, geometric and algorithmic properties, growth, torsion, amenability, orderability, and finiteness conditions, with citation-following around the August non-soficity papers. Search-result crawl dates were not treated as publication dates. The arXiv API was rate-limited during the review, so the recent list is based on targeted searches and individually checked histories, not a complete monthly feed. An unbordered Unknown remains unclassified by this catalog; it should not be interpreted as either a resolved question or an exhaustive literature verdict.


# Integration of the group-approximation pass — 10 September 2026

On 9 September 2026 the 1,032 unresolved pairs were mined against the Cairn
research graph and formal development of
[SauersML/group-approximation](https://github.com/SauersML/group-approximation)
(snapshot `b285894`), and against the literature those files cite. The findings
were filed as issues [#1–#9](https://github.com/SauersML/group-bench/issues) and
integrated here on 10 September 2026. Every proposal was checked against the
engine before integration: no existing witness becomes inconsistent, no
previously resolved pair changes status, and the count of unresolved pairs
falls from 1,032 to 193 (5,805 exist, 443 impossible). The catalog now has
161 rules and 86 witnesses.

## Priority claims (the only ours-first items)

- **OpenAI’s Leavitt unit group** `H = L_𝔽₂(1,2)^×` is **simple** and **not MF**
  (group-approximation, Theorem `thm:headline`; Lean statement
  `manuscriptUnitGroupHeadline`, hypothesis-free; first committed at rank
  twelve on 24 August 2026, at the unit group on 7 September 2026). Neither
  fact appears in OpenAI’s Chapter 3, Khanh–Thanh, Fournier-Facio, Kun–Thom,
  Alekseev–Thom or Eckhardt. Consequently `H` is the first group known to be
  neither sofic nor MF (`!sofic` OpenAI, 1 August 2026; `!mf` 24 August 2026).
  Finite generation and property (T) of `H` are stated in OpenAI’s Chapter 3
  §3.1 through Khanh–Thanh’s `R^× = EL₉(R)` and Ershov–Jaikin-Zapirain, and
  perfectness is Khanh–Thanh’s Proposition 4.2; those are recorded as
  literature. Torsion in `H` is noted by Fournier-Facio. The decidable word
  problem of `H` rests on a prose proof in the research graph, not on Lean.
- **The Clifford lamp group W** (`thm:amenable-trace`): sofic, not MF, with a
  nontrivial central involution and a surjection onto ℤ; dated by public
  commits of 12–14 August 2026 and Lean-verified without hypotheses. The
  timeline now dates the pair sofic ∧ not MF to 14 August 2026, ten days
  before the Palomar record, on the strength of those commits. Eckhardt’s
  preprint of 28 August 2026 proves non-MF for lamp groups of the same shape
  and credits the earlier examples; his Theorem 4.3 also gives the Kun–Thom
  witness its non-MF fact.
- **The torsion-free Kazhdan group Q** (`thm:torsion-free`): finitely
  presented, torsion-free, property (T), not MF, with C*-simple reduced
  algebra. Manuscript-level; the Lean statement takes the cited Fournier-Facio
  and Hull inputs as hypotheses. Recorded with that caveat.

## Everything else is literature

Thirty-nine implication rules that the engine could not derive (the residual
version `perfect ∧ rs ⇒ trivial` of an existing rule alone unlocks 163 pairs;
also `lea ⇒ mf`, `linear ⇒ lef`, `rs ⇒ lea`, `divisible ∧ rf ⇒ trivial`,
Chou’s growth dichotomy, Witte Morris, Kuznetsov, McKinsey–Mostowski, Sela,
Adams–Ballmann, Gersten–Short, Tits–Milnor–Wolf, and definitional gaps such as
`cyclic ⇒ polycyclic`), facts on fifteen existing witnesses (SL₃(ℤ), Higman’s
group, Thompson’s F, the Grigorchuk group, the lamplighter, the Heisenberg
group, ℤ², ℚ, the free groups, A₅, the Kun–Thom group, the free Burnside group,
the trivial group), and 49 new witnesses, from the finitary alternating group
and Tarski monsters to Burger–Mozes lattices, Thompson’s V, Kharlampovich’s
group, Hall’s universal group, Baumslag–Solitar groups, Hyde–Lodha and
Lodha–Moore groups, Le Boudec’s groups, Miller’s and Boone’s groups,
Bestvina–Brady and Stallings groups, Promislow’s group, cocompact Sp(2,1)
lattices, and several synthetic overgroups. Three witnesses are non-explicit
(existence by counting: a Grigorchuk group `G_ω` with undecidable word problem,
a Kazhdan group with undecidable word problem) or preprint-sourced
(Tholozan–Tsouvalas; Titz Mite–Witzel); their descriptions say so.

## New named questions

`hyperlinear_nonsofic` (Pestov, Open question 3.4) and `hyperbolic_sofic`
(Ozawa, recorded as Pestov’s Open question 9.2) are open; `nonmf`,
`nonsofic_nonmf` and `tf_nonmf` are solved. Cells strictly stronger than a
documented question (for instance `!lea ∧ hyp`, or `!hyperlinear` together
with an independent property) are deliberately not bordered, as before.

## What remains unresolved

The 193 remaining pairs are dominated by the 88 cells involving `!hyperlinear`
(all downstream of the non-hyperlinear question), non-LEF or non-LEA torsion
and bounded-exponent groups, orderable non-sofic or non-MF groups (which run
into the ordered Kazhdan question), non-MF or non-sofic groups without free
subgroups, acyclic groups with nontrivial amenable radical, and Hopficity in
the geometric classes.
