export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  category: string;
  isFeatured?: boolean;
}

export interface NewsResponse {
  articles: NewsArticle[];
  totalResults: number;
  hasMore: boolean;
}

export interface NewsFilterOptions {
  keywords?: string[];
  limit?: number;
  page?: number;
}

export const NEWS_KEYWORDS = [
  'Aquabion',
  'Aquabion Water Treatment',
  'Aquabion GmbH',
  'Scale Prevention Technology',
  'Water Treatment Innovation',
  'Water Conditioning Technology',
];
