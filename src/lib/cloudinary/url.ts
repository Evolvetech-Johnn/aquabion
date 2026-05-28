// Helper to get Cloudinary URL from public ID - no full SDK import for client safety!

interface GetCloudinaryUrlOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'scale' | 'limit' | 'pad';
  format?: 'webp' | 'avif' | 'jpg' | 'png';
  quality?: number;
}

export const getCloudinaryUrl = (
  publicId: string,
  options?: GetCloudinaryUrlOptions
): string => {
  // Get cloud name from environment variables (or fallback, but should be set)
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || '';
  
  const {
    width,
    height,
    crop = 'fill',
    format = 'webp',
    quality = 85,
  } = options || {};

  const transformations: string[] = [];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width || height) transformations.push(`c_${crop}`);
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);

  const transformationString = transformations.join(',');
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}/${publicId}`;
};
