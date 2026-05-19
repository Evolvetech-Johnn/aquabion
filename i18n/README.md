Internationalization (i18n) Strategy

Routing
- Use Next.js i18n routing (locales defined in `next.config.js`) and prefix routes by locale.
- Use hreflang tags for SEO and canonicalization per locale.

Content
- Prefer CMS-managed translations; fallback to static/localized copy when needed.
- Store translations as keyed JSON for UI strings and CMS for editorial content.

SEO
- Ensure separate sitemaps or sitemap index with locale-specific URLs.

UX
- Language switcher persists locale in user preferences and updates route.
