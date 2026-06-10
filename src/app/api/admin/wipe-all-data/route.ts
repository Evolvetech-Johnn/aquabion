
import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/adminAuth';
import { getDb } from '@/lib/mongodb';
import * as fs from 'fs';
import * as path from 'path';

const ROOT_DIR = process.cwd();

interface WipeResults {
  jsonFilesWiped: boolean;
  mongoDBWiped: boolean;
  collectionsWiped?: string[];
  mongoDBError?: string;
}

async function wipeJSONFiles() {
  const filesToWipe = [
    path.join(ROOT_DIR, 'crm_data', 'leads.json'),
    path.join(ROOT_DIR, 'data', 'leads.json'),
    path.join(ROOT_DIR, 'src', 'crm_data', 'leads.json'),
    path.join(ROOT_DIR, 'crm_data', 'cloudinary_media.json'),
    path.join(ROOT_DIR, 'src', 'crm_data', 'cloudinary_media.json'),
    path.join(ROOT_DIR, 'audit_data', 'audit_logs.json'),
  ];

  const objectsToWipe = [
    path.join(ROOT_DIR, 'crm_data', 'page_images.json'),
    path.join(ROOT_DIR, 'src', 'crm_data', 'page_images.json'),
  ];

  for (const filePath of filesToWipe) {
    try {
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
      await fs.promises.writeFile(filePath, '[]', 'utf8');
    } catch (error) {
      console.error(`Failed to wipe ${filePath}:`, error);
    }
  }

  for (const filePath of objectsToWipe) {
    try {
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
      await fs.promises.writeFile(filePath, '{}', 'utf8');
    } catch (error) {
      console.error(`Failed to wipe ${filePath}:`, error);
    }
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const results: WipeResults = {
    jsonFilesWiped: false,
    mongoDBWiped: false,
  };

  try {
    await wipeJSONFiles();
    results.jsonFilesWiped = true;
  } catch (error) {
    console.error('Failed to wipe JSON files:', error);
  }

  try {
    const db = await getDb();
    if (db) {
      const collections = await db.listCollections().toArray();
      for (const collection of collections) {
        await db.collection(collection.name).deleteMany({});
        console.log(`Wiped collection: ${collection.name}`);
      }
      results.mongoDBWiped = true;
      results.collectionsWiped = collections.map(c => c.name);
    }
  } catch (error) {
    console.error('Failed to wipe MongoDB:', error);
    results.mongoDBError = String(error);
  }

  return NextResponse.json({
    ok: true,
    message: 'All data wiped successfully!',
    results,
  });
}
