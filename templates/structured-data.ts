// JSON-LD Structured Data templates

export const OrganizationStructuredData = ({
  name = 'Aquabion',
  url = 'https://yourdomain.com',
  logo = 'https://yourdomain.com/logo.png',
}) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name,
  url,
  logo,
})

export const WebSiteStructuredData = ({ url = 'https://yourdomain.com', name = 'Aquabion' }) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name,
  url,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
})
