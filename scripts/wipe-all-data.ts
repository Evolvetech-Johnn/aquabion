
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;
const ROOT_DIR = process.cwd();

const DIRS_TO_CLEAN = [
  path.join(ROOT_DIR, 'crm_data'),
  path.join(ROOT_DIR, 'data'),
  path.join(ROOT_DIR, 'audit_data'),
  path.join(ROOT_DIR, 'src', 'crm_data')
];

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME as string;

async function wipeFile(filePath: string, initialContent: string = '[]') {
  try {
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await fs.promises.writeFile(filePath, initialContent, 'utf8');
    console.log(`✅ Wiped: ${filePath}`);
  } catch (error) {
    console.error(`❌ Failed to wipe ${filePath}:`, error);
  }
}

async function wipeJSONFiles() {
  console.log('🧹 Wiping JSON data files...');

  // Leads files
  await wipeFile(path.join(ROOT_DIR, 'crm_data', 'leads.json'));
  await wipeFile(path.join(ROOT_DIR, 'data', 'leads.json'));
  await wipeFile(path.join(ROOT_DIR, 'src', 'crm_data', 'leads.json'));

  // Cloudinary media files
  await wipeFile(path.join(ROOT_DIR, 'crm_data', 'cloudinary_media.json'));
  await wipeFile(path.join(ROOT_DIR, 'src', 'crm_data', 'cloudinary_media.json'));

  // Page images files
  await wipeFile(path.join(ROOT_DIR, 'crm_data', 'page_images.json'), '{}');
  await wipeFile(path.join(ROOT_DIR, 'src', 'crm_data', 'page_images.json'), '{}');

  // Audit logs
  await wipeFile(path.join(ROOT_DIR, 'audit_data', 'audit_logs.json'));
}

async function wipeMongoDB() {
  console.log('🧹 Wiping MongoDB...');

  if (!MONGODB_URI || !MONGODB_DB_NAME) {
    console.log('⚠️ MongoDB not configured, skipping...');
    return;
  }

  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(MONGODB_DB_NAME);

    // List all collections and drop them
    const collections = await db.listCollections().toArray();
    console.log(`📦 Found ${collections.length} collections to wipe`);

    for (const collection of collections) {
      try {
        await db.collection(collection.name).deleteMany({});
        console.log(`✅ Dropped all data from collection: ${collection.name}`);
      } catch (error) {
        console.error(`❌ Failed to drop data from ${collection.name}:`, error);
      }
    }

    console.log('✅ MongoDB wiped!');
  } catch (error) {
    console.error('❌ Failed to wipe MongoDB:', error);
  } finally {
    await client.close();
  }
}

async function main() {
  console.log('🚨 Starting COMPLETE DATA WIPE! 🚨');
  console.log('This will delete ALL data from JSON files and MongoDB!');
  console.log('----------------------------------------');
  
  await wipeJSONFiles();
  await wipeMongoDB();

  console.log('----------------------------------------');
  console.log('🎉 COMPLETE DATA WIPE FINISHED! 🎉');
  console.log('System is now clean and ready for production!');
}

main();
