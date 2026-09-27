# 001-2: Client Construction

Sources: [Phase §3 and §5](../../artefacts/prd/phases/phase-01-external-api-client.md), [PRD transport/failure contract](../../artefacts/prd/prd.md#transport-and-url-behaviour), [evidence](../../artefacts/prd/prd-evidence.md), and [barrel rules](../../../../.github/instructions/barrel-exports-pattern.instructions.md).

## Decision Register

- **DEC-001–DEC-014:** authoritative; especially DEC-002/003/010.
- **DEC-015/016:** use the planned API boundary and focused tests; no alternate client/config abstraction.

## Non-Goals

No operation transport, environment loader, secret, auth header, arbitrary route, server code, or retry.

Dependencies: [001-0 setup](001-0-setup-client-boundary.md) and [001-1 contracts](001-1-wire-contracts.md).

## 1. Acceptance Criteria

- **AC-2.1 (RQ-009):** Given absent, relative, non-HTTP(S), credentialed, query, or fragment base URL, when constructed, then `ConfigurationError` is thrown synchronously before fetch.
- **AC-2.2 (RQ-010):** Given valid bases with/without trailing slash or a pathname prefix, when endpoints resolve, then the prefix is preserved and exactly one separator is used.
- **AC-2.3 (RQ-011):** Given the public client, when inspected, then callers can invoke only fixed quote, message, and free-AI-SEO methods and cannot supply a path/URL.
- **AC-2.4 (RQ-012):** Given construction and exported API, when inspected, then only public base URL and optional fetch are accepted; no credential/private value is read or carried.
- **AC-2.5 (RQ-013):** Given omitted or supplied `fetchImpl`, when constructed, then native fetch or that exact compatible function is retained and the deliberate barrel exports the client/errors/public option types.
- **AC-2.6 (RQ-014):** Given a constructed client/error, then no per-request mutable state exists and public error fields are only generic message/name, literal kind, and documented variant data.

## 2. Red Phase: Write Failing Tests

- **T-2.1:** Create `api/__tests__/ApiClient.configuration.test.ts`; unit absent/relative/non-HTTP(S)/credentials/query/fragment invalid-base table with synchronous throw and zero-fetch assertions for AC-2.1; fails because constructor is absent.
- **T-2.2:** Modify same path; unit private-resolver structural-inspection table for `https://api.test/v1` and `/v1/` producing `https://api.test/v1/quote`, plus prefixed message/free routes, for AC-2.2; fails because resolver is absent. Access uses a test-only TypeScript structural cast, never a public method or production seam.
- **T-2.3:** Modify same path; public-surface/type test for AC-2.3; fails because methods are absent.
- **T-2.4:** Modify same path; compile-time constructor-option matrix rejects credentials, headers, tokens, and unknown keys while accepting only base URL/fetch for AC-2.4; fails before the exact option type exists.
- **T-2.5:** Modify same path; test-only structural inspection proves the exact injected/default fetch is captured at construction, and barrel import/type assertions prove exports for AC-2.5; fails before retained state and exports exist. No new public inspection API is allowed.
- **T-2.6:** Modify same path; error own-property and independent-instance assertions for AC-2.6; fails before classes exist.

## 3. Green Phase: Minimal Implementation

- **G-2.1:** Create `api/ApiClient.ts`; validate and normalize constructor base URL, define `ConfigurationError`; passes T-2.1.
- **G-2.2:** Modify same path; add private fixed-segment URL construction preserving prefixes; passes T-2.2.
- **G-2.3:** Modify same path; declare only three typed operation methods, initially reaching a narrow internal boundary; passes T-2.3.
- **G-2.4:** Modify same path; limit constructor options to `baseUrl` and optional `fetchImpl`; passes T-2.4.
- **G-2.5:** Create `api/index.ts`; explicitly export client, five errors, union, and public option types with type-only syntax; passes T-2.5.
- **G-2.6:** Modify `api/ApiClient.ts`; implement minimal safe error classes and immutable construction state; passes T-2.6.

## 4. Validation And Completion

From `/Users/pete/dev/meetpete/src`, run `npm test -- api/__tests__/ApiClient.configuration.test.ts`, `npm run typecheck`, `npm test`, and `npm run build`. Complete when invalid construction is synchronous, public imports typecheck, and only `api/ApiClient.ts` plus `api/index.ts` are production changes.

## 5. Assumptions & Questions

Assumption: consumers pass `process.env.NEXT_PUBLIC_API_BASE_URL`; the client does not read environment state itself. Risk: no provider/CORS evidence exists (GAP-001). Questions: none.
