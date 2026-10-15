# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project uses [Semantic Versioning](https://semver.org/).

## [0.1.3] — 2026-09-24

### Added
- Monorepo: `adapters`, `cli`, `core`, `governance`, `importer`, `server`, `shared`, `telemetry`, `vault` packages.
- Vault: Argon2 hashing, scoped secret store, crypto helpers.
- Governance: policy engine, rate limiting, RBAC, capabilities restriction.
- Audit: append-only audit log, human-in-the-loop approvals.
- Server: Fastify REST API with CORS.

### Changed
- Package structure consolidated under `packages/*` for pnpm workspaces.

### Stability
- CI: typecheck, unit tests and lint across all packages added.

[0.1.3]: https://github.com/WeDoCareGlobal/AgentVault-Next/releases/tag/v0.1.3
