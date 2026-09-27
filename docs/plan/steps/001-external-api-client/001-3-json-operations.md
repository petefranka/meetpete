# 001-3: JSON Operations

Sources: [Phase §2–4 and §6](../../artefacts/prd/phases/phase-01-external-api-client.md), [PRD transport](../../artefacts/prd/prd.md#transport-and-url-behaviour), and [package/Vitest scripts](../../../../src/package.json).

## Decision Register

- **DEC-001–DEC-014:** authoritative; especially DEC-003/006–010/013.
- **DEC-015/016:** `ApiClient.ts` has one transport owner and tests stay focused.

## Non-Goals

No failure classification beyond established classes, cancellation special case, retry, UI, backend, or response caching.

Dependencies: [001-0 setup](001-0-setup-client-boundary.md), [001-1 contracts](001-1-wire-contracts.md), and [001-2 construction](001-2-client-construction.md).

## 1. Acceptance Criteria

- **AC-3.1 (RQ-015):** Given any valid request, when called, then injected fetch receives exactly one fixed URL and POST with JSON string of parsed data, `Accept`/`Content-Type` only, `credentials: 'omit'`, and `redirect: 'error'`.
- **AC-3.2 (RQ-016):** Given valid quote/message 2xx JSON, when parsed, then each resolves only the typed acceptance acknowledgement.
- **AC-3.3 (RQ-017):** Given valid free result, when parsed, then it resolves only the dedicated narrow type when normalized response/request domains match.
- **AC-3.4 (RQ-018):** Given a 2xx content type, when essence is trimmed/case-folded, then `application/json` and `application/*+json` pass, including parameters.
- **AC-3.5 (RQ-019):** Given accepted media type/body, when processed, then JSON decoding precedes the operation-specific successful-response parse.
- **AC-3.6 (RQ-020):** Given a runtime-invalid value despite its static type, when any method is called, then its request schema runs before transport.
- **AC-3.7 (RQ-021):** Given operation tests, then `vi.fn()` fetch proves exact URL/init/body/call-count/return without network access.

## 2. Red Phase: Write Failing Tests

- **T-3.1:** Create `api/__tests__/ApiClient.operations.test.ts`; unit table for exact three POST calls under AC-3.1; fails before transport exists.
- **T-3.2:** Modify same path; quote/message success assertions for AC-3.2; fails before response parsing.
- **T-3.3:** Modify same path; free success/domain-correlation happy path for AC-3.3; fails before method pipeline.
- **T-3.4:** Modify same path; media table accepts `application/json`, mixed-case `Application/JSON ; charset=utf-8`, and `application/problem+json; charset=utf-8`, while rejecting `application/+json` and `application/jsonp`, for AC-3.4; fails before exact essence policy.
- **T-3.5:** Modify same path; decode-before-schema observable response cases for AC-3.5; fails before ordering.
- **T-3.6:** Modify same path; runtime-invalid input per method for AC-3.6; fails before request parsing.
- **T-3.7:** Modify same path; assert injected mock and complete init/return matrix for AC-3.7; fails on incomplete init.

## 3. Green Phase: Minimal Implementation

- **G-3.1:** Modify `api/ApiClient.ts`; add common one-call POST with exact headers/options/body; passes T-3.1.
- **G-3.2:** Modify same path; connect quote/message request and acknowledgement schemas; passes T-3.2.
- **G-3.3:** Modify same path; connect dedicated free schemas and normalized domain equality; passes T-3.3.
- **G-3.4:** Modify same path; accept only JSON essence or application structured suffix; passes T-3.4.
- **G-3.5:** Modify same path; sequence status, media type, JSON decode, then response parse; passes T-3.5.
- **G-3.6:** Modify same path; parse every outbound request before URL/fetch; passes T-3.6.
- **G-3.7:** Modify same path; use only retained injected/default fetch and return parsed output; passes T-3.7.

## 4. Validation And Completion

From `/Users/pete/dev/meetpete/src`, run `npm test -- api/__tests__/ApiClient.operations.test.ts`, `npm run typecheck`, `npm test`, and `npm run build`. Complete when all three operations prove exact one-call transport and narrow validated returns.

## 5. Assumptions & Questions

Assumption: `Response.json()` is the native decoding boundary. Risk: unit success does not establish external availability or CORS. Questions: none.
