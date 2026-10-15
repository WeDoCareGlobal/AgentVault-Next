# AgentVault — Agent Assurance, Secret Management & Bounded Execution

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![ORCID](https://img.shields.io/badge/ORCID-0009--0009--8515--2727-green.svg)](https://orcid.org/0009-0009-8515-2727)
[![We Do Care Global](https://img.shields.io/badge/We%20Do%20Care%20Global-Enterprise%20AI%20Governance-purple.svg)](https://wedocare-global.com/)
![CI](https://github.com/WeDoCareGlobal/AgentVault-Next/actions/workflows/ci.yml/badge.svg)

**AgentVault** je monorepo koje pruža registarski alat za agente, upravljanje tajnima
(secrets) i ograničeno izvršavanje (bounded execution) sa auditnom evidencijom.
Svaki alat koji se izvršava unutar AgentVault zapisuje append-only audit trail, sigurne
ograničenja raspolaženja (capabilities) i policy engine — pa agenti ne mogu napraviti
nešto bez dokaza.

## Sadržaj

- 📦 **Monorepo** (pnpm + TypeScript) s paketima: `adapters`, `cli`, `core`, `governance`, `importer`, `server`, `shared`, `telemetry`, `vault`.
- 🔐 **Secret management**: Argon2 hesiranje, scoped secret store, crypto helpers.
- ⚖️ **Bounded execution**: policy engine, rate limiting, RBAC, capabilities restriction.
- 📜 **Audit trail**: append-only audit log, human-in-the-loop approvals.
- 🌐 **Live demo**: https://we-do-care-global.github.io/agentvault/
- 🏷️ **Publish**: Apache-2.0, ORCID 0009-0009-8515-2727, Zenodo DOI (na prvom izlazu).

## Quickstart

```bash
pnpm install
pnpm install --frozen-lockfile
pnpm test        # unit tests (vitest) po svim paketima
pnpm typecheck   # TypeScript check po svim paketima
pnpm build       # tsc -b po svim paketima
```

## Licenca

Apache-2.0 — vidi [`LICENSE`](LICENSE).
