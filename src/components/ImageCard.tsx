import React from 'react';
import { ImageIcon } from 'lucide-react';
import CloudinaryImage from './media/CloudinaryImage';

interface ImageCardProps {
  locationId: string;
  imageUrl?: string;
  publicId?: string;
  alt?: string;
  className?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'auto';
}

export default function ImageCard({ 
  locationId, 
  imageUrl, 
  publicId,
  alt = 'Aquabion image',
  className = '',
  aspectRatio = 'auto'
}: ImageCardProps) {
  const aspectClass = {
    'video': 'aspect-video',
    'square': 'aspect-square',
    'portrait': 'aspect-[3/4]',
    'auto': 'aspect-auto'
  }[aspectRatio];

  if (!imageUrl && !publicId) {
    return (
      <div className={`relative flex flex-col items-center justify-center bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl overflow-hidden p-6 text-center ${aspectClass} ${className}`}>
        <ImageIcon className="w-10 h-10 text-slate-400 mb-3" />
        <p className="text-sm font-medium text-slate-600">Espaço para Imagem</p>
        <p className="text-xs text-slate-500 mt-1">ID: {locationId}</p>
        <p className="text-xs text-cyan-600 mt-2 font-semibold">Insira no Dashboard</p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-slate-100 shadow-lg ${aspectClass} ${className}`}>
      <CloudinaryImage 
        publicId={publicId}
        url={imageUrl}
        alt={alt}
        width={1200}
        height={800}
        fill
        className="object-cover"
        crop="fill"
      />
    </div>
  );
}
