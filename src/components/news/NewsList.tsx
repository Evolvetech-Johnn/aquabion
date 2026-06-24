'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { NewsArticle } from '@/types/news';
import { NewsCard } from './NewsCard';

interface NewsListProps {
  articles: NewsArticle[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

const SkeletonCard: React.FC = () => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-lg animate-pulse">
    <div className="aspect-[16/10] w-full bg-slate-200" />
    <div className="p-8 space-y-4">
      <div className="h-4 bg-slate-200 rounded w-1/2" />
      <div className="h-8 bg-slate-200 rounded w-3/4" />
      <div className="h-4 bg-slate-200 rounded w-full" />
      <div className="h-4 bg-slate-200 rounded w-5/6" />
      <div className="h-6 bg-slate-200 rounded w-1/3 mt-2" />
    </div>
  </div>
);

export const NewsList: React.FC<NewsListProps> = ({
  articles,
  loading,
  onLoadMore,
  hasMore,
}) => {
  if (loading && articles.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500 text-lg">Nenhuma notícia encontrada.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <NewsCard key={article.id} article={article} index={index} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center">
          <button
            onClick={onLoadMore}
            className="px-8 py-4 bg-aquabion-cyan hover:bg-aquabion-cyanLight text-white rounded-2xl font-semibold transition-colors shadow-lg"
          >
            Carregar Mais Notícias
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsList;
