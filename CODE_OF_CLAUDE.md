# CODE_OF_CLAUDE.md

This file defines the conventions and expectations for AI-assisted coding in AgentVault-Next.

## AI Agent Conventions

### When AI agents (Claude, Codex, etc.) work on this repository:

1. **Follow the existing patterns** — Read existing code before writing new code. Match the style, structure, and conventions already present.

2. **Write tests first** — Every new feature or bug fix must include tests. Target ≥80% coverage.

3. **Run the full CI locally before pushing** — Execute:
   ```bash
   pnpm install --frozen-lockfile
   pnpm -r --no-bail lint
   pnpm -r --no-bail typecheck
   pnpm -r --no-bail test
   ```

4. **Update documentation** — If you change behavior, update:
   - `CHANGELOG.md` (under `[Unreleased]`)
   - Relevant docstrings and README sections
   - API docs

5. **Use conventional commits** — Prefix commits with:
   - `feat:` new feature
   - `fix:` bug fix
   - `docs:` documentation only
   - `refactor:` code change that neither fixes a bug nor adds a feature
   - `test:` adding or modifying tests
   - `chore:` maintenance (deps, config, etc.)

6. **Security first** — Never commit secrets. Use environment variables for configuration. Run security scans (npm audit, trivy) before merging.

7. **Type safety** — All TypeScript must pass `tsc --noEmit`. No `any` types without justification.

8. **No silent failures** — All errors must be logged and surfaced appropriately. Use structured logging.

## Code Review Checklist for AI Contributions

- [ ] Tests added and passing (≥80% coverage)
- [ ] Linting passes (eslint/prettier)
- [ ] Type checking passes (tsc)
- [ ] Security scans pass (npm audit, trivy)
- [ ] CHANGELOG.md updated
- [ ] Documentation updated
- [ ] No hardcoded secrets
- [ ] Conventional commit messages

## Prohibited Patterns

- ❌ `console.log` for logging (use structured logger)
- ❌ Bare `catch {}` clauses
- ❌ Hardcoded paths, URLs, or credentials
- ❌ Skipping tests to "make CI pass"
- ❌ Adding dependencies without updating lockfiles
- ❌ Modifying generated files
- ❌ Committing directly to `main` (use PRs)

## Escalation

If an AI agent encounters ambiguity or conflicting requirements:
1. Stop and ask the human maintainer
2. Document the question in the PR description
3. Do not guess — clarify first

---

**ORCID**: 0009-0009-8515-2727 (Emir Perla)
**Maintainer**: We Do Care Global
