# Source provenance and integration status

Source repository: `WeDoCareGlobal-CC/agentvault`, branch `main`.
The files `packages/core/src/manifest.ts` and
`packages/core/src/registry.ts` were copied from the source repository
without functional modifications on 2026-10-14.

These files are **staged source**, not a buildable standalone package.
They depend on `@we-do-care/agentvault-shared`, `./db.js`, `yaml`, and `zod`.
The remaining workspace files, dependency lockfile and original tests must
be brought over and validated before claiming a working integration.

Next gate: review the source package and its dependency graph, restore
the original workspace build, then run manifest and tenant isolation tests.
No production data or secrets have been migrated.
