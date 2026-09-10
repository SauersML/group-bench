# Date audit

Audit date: 2026-09-09.

## Scope and dating policy

This audit sought dates for two kinds of record:

1. **Group provenance** (`history.mjs`) — a dated source established for the exact
   catalog example. This is not a claim that the source is the first appearance of
   the mathematical object.
2. **Implication-rule proofs** (`rule-history.mjs`) — a dated source that proves or
   records the implication. A located source date is an **upper bound** on when the
   theorem was known, never a priority certificate.

Precision follows the source. A year is not inflated to a month, and a month is not
inflated to a day. Where a publisher's metadata supplies a placeholder day for an
issue that only carries a month, the month is kept. Where an issue *number* is not a
month, no month is recorded.

## Result

| Measure | Before | After |
|---|---:|---:|
| Catalog groups with a provenance date | 22 / 37 | **37 / 37** |
| Dated implication rules | 26 / 122 | **72 / 122** |
| Dated signed property-pairs | 1,245 / 6,441 | **3,824 / 6,441** |
| Solved pairs awaiting a dated certificate | 4,202 | **1,623** |

Solved pairs total 5,447 (5,067 witnessed, 380 impossible); 994 remain unresolved
and are not datable by construction. Tests: `test.mjs` and `timeline.test.mjs` 16/16.

## Catalog provenance dates added

Twenty-two groups were already dated and are unchanged. The 15 entries this audit dated:

| ID | Date | Evidence class | Source |
|---|---:|---|---|
| `one` | 2005-10 | located exact exposition; upper bound | Bowditch, free abelian group of rank 0 |
| `c2` | 1854 | original published classification | Cayley, groups of prime order |
| `c4` | 1854 | original published classification | Cayley, groups of order 4 |
| `v4` | 1854 | original published classification | Cayley, second group of order 4 |
| `s3` | 1854 | original published classification | Cayley, nonabelian group of order 6 |
| `q8` | 1843-11-13 | original public communication | Hamilton, read to the Royal Irish Academy |
| `a5` | 1870 | earliest located published proof | Jordan, *Traité*; see the A₅ note below |
| `z` | 1882 | original construction, rank-one case | Dyck, free groups |
| `z2` | 2005-10 | located exact exposition; upper bound | Bowditch, rank-two free abelian group |
| `q` | 1996 | located exact exposition; upper bound | Robinson, 2nd ed. |
| `freeinf` | 1927 | published theorem yielding this example | Schreier, subgroup theorem |
| `dihedral` | 2005-10 | located exact exposition; upper bound | Bowditch, presentation of D∞ |
| `heisenberg` | 2005-10 | located exact exposition; upper bound | Bowditch, integer unitriangular model |
| `lamplighter` | 1961 | located exact consequence; upper bound | Baumslag, wreath-product theorem |
| `sl3z` | 1967 | located property proof; upper bound | Kazhdan, property (T) |

### The A₅ correction

Galois's testamentary letter of 29 May 1832 states, in modern terminology, that the
smallest simple group has order 60 — but no proof of that assertion survives in his
papers. The entry therefore records two things:

- **1832-05-29** as a historical-statement milestone, carrying no proved fact; and
- **1870** as the located published proof, from Jordan's treatment of Aₙ for n ≥ 5.

This keeps a historical statement from silently becoming an extant proof.

## Implication rules dated

46 previously undated substantive rules were dated to the proof source already cited
on the rule:

| Source | Date | Rules |
|---|---:|---:|
| Robinson, *A Course in the Theory of Groups*, 2nd ed. | 1996 | 16 |
| Bowditch, *A course on geometric group theory* | 2005-10 | 20 |
| Lyndon & Schupp, *Combinatorial Group Theory* | 1977 | 5 |
| Patil, arXiv:2308.08353v1 | 2023-08-16 | 2 |
| Leary, Higman's group preprint | 2005-06-10 | 1 |
| Bekka–de la Harpe–Valette, *Kazhdan's Property (T)* | 2008-04-17 | 1 |
| Chouraqui, arXiv:1507.08106v1 | 2015-07-29 | 1 |

The Bowditch block needs the loudest caveat. For broad implications such as the
finite-group consequences, October 2005 dates only the source record the project
already cites. It does not claim Bowditch proved those facts. `finite ⇒ (T)` is the
clearest case: property (T) postdates 1967, so 2005 is a valid upper bound and
nothing more.

## Rules deliberately left undated

The 36 rules in `structuralRules` are logical or definitional propagation steps. They
carry dated proofs forward but receive no publication date of their own.

Fourteen further rules stay undated because a modern textbook date would add no
historical meaning without a theorem-specific source:

`r30`–`r39` (trivial ⇒ cyclic, torsion-free, perfect, centerless, divisible, free,
acyclic, finite cd, bi-orderable, `tar`), `r106` (free + f.g. ⇒ hyperbolic),
`r107` (free + noncyclic ⇒ contains F₂), `r113` (conjugacy problem ⇒ word problem),
`r118` (`tar` + amenable ⇒ trivial).

## Corrections made to the submitted audit

Five submitted values were not supported by their sources and were changed:

- **Hamilton source URL.** The submitted record kept `.../Quatern2/Quatern2.html`
  while retitling it as the November 1843 communication. That file is *On
  Quaternions*, read **11 November 1844** (PRIA 3, 1847, 1–16). The 13 November 1843
  reading belongs to *Researches respecting Quaternions: First Series* (Trans. RIA
  21, 1848, 199–296), so the source now points there. The date is unchanged.
