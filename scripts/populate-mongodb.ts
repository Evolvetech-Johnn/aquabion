
import { MongoClient } from 'mongodb';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME as string;

const DATA_DIR = path.join(process.cwd(), 'crm_data');
const PAGE_IMAGES_FILE = path.join(DATA_DIR, 'page_images.json');
const CLOUDINARY_MEDIA_FILE = path.join(DATA_DIR, 'cloudinary_media.json');

async function populateMongoDB() {
  console.log('🚀 Starting MongoDB population...');

  if (!MONGODB_URI || !MONGODB_DB_NAME) {
    console.error('❌ MONGODB_URI or MONGODB_DB_NAME not found in .env.local');
    process.exit(1);
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db(MONGODB_DB_NAME);

    // 1. Populate page_images
    console.log('📄 Processing page_images...');
    if (fs.existsSync(PAGE_IMAGES_FILE)) {
      const content = fs.readFileSync(PAGE_IMAGES_FILE, 'utf8');
      const pageImages = JSON.parse(content);

      const collection = db.collection('page_images');

      // Clear old data and insert new
      await collection.deleteMany({});

      for (const slotId of Object.keys(pageImages)) {
        await collection.insertOne({
          slotId,
          url: pageImages[slotId].url,
          publicId: pageImages[slotId].publicId || null
        });
      }

      console.log(`✅ Successfully populated ${Object.keys(pageImages).length} page images!`);
    }

    // 2. Populate cloudinary_media
    console.log('📄 Processing cloudinary_media...');
    if (fs.existsSync(CLOUDINARY_MEDIA_FILE)) {
      const content = fs.readFileSync(CLOUDINARY_MEDIA_FILE, 'utf8');
      const mediaList = JSON.parse(content);

      const collection = db.collection('cloudinary_media');

      // Clear old data and insert new
      await collection.deleteMany({});

      if (mediaList.length > 0) {
        await collection.insertMany(mediaList);
        console.log(`✅ Successfully populated ${mediaList.length} media items!`);
      }
    }

    console.log('🎉 MongoDB population complete!');
  } catch (error) {
    console.error('❌ Error populating MongoDB:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

// Run the script
populateMongoDB();

