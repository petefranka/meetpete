# PRD evidence register

## Clarification and override record

All decisions below were provided directly by the user in this run on 2026-09-27. They are confirmed decisions, not repository-source claims.

| ID | Exact decision | Provenance | Date | Affected files | Status |
|---|---|---|---|---|---|
| DEC-001 | “This repository must NOT add Next.js route handlers or implement the external backend.” | User prompt in this run | 2026-09-27 | `prd.md`; `phases/phase-01-external-api-client.md` | Confirmed |
| DEC-002 | “Future implementation is a browser-side typed fetch-based ApiClient configured by NEXT_PUBLIC_API_BASE_URL. No credentials or private values in that variable.” | User prompt in this run | 2026-09-27 | `prd.md`; `phases/phase-01-external-api-client.md` | Confirmed |
| DEC-003 | “External operations are POST /quote, POST /message, POST /free-ai-seo.” | User prompt in this run | 2026-09-27 | `prd.md`; `phases/phase-01-external-api-client.md` | Confirmed |
| DEC-004 | “Quote request must match the existing Pricing quote mixer: selected services, team size, name, email, notes. Use existing mixNeeds/mixSizes as source evidence; do not invent business name, budget, or timeline.” | User prompt in this run | 2026-09-27 | `prd.md`; `phases/phase-01-external-api-client.md` | Confirmed |
| DEC-005 | “Message request must match existing EmailAlternative fields: name, email, optional business name, message.” | User prompt in this run | 2026-09-27 | `prd.md`; `phases/phase-01-external-api-client.md` | Confirmed |
| DEC-006 | “Quote and message each return the same narrow acknowledgement shape: { requestId: non-empty string, status: 'accepted' }. This acknowledges API acceptance only and must not claim delivery, processing completion, or that Pete received it.” | User prompt in this run | 2026-09-27 | `prd.md`; `phases/phase-01-external-api-client.md` | Confirmed |
| DEC-007 | “Free AI SEO request contains the website domain and reuses current websiteDomainSchema normalization.” | User prompt in this run | 2026-09-27 | `prd.md`; `phases/phase-01-external-api-client.md` | Confirmed |
| DEC-008 | “Free AI SEO response is a dedicated narrow free-result contract only: domain, overall score, short verdict, issue summary, and exactly seven area results containing only label and score. It must exclude meta/source metadata, competitor data, detailed findings, action plans, fixes, and other paid/full-audit data. Do not use the full AiSeoResult as the client return type.” | User prompt in this run | 2026-09-27 | `prd.md`; `phases/phase-01-external-api-client.md` | Confirmed |
| DEC-009 | “Zod validates outbound requests and all untrusted responses.” | User prompt in this run | 2026-09-27 | `prd.md`; `phases/phase-01-external-api-client.md` | Confirmed |
| DEC-010 | “ApiClient must construct URLs safely, send JSON, expose explicit classified failures for invalid request, network failure, non-2xx response, malformed/non-JSON success response, and support AbortSignal propagation. No broad catches or silent fallback.” | User prompt in this run | 2026-09-27 | `prd.md`; `phases/phase-01-external-api-client.md` | Confirmed |
| DEC-011 | “UI migration from current mailto/demo flows to ApiClient is a separate later phase and is out of scope here.” | User prompt in this run | 2026-09-27 | `prd.md`; `phases/phase-01-external-api-client.md` | Confirmed |
| DEC-012 | “Authentication, remote persistence, retries, telemetry, and backend implementation are out of scope unless repository evidence forces a constraint; do not invent them.” | User prompt in this run | 2026-09-27 | `prd.md`; `phases/phase-01-external-api-client.md` | Confirmed |
| DEC-013 | “Tests in the future phase should mock/inject fetch and use current Vitest conventions. Validation commands run from /Users/pete/dev/meetpete/src.” | User prompt in this run | 2026-09-27 | `prd.md`; `phases/phase-01-external-api-client.md` | Confirmed |
| DEC-014 | “Existing prototype visual rendering is not being changed, so use source UI and prototype evidence only where needed for contract alignment.” | User prompt in this run | 2026-09-27 | `prd.md`; `phases/phase-01-external-api-client.md` | Confirmed |

No numeric target override was requested or applied.

## Unresolved gaps and conflicts

| ID | Source locator | Impact | Affected files | Status |
|---|---|---|---|---|
| GAP-001 | [Integration dependencies, “External integrations and content”](../../../../.github/instructions/integration-dependencies.instructions.md); no external provider specification exists in this repository | Production browser use cannot be claimed until the separately operated API confirms deployed endpoint/schema compatibility and permits the origin through CORS. This does not block deterministic implementation or tests of the isolated client. | `prd.md`; `phases/phase-01-external-api-client.md` | Deferred external integration gate |
| GAP-002 | [Pricing submission](../../../../src/components/home/Pricing/Pricing.tsx) and [EmailAlternative submission](../../../../src/components/home/Contact/EmailAlternative.tsx) currently use `mailto:`; [AI SEO Provider](../../../../src/providers/AiSeoProvider.tsx) is simulated | The new client has no production caller in this phase. UI failure, recovery, accessible announcement, and request/progress coordination must be designed and tested in the separately approved migration phase. | `prd.md`; `phases/phase-01-external-api-client.md` | Deferred by DEC-011 |

No required client behaviour remains unknown. Implementation policies not fixed by repository evidence or the confirmed decisions are explicitly labelled as recommendations in the PRD and phase specification. There is no numeric override: the exactly-seven rule is a new narrow free-result contract from DEC-008 and does not modify the existing full-result schema’s minimum.
