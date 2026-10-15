# AgentVault Next — integration baseline

Development branch only. The original source remains unchanged at
[WeDoCareGlobal-CC/agentvault](https://github.com/WeDoCareGlobal-CC/agentvault).

## Source inventory

- `packages/core/src/db.ts`: persistent tenant-scoped storage
- `packages/core/src/manifest.ts`: tool manifest definition
- `packages/core/src/registry.ts`: tool registry
- `packages/core/src/index.ts`: public core exports

## Next integration gate

Import reviewed source with explicit provenance and dependency pinning; run its
existing tests before adapting it. Verify tenant boundaries, encrypted secret
storage, manifest validation and audit events. Do not represent this repository
as a functioning vault until source, tests and integration checks are present.

No deployment, production credentials or migration of real secrets is approved.
