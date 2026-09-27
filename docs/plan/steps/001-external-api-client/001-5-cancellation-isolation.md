# 001-5: Cancellation And Isolation

Sources: [Phase §4, §6–8](../../artefacts/prd/phases/phase-01-external-api-client.md), [PRD architecture](../../artefacts/prd/prd.md#architecture), [evidence](../../artefacts/prd/prd-evidence.md), and [current provider](../../../../src/providers/AiSeoProvider.tsx).

## Decision Register

- **DEC-001–DEC-014:** authoritative; especially DEC-001/010–014.
- **DEC-016:** isolation tests remain in a focused file; no production abstraction is added solely for tests.

## Non-Goals

No internal timeout, retry, recovery UI, persistence, auth, telemetry, E2E, route handler, external backend, or edits to current components/providers.

Dependencies: [001-0 setup](001-0-setup-client-boundary.md) through [001-4 failures](001-4-failure-classification.md).

## 1. Acceptance Criteria

- **AC-5.1 (RQ-030):** Given a caller signal, when fetch runs, then that exact signal is passed; only when the signal is aborted and the rejection is identical to its abort reason does it propagate unchanged, while every other rejection is classified as `NetworkError`.
- **AC-5.2 (RQ-031):** Given failure or settlement, then the client performs no retry/recovery; a later explicit invocation is one new independent request.
- **AC-5.3 (RQ-032):** Given simultaneous calls resolving out of order or one aborting, then each retains its body/schema/signal/outcome and cannot mutate another.
- **AC-5.4 (RQ-033):** Given each method at the consumer boundary, then construction plus typed invocation is entry, its own fixed-route JSON POST is interaction, its own parsed type is completion, and classified error/unchanged abort is failure; this does not claim provider contract verification.
- **AC-5.5 (RQ-034):** Given completed client files, then no persistence, timeout, auth, telemetry, health, operator recovery, replay, or automatic fallback facility exists.
- **AC-5.6 (RQ-035):** Given the phase diff, then no route handler/backend or UI/provider behavior changes exist; browser E2E is not required and real integration is not claimed.

## 2. Red Phase: Write Failing Tests

- **T-5.1:** Create `api/__tests__/ApiClient.isolation.test.ts`; unit matrix passes the exact signal, rethrows only when `signal.aborted` and rejection identity equals `signal.reason`, wraps a distinct rejection after abort, and wraps `undefined` rejected while not aborted as `NetworkError`, for AC-5.1; fails on identity loss or either single-condition classification.
- **T-5.2:** Modify same path; call-count test across failure then explicit call for AC-5.2; fails if hidden attempts exist.
- **T-5.3:** Modify same path; deferred two-call out-of-order and one-abort matrices for AC-5.3; fails if state is shared.
- **T-5.4:** Modify same path; consumer-boundary table exercises all three methods and proves each selects its own route, request schema, response schema, return type, and success/failure lifecycle for AC-5.4; fails on cross-wiring and makes no external-service claim.
- **T-5.5:** Modify same path; fake timers and fetch assertions for AC-5.5; fails if client schedules timeout/recovery or extra side effects.
- **T-5.6:** Modify same path; import-boundary smoke test for AC-5.6; fails if using server/UI modules or requiring browser E2E infrastructure.

## 3. Green Phase: Minimal Implementation

- **G-5.1:** Modify `api/ApiClient.ts`; pass signal unchanged and rethrow only when `signal.aborted && rejection === signal.reason`; classify every other rejection as network failure; passes T-5.1.
- **G-5.2:** Modify same path; keep each call to one direct transport attempt with no settlement hooks; passes T-5.2.
- **G-5.3:** Modify same path; keep parsed values, schema, signal, and response in method-local state; passes T-5.3.
- **G-5.4:** Modify same path; make all three methods follow the same complete lifecycle without changing their distinct contracts; passes T-5.4.
- **G-5.5:** Modify same path; remove timers/shared request state/recovery hooks and retain no durable result; passes T-5.5.
- **G-5.6:** Modify `api/ApiClient.ts`; constrain imports to model/native client dependencies and leave the subphase-2-owned barrel plus UI/server trees untouched; passes T-5.6.

## 4. Validation And Completion

From `/Users/pete/dev/meetpete/src`, run `npm test -- api/__tests__/ApiClient.isolation.test.ts`, `npm run typecheck`, `npm test`, and `npm run build`. Complete when abort identity, concurrency, one-attempt behavior, scope diff, and all full-suite commands pass.

## 5. Assumptions & Questions

Assumption: only aborts associated with the supplied signal bypass wrapping; unrelated fetch rejections remain network failures. Risks: GAP-001 provider/CORS and GAP-002 later accessible UI recovery remain unresolved externally. Questions: none.
