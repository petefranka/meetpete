# Step 001 Spine: External API Client

## Overview

Classification: **mixed**; missing client modules require setup before Red tests. Sources: [phase](../../artefacts/prd/phases/phase-01-external-api-client.md), [PRD](../../artefacts/prd/prd.md), [evidence](../../artefacts/prd/prd-evidence.md).

**Non-goals:** UI/backend, auth, persistence, retries, telemetry, E2E, or full-result changes. **Risk/assumption:** provider/CORS remains unverified; existing tooling suffices.

**Source requirement ledger**

| ID | Required observable behaviour and source | Sole subphase → criterion → Red → Green |
|---|---|---|
| RQ-001 | Quote shape/choices/empties/email; Phase §1.1–5, DEC-004 | 1 → AC-1.1 → T-1.1 → G-1.1 |
| RQ-002 | Quote invalids fail pre-fetch; Phase §1.2–5 | 1 → AC-1.2 → T-1.2 → G-1.2 |
| RQ-003 | Strict message shape; Phase §1.6, DEC-005 | 1 → AC-1.3 → T-1.3 → G-1.3 |
| RQ-004 | Domain normalization/messages; Phase §1.7–9, DEC-007 | 1 → AC-1.4 → T-1.4 → G-1.4 |
| RQ-005 | Acceptance-only acknowledgement; Phase §2.1–3, DEC-006 | 1 → AC-1.5 → T-1.5 → G-1.5 |
| RQ-006 | Narrow free result/seven areas; Phase §2.4–7, DEC-008 | 1 → AC-1.6 → T-1.6 → G-1.6 |
| RQ-007 | Full fields/bad counts/scores rejected; Phase §2.8 | 1 → AC-1.7 → T-1.7 → G-1.7 |
| RQ-008 | Inferred types; no `AiSeoResult`; Phase §1.10/§2.10 | 1 → AC-1.8 → T-1.8 → G-1.8 |
| RQ-009 | Unsafe base throws synchronously; Phase §3.1 | 2 → AC-2.1 → T-2.1 → G-2.1 |
| RQ-010 | Prefix-safe URLs; Phase §3.2–3 | 2 → AC-2.2 → T-2.2 → G-2.2 |
| RQ-011 | Fixed routes only; Phase §3.4, DEC-003 | 2 → AC-2.3 → T-2.3 → G-2.3 |
| RQ-012 | No secrets; Phase §3.5, DEC-002 | 2 → AC-2.4 → T-2.4 → G-2.4 |
| RQ-013 | Injectable/default fetch and public exports; PRD proposed boundary | 2 → AC-2.5 → T-2.5 → G-2.5 |
| RQ-014 | Stateless requests/safe errors; PRD failure contract | 2 → AC-2.6 → T-2.6 → G-2.6 |
| RQ-015 | One exact JSON POST; Phase §3.6/§4.1 | 3 → AC-3.1 → T-3.1 → G-3.1 |
| RQ-016 | Ack-only quote/message; Phase §2.1–3 | 3 → AC-3.2 → T-3.2 → G-3.2 |
| RQ-017 | Narrow free result/domain match; Phase §2.4–10 | 3 → AC-3.3 → T-3.3 → G-3.3 |
| RQ-018 | JSON media policy; Phase §5.4 | 3 → AC-3.4 → T-3.4 → G-3.4 |
| RQ-019 | 2xx body decoded then operation schema parsed; PRD transport steps 5–6 | 3 → AC-3.5 → T-3.5 → G-3.5 |
| RQ-020 | Runtime input revalidation; PRD proposed boundary | 3 → AC-3.6 → T-3.6 → G-3.6 |
| RQ-021 | Injected fetch/exact calls; Phase §6.1–2 | 3 → AC-3.7 → T-3.7 → G-3.7 |
| RQ-022 | Invalid request/issues/zero fetch; Phase §5.1 | 4 → AC-4.1 → T-4.1 → G-4.1 |
| RQ-023 | Non-abort rejection is network; Phase §5.2 | 4 → AC-4.2 → T-4.2 → G-4.2 |
| RQ-024 | Non-2xx HTTP/no parse; Phase §5.3 | 4 → AC-4.3 → T-4.3 → G-4.3 |
| RQ-025 | Bad media is invalid response/no issues; Phase §5.4/8 | 4 → AC-4.4 → T-4.4 → G-4.4 |
| RQ-026 | Bad JSON is invalid response/no issues; Phase §5.5/8 | 4 → AC-4.5 → T-4.5 → G-4.5 |
| RQ-027 | Schema failure has readonly issues; Phase §5.6/8 | 4 → AC-4.6 → T-4.6 → G-4.6 |
| RQ-028 | Domain mismatch has no issues; Phase §2.9/§5.6/8 | 4 → AC-4.7 → T-4.7 → G-4.7 |
| RQ-029 | Narrow catches; no leaks/logging/fallback; Phase §5 AC9–11 | 4 → AC-4.8 → T-4.8 → G-4.8 |
| RQ-030 | Exact signal/unchanged abort; Phase §4.2–3 | 5 → AC-5.1 → T-5.1 → G-5.1 |
| RQ-031 | No retry; later call independent; Phase §4.4–5 | 5 → AC-5.2 → T-5.2 → G-5.2 |
| RQ-032 | Concurrent isolation; Phase §4.6 | 5 → AC-5.3 → T-5.3 → G-5.3 |
| RQ-033 | All journey stages; Phase §7.1 | 5 → AC-5.4 → T-5.4 → G-5.4 |
| RQ-034 | Excluded persistence/timeout/auth/operations; Phase §7 AC2–6, DEC-012 | 5 → AC-5.5 → T-5.5 → G-5.5 |
| RQ-035 | No backend/UI changes; Phase §8.1–2, DEC-001/011/014 | 5 → AC-5.6 → T-5.6 → G-5.6 |

