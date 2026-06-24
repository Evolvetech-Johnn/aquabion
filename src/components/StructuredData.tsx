interface OrganizationProps {
  name: string;
  url: string;
  logo: string;
  description: string;
  phone?: string;
  email?: string;
  sameAs?: string[];
}

interface WebSiteProps {
  name: string;
  url: string;
  description: string;
  potentialAction?: {
    '@type': string;
    target: string;
    'query-input': string;
  };
}

interface ProductProps {
  name: string;
  description: string;
  image: string;
  brand: {
    '@type': string;
    name: string;
  };

  aggregateRating?: {
    '@type': string;
    ratingValue: number;
    reviewCount: number;
  };

  offers?: {
    '@type': string;
    priceCurrency: string;
    price: string;
    availability: string;
    url: string;
  };
}



export function OrganizationSchema({ name, url, logo, description, phone, email, sameAs = [] }: OrganizationProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    phone,
    email,
    sameAs,
  };
}



export function WebSiteSchema({ name, url, description, potentialAction }: WebSiteProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    potentialAction,
  };
}

export function ProductSchema({ name, description, image, brand, aggregateRating, offers }: ProductProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    brand,
    aggregateRating,
    offers,
  };
}

export function LocalBusinessSchema({
  name,
  description,
  url,
  telephone,
  email,
  address,
  geo,
  openingHours,
}: {
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  openingHours: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    description,
    url,
    telephone,
    email,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      ...geo,
    },
    openingHours,
  };
}
