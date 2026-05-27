// scripts/checkCloudinaryConfig.ts
// Simple script to verify that Cloudinary environment variables are loaded and trimmed correctly.
import * as fs from 'fs';
import * as path from 'path';

// Load .env.local manually (Next.js does this automatically, but we mimic it here)
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, { encoding: 'utf8' });
  envContent.split(/\n/).forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const [key, ...rest] = trimmed.split('=');
    const value = rest.join('=').trim();
    process.env[key] = value;
  });
}

const getEnv = (key: string): string => (process.env[key] || '').trim();
const CLOUD_NAME = getEnv('CLOUDINARY_CLOUD_NAME');
const CLOUD_API_KEY = getEnv('CLOUDINARY_API_KEY');
const CLOUD_API_SECRET = getEnv('CLOUDINARY_API_SECRET');

const isCloudinaryConfigured = !!(CLOUD_NAME && CLOUD_API_KEY && CLOUD_API_SECRET);

console.log('Cloudinary configuration detection:');
console.log('  CLOUDINARY_CLOUD_NAME:', CLOUD_NAME ? '[SET]' : '[MISSING]');
console.log('  CLOUDINARY_API_KEY:', CLOUD_API_KEY ? '[SET]' : '[MISSING]');
console.log('  CLOUDINARY_API_SECRET:', CLOUD_API_SECRET ? '[SET]' : '[MISSING]');
console.log('  isCloudinaryConfigured:', isCloudinaryConfigured);
