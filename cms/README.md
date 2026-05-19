CMS Integration & Modeling (Headless CMS)

Recommendations
- Use a headless CMS with draft/preview support (Sanity, Contentful, Prismic, Strapi).
- Model content types: Page, Section, Testimonial, CaseStudy, Feature, CTA, Locale variants.

Preview
- Implement preview endpoints in Next.js that fetch draft content server-side and render with SSR.

Content workflows
- Provide structured fields for hero, copy blocks, CTAs, SEO metadata and canonical URL.
- Keep marketing copy editable and assets in the CMS or a dedicated CDN.

Localization
- Use CMS locales for translations; map CMS locale codes to Next.js locales.
