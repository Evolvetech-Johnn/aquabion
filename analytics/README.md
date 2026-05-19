Analytics & Event Mapping (GA4 + Server-side)

Goals: event accuracy, persistence of UTM attribution, and server-side forwarding to CRM.

Client-side
- Install GA4 via gtag or tag manager; collect standard events (page_view, click, form_submit).
- Persist UTM params on first touch: `utm_source`, `utm_medium`, `utm_campaign`, `gclid`.

Server-side
- Use Measurement Protocol (GA4) or server container to forward critical events (lead_created, purchase).
- Forward events to CRM with the same `client_id` / `user_id` mapping when available.

Event mapping example
- `lead_form_start` -> step 1
- `lead_form_submitted` -> attach `submission_id`, `lead_id` and send to CRM

Privacy
- Respect user consent; gate analytics until consent accepted.

Debugging
- Implement logs for outgoing server events and retry logic.
