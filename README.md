# Group Atlas

[Explore the live atlas](https://sauersml.github.io/group-atlas/)

An interactive map of 57 properties of countable discrete groups, including
MF, hyperlinear, and sofic. Require or exclude any property to explore
witnesses, impossibility proofs, and unresolved combinations. Each example
includes dated provenance and source links where established.

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

`data.mjs` contains definitions, sources, witnessed facts, implication rules,
map neighborhoods, and curated queries. Negative literals use `!property_id`.
Every rule is a conjunction of signed premises implying one signed conclusion.
Do not add disputed preprints as established facts or label database gaps as
open problems without a separately maintained, dated literature assessment.

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

The URL fragment contains the selected signed properties, neighborhood, axis
signs, and selected intersection. No account, tracking, or persistent storage
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