- **`higman` 1951-01-01 → 1951-01.** Oxford Academic shows "01 January 1951" for an
  issue designated "Volume s1-26, Issue 1, January 1951". The day is a placeholder.
- **`sl3z` / `kazhdan1967` 1967-01 → 1967.** Math-Net.Ru gives volume 1, issue 1,
  1967, with no month. Issue 1 is not January.
- **`lamplighter` / `baumslag1961` 1961-12 → 1961.** The December month could not be
  confirmed from any reachable source; Springer's record is behind authentication and
  zbMATH gives "1960/61".
- **`robinson` 1995-10-26 → 1996.** The 26 October 1995 hardcover date could not be
  corroborated; the second edition is cited as 1996 everywhere reachable. This makes
  the 16 Robinson-dated rules and the `q` entry slightly later, which is the
  conservative direction for an upper bound.

The engine already places a year-only or month-only date at the end of its period
(`dateBoundary`), so reducing precision stays conservative rather than losing
ordering information.

## Sources verified during the audit

Checked directly:

- Bowditch, *A course on geometric group theory* — header reads `[October 2005]`;
  the text gives the infinite dihedral presentation, the discrete Heisenberg group as
  integer 3 × 3 upper unitriangular matrices, and free abelian groups of rank 0
  ("the trivial group") and rank 2: https://www.bhbowditch.com/papers/bhb-ggtcourse.pdf
  (this replaces a third-party mirror as the cited copy).
- Higman, *A Finitely Generated Infinite Simple Group*, JLMS s1-26(1), January 1951:
  https://doi.org/10.1112/jlms/s1-26.1.61
- Kazhdan, Funkts. Anal. Prilozh. 1:1 (1967), 71–74: https://www.mathnet.ru/eng/faa2807
- Galois, letter to Auguste Chevalier, 29 May 1832, printed 1846:
  https://www.numdam.org/item/JMPA_1846_1_11__381_0/
- Jordan, *Traité des substitutions et des équations algébriques* (1870):
  https://fr.wikisource.org/wiki/Livre:Jordan_-_Trait%C3%A9_des_substitutions_et_des_%C3%A9quations_alg%C3%A9briques,_1870.djvu
- Schreier, *Die Untergruppen der freien Gruppen*, Abh. Math. Sem. Hamburg 5 (1927),
  161–183: https://doi.org/10.1007/BF02952517 — third-party databases normalize this
  to 1 December 1927; the year alone is recorded.
- Cayley, Phil. Mag. 7(42) (1854), 40–47: https://doi.org/10.1080/14786445408647421 —
  the order-4 and order-6 classifications are attributed to this paper in
  https://kconrad.math.uconn.edu/blurbs/grouptheory/groupsorder4and6.pdf
- Dyck, *Gruppentheoretische Studien*, Math. Ann. 20 (1882), 1–44:
  https://eudml.org/doc/157013
- Prüfer, Math. Z. 17 (1923), 35–61: https://eudml.org/doc/167727
- Baumslag, *Wreath products and finitely presented groups*, Math. Z. 75 (1961),
  22–28: https://doi.org/10.1007/BF01211007
- Hamilton, *Researches respecting Quaternions: First Series*, read 13 November 1843:
  https://www.maths.tcd.ie/pub/HistMath/People/Hamilton/ResQuat/ResQuat.pdf

## What remains

The gap is no longer missing provenance for catalog examples; it is proof-date
coverage for deduction paths. 1,623 solved signed pairs still have no dated
certificate. Closing them responsibly means theorem-by-theorem research on the
remaining undated implications, or finding alternative dated derivations — not
assigning dates to structural steps.


## Additions of 10 September 2026

The integration of the group-approximation pass (issues #1–#9) added 49
witnesses and 39 rules. Their dates follow the same rules as above:

- The Sauers witnesses W and Q, and the simplicity and non-MF facts on OpenAI’s
  Leavitt unit group, are dated by public commits of the group-approximation
  repository (12–14 August 2026 for W; 24 August 2026 for the unit-group facts;
  26 August 2026 for Q), with the Lean status stated on each record. These are
  repository dates, not publication dates, and they are labelled as such.
- Finite generation and property (T) of the Leavitt unit group are dated to
  OpenAI’s 1 August 2026 chapter, where they are stated; perfectness and finite
  generation to Khanh–Thanh’s July 2026 preprint (month precision only).
- Eckhardt’s non-MF theorem for lamp groups is dated 28 August 2026 (arXiv v1).
- Classical witnesses carry the year of the located original construction or
  property proof (Hall 1959, Baumslag–Solitar 1962, Stallings 1963, Baumslag
  1969, Miller 1971, Ol’shanskii 1980, Kharlampovich 1981, Promislow 1988,
  Bestvina–Brady 1997, Burger–Mozes 2000) or the month of the located preprint
  (Le Boudec 2015-07, Lodha–Moore 2013-08, Le Boudec–Matte Bon 2016-05,
  Szymik–Wahl 2014-11, Hyde–Lodha 2018-07, Tholozan–Tsouvalas 2022-07-29,
  Titz Mite–Witzel 2025-09, Navas 2005-08).
- Synthetic witnesses (sums, products, acyclic overgroups, divisible closures)
  and elementary examples keep `firstProof: null`; where a synthetic witness
  inherits a dated fact from a named factor, that fact is dated by the factor’s
  source.
- Eleven of the new rules are dated (Vershik–Gordon 1997, Korchagin 2017-04,
  Chou 1980, Witte Morris 2006-06, Sela 1999, Tits 1972, Adams–Ballmann 1998,
  Gersten–Short 1991, Formanek 1976, Auslander 1967); the rest are structural
  or cite textbooks and stay undated.
