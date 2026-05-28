import { cloudinary } from './cloudinary';

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error);
      } else if (!result) {
        reject(new Error('No result received from Cloudinary'));
      } else {
        resolve();
      }
    });
  });
};
