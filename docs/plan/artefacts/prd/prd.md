# External API client PRD

## Product brief summary

Meet Pete currently keeps the three relevant browser experiences local: the Pricing quote mixer and alternative contact form create `mailto:` links, while Free AI SEO validates a domain and displays simulated/static results. The focused MVP in this PRD adds a typed, browser-side `fetch` boundary for a separately operated external API without changing those user interfaces.

The client has exactly three operations:

| Operation | Method and path | Request | Successful return |
|---|---|---|---|
| Quote | `POST /quote` | `selectedServices`, `teamSize`, `name`, `email`, `notes` | Strict acceptance acknowledgement |
| Message | `POST /message` | `name`, `email`, optional `businessName`, `message` | Strict acceptance acknowledgement |
| Free AI SEO | `POST /free-ai-seo` | Normalized `domain` | Strict, narrow free-result contract |

This scope is grounded in the current quote fields ([Pricing, `Pricing()` and `quoteHref()`](../../../../src/components/home/Pricing/Pricing.tsx)), canonical quote choices ([content, `mixNeeds` and `mixSizes`](../../../../src/data/content.ts)), current message fields ([EmailAlternative, state and `emailHref()`](../../../../src/components/home/Contact/EmailAlternative.tsx)), and current domain normalization ([schemas, `websiteDomainSchema`, lines 3–21](../../../../src/models/schemas.ts)). The external transport and exact new wire contracts are confirmed user decisions recorded in the [clarification record](prd-evidence.md#clarification-and-override-record).

### Outcomes

- A future browser consumer can call any of the three operations through one typed client.
- Invalid outbound data never reaches `fetch`.
- Untrusted successful responses never reach a caller without operation-specific Zod validation.
- Callers can distinguish invalid requests, network failures, non-2xx responses, and invalid successful responses.
- Cancellation remains under caller control through exact `AbortSignal` propagation.
- Quote/message success means API acceptance only; it never means delivery, processing completion, email transmission, or receipt by Pete.

### Non-goals

- Next.js route handlers, an external backend, or any other server implementation.
- UI/provider migration from the existing `mailto:` and simulated-result flows.
- Authentication, credentials, remote persistence, automatic retries, telemetry, analytics, booking integration, or paid/full AI SEO data. An internal client timeout is additionally excluded as a **recommended scope policy** because callers already control cancellation and no timeout target is sourced.
- Visual, layout, interaction, or copy changes.

These boundaries follow the user decisions in [DEC-001, DEC-009, and DEC-011](prd-evidence.md#clarification-and-override-record) and the repository rule not to assume an unestablished backend or integration ([integration dependencies, “External integrations and content”](../../../../.github/instructions/integration-dependencies.instructions.md)).

## Solution

### Public contract

The implementation will provide a browser-side `ApiClient`, configured only by `NEXT_PUBLIC_API_BASE_URL`, and operation-specific Zod schemas with types inferred from those schemas. `NEXT_PUBLIC_API_BASE_URL` is public configuration and must contain no credential, token, API key, or other private value ([repository engineering guidance](../../../../.github/copilot-instructions.md#engineering); [DEC-002](prd-evidence.md#clarification-and-override-record)).

The following wire objects are the deterministic interpretation of the confirmed field decisions and current field names:

```ts
type QuoteRequest = {
  selectedServices: Array<
    | 'AI-powered website'
    | 'AI assistant'
    | 'AI-SEO set-up'
    | 'Monthly content'
    | 'Listings and reviews'
    | 'Hosting and care'
  >;
  teamSize: 'Just me' | '2–10 people' | '10+ people';
  name: string;
  email: string;
  notes: string;
};

type MessageRequest = {
  name: string;
  email: string;
  businessName?: string;
  message: string;
};

type FreeAiSeoRequest = {
  domain: string; // parsed output of websiteDomainSchema
};

type AcceptanceAcknowledgement = {
  requestId: string; // trimmed value must be non-empty
  status: 'accepted';
};

type FreeAiSeoResult = {
  domain: string;
  score: number; // 0–100 inclusive
  verdict: string; // non-empty
  issueSummary: string; // non-empty
  areas: [
    FreeAiSeoArea,
    FreeAiSeoArea,
    FreeAiSeoArea,
    FreeAiSeoArea,
    FreeAiSeoArea,
    FreeAiSeoArea,
    FreeAiSeoArea,
  ];
};

type FreeAiSeoArea = {
  label: string; // non-empty
  score: number; // 0–100 inclusive
};
```

All request and response objects are strict: unknown keys fail validation rather than being silently accepted or used. This is a **recommended implementation policy** that makes the user’s explicit field exclusions observable and prevents a full/paid AI SEO payload from crossing the client boundary. The free-result score bounds reuse the existing 0–100 rule ([schemas, `aiSeoAreaSchema` and `aiSeoResultSchema`, lines 84–101](../../../../src/models/schemas.ts)); exactly seven areas and the narrow field set come from [DEC-008](prd-evidence.md#clarification-and-override-record). The existing full schema permits one or more nullable-score areas. Interpreting the dedicated narrow response’s `score` fields as non-null numbers is a **recommended narrow-contract policy**, not an override of the still-unchanged full-result schema. Labels and ordering are provider-controlled because neither the source nor the user decision fixes their values or order.

To match current quote behaviour, `selectedServices` may be empty, `teamSize` is always one of `mixSizes` and defaults at the UI layer to `Just me`, and quote `name`, `email`, and `notes` strings may be empty ([Pricing state and form](../../../../src/components/home/Pricing/Pricing.tsx)). The following validation details are **recommended policies** beyond the confirmed field set: duplicates or non-canonical services fail validation, and a non-empty email must satisfy Zod email syntax, matching the current HTML email input without making it required. To match the current contact field contract, `businessName` is the only optional message property, while `name`, `email`, and `message` keys must be present but may contain empty strings because the current form does not mark them required ([EmailAlternative form](../../../../src/components/home/Contact/EmailAlternative.tsx)). Requiring a non-empty message email to satisfy Zod email syntax is likewise a **recommended policy**; present string values are otherwise transported as entered.

`FreeAiSeoRequest.domain` must be produced by the existing `websiteDomainSchema`, including trimming, HTTP(S) validation, credential rejection, hostname extraction, and lowercase normalization ([schema and tests](../../../../src/models/__tests__/schemas.test.ts)). The dedicated free-result schema must not reuse `aiSeoResultSchema`, whose `meta`, area `question`, competitor fields, and broader result shape are explicitly excluded ([current full-result schema, lines 84–101](../../../../src/models/schemas.ts)).

### Transport and URL behaviour

Each operation:

1. Parses its outbound request with its Zod request schema.
2. Resolves its fixed path against the configured base URL.
3. Calls the injected/default browser `fetch` exactly once with `method: 'POST'`, `Content-Type: application/json`, the JSON-serialized parsed request, and the caller’s exact optional `AbortSignal`. The additional `Accept`, credentials, and redirect settings below are recommended policy.
4. Classifies a non-2xx response without treating its body as success.
5. Decodes a 2xx body as JSON and validates it with the operation’s response schema.
6. Returns only the parsed inferred type.

**Recommended transport policy:** validate configuration before transport as an absolute `http:` or `https:` URL with no username, password, query, or fragment; accept a base with or without a trailing slash; preserve any configured pathname prefix (for example, `https://api.example.test/v1` becomes `https://api.example.test/v1/quote`); append one of the three fixed operation segments with exactly one separator; and do not accept caller-provided paths. Set `redirect: 'error'` so a redirected PII-bearing POST cannot become a typed success or forward through client-approved redirect following. Set `credentials: 'omit'` and send no headers other than `Accept` and `Content-Type`. Invalid or absent configuration produces a `configuration` failure before `fetch`. These recommendations operationalize “construct URLs safely” without adding credentials or a proxy.

A 2xx response is JSON only when its media-type essence—characters before the first `;`, trimmed and compared case-insensitively—is `application/json` or an `application/*+json` structured-suffix type, and its body decodes successfully. Thus `application/json; charset=utf-8` and `application/vnd.api+json` are accepted, while a missing type, `text/plain`, and `text/json` are rejected. A rejected media type, empty body (including `204`), malformed JSON, or schema mismatch is `invalid-response`. A free-result response domain is normalized through `websiteDomainSchema` and must equal the normalized requested domain; mismatch is `invalid-response`. These are **recommended validation policies** that prevent content confusion and cross-request result substitution.

### Failure contract

**Recommended error representation:** ordinary failures reject the operation promise with one of five exported `Error` subclasses forming the `ApiClientError` union. Every subclass has a readonly literal `kind` and a generic non-sensitive `message`; none exposes submitted input, raw request/response bodies, credentials, or a public `cause`. `InvalidRequestError` exposes a readonly defensive copy of Zod issues. `InvalidResponseError` has an optional readonly `issues` property: it is present only for a Zod schema failure and omitted for media-type, empty-body, JSON-decoding, or domain-correlation failures. `HttpError` exposes only the numeric response `status`.

| Error class / discriminant | Trigger | Complete public data beyond `name` and `message` |
|---|---|---|
| `ConfigurationError` / `configuration` | Missing or unsafe `NEXT_PUBLIC_API_BASE_URL`, or URL construction failure | `kind` |
| `InvalidRequestError` / `invalid-request` | Outbound Zod parse fails | `kind`, `issues` |
| `NetworkError` / `network` | `fetch` rejects for a reason other than caller cancellation | `kind` |
| `HttpError` / `http` | Any non-2xx response | `kind`, `status` |
| `InvalidResponseError` / `invalid-response` | A 2xx media type/body/JSON/domain/schema check fails | `kind`, `issues` only when Zod produced issues |

The three operation methods reject rather than return success/error unions. Under the recommended representation, an abort caused by the supplied signal propagates as the original platform rejection object and is not wrapped or relabelled `network`. Catching is limited to the boundary needed to classify `fetch` rejection, JSON decoding, and Zod parsing; there is no broad catch, success-shaped fallback, or retry. Non-2xx bodies are neither parsed nor exposed. No client path logs request values, response bodies, errors, credentials, names, email addresses, notes, or messages.

### Proposed implementation boundary

The following exact source organization and public signatures are **recommendations** for decomposition, not claims about current files:

- `src/models/apiSchemas.ts`: request/response schemas and inferred types.
- `src/models/__tests__/apiSchemas.test.ts`: schema boundary tests.
- `src/api/ApiClient.ts`: `ApiClient`, URL/transport logic, and exported error classes/union.
- `src/api/__tests__/ApiClient.test.ts`: injected-fetch transport and failure tests.
- `src/api/index.ts`: deliberate public exports for the client and its public error/types.
- `src/models/index.ts`: explicit exports for the new API schemas and inferred types.

```ts
new ApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  fetchImpl?: typeof fetch,
});

submitQuote(request: QuoteRequest, options?: { signal?: AbortSignal }): Promise<AcceptanceAcknowledgement>;
sendMessage(request: MessageRequest, options?: { signal?: AbortSignal }): Promise<AcceptanceAcknowledgement>;
requestFreeAiSeo(request: FreeAiSeoRequest, options?: { signal?: AbortSignal }): Promise<FreeAiSeoResult>;
```

The constructor validates configuration synchronously and retains no mutable per-request state. Each method revalidates its typed input at runtime. Concurrent invocations keep independent request bodies, signals, response parsing, and failures.

### Verification strategy

Future tests use Vitest and an injected fetch-compatible function; no test performs a real external request. Existing conventions and scripts are documented in [package.json](../../../../src/package.json), [Vitest configuration](../../../../src/vitest.config.ts), and the shared [test setup](../../../../src/test/setup.ts).

The contract suite must cover all three valid requests, both existing website validation messages, transformed-domain serialization and response correlation, invalid-request zero-call behaviour, safe base URL variants, prefixed bases, exact POST headers/body/signal/credentials/redirect policy, JSON media types, empty/204 bodies, every 2xx schema, every complete error variant, abort identity/propagation, one-attempt behaviour, acknowledgement meaning, strict extra-key rejection, concurrent-call isolation, and free-result area counts of six, seven, and eight.

## Tech Stack

- Next.js 16 and React 19 application, with the client remaining usable from browser/client-component code ([package manifest](../../../../src/package.json)).
- TypeScript 5.9 in strict mode with DOM types available ([TypeScript configuration](../../../../src/tsconfig.json)).
- Native browser `fetch`, `URL`, and `AbortSignal`; no added HTTP library.
- Zod 4 for runtime request and untrusted-response validation, with TypeScript types inferred from schemas ([model conventions](../../../../.github/instructions/frontend.instructions.md); [existing schema pattern](../../../../src/models/schemas.ts)).
- Vitest 3 with injected/mocked fetch for unit and contract tests ([package scripts](../../../../src/package.json); [Vitest configuration](../../../../src/vitest.config.ts)).

Implementation validation commands, run from `/Users/pete/dev/meetpete/src`, are:

```text
npm test
npm run typecheck
npm run build
```

## Architecture

The architecture is a narrow browser boundary:

```text
Future browser consumer (out of scope)
        |
        v
Typed ApiClient operation
        |
        +-- outbound operation-specific Zod parse
        +-- safe fixed-path URL resolution
        +-- injected/default fetch + caller AbortSignal
        +-- HTTP/transport classification
        +-- inbound operation-specific Zod parse
        |
        v
Separately operated external API (out of scope)
```

The relevant current boundaries are the [model layer](../../../../src/models/schemas.ts), [model public exports](../../../../src/models/index.ts), [Pricing client component](../../../../src/components/home/Pricing/Pricing.tsx), [EmailAlternative client component](../../../../src/components/home/Contact/EmailAlternative.tsx), and [AI SEO provider](../../../../src/providers/AiSeoProvider.tsx). Any new barrel must be a deliberate stable public boundary and use explicit type exports, following [barrel export instructions](../../../../.github/instructions/barrel-exports-pattern.instructions.md).

The external API must independently support direct credential-free browser requests, including deployment CORS policy. That external readiness is a dependency, not work to expose through this repository. The client phase can be complete through deterministic unit/contract tests without claiming production integration or changing the current UI.

Existing AI SEO presentation values—5,000 ms total simulated progress, 600 ms check advancement, 80 ms polling, “About 60 seconds,” fixture “42s,” score 59, 13 issues, three quick fixes, and projected 78/100—remain fixture/presentation evidence only. None defines client latency, timeout, retries, result values, or an API service-level target ([progress component](../../../../src/components/ai-seo/AiSeoProgress/AiSeoProgress.tsx); [hero](../../../../src/components/ai-seo/AiSeoHero/AiSeoHero.tsx); [fixture](../../../../src/data/content.ts)).

## MVP Definition

MVP is complete when the single focused phase delivers:

1. Dedicated strict request/response Zod schemas and inferred types for all three operations.
2. A browser-side typed `ApiClient` configured by `NEXT_PUBLIC_API_BASE_URL`.
3. Safe fixed-path construction and exactly one JSON POST per invocation.
4. The classified failure contract and unchanged caller-cancellation propagation.
5. Injected-fetch Vitest coverage for the complete behaviour matrix.
6. Passing `npm test`, `npm run typecheck`, and `npm run build` from `src/`.

MVP does not require a live external service, UI wiring, browser E2E, telemetry, persistence, authentication, retry logic, or any backend. Release to a real browser consumer remains gated on external confirmation of endpoint compatibility and CORS; that does not block completion of this isolated client contract.

## Agentic Delivery Sequence

1. [Phase 1: External API client contract and transport](phases/phase-01-external-api-client.md)
