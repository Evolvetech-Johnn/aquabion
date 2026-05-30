'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { getCloudinaryUrl } from '@/lib/cloudinary/url';

interface CloudinaryImageProps {
  publicId?: string;
  url?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  crop?: 'fill' | 'fit' | 'scale' | 'limit' | 'pad';
  quality?: number;
  fill?: boolean;
}

export default function CloudinaryImage({
  publicId,
  url,
  alt,
  width,
  height,
  className = '',
  priority = false,
  crop = 'fill',
  quality = 85,
  fill = false,
}: CloudinaryImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Use either publicId or url
  let imageSrc = url;
  
  if (publicId && !url) {
    imageSrc = getCloudinaryUrl(publicId, {
      width,
      height,
      crop,
      quality,
    });
  }

  if (!imageSrc || hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl overflow-hidden p-6 text-center ${className}`}
        style={fill ? undefined : { width, height }}
        role="img"
        aria-label={hasError ? "Falha ao carregar imagem" : "Sem imagem"}
      >
        <svg className="w-10 h-10 text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-sm font-medium text-slate-600">{hasError ? "Falha ao carregar" : "Sem imagem"}</p>
      </div>
    );
  }

  const commonProps = {
    src: imageSrc,
    alt,
    priority,
    onLoad: () => setIsLoading(false),
    onError: () => {
      setIsLoading(false);
      setHasError(true);
    },
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  };

  if (fill) {
    return (
      <div className={`relative ${className}`}>
        {isLoading && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse rounded-2xl" />
        )}
        <Image
          {...commonProps}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse rounded-2xl" style={{ width, height }} />
      )}
      <Image
        {...commonProps}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
      />
    </div>
  );
}
