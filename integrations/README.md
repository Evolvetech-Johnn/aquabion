CRM Integration Pattern

Purpose: reliably capture leads with full attribution and forward to CRM.

Client-side
- Minimal capture form posts to local API endpoint `/api/lead`.
- Persist UTM + referrer in `localStorage`/cookie at first visit.

Server-side `/api/lead` (recommended)
- Validate payload, attach persisted UTM data, enrich if possible.
- Save minimal record in app DB (for retry) and forward to CRM via secure server-side API.
- Return 200/201 and queue webhook to analytics and CRM.

Security
- Rate-limit endpoint, validate origin, use captcha or honeypot for bots.

CRM Mapping
- Fields: name, email, phone, source, medium, campaign, landing_page, utm_params, ip, user_agent
- Map event IDs so analytics -> CRM attribution is consistent.

Webhooks
- Implement incoming webhook route to receive CRM status updates and sync lead status.

Idempotency
- Use client-generated `submission_id` to make lead creation idempotent.
