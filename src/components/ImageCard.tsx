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
  aspectRatio = "video",
  priority = false
}: ImageCardProps) {
  // Determine CSS class for the desired aspect ratio
  const aspectClass =
    aspectRatio === "video"
      ? "aspect-w-16 aspect-h-9"
      : aspectRatio === "square"
      ? "aspect-w-1 aspect-h-1"
      : aspectRatio === "portrait"
      ? "aspect-w-3 aspect-h-4"
      : ""; // auto – no forced ratio

  // If we have a valid image source, render it via CloudinaryImage component
  if (effectiveUrl || publicId) {
    const src = effectiveUrl ? effectiveUrl : undefined; // CloudinaryImage will handle publicId fallback
    return (
      <div className={`relative ${aspectClass} ${className}`}>
        <CloudinaryImage
          src={src}
          publicId={publicId}
          alt={alt}
          priority={priority}
          className="object-cover w-full h-full rounded-2xl"
        />
      </div>
    );
  }

  // Placeholder UI when no image is provided
  return (
    <div
      className={`relative flex flex-col items-center justify-center bg-white/5 border-2 border-dashed border-white/10 rounded-2xl overflow-hidden p-6 text-center ${aspectClass} ${className}`}
      role="region"
      aria-label={`Espaço para imagem: ${locationId}`}
    >
      <ImageIcon className="w-10 h-10 text-[#86868B] mb-3" aria-hidden="true" />
      <p className="text-sm font-medium text-slate-600">Espaço para Imagem</p>
      <p className="text-xs text-slate-500 mt-1">ID: {locationId}</p>
      <p className="text-xs text-cyan-400 mt-2 font-semibold">Insira no Dashboard</p>
    </div>
  );

export default memo(ImageCard);
