# AgentVault — Agent Assurance, Secret Management & Bounded Execution

> **Engineering focus:** Tool registry, secrets boundaries and bounded execution.
>
> **Evidence boundary:** Security guarantees depend on verified configuration and tests.
>
> [Project overview](https://www.wedocare-global.com/agentvault.html) · [Evidence index](https://www.wedocare-global.com/evidence.html) · [Portfolio](https://github.com/WeDoCareGlobal)

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![ORCID](https://img.shields.io/badge/ORCID-0009--0009--8515--2727-green.svg)](https://orcid.org/0009-0009-8515-2727)
[![We Do Care Global](https://img.shields.io/badge/We%20Do%20Care%20Global-Enterprise%20AI%20Governance-purple.svg)](https://wedocare-global.com/)
[![Pre-release](https://img.shields.io/badge/release-1.0.0--pre.1-blue.svg)](https://github.com/WeDoCareGlobal/AgentVault-Next/releases/tag/v1.0.0-pre.1)
[![CI](https://github.com/WeDoCareGlobal/AgentVault-Next/actions/workflows/ci.yml/badge.svg)](https://github.com/WeDoCareGlobal/AgentVault-Next/actions/workflows/ci.yml)

**AgentVault** je monorepo koje pruža registarski alat za agente, upravljanje tajnima
(secrets) i ograničeno izvršavanje (bounded execution) sa auditnom evidencijom.
Svaki alat koji se izvršava unutar AgentVault zapisuje append-only audit trail, sigurne
ograničenja raspolađenja (capabilities) i policy engine — pa agenti ne mogu napraviti
nešto bez dokaza.

**Part of the [We Do Care Global](https://wedocare-global.com/) ecosystem — 6 published systems, Apache-2.0 open source, 33% annual corporate revenue pledged to humanitarian assistance (founder-level commitment).**

**Status:** `v1.0.0-pre.1` — production-ready pre-release. All packages build cleanly with `tsc -b` (type-safe across core, server, vault, governance, telemetry, adapters, importer, cli). Secret vault, hash-chained audit ledger, policy engine, RBAC, rate limiting, OpenAPI importer, and Fastify HTTP API are implemented. `agentvault serve` starts the server; `agentvault doctor` verifies the audit chain.

> Legacy demonstration (not a production vault): https://we-do-care-global.github.io/agentvault/

---

## Sadržaj

- 📦 **Monorepo** (pnpm + TypeScript) s paketima: `adapters`, `cli`, `core`, `governance`, `importer`, `server`, `shared`, `telemetry`, `vault`.
- 🔐 **Secret management**: Argon2 hesiranje, scoped secret store, crypto helpers.
- ⚖️ **Bounded execution**: policy engine, rate limiting, RBAC, capabilities restriction.
- 📜 **Audit trail**: append-only audit log, human-in-the-loop approvals.
- 🌐 **HTTP API**: Fastify server with `/v1/tools`, `/v1/secrets`, `/v1/policies`, `/v1/execute`, `/v1/audit`, `/v1/telemetry/*`.
- 🏷️ **Publish**: Apache-2.0, ORCID 0009-0009-8515-2727, Zenodo DOI (na prvom izlazu).

---

## Paketi (mreža slojeva)

| Sloj | Paket | Odgovornost |
|------|-------|-------------|
| **1. Tool Registry** | `@we-do-care/agentvault-core` | Enact-compatible manifests · OpenAPI 3.x importer · versioned lookup · SQLite |
| **2. Secrets Vault** | `@we-do-care/agentvault-vault` | AES-256-GCM envelope · Argon2id KDF · rotation · hash-chained audit |
| **3. Multi-Provider** | `@we-do-care/agentvault-adapters` | One schema → Gemini, OpenAI, Claude, Ollama |
| **4. Governance** | `@we-do-care/agentvault-governance` | JSON policy DSL · RBAC · rate limits · budget · fail-closed |
| **5. Telemetry** | `@we-do-care/agentvault-telemetry` | Per-tool latency & cost · live SSE · error classification |
| **6. Importer** | `@we-do-care/agentvault-importer` | OpenAPI 3.1 → ToolManifest |
| **7. Server** | `@we-do-care/agentvault-server` | Fastify HTTP API |
| **8. CLI** | `@we-do-care/agentvault` | `agentvault` binary: init, doctor, tools, vault, policy, telemetry, audit, serve |

Plus `@we-do-care/agentvault-shared` (types, brand, errors).

---

## Quickstart

```bash
# Install dependencies
pnpm install

# Build all packages (type-safe, tsc -b)
pnpm build

# Run tests
pnpm test

# Typecheck
pnpm typecheck
```

Requires Node ≥ 20. `better-sqlite3` and `argon2` install from prebuilds (no compiler toolchain needed).

### Pokretanje lokalnog servera

```bash
# Start the server (port 7420)
AGENTVAULT_MASTER_KEY= tajni-kljuc-32-znaka agentvault serve --port 7420

# In another shell: doctor check
agentvault doctor

# Register a tool
agentvault tools register examples/slack-webhook/manifest.yaml

# Store a secret
echo "https://hooks.slack.com/services/..." | agentvault vault set webhook --namespace slack

# Attach a policy (fail-closed: no policy = denied)
agentvault policy attach we-do-care/slack-webhook --role agent --max-calls 10

# Execute
agentvault tools execute we-do-care/slack-webhook@1.0.0 --arg action=post --arg text=hello
```

Calls are **denied until a policy allows them** — that is the fail-closed default, not a bug.

---

## HTTP API

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/health`, `/ready`, `/version` | Liveness and brand metadata |
| `GET` | `/v1/tools` | List registered tools |
| `POST` | `/v1/tools` | Register a manifest |
| `GET`/`DELETE` | `/v1/tools/:name/:version` | Fetch or remove one version |
| `GET` | `/v1/secrets` | Secret metadata (never plaintext) |
| `POST` | `/v1/secrets` | Store or update a secret |
| `POST` | `/v1/secrets/rotate` | Rotate to a new key version |
| `DELETE` | `/v1/secrets` | Revoke a secret |
| `GET`/`POST` | `/v1/policies` | List / upsert policies |
| `POST` | `/v1/execute` | Governed tool call |
| `GET` | `/v1/audit` | Ledger entries + chain verification |
| `GET` | `/v1/telemetry/query` | Recorded calls |
| `GET` | `/v1/telemetry/summary` | Aggregates |
| `GET` | `/v1/telemetry/live` | SSE stream |

---

## Security model

- **Envelope encryption.** Every secret gets a fresh 256-bit DEK; the DEK is sealed under a KEK derived from the master passphrase with Argon2id. AAD binds `tenant|namespace|key|version`, so a row cannot be replayed under another name.
- **Immutable audit.** Each ledger entry hashes the previous entry's hash. `agentvault audit query` reports `chain_ok`; tampering is detectable and localised to the first bad sequence.
- **Fail-closed.** No matching policy means denied. Unknown roles, disallowed contexts and breached rate limits all deny with a machine-readable `reason`.
- **Tenant isolation.** Every table is keyed by `tenant_id`; the registry, vault, policies, telemetry and ledger each scope reads and writes to it.

---

## Development

```bash
pnpm install        # install dependencies
pnpm build          # tsc -b across the project graph
pnpm test           # vitest across all packages
pnpm typecheck      # tsc -b + test project typecheck
pnpm lint           # eslint if present
```

Set `AGENTVAULT_MASTER_KEY` before storing real secrets — never commit it.

---

## Links

- Landing page: https://we-do-care-global.github.io/agentvault/
- Source: https://github.com/WeDoCareGlobal/AgentVault-Next
- ORCID: https://orcid.org/0009-0009-8515-2727

---

## Ecosystem

| System | Repo | Purpose |
|--------|------|---------|
| **AgentGuard** | `WeDoCareGlobal/agentguard-next` | Security & governance control plane |
| **FoundationCentar** | `WeDoCareGlobal/FoundationCentar-Next` | One-Click Agent Factory OS |
| **AgentVault** | `WeDoCareGlobal/AgentVault-Next` | **This repo** — Tool registry & assurance |
| **Enterprise Hybrid-RAG** | `WeDoCareGlobal/enterprise-hybrid-rag-next` | Hybrid retrieval |
| **Agent Eval** | `WeDoCareGlobal/agent-eval-next` | Evaluation harness |
| **Pharma Intelligence OS** | `WeDoCareGlobal/Pharma-Intelligence-Os-Next` | Regulatory intelligence |

---

## Citation

```bibtex
@software{perla2026agentvault,
  author       = {Perla, Emir},
  title        = {AgentVault: Enterprise Control Plane for AI Tools},
  version      = {1.0.0-pre.1},
  year         = 2026,
  publisher    = {We Do Care Global},
  url          = {https://github.com/WeDoCareGlobal/AgentVault-Next},
  orcid        = {0009-0009-8515-2727}
}
```

---

## License

Apache-2.0 — see [`LICENSE`](LICENSE). &copy; 2026 We Do Care Global · Author: <emirperla96@gmail.com> · ORCID 0009-0009-8515-2727

33% of profits → humanitarian aid.
