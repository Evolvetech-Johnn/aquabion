export interface TransformationOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'scale' | 'limit' | 'pad' | 'thumb';
  gravity?: 'auto' | 'center' | 'north' | 'south' | 'east' | 'west';
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png' | 'gif';
  aspectRatio?: string;
  radius?: number | 'max';
}

export const buildTransformationString = (options: TransformationOptions = {}): string => {
  const transformations: string[] = [];

  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.aspectRatio) transformations.push(`ar_${options.aspectRatio}`);
  if (options.crop) transformations.push(`c_${options.crop}`);
  if (options.gravity) transformations.push(`g_${options.gravity}`);
  if (options.quality) transformations.push(`q_${options.quality}`);
  if (options.format) transformations.push(`f_${options.format}`);
  if (options.radius) transformations.push(`r_${options.radius}`);

  return transformations.join(',');
};
