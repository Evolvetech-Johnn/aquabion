import { cloudinary } from './cloudinary';
import crypto from 'crypto';

export interface UploadOptions {
  folder?: string;
  publicIdPrefix?: string;
  overwrite?: boolean;
  resourceType?: 'image' | 'video' | 'raw' | 'auto';
}

export interface UploadResult {
  publicId: string;
  url: string;
  secureUrl: string;
  format?: string;
  bytes: number;
}

export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  options: UploadOptions = {}
): Promise<UploadResult> => {
  const {
    folder = 'aquabion',
    publicIdPrefix = 'media',
    overwrite = false,
    resourceType = 'auto',
  } = options;

  // Generate unique public ID
  const uniqueSuffix = crypto.randomBytes(8).toString('hex');
  const publicId = `${folder}/${publicIdPrefix}_${uniqueSuffix}`;

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        overwrite,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (!result) {
          reject(new Error('No result received from Cloudinary'));
        } else {
          resolve({
            publicId: result.public_id,
            url: result.url,
            secureUrl: result.secure_url,
            format: result.format,
            bytes: result.bytes,
          });
        }
      }
    );
    stream.end(fileBuffer);
  });
};
