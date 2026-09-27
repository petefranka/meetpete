# Phase 001 Parallelization Plan

**Critical Path**: `001-0-setup-client-boundary.md` → `001-1-wire-contracts.md` → `001-2-client-construction.md` → `001-3-json-operations.md` → `001-4-failure-classification.md` → `001-5-cancellation-isolation.md` (~205 minutes)
**Total Waves**: 6
**Parallel Opportunities**: 0 waves with 2+ steps

The phase is intentionally sequential. The spine specifies numeric-order ownership for shared files, and code archaeology confirms hidden dependencies around `src/models/apiSchemas.ts`, `src/models/index.ts`, `src/api/ApiClient.ts`, and `src/api/index.ts`.

---

## Execution Waves

### Wave 1 (No Dependencies)
- [ ] `001-0-setup-client-boundary.md` — Establish compile-only model/API boundary and focused test files.

**⚠️ Blocker**: This setup unlocks every later Red test import.
**Sequential Fallback**: Estimated 15 minutes.
**Manual Windows**: 1

---

### Wave 2 (Depends on: Wave 1 complete)
- [ ] `001-1-wire-contracts.md` — Implement dedicated request/ack/free-result wire schemas and inferred exports. (depends on `001-0`)

**⚠️ Blocker**: Requires placeholder modules and barrels from Wave 1.
**Sequential Fallback**: Estimated 35 minutes.
**Manual Windows**: 1

---

### Wave 3 (Depends on: Wave 2 complete)
- [ ] `001-2-client-construction.md` — Add safe client construction, fixed route surface, errors, and API barrel exports. (depends on `001-1`)

**⚠️ Blocker**: Requires completed schemas/types from Wave 2.
**Sequential Fallback**: Estimated 35 minutes.
**Manual Windows**: 1

---

### Wave 4 (Depends on: Wave 3 complete)
- [ ] `001-3-json-operations.md` — Implement exact one-call JSON POST pipeline and operation-specific parsing. (depends on `001-2`)

**⚠️ Blocker**: Requires constructor, fixed routes, retained fetch, and public errors from Wave 3.
**Sequential Fallback**: Estimated 45 minutes.
**Manual Windows**: 1

---

### Wave 5 (Depends on: Wave 4 complete)
- [ ] `001-4-failure-classification.md` — Classify request, network, HTTP, media, JSON, schema, and domain failures safely. (depends on `001-3`)

**⚠️ Blocker**: Requires completed transport sequencing from Wave 4.
**Sequential Fallback**: Estimated 45 minutes.
**Manual Windows**: 1

---

### Wave 6 (Depends on: Wave 5 complete)
- [ ] `001-5-cancellation-isolation.md` — Finalize abort identity, no-retry behavior, concurrent isolation, and scope constraints. (depends on `001-4`)

**⚠️ Blocker**: Requires final failure classes and one-attempt pipeline from Wave 5.
**Sequential Fallback**: Estimated 30 minutes.
**Manual Windows**: 1

---

## Quick Reference

| Wave | Steps | Parallel? | Depends On | Manual Windows |
|------|-------|-----------|------------|----------------|
| 1 | 1 | ❌ No | None | 1 |
| 2 | 1 | ❌ No | Wave 1 | 1 |
| 3 | 1 | ❌ No | Wave 2 | 1 |
| 4 | 1 | ❌ No | Wave 3 | 1 |
| 5 | 1 | ❌ No | Wave 4 | 1 |
| 6 | 1 | ❌ No | Wave 5 | 1 |

**Estimated Time Savings**: 0% vs fully sequential execution.

## Dependency Graph

- `001-0` → `001-1`
- `001-1` → `001-2`
- `001-2` → `001-3`
- `001-3` → `001-4`
- `001-4` → `001-5`

Transitive dependencies from the step files are reduced to the direct chain above. The full stated prerequisites remain valid: step 2 requires 0–1, step 3 requires 0–2, step 4 requires 0–3, and step 5 requires 0–4.

## Verification Commands

Commands must run from the repository root and explicitly enter `src`:

- Step-level baseline: `cd src && npm run typecheck`
- Wave-level baseline: `cd src && npm run typecheck`
- Phase-level final: `cd src && npm test`, `cd src && npm run typecheck`, `cd src && npm run build`

Step files also define focused test commands for their own suites; use those before the shared baseline commands when implementing each step.

## Validation

- Unique step IDs: `001-0` through `001-5`.
- Step files exist under `docs/plan/steps/001-external-api-client/`.
- Dependencies reference real step IDs only.
- DAG is acyclic and topologically ordered across 6 waves.
- Tracks are valid manifest values.
- `maxParallel` remains default `5`.
- Retry policy remains default `maxAttempts: 2`, `backoffSeconds: 30`.
- `verification.step`, `verification.wave`, and `verification.phase` are non-empty arrays in the manifest.
