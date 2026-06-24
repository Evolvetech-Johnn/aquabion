'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Globe } from 'lucide-react';
import { useNews } from '@/hooks/useNews';
import { NewsList } from '@/components/news/NewsList';

const NewsClient: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useNews({ limit: 10 });

  const articles = data?.pages.flatMap(page => page.articles) || [];

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <main id="main-content" className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-aquabion-deep via-aquabion-oil to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="w-12 h-12 text-aquabion-cyan" />
              <Newspaper className="w-12 h-12 text-aquabion-cyan" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Notícias Aquabion
            </h1>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto">
              Fique por dentro das últimas novidades sobre tecnologia de tratamento de água, inovações da Aquabion e tendências do mercado.
            </p>
          </motion.div>
        </div>
      </section>

      {/* News List Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <NewsList
            articles={articles}
            loading={isLoading && articles.length === 0}
            hasMore={hasNextPage}
            onLoadMore={handleLoadMore}
          />
        </div>
      </section>
    </main>
  );
};

export default NewsClient;
