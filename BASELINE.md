# Pre-Release Consolidation Baseline — AgentVault-Next

## Issue Reference
- Issue #2: "Pre-release: original-code consolidation and 10-step completion plan" (open)
- Acceptance: All required tests on exact candidate SHA; no mocked success, undocumented skipped integrations, exposed credentials, missing attribution, or unproven product claims. Preserve donor repositories; adapt selected modules on development branches. No public release or production deployment in this planning task. OmniGuard remains excluded.

## Baseline SHAs (from issue)
| Reference | SHA | Description |
|-----------|-----|-------------|
| Baseline | d23c372 | Repair core CI setup and preserve registry identity on upsert |
| Current HEAD | 2e58e77 | docs: clarify engineering focus and evidence-based release status |

## Delta
- Commits ahead of baseline (d23c372): 9

## Step 1 Status: IN PROGRESS
**Task:** Postaviti d23c372 kao pregledani baseline i potvrditi reproducibilan pnpm frozen-lockfile build; evidentirati licence i svaki donor SHA.
(Set d23c372 as reviewed baseline, confirm reproducible pnpm frozen-lockfile build; document licenses and each donor SHA.)

**Resolution plan:**
1. Set d23c372 as reviewed baseline
2. Confirm reproducible pnpm frozen-lockfile build
3. Document licenses and each donor SHA

## Source Selection (from issue)
| Source | Decision | Reason |
|--------|----------|--------|
| Original agentvault/packages/vault | Adapt | Main vault source |
| Original agentvault/packages/governance | Adapt | Governance source |
| Original agentvault/packages/server | Adapt | Server source |
| Original agentvault/packages/adapters | Adapt | Adapter source |
| Original agentvault/packages/importer | Adapt | Importer source |
| Original agentvault/packages/telemetry | Adapt | Telemetry source |
| vault/src/crypto.ts | Migrate design, don't copy | AES-GCM/Argon2id but fixed application salt |

## Steps 2–10
Documented in issue #2 body. Not started.

## Verification
- [ ] Baseline documented (this file)
- [ ] Step 1: d23c372 baseline set, pnpm frozen-lockfile build confirmed, licenses/donor SHAs documented
- [ ] Steps 2–10 not started
