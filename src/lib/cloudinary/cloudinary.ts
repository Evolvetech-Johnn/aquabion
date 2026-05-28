import { v2 as cloudinary } from 'cloudinary';
import { getCloudinaryUrl as getCloudinaryUrlFromUrlFile } from './url';

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

// Helper to get Cloudinary URL from public ID (backward compatibility)
export const getCloudinaryUrl = getCloudinaryUrlFromUrlFile;
