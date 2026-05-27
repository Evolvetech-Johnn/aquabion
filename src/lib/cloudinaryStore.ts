import { promises as fs } from 'fs'
import path from 'path'
import crypto from 'crypto'

export type CloudinaryMedia = {
  id: string
  public_id: string
  name: string
  url: string
  bytes: number
  format: string
  created_at: string
}

const DATA_DIR = path.join(process.cwd(), 'src', 'crm_data')
const FILE_PATH = path.join(DATA_DIR, 'cloudinary_media.json')

async function ensureFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.access(FILE_PATH)
  } catch {
    await fs.writeFile(FILE_PATH, '[]', 'utf8')
  }
}

export async function listMedia(): Promise<CloudinaryMedia[]> {
  await ensureFile()
  const raw = await fs.readFile(FILE_PATH, 'utf8')
  return raw ? JSON.parse(raw) : []
}

export async function addMedia(item: Omit<CloudinaryMedia, 'id' | 'created_at'>): Promise<CloudinaryMedia> {
  const list = await listMedia()
  const now = new Date().toISOString()
  const newItem: CloudinaryMedia = {
    ...item,
    id: crypto.randomUUID(),
    created_at: now
  }
  list.unshift(newItem)
  await fs.writeFile(FILE_PATH, JSON.stringify(list, null, 2), 'utf8')
  return newItem
}

export async function removeMedia(id: string): Promise<CloudinaryMedia | undefined> {
  const list = await listMedia()
  const idx = list.findIndex(m => m.id === id)
  if (idx === -1) return undefined
  const [removed] = list.splice(idx, 1)
  await fs.writeFile(FILE_PATH, JSON.stringify(list, null, 2), 'utf8')
  return removed
}

export async function removeMediaByPublicId(publicId: string): Promise<CloudinaryMedia | undefined> {
  const list = await listMedia()
  const idx = list.findIndex(m => m.public_id === publicId)
  if (idx === -1) return undefined
  const [removed] = list.splice(idx, 1)
  await fs.writeFile(FILE_PATH, JSON.stringify(list, null, 2), 'utf8')
  return removed
}
