# HTTP security boundary — first remediation packet

The server requires explicit `credentials` in `buildApp`. CLI `serve` reads
`AGENTVAULT_CREDENTIALS_JSON`, an array of objects with `token`, `subject`,
`tenant`, `role`, and `context`. Generate high-entropy tokens (at least 32
characters); inject them through your deployment secret manager, never commit
real values. CLI HTTP requests use `AGENTVAULT_API_TOKEN`.

This is a single-tenant API credential boundary, not OAuth/OIDC. Credentials
for another tenant are rejected; deploy a separate configured instance per tenant.
Roles, subject and context are fixed by server configuration. Request overrides
are rejected. Only health/readiness/version are public. Agents can list tools
and execute; other management and telemetry endpoints require administrator role.
Credential rotation currently requires replacing configuration and restarting.
Use TLS termination and restrict network access.

Approval returns HTTP 202 before execution/telemetry charging. Approval issuance
and redemption are not implemented in this packet; approval-required calls stay
blocked. Successful execution remains explicitly labelled `demo_echo`.

Remaining work: real bounded executor, durable idempotency and quota accounting,
verified approval redemption, external identity provider, and deployment tests.
The current per-call cost is a demo estimate, not provider billing.
