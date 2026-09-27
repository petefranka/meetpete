# 001-4: Failure Classification

Sources: [Phase §5–6](../../artefacts/prd/phases/phase-01-external-api-client.md), [PRD failure contract](../../artefacts/prd/prd.md#failure-contract), and [integration guidance](../../../../.github/instructions/integration-dependencies.instructions.md).

## Decision Register

- **DEC-001–DEC-014:** authoritative; especially DEC-009/010/012/013.
- **DEC-015/016:** modify only classification boundaries in the owned client; keep tests separate.

## Non-Goals

No retry, fallback, logging, public cause, response-body exposure, provider error parsing, telemetry, or abort wrapping.

Dependencies: [001-0 setup](001-0-setup-client-boundary.md) through [001-3 operations](001-3-json-operations.md).

## 1. Acceptance Criteria

- **AC-4.1 (RQ-022):** Given outbound Zod failure, then `InvalidRequestError` rejects with kind and a readonly defensive copy of issues after zero fetches; later mutation of the source array cannot change the error.
- **AC-4.2 (RQ-023):** Given non-abort fetch rejection, then `NetworkError` rejects with only generic safe fields and kind.
- **AC-4.3 (RQ-024):** Given any non-2xx, then `HttpError` rejects with numeric status and does not read its body.
- **AC-4.4 (RQ-025):** Given missing, `text/plain`, or `text/json` media type, then `InvalidResponseError` rejects without issues.
- **AC-4.5 (RQ-026):** Given empty/204, malformed, or non-JSON 2xx body, then `InvalidResponseError` rejects without issues.
- **AC-4.6 (RQ-027):** Given operation-response schema failure, then `InvalidResponseError` rejects with readonly defensive-copy Zod issues.
- **AC-4.7 (RQ-028):** Given valid free schema but mismatched normalized domain, then `InvalidResponseError` rejects without issues.
- **AC-4.8 (RQ-029):** Given any failure, then only boundary catches classify it; enumerable public fields and generic messages reveal no input, body, credential, cause, or delivery/completion claim, standard non-enumerable `Error` internals are ignored, and no success fallback occurs.

## 2. Red Phase: Write Failing Tests

- **T-4.1:** Create `api/__tests__/ApiClient.failures.test.ts`; unit zero-call test mutates the source Zod issues array after construction and asserts the error's readonly copy is unchanged for AC-4.1; fails before conversion.
- **T-4.2:** Modify same path; non-abort rejection and exact own-data test for AC-4.2; fails before network conversion.
- **T-4.3:** Modify same path; status table includes a non-2xx response whose body reader throws, asserting `HttpError(status)` and zero body-reader calls for AC-4.3; fails before status boundary.
- **T-4.4:** Modify same path; missing, `text/plain`, `text/json`, `application/+json`, and `application/jsonp` table asserts `InvalidResponseError` and `Object.hasOwn(error, 'issues') === false` for AC-4.4; fails before invalid-response conversion.
- **T-4.5:** Modify same path; empty 200, 204, malformed, and non-JSON 2xx table asserts `InvalidResponseError` with no own `issues` property for AC-4.5; fails before decode conversion.
- **T-4.6:** Modify same path; strict acknowledgement/free schema matrix asserts an own defensive-copy `issues` field for AC-4.6; fails before issues contract.
- **T-4.7:** Modify same path; mismatched normalized domain test asserts no own `issues` property for AC-4.7; fails before correlation conversion.
- **T-4.8:** Modify same path; spies and enumerable/public-field assertions, excluding standard non-enumerable `Error` internals, prove no logging, leak, delivery/completion claim, or fallback under AC-4.8; fails if catches are broad or data-bearing.

## 3. Green Phase: Minimal Implementation

- **G-4.1:** Modify `api/ApiClient.ts`; convert request Zod errors with copied readonly issues before fetch; passes T-4.1.
- **G-4.2:** Modify same path; catch only fetch rejection and wrap non-abort reasons safely; passes T-4.2.
- **G-4.3:** Modify same path; reject non-2xx before body access with status-only `HttpError`; passes T-4.3.
- **G-4.4:** Modify same path; classify media rejection without issues; passes T-4.4.
- **G-4.5:** Modify same path; narrowly catch JSON decoding and classify empty/invalid bodies; passes T-4.5.
- **G-4.6:** Modify same path; narrowly convert response Zod failures with copied issues; passes T-4.6.
- **G-4.7:** Modify same path; classify domain mismatch separately without issues; passes T-4.7.
- **G-4.8:** Modify same path; finalize generic messages/private internals and remove broad catches/logging/fallbacks; passes T-4.8.

## 4. Validation And Completion

From `/Users/pete/dev/meetpete/src`, run `npm test -- api/__tests__/ApiClient.failures.test.ts`, `npm run typecheck`, `npm test`, and `npm run build`. Complete when the full failure matrix has exact public shapes and no production file beyond `api/ApiClient.ts` changes.

## 5. Assumptions & Questions

Assumption: arbitrary non-abort thrown values are never made public. Risk: external error payloads intentionally remain opaque. Questions: none.
