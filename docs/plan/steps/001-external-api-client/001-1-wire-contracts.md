# 001-1: Wire Contracts

Sources: [Phase §1–2](../../artefacts/prd/phases/phase-01-external-api-client.md), [PRD public contract](../../artefacts/prd/prd.md#public-contract), [evidence](../../artefacts/prd/prd-evidence.md), [existing schemas](../../../../src/models/schemas.ts), [schema tests](../../../../src/models/__tests__/schemas.test.ts), and [canonical choices](../../../../src/data/content.ts).

## Decision Register

- **DEC-001–DEC-014:** authoritative; relevant contract decisions are DEC-004–009.
- **DEC-015:** this subphase solely owns all wire schemas/types in `models/apiSchemas.ts`; do not reuse or alter `aiSeoResultSchema`.

## Non-Goals

No client, fetch, URL policy, UI wiring, full-result changes, backend, or new dependency.

Dependency: [001-0 setup](001-0-setup-client-boundary.md).

## 1. Acceptance Criteria

- **AC-1.1 (RQ-001):** Given a quote object, when parsed, then only the five required keys pass; services are unique canonical zero-to-six values, team size is canonical, strings may be empty, and non-empty email is valid.
- **AC-1.2 (RQ-002):** Given an extra/duplicate/noncanonical value or malformed non-empty email, when parsed, then strict validation fails.
- **AC-1.3 (RQ-003):** Given a message, when parsed, then required empty-capable name/email/message and optional businessName are accepted, while extras and malformed non-empty email fail.
- **AC-1.4 (RQ-004):** Given website input, when parsed, then the existing schema normalizes it or preserves its distinct empty/invalid messages.
- **AC-1.5 (RQ-005):** Given an acknowledgement and its public contract documentation, when parsed or inspected, then only trimmed nonblank requestId and literal `accepted` pass, and neither types nor documentation claim delivery, processing completion, email transmission, or receipt by Pete.
- **AC-1.6 (RQ-006):** Given a free result, when parsed, then only domain, bounded numeric score, trimmed nonblank verdict/issueSummary, and exactly seven strict trimmed-label/bounded-score areas pass.
- **AC-1.7 (RQ-007):** Given six/eight areas, null/out-of-range score, area question, or paid/full top-level data, when parsed, then it fails.
- **AC-1.8 (RQ-008):** Given public types, when typechecked, then each is schema-inferred and `FreeAiSeoResult` neither aliases nor extends `AiSeoResult`.

## 2. Red Phase: Write Failing Tests

- **T-1.1:** Create `models/__tests__/apiSchemas.test.ts`; unit table for AC-1.1; fails because quote schema is absent.
- **T-1.2:** Modify same path; unit invalid quote table for AC-1.2; fails before strict rules exist.
- **T-1.3:** Modify same path; unit message valid/invalid table for AC-1.3; fails before schema exists.
- **T-1.4:** Modify same path; unit normalization and exact-message cases for AC-1.4; fails before composed request schema exists.
- **T-1.5:** Modify same path; unit acknowledgement matrix plus source-level public-contract assertion excluding every prohibited delivery/completion claim for AC-1.5; fails before the strict schema and acceptance-only documentation exist.
- **T-1.6:** Modify same path; unit seven-area/boundary/trimming cases for AC-1.6; fails before free schema exists.
- **T-1.7:** Modify same path; unit exclusion/count/null/range table, including unknown keys inside an `areas[]` item, for AC-1.7; fails before strict rejection exists.
- **T-1.8:** Create `models/__tests__/apiSchemas.types.test.ts`; compile-time assertions for AC-1.8; fails before inferred exports exist.

## 3. Green Phase: Minimal Implementation

- **G-1.1:** Create `models/apiSchemas.ts`; add strict quote schema and inferred type; passes T-1.1.
- **G-1.2:** Modify same path; add uniqueness, enums, conditional-email rules; passes T-1.2.
- **G-1.3:** Modify same path; add strict message schema/type; passes T-1.3.
- **G-1.4:** Modify same path; compose strict domain request around `websiteDomainSchema`; passes T-1.4.
- **G-1.5:** Modify same path; add strict trimmed acknowledgement and public JSDoc stating acceptance-only semantics and all prohibited implications; passes T-1.5.
- **G-1.6:** Modify same path; add dedicated strict area/free-result schemas; passes T-1.6.
- **G-1.7:** Modify same path; enforce exact cardinality/bounds and unknown-key rejection; passes T-1.7.
- **G-1.8:** Modify `models/index.ts`; explicitly export schemas and `export type` inferred types without `AiSeoResult` inheritance; passes T-1.8.

## 4. Validation And Completion

Run `npm test -- models/__tests__/apiSchemas.test.ts models/__tests__/apiSchemas.types.test.ts`, `npm run typecheck`, `npm test`, and `npm run build` from `/Users/pete/dev/meetpete/src`. Complete when all contract matrices pass and production changes are limited to two model files.

## 5. Assumptions & Questions

Assumption: provider controls free-area labels/order; no maximum string length is invented. Risk: canonical display labels are wire values and require a later explicit migration if changed. Questions: none.
