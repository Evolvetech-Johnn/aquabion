Project: Aquabion — Project Config (CRO-first)

Priority: Conversão (CRO-first)

Stack recommendations
- Framework: Next.js (App Router) + TypeScript
- Styling: TailwindCSS
- Animation: Framer Motion / GSAP where needed
- Data: Headless CMS (Sanity/Contentful/Prismic/Strapi) + optional Supabase for auth/data
- CRM: HubSpot/Pipedrive/Custom via server-side API
- Analytics: GA4 (client + server-side), server-side event forwarding to CRM
- Deployment: Vercel (edge functions) or Cloudflare Pages + Workers

Key non-functional requirements
- Lighthouse target: >90 (Performance, Accessibility, SEO)
- Multilingual support: yes (i18n routing + hreflang)
- CMS with preview capability: yes
- Event mapping and UTM persistence for CRM attribution

Capture & Lead Flow
- Client-side: capture minimal lead data, persist UTMs in cookie/localStorage
- Server-side: submit canonical lead to CRM with full attribution and events
- Webhooks: CRM -> app for lead status updates (optional)

Security & Privacy
- GDPR-ready consent mechanism for tracking
- Server-side validation on lead endpoints
- Rate-limiting and bot protection on capture endpoints

Deliverables scaffold
- `templates/meta-tags.tsx` — SEO meta template
- `templates/structured-data.ts` — JSON-LD snippets
- `integrations/README.md` — CRM integration patterns
- `analytics/README.md` — tracking and event mapping
- `cms/README.md` — CMS modeling + preview
- `i18n/README.md` — i18n strategy
