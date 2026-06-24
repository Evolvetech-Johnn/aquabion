'use client';

import React from 'react';
import Image from 'next/image';
import { ExternalLink, Calendar, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import { NewsArticle } from '@/types/news';
import { NewsImageFallback } from './NewsImageFallback';
import { cn } from '@/lib/utils';

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, index }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        'group bg-white rounded-3xl overflow-hidden shadow-lg',
        article.isFeatured ? 'ring-2 ring-aquabion-cyan shadow-premium' : 'hover:shadow-xl'
      )}
    >
      <div className="relative aspect-[16/10 w-full overflow-hidden bg-slate-100">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 3}
          />
        ) : (
          <NewsImageFallback />
        )}
        {article.isFeatured && (
          <div className="absolute top-4 left-4 bg-aquabion-cyan text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg">
            Destaque
          </div>
        )}
      </div>

      <div className="p-8">
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-aquabion-cyan" />
          <span>{formatDate(article.publishedAt)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Building className="w-4 h-4 text-aquabion-cyan" />
          <span>{article.source}</span>
        </div>
      </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-aquabion-cyan transition-colors">
          {article.title}
        </h3>

        <p className="text-slate-600 mb-6 line-clamp-3">
          {article.summary}
        </p>

        <a
          href={article.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-aquabion-cyan font-semibold hover:text-aquabion-cyanLight transition-colors"
        >
          Ler Matéria Completa
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.article>
  );
};

export default NewsCard;
