## Phase 1: External API client contract and transport

### References

- [Main PRD](../prd.md), especially **Solution**, **Architecture**, and **MVP Definition**.
- [Decision and gaps register](../prd-evidence.md#clarification-and-override-record), DEC-001–DEC-014.
- [Repository engineering and secret-handling guidance](../../../../../.github/copilot-instructions.md#engineering).
- [Frontend architecture and validation conventions](../../../../../.github/instructions/frontend.instructions.md).
- [External integration constraints](../../../../../.github/instructions/integration-dependencies.instructions.md).
- [Public export conventions](../../../../../.github/instructions/barrel-exports-pattern.instructions.md).
- [Package scripts and dependencies](../../../../../src/package.json).
- [TypeScript configuration](../../../../../src/tsconfig.json).
- [Vitest configuration](../../../../../src/vitest.config.ts).
- [Existing model schemas, `websiteDomainSchema`, `aiSeoAreaSchema`, and `aiSeoResultSchema`](../../../../../src/models/schemas.ts).
- [Existing schema tests](../../../../../src/models/__tests__/schemas.test.ts).
- [Current quote state and submission, `Pricing()` and `quoteHref()`](../../../../../src/components/home/Pricing/Pricing.tsx).
- [Canonical `mixNeeds` and `mixSizes`, plus the AI SEO fixture](../../../../../src/data/content.ts).
- [Current message state and submission, `EmailAlternative()` and `emailHref()`](../../../../../src/components/home/Contact/EmailAlternative.tsx).
- [Current AI SEO domain validation, `startAnalysis()`](../../../../../src/providers/AiSeoProvider.tsx).
- [Current AI SEO submit interaction](../../../../../src/components/ai-seo/AiSeoHero/AiSeoHero.tsx).

### Goal

Deliver an independently testable, browser-side typed `ApiClient` contract for `POST /quote`, `POST /message`, and `POST /free-ai-seo`. It must validate outbound requests and all untrusted successful responses with Zod, safely construct URLs from public configuration, send one JSON request per invocation, propagate caller cancellation, and expose deterministic classified failures.

Done means the client and schemas are usable by a future UI migration but no current component/provider is wired to them. No Next.js route handler, external backend, authentication, credential, persistence, retry, telemetry, or visual/UI change is part of this phase. Excluding an internal client timeout is a **recommended scope policy** because callers already control cancellation and no source defines a timeout.

### Features / User Stories with Acceptance Criteria

1. **Operation-specific request contracts**

   As a future browser consumer, I need exact request types so that only data already represented by the current experiences crosses the external boundary.

   The exact user-decided field sets and canonical source values are requirements. Strict unknown-key handling, cardinality/duplicate handling, empty-string treatment, and conditional email syntax are **recommended request-validation policies**.

   - **Given** a quote request, **when** it is parsed, **then** its only keys are `selectedServices`, `teamSize`, `name`, `email`, and `notes`.
   - **Given** `selectedServices`, **when** it is parsed, **then** it is a duplicate-free array of zero to six values drawn only from the six current `mixNeeds` labels.
   - **Given** `teamSize`, **when** it is parsed, **then** it is exactly one of the three current `mixSizes` labels.
   - **Given** a quote request containing `businessName`, `budget`, `timeline`, or any other extra property, **when** parsed by the strict schema, **then** it fails as `invalid-request` and `fetch` is called zero times.
   - **Given** a quote request, **then** `name`, `email`, and `notes` keys are present but may contain empty strings; a non-empty email must satisfy Zod email syntax.
   - **Given** a message request, **when** it is parsed, **then** its only keys are `name`, `email`, optional `businessName`, and `message`; `name`, `email`, and `message` keys are present but may contain empty strings; omission of `businessName` is valid; a non-empty email must satisfy Zod email syntax; any extra key is invalid.
   - **Given** a free-AI-SEO request with a website value accepted by `websiteDomainSchema`, **when** it is parsed, **then** the serialized `domain` equals that schema’s normalized lowercase hostname.
   - **Given** a free-AI-SEO request rejected by `websiteDomainSchema`, **when** the operation is called, **then** it fails as `invalid-request` and `fetch` is called zero times.
   - **Given** empty website input and structurally invalid website input, **when** each is parsed, **then** its issues preserve the two distinct existing `websiteDomainSchema` messages.
   - **Given** any valid request, **then** its public TypeScript type is inferred from its Zod schema rather than duplicated manually.

2. **Narrow response contracts**

   As a caller, I need validated narrow results so that API acceptance is not overstated and paid/full audit data cannot enter the free-result contract.

   The acknowledgement shape, dedicated narrow field set, and exactly-seven count are confirmed requirements. Strict unknown-key rejection, non-null numeric area scores, trimming, and request/response domain correlation are **recommended narrow-contract policies**.

   - **Given** `/quote` or `/message` returns a 2xx JSON body exactly matching `{ requestId: <trimmed non-empty string>, status: 'accepted' }`, **when** parsed, **then** the client resolves with that typed acknowledgement.
   - **Given** either acknowledgement omits a field, has a blank/whitespace-only `requestId`, uses any status other than the literal `accepted`, or contains an extra field, **when** parsed, **then** it fails as `invalid-response`.
   - **Given** an accepted acknowledgement, **then** its documented meaning is only external API acceptance; neither the type, error messages, tests, nor documentation claim delivery, processing completion, email transmission, or receipt by Pete.
   - **Given** `/free-ai-seo` returns a 2xx JSON body, **when** parsed, **then** its only top-level keys are `domain`, `score`, `verdict`, `issueSummary`, and `areas`.
   - **Given** a valid narrow free result, **then** `domain` satisfies existing domain normalization, `score` is numeric from 0 through 100 inclusive, `verdict` and `issueSummary` are non-empty strings, and `areas` contains exactly seven entries.
   - **Given** any area, **then** it contains only a non-empty `label` and numeric `score` from 0 through 100 inclusive.
   - **Recommended string policy:** **Given** `requestId`, `verdict`, `issueSummary`, or an area `label`, **when** parsed, **then** it is trimmed and whitespace-only content fails. “Short verdict” is descriptive provider intent, not a client-enforced length contract; no maximum is invented because the sources define none.
   - **Given** six or eight areas, a nullable score, an area `question`, or any excluded top-level field such as `meta`, `competitors`, detailed findings, action plans, or fixes, **when** parsed, **then** it fails as `invalid-response`.
   - **Given** a schema-valid free result whose normalized `domain` differs from the normalized request domain, **when** correlated, **then** it fails as `invalid-response`.
   - **Given** the new free-result type, **then** it is inferred from a dedicated schema and does not alias, extend, or return the existing full `AiSeoResult`.

3. **Safe configuration and URL construction**

   As a client consumer, I need deterministic endpoint construction so that only fixed intended operations can be called.

   The URL, redirect, credentials, and header rules below are the recommended safe-transport policy defined in the [main PRD](../prd.md#transport-and-url-behaviour).

   - **Given** `NEXT_PUBLIC_API_BASE_URL` is absent, relative, non-HTTP(S), contains credentials, a query, or a fragment, **when** the `ApiClient` constructor validates configuration, **then** it synchronously throws `ConfigurationError` before `fetch`.
   - **Given** the same valid base once with and once without a trailing slash, **when** an operation URL is built, **then** both forms produce the same absolute URL with exactly one separator.
   - **Given** a valid base containing a pathname prefix, **when** a fixed endpoint is appended, **then** the prefix is preserved.
   - **Given** each operation, **then** its route is fixed internally as `/quote`, `/message`, or `/free-ai-seo`; no caller-controlled route or arbitrary URL is accepted.
   - **Given** browser configuration, **then** no credential, API key, token, or private value is read from or added to `NEXT_PUBLIC_API_BASE_URL`, headers, or request bodies.
   - **Given** a valid operation, **then** fetch receives `redirect: 'error'`, `credentials: 'omit'`, and only `Accept: application/json` plus `Content-Type: application/json`; redirected POST data cannot become typed success through client-followed redirects.

4. **One-attempt JSON transport and cancellation**

   As a caller, I need predictable transport and cancellation without hidden side effects.

   - **Given** any valid operation request, **when** invoked, **then** the injected/default fetch is called exactly once with the resolved URL, `method: 'POST'`, the defined headers/credentials/redirect policy, and `JSON.stringify()` of the Zod-parsed request.
   - **Given** a caller supplies an `AbortSignal`, **when** fetch is invoked, **then** `RequestInit.signal` is the exact same object.
   - **Given** fetch rejects because the supplied signal is aborted, **when** the operation rejects, **then** the platform abort rejection propagates and is not relabelled as `network`.
   - **Given** any failure, **then** the client performs no automatic retry, fallback request, persistence, telemetry, or success substitution.
   - **Given** an operation has settled, **when** its caller explicitly invokes it again, **then** that is a new independent one-attempt request; the client itself performs no recovery request.
   - **Given** simultaneous invocations, **then** each retains its own parsed body, response schema, signal, completion, and failure; aborting one does not abort, resolve, reject, or mutate another.

5. **Classified failures**

   As a caller, I need stable failure classes so that a later UI can respond honestly.

   The criteria below apply the **recommended error representation** defined in the [main PRD](../prd.md#failure-contract). Ordinary failures reject with that exported error-class union; they are not returned as result objects.

   - **Given** outbound Zod validation fails, **then** the promise rejects with `InvalidRequestError`, `kind: 'invalid-request'`, and readonly Zod `issues`, and has made zero fetch calls.
   - **Given** fetch rejects for a non-abort reason, **then** the promise rejects with `NetworkError` and `kind: 'network'`.
   - **Given** fetch returns any non-2xx status, **then** the promise rejects with `HttpError`, `kind: 'http'`, and numeric `status`, and does not parse the body as success.
   - **Given** a 2xx response, **when** the media-type essence is trimmed and compared case-insensitively, **then** `application/json`, `application/json; charset=utf-8`, and `application/vnd.api+json` are accepted media types, while a missing type, `text/plain`, and `text/json` reject with `InvalidResponseError` and `kind: 'invalid-response'`.
   - **Given** an accepted JSON media type whose body is empty (including `204`), malformed, or non-JSON, **then** the promise rejects with `InvalidResponseError` and `kind: 'invalid-response'`.
   - **Given** a decoded 2xx JSON body violates its operation schema or request-domain correlation, **then** the promise rejects with `InvalidResponseError`, `kind: 'invalid-response'`, includes readonly Zod `issues` when Zod produced them, and never exposes the body as typed success.
   - **Given** invalid configuration or URL construction, **then** the constructor throws `ConfigurationError` with `kind: 'configuration'` and fetch is called zero times.
   - **Given** `InvalidResponseError`, **then** its readonly `issues` property is present only for Zod schema failures and omitted for media-type, empty-body, decoding, and domain-correlation failures.
   - **Given** any exported client error, **then** its only variant-specific public data is that listed above; its generic message and fields contain no input, raw body, credential, or public cause.
   - **Given** implementation error handling, **then** catches are limited to the fetch, JSON-decoding, and schema-validation boundaries required for these classifications; there is no broad catch or silent fallback.
   - **Recommended data-minimisation policy:** **Given** any operation, **then** it does not log requests, responses, errors, credentials, names, email addresses, notes, or messages.

6. **Contract-focused automated verification**

   As a maintainer, I need fast tests that prove the isolated client without depending on an unavailable external backend.

   - **Given** the unit suite, **then** it injects a Vitest `vi.fn()` fetch-compatible function and performs no real network request.
   - **Given** each operation, **then** tests assert the exact resolved URL, method, headers, credentials/redirect policy, parsed/serialized body, fetch call count, successful inferred return, and exact signal identity.
   - **Given** the failure matrix, **then** tests cover missing/unsafe configuration, each complete error-class shape, each invalid request, network rejection, representative non-2xx statuses, response media type, empty/204 success, malformed/non-JSON 2xx, schema-invalid 2xx, strict extra keys, domain mismatch, and caller abort.
   - **Given** free-result contract tests, **then** six and eight areas fail, exactly seven valid areas succeed, score boundaries 0 and 100 succeed, out-of-range/null scores fail, and excluded full-result fields fail.
   - **Given** acknowledgement tests, **then** valid acceptance succeeds and missing, empty, whitespace-only, wrong-status, and extra-field variants fail without any delivery claim.
   - **Given** concurrent-call tests, **then** out-of-order completion and aborting one of two calls prove per-call response/signal isolation.
   - **Given** the completed implementation, **when** run from `/Users/pete/dev/meetpete/src`, **then** `npm test`, `npm run typecheck`, and `npm run build` all exit successfully.
   - **Given** this isolated phase, **then** browser E2E is not required because no user-facing journey is migrated; real integration readiness is not claimed by unit tests.

7. **Journey completeness and applicability**

   As a planner, I need the client journeys to state all quality dimensions without implying UI or backend work.

   - **Given** each of quote, message, and free-AI-SEO, **then** entry is construction with valid public configuration plus a typed method invocation; interaction is its one JSON POST; completion is its validated typed response; and failure is its applicable classified rejection or unchanged abort.
   - **Given** persistence, **then** it is not applicable: the client retains no remote or durable state and this phase adds no storage.
   - **Given** recovery, **then** the client makes no automatic attempt; after settlement a caller may start a new independent invocation.
   - **Given** concurrency, **then** simultaneous calls and signals are isolated with no shared mutable per-request state.
   - **Given** accessibility, **then** rendered-control, focus, keyboard, screen-reader, touch-target, contrast, reduced-motion, and browser/assistive-technology criteria are not applicable because this phase adds no UI and changes no existing UI. A later UI migration must define those states and accessible error/status announcements.
   - **Given** provider idempotency, replay protection, health, and operator recovery, **then** they are not client behaviours in this phase: there are no retries, backend changes, health endpoints, or operations interfaces. Treating these as external rather than adding client facilities is a **recommended scope interpretation** of the confirmed exclusions.

8. **Scope guard**

   As the product owner, I need this contract delivered without silently introducing a backend or changing existing journeys.

   - **Given** the phase diff, **then** it contains no Next.js route handler, server action, backend implementation, private environment variable, auth logic, persistent store, retry/backoff, telemetry/analytics, or new HTTP dependency.
   - **Given** the phase diff, **then** `Pricing`, `EmailAlternative`, `Contact`, `AiSeoProvider`, `AiSeoHero`, `AiSeoProgress`, and `AiSeoResults` retain their existing transport/demo behaviour.
   - **Given** future production integration, **then** provider endpoint and CORS compatibility are verified outside this phase before a UI migration relies on the client.

### Risks

- **External compatibility:** No external API implementation or durable provider specification exists in this repository. Unit-tested client completion does not prove endpoint availability, CORS, or deployed schema compatibility. Mitigation: require provider contract/CORS evidence in the later integration phase; do not add a proxy here.
- **Public configuration:** Browser-visible configuration cannot carry a secret. Mitigation: reject credential-bearing base URLs and add no auth header.
- **Personal data:** Quote/message requests contain names, email addresses, and free text. Mitigation: strict minimal schemas, no payloads in classified failures, no telemetry, and no extra fields.
- **Contract drift:** Current UI labels are display strings rather than stable server identifiers. Mitigation: freeze them in schema tests for this client phase; any later identifier migration needs an explicit contract decision.
- **Over-broad AI SEO data:** The existing full `AiSeoResult` includes fields excluded from the free response. Mitigation: dedicated strict schema and negative tests for all excluded categories.
- **Fixture confusion:** Current results combine a submitted domain with static fixture metrics. Mitigation: never return the fixture or any success-shaped fallback; require request/response domain correlation. Timer/request coordination remains deferred with UI migration.
- **Cancellation semantics:** Catching abort as an ordinary network failure would mislead consumers. Mitigation: propagate the platform abort unchanged and test exact signal identity.
- **No automatic recovery:** A failed request is not retried. This is intentional to avoid duplicate submissions; a later caller may offer an explicit user-initiated retry.
