Lightweight CRM scaffold

Features
- Lead storage (file-based): `src/crm_data/leads.json`
- Admin API: `GET /api/crm/leads` (admin header required), `POST /api/crm/leads` (public)
- Lead details: `GET/PATCH/DELETE /api/crm/lead/[id]`
- Simple admin UI at `/crm` protected by `ADMIN_SECRET` saved in `localStorage`.

Environment
- Set `ADMIN_SECRET` in `.env.local` or deployment environment.

Production notes
- Replace the file-based store in `src/crm/store.ts` with a proper DB (Postgres via Supabase/Prisma).
- Harden admin auth (NextAuth + role-based access) and serve over TLS.
- Add audit logs and worker-queue for outbound webhooks.
