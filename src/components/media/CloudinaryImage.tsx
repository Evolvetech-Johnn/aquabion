'use client';

import React from 'react';
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

  if (!imageSrc) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl overflow-hidden p-6 text-center ${className}`}
        style={fill ? undefined : { width, height }}
      >
        <svg className="w-10 h-10 text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-sm font-medium text-slate-600">Sem imagem</p>
      </div>
    );
  }

  if (fill) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={imageSrc}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