## Decision Register

| ID | Decision and rationale | Affected | Sole owner; do not re-decide |
|---|---|---|---|
| DEC-001–DEC-014 | Confirmed decisions remain authoritative in the [evidence register](../../artefacts/prd/prd-evidence.md#clarification-and-override-record). | 0–5 | Spine; never reinterpret them. |
| DEC-015 | One schema module and one transport/error module, matching the PRD boundary. | 0–5 | Subphase 1 owns schemas; 3 owns transport. Never duplicate contracts. |
| DEC-016 | Focused test files exercise one public boundary. | 0–5 | Spine; no shared fixture module or monolithic suite. |

## Subphase Execution Order

0. [001-0-setup-client-boundary.md](001-0-setup-client-boundary.md) — compile skeleton; 0 tests; none; DEC-001–016.
1. [001-1-wire-contracts.md](001-1-wire-contracts.md) — schemas; 8 tests; 0; DEC-004–009/015.
2. [001-2-client-construction.md](001-2-client-construction.md) — construction; 6 tests; 0–1; DEC-002/003/010/015/016.
3. [001-3-json-operations.md](001-3-json-operations.md) — POST pipeline; 7 tests; 0–2; DEC-003/009/010/015/016.
4. [001-4-failure-classification.md](001-4-failure-classification.md) — failures; 8 tests; 0–3; DEC-009/010/015/016.
5. [001-5-cancellation-isolation.md](001-5-cancellation-isolation.md) — isolation/scope; 6 tests; 0–4; DEC-001/011–014/016.

## Shared File Ownership

| Path | Creator | Semantic owner | Permitted modifiers/consumers | Sections/order |
|---|---|---|---|---|
| `src/models/apiSchemas.ts` | 0 | 1 | 1 replaces placeholders; 2–5 consume | Complete in 1 |
| `src/models/index.ts` | existing; 0 adds placeholders | 1 | 1 finalizes exports | API exports only |
| `src/api/ApiClient.ts` | 0 | 3 | 2 construction; 3 transport; 4 failures; 5 cancellation | Numeric order |
| `src/api/index.ts` | 0 | 2 | 2 finalizes; 3–5 consume | Public API only |

## Testing Strategy

Vitest tests inject `vi.fn()` fetch and never use the network. Setup makes every Red compile and fail on behavior. Run in `/Users/pete/dev/meetpete/src`: `npm test`, `npm run typecheck`, `npm run build`.

## Integration Points

Integrations: `websiteDomainSchema`, frozen `mixNeeds`/`mixSizes`, native web APIs, and explicit barrels. Provider/CORS readiness stays external.

## Success Criteria

Ledger links are green; commands pass; calls yield one validated result or required rejection; UI/provider/full schemas remain unchanged.
