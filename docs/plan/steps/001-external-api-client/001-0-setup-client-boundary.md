# 001-0: Setup Client Boundary

Sources: [Phase proposed paths](../../artefacts/prd/phases/phase-01-external-api-client.md), [PRD proposed implementation boundary](../../artefacts/prd/prd.md#proposed-implementation-boundary), [frontend conventions](../../../../.github/instructions/frontend.instructions.md), and [barrel rules](../../../../.github/instructions/barrel-exports-pattern.instructions.md).

## Decision Register

- **DEC-001–DEC-014:** authoritative; setup must not implement or reinterpret them.
- **DEC-015/016:** establish only the agreed compile boundary and focused test locations.

## Non-Goals

No schema rules, URL logic, fetch behavior, error classification, public API commitment beyond phase-required names, UI/backend work, dependency, or passing feature test.

Dependencies: none.

## 1. Setup Objectives

- Ensure every later Red test imports an existing module and compiles before failing on behavior.
- Establish `models/apiSchemas.ts`, `api/ApiClient.ts`, and `api/index.ts` without implementing substantive contracts.
- Establish the five focused test files and shared minimal typed test helpers only inside each test file.

## 2. Implementation Steps

- Create `models/apiSchemas.ts` with compile-only exported schema/type placeholders for phase-required names; objective: unblock schema Red tests without encoding validation.
- Modify `models/index.ts` with explicit compile-only exports; objective: unblock public model imports.
- Create `api/ApiClient.ts` with phase-required constructor/method/error declarations whose operations throw a generic not-implemented error; objective: let client Red tests execute and fail.
- Create `api/index.ts` with explicit value/type exports; objective: establish the intended public import boundary.
- Create `models/__tests__/apiSchemas.test.ts`; objective: reserve the schema behavior suite.
- Create `models/__tests__/apiSchemas.types.test.ts`; objective: reserve compile-time contract assertions.
- Create `api/__tests__/ApiClient.configuration.test.ts`, `api/__tests__/ApiClient.operations.test.ts`, `api/__tests__/ApiClient.failures.test.ts`, and `api/__tests__/ApiClient.isolation.test.ts`; objective: reserve independent suites without shared mutable fixtures.

## 3. Verification Steps

- Run `npm run typecheck` from `/Users/pete/dev/meetpete/src`; it must pass with placeholder modules.
- Run `npm test` from `/Users/pete/dev/meetpete/src`; existing tests must pass because reserved suites contain no feature assertions.
- Run `npm run build` from `/Users/pete/dev/meetpete/src`; it must pass without importing browser client code into a route.

## 4. Manual Steps

None. No environment value, external service, browser interaction, or secret is needed.

## 5. Completion And Handoff

This unlocks subphase 1 Red tests, followed by 2–5. Completion means imports resolve and baseline commands pass, while every operation still lacks behavior. Risk: placeholders could survive accidentally; each feature completion and final full suite must eliminate generic not-implemented paths. Assumptions: existing Zod, Vitest, TypeScript, DOM, and fetch typings are sufficient. Questions: none.
