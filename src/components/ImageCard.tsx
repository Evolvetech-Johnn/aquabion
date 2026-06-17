import React, { memo } from 'react';
import { ImageIcon } from 'lucide-react';
import CloudinaryImage from './media/CloudinaryImage';

interface ImageCardProps {
  locationId: string;
  imageUrl?: string;
  publicId?: string;
  alt?: string;
  className?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'auto';
  priority?: boolean;
}

function ImageCard({ 
  locationId, 
  imageUrl, 
  publicId,
  alt = "Aquabion image",
  className = "",
  aspectRatio = "auto",
  priority = false
}: ImageCardProps) {
  // Não aplicar aspect-ratio se o className contiver h-full ou altura explícita para permitir preencher o container pai
  const hasExplicitHeight = className.includes('h-full') || className.includes('h-[');
  const aspectClass = hasExplicitHeight ? '' : {
    'video': 'aspect-video',
    'square': 'aspect-square',
    'portrait': 'aspect-[3/4]',
    'auto': 'aspect-auto'
  }[aspectRatio];

  if (!imageUrl && !publicId) {
    return (
      <div 
        className={`relative flex flex-col items-center justify-center bg-white/5 border-2 border-dashed border-white/10 rounded-2xl overflow-hidden p-6 text-center ${aspectClass} ${className}`}
        role="region"
        aria-label={`Espaço para imagem: ${locationId}`}
      >
        <ImageIcon className="w-10 h-10 text-[#86868B] mb-3" aria-hidden="true" />
        <p className="text-sm font-medium text-[#F5F5F7]">Espaço para Imagem</p>
        <p className="text-xs text-[#86868B] mt-1">ID: {locationId}</p>
        <p className="text-xs text-cyan-400 mt-2 font-semibold">Insira no Dashboard</p>
      </div>
    );
  }

  return (
    <div 
      className={`relative overflow-hidden rounded-2xl bg-white/5 shadow-lg ${aspectClass} ${className}`}
    >
      <CloudinaryImage 
        publicId={publicId}
        url={imageUrl}
        alt={alt}
        width={1200}
        height={800}
        fill
        className="object-cover"
        crop="fill"
        priority={priority}
      />
    </div>
  );
}

export default memo(ImageCard);
