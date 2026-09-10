# Group Bench

[Explore Group Bench](https://sauersml.github.io/group-bench/)

An interactive map of 57 properties of countable discrete groups, including
MF, hyperlinear, and sofic. Require or exclude any property to explore
witnesses, impossibility proofs, and unresolved combinations. Each example
includes dated provenance and source links where established.

Use Add properties to build a triangular map from one shared property list.
Each pair appears once, including the diagonal; mirrored duplicates are omitted.
Cells, gaps, and labels resize to fit the available width and viewport height,
so larger selections do not introduce an internal scrollbar. Hover retains full labels
and evidence when cells become small.
The default selection includes finitely presented + intermediate growth and
hyperbolic + not residually finite, with sourced open-question context on hover.
MF, hyperlinear, sofic, not sofic, amenability, and property (T) are also visible.
OpenAI’s non-sofic Leavitt unit group is included with the original manuscript
and the public proof date of 1 August 2026. Non-soficity is not treated as a proof
of non-hyperlinearity or failure of MF.
Select “Has” or “Does not have”; both versions can appear, and every selection is added to both axes.
Hover over a header for its definition or a cell for examples, dates, and
obstructions. Click a cell for full evidence. Optional filters apply to every
cell, and copied links preserve the complete selection.

Run `python3 serve.py` for a local preview. Run `python3 build.py` to validate
and build the static website into `dist/`. The build runs the Node test suite.
GitHub Pages publishes automatically on pushes to `main`.

## Mathematical contract

- **Exists** requires a named witness with every selected literal established.
- **Impossible** requires a contradiction in the sourced propositional theory.
- **Unresolved** means neither is established in this catalog. It is not a
  declaration of an open problem, and Boolean satisfiability is not existence.
- Missing group facts remain unknown; no closed-world assumption is made.
- Sources are mathematical references. The Sauers example also links to a pinned
  Palomar-verified result; the atlas’s own deductions are not Lean certificates.
- All groups are countable and discrete. Simple means nontrivial. Free allows
  rank zero and countably infinite rank. Growth and decision-problem axes
  explicitly include finite generation. Integral coefficients are fixed on
  the homological axes. MF is the group property.

`data.mjs` contains definitions, sources, witnessed facts, and implication rules. Negative literals use `!property_id`.
Every rule is a conjunction of signed premises implying one signed conclusion.
Do not add disputed preprints as established facts or label database gaps as
open problems without a separately maintained, dated literature assessment.
That assessment is `questions.mjs`, described below.

`engine.mjs` converts rules to clauses, propagates facts with proof traces,
and uses DPLL to certify contradictions that require case splits. It never
uses a satisfying truth assignment as a group witness. Obstruction explanations
minimize the selected requirements; branching explanations also minimize the
set of theorem clauses. Witness facts can be traced back to their seeds.

To add mathematics, add a precise definition with scope and source, attach
individual seed facts to a group reference or an explicit elementary argument,
and add sourced rules with all hypotheses. Tests validate all references,
check each witness for consistency, check nontrivial intersections, compare
DPLL with exhaustive truth tables, and prevent unknown facts becoming false.

The URL fragment contains the selected signed properties, shared property selection, and selected intersection. No account, tracking, or persistent storage
is used by the atlas itself.

## Dates and priority

`history.mjs` requires an explicit provenance record for every group. Its
`firstProof` is the earliest proof source established for that exact example
in this catalog, with a `dateKind` explaining whether it is a construction,
publication, reported historical date, preprint, or registered formal proof.
Use `null` when that date has not been established; preserve year/month/day
precision instead of manufacturing January 1 dates. `milestones` associate
later proof dates and sources with specific signed facts. Unknown fact dates
are displayed explicitly, and construction dates are never inherited as proof
dates for every property. Historical priority claims carry attribution.

The Sauers example pins PALOMAR-2026-08-24-000006 v1, the source commit, compared
theorem, verification time, statement, proof, and machine-readable registry
record. It witnesses finitely presented + sofic + not MF, and therefore also
hyperlinear + not MF via the separately sourced sofic ⇒ hyperlinear theorem.

## Named questions

`questions.mjs` is a dated literature assessment of existence questions of the
form “is there a group with exactly these properties?”. Each entry names its
signed literals, a status, the assessment date, and sources:

- **open**: the cited sources state the question as unresolved on the
  assessment date. This is a statement about the literature, not a proof of
  openness, and it is never inferred from a gap in the grid.
- **solved**: formerly open, with the date and author of the answer and the
  catalog witness that realises it. The witness may be a later example than
  the first solution; the note says so.
- **impossible**: excluded by a theorem recorded as a rule, with its source.

The tests require every status to agree with the map: an open entry has neither
a witness nor an obstruction here, a solved entry names a group the classifier
returns for its literals, and an impossible entry is contradicted by the rules.
Adding a witness or rule that decides an open question therefore fails the
build until the entry is updated. The page lists the questions by status and
places any of them on the map; a cell whose requirements match an entry
exactly shows it in the evidence panel and on hover.

The current assessment covers the Burnside problems and their finitely
presented forms, Milnor’s growth problem, Day’s and von Neumann’s amenability
problems, finitely presented simple amenable and divisible groups, Gromov’s
residual-finiteness question for hyperbolic groups, residually finite torsion
Kazhdan groups, non-Hopfian Kazhdan groups, and the non-sofic questions,
including the finitely presented and torsion-free forms answered in August
2026. Questions whose properties are not axes of this atlas (Tarski monsters,
Noetherian groups, unitarisable groups, groups isomorphic to their square,
finitely many conjugacy classes, Scott sentences, type F) are not recorded.

## Pairs solved over time

The denominator is all unordered pairs of distinct signed properties: with 57
properties and their negations, there are 114 × 113 / 2 = 6,441 pairs. Mirror
cells count once and diagonal repetitions are excluded. Filters and the visible
grid never change this denominator. The step line chart always runs from 0 to 100%. Both axes use shifted logarithmic
spacing: reversed log(1 + years before the right endpoint) expands recent dates,
and log(1 + percentage) expands low percentages while preserving zero.
The labeled right endpoint is at least the start of next year. The plot spans the content width on a white background and uses a pure
step line without markers. Hover by date, or focus the line and use arrow keys, to
inspect dated observations; click or press Enter to open their sources. Horizontal segments
keep the cumulative total constant between recorded dates; vertical segments show
newly dated pairs at each date. Axis explanations are in How it works and hover
details, leaving the main page focused on the grid and chart.

The curve combines explicit dated property proofs with dated implication
theorems. A deduction uses the latest date among every premise and theorem;
the earliest supported derivation or witness is used for each pair. Pure logical
contradictions and proofs with missing dates remain undated. Construction dates
are never transferred to later properties. “Derived by” dates are upper bounds
from the recorded literature, not universal first-publication claims. Solved pairs without established proof
dates are counted separately. These dates document source coverage, not a
complete reconstruction of historical priority.

`timeline.mjs` computes the global counts and dated witnesses. The build writes
`pair-history.json` for the chart, so full-catalog enumeration never blocks the
browser. Each dated pair links back to its witness and source records.
