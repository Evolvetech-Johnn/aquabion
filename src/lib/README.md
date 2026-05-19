Lead endpoint and CRM integration

Environment variables (set in Vercel / deployment):
- `CRM_ENDPOINT` - URL to POST leads to (CRM or middleware)
- `CRM_API_KEY` - Bearer key for CRM (optional)

How it works
- `POST /api/lead` accepts JSON with `submission_id`, `name`, `email` or `phone`, optional `utm` object and `landing_page`.
- The route persists to `src/data/leads.json` and attempts to forward to `CRM_ENDPOINT`.
- On success the lead status is set to `sent` and `crm_id` saved when returned by CRM.

Notes
- This is a minimal, production-ready scaffold: replace file-store with a durable DB (Supabase/Postgres) for scale.
- Ensure you implement GDPR consent gating before firing analytics or lead events.
