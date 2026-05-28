import { promises as fs } from 'fs'
import path from 'path'
import crypto from 'crypto'

export type CloudinaryMedia = {
  id: string
  publicId: string
  name: string
  url: string
  bytes: number
  format: string
  createdAt: string
}

const DATA_DIR = path.join(process.cwd(), 'crm_data')
const FILE_PATH = path.join(DATA_DIR, 'cloudinary_media.json')

let memoryCache: CloudinaryMedia[] | null = null

async function getStorage(): Promise<CloudinaryMedia[]> {
  if (memoryCache) return memoryCache
    try {
      await fs.mkdir(DATA_DIR, { recursive: true })
      try {
        const raw = await fs.readFile(FILE_PATH, 'utf8')
        memoryCache = JSON.parse(raw || '[]')
      } catch (e: unknown) {
        const err = e as { code?: string }
        if (err.code === 'ENOENT') {
          memoryCache = []
          await fs.writeFile(FILE_PATH, '[]', 'utf8')
        } else {
          console.error('Failed to read media file, keeping empty memory state:', err)
          memoryCache = []
        }
      }
    } catch (error) {
      console.error('Storage access failed, using empty memory store:', error)
      memoryCache = []
    }
  return memoryCache || []
}

async function persist(list: CloudinaryMedia[]) {
  memoryCache = list
  try {
    await fs.writeFile(FILE_PATH, JSON.stringify(list, null, 2), 'utf8')
  } catch (error) {
    console.error('Failed to persist media to disk, updates kept in memory:', error)
  }
}

export async function listMedia(): Promise<CloudinaryMedia[]> {
  return await getStorage()
}

export async function addMedia(item: Omit<CloudinaryMedia, 'id' | 'createdAt'>): Promise<CloudinaryMedia> {
  const list = await getStorage()
  const newItem: CloudinaryMedia = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  }
  const newList = [newItem, ...list]
  await persist(newList)
  return newItem
}

export async function removeMedia(id: string): Promise<CloudinaryMedia | undefined> {
  const list = await getStorage()
  const idx = list.findIndex(m => m.id === id)
  if (idx === -1) return undefined
  const newList = [...list]
  const [removed] = newList.splice(idx, 1)
  await persist(newList)
  return removed
}

export async function removeMediaByPublicId(publicId: string): Promise<CloudinaryMedia | undefined> {
  const list = await getStorage()
  const idx = list.findIndex(m => m.publicId === publicId)
  if (idx === -1) return undefined
  const newList = [...list]
  const [removed] = newList.splice(idx, 1)
  await persist(newList)
  return removed
}
