# Development core validation

Fixed malformed workflow input and conflicting package-manager setup. Node 24 and the packageManager-pinned pnpm 11.18.0 are used. Frozen lockfile install succeeded locally; shared and core TypeScript builds succeeded; baseline tests: shared 5, core 7.

Added a regression proving registration upsert returned a new id unrelated to the persisted row. Test failed before correction. Registry now returns persisted identity. Corrected tests: shared 5, core 8.

Scope is the existing core/shared workspace. Full encrypted vault, authenticated HTTP execution, governance, provider adapters and production deployment remain incomplete. No secrets or published source repositories were modified.
