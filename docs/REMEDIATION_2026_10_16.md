# Remediation packet 1 — 2026-10-16

Baseline: main 018091c0e890fc3089dc2cf9d03829db1fb521fd.
Branch: fix/security-boundary-20261016. No merge, release or deployment.

Verified locally (Node 24.19.0, pnpm 11.25.0):
- Frozen-lockfile dependency installation.
- Workspace build and workspace typecheck passed.
- 86 tests passed across all nine packages (19 server tests).
- Missing/invalid credentials, cross-tenant credentials, identity overrides,
  policy-write escalation, approval execution and startup configuration covered.

Build repair: removed committed incremental caches, built dependencies before
workspace tests, restored the manifest required by CLI tests. Removed the CI lint
job because no package has a lint script; it did not provide a lint gate.
Dedicated lint configuration remains work, not a claimed passing check.

Partial: approval requests are safely held, not redeemable yet. Executor remains
an explicit demo. Durable quotas/idempotency, external identity integration and
real execution remain open; see SECURITY_BOUNDARY.md. GitHub CI uses Node 22 and
pnpm 11.18.0 and must independently confirm this branch.
