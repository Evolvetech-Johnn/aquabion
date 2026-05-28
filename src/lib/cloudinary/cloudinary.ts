import { v2 as cloudinary } from 'cloudinary';

// Environment variable validation
const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    console.warn(`Missing environment variable: ${key}`);
    return '';
  }
  return value.trim();
};

// Initialize Cloudinary
export const cloudinaryConfig = {
  cloudName: getEnv('CLOUDINARY_CLOUD_NAME'),
  apiKey: getEnv('CLOUDINARY_API_KEY'),
  apiSecret: getEnv('CLOUDINARY_API_SECRET'),
};

// Configure Cloudinary SDK if credentials are available
if (cloudinaryConfig.cloudName && cloudinaryConfig.apiKey && cloudinaryConfig.apiSecret) {
  cloudinary.config({
    cloud_name: cloudinaryConfig.cloudName,
    api_key: cloudinaryConfig.apiKey,
    api_secret: cloudinaryConfig.apiSecret,
  });
}

export { cloudinary };

// Helper to get Cloudinary URL from public ID
export const getCloudinaryUrl = (
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'limit' | 'pad';
    format?: 'webp' | 'avif' | 'jpg' | 'png';
    quality?: number;
  }
): string => {
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
  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${transformationString}/${publicId}`;
};
