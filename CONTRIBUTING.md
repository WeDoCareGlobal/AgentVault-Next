# Contributing to AgentVault

## Development setup

1. Install [pnpm](https://pnpm.io) >= 11.18.0.
2. Clone and install:

   ```bash
   git clone https://github.com/WeDoCareGlobal/AgentVault-Next.git
   cd AgentVault-Next
   pnpm install --frozen-lockfile
   ```

3. Run the checks:

   ```bash
   pnpm typecheck   # TypeScript
   pnpm test        # vitest unit tests
   pnpm lint        # lint
   ```

## How to contribute

- Open an issue before a large change; we keep the governance layer audited.
- Keep packages focused; each `packages/*` is a separate publishable module.
- Add tests for new behavior; the monorepo uses `vitest run`.
- Follow commit conventions (`type(scope): message`) for a clean changelog.

## Code of Conduct

Read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.
