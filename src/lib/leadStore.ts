import { promises as fs } from 'fs'
import path from 'path'
import { Lead } from './types'
import { getDb } from './mongodb'

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV
const DATA_DIR = path.join(process.cwd(), 'data')
const LEADS_FILE = path.join(DATA_DIR, 'leads.json')

async function ensureDataFile() {
  if (isVercel) return
  
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.access(LEADS_FILE)
  } catch {
    await fs.writeFile(LEADS_FILE, '[]', 'utf8')
  }
}

export async function saveLead(lead: Lead): Promise<void> {
  try {
    const db = await getDb()
    await db.collection('leads').insertOne(lead)
    // Also save to JSON as backup
    if (!isVercel) {
      await ensureDataFile()
      const raw = await fs.readFile(LEADS_FILE, 'utf8')
      const arr: Lead[] = raw ? JSON.parse(raw) : []
      arr.push(lead)
      await fs.writeFile(LEADS_FILE, JSON.stringify(arr, null, 2), 'utf8')
    }
  } catch (error) {
    console.error('Failed to save lead in MongoDB, falling back to JSON:', error)
    if (!isVercel) {
      await ensureDataFile()
      const raw = await fs.readFile(LEADS_FILE, 'utf8')
      const arr: Lead[] = raw ? JSON.parse(raw) : []
      arr.push(lead)
      await fs.writeFile(LEADS_FILE, JSON.stringify(arr, null, 2), 'utf8')
    }
  }
}

export async function updateLead(submission_id: string, patch: Partial<Lead>): Promise<void> {
  try {
    const db = await getDb()
    await db.collection('leads').updateOne({ submission_id }, { $set: patch })
    // Also update JSON backup
    if (!isVercel) {
      await ensureDataFile()
      const raw = await fs.readFile(LEADS_FILE, 'utf8')
      const arr: Lead[] = raw ? JSON.parse(raw) : []
      const idx = arr.findIndex(l => l.submission_id === submission_id)
      if (idx !== -1) {
        arr[idx] = { ...arr[idx], ...patch }
        await fs.writeFile(LEADS_FILE, JSON.stringify(arr, null, 2), 'utf8')
      }
    }
  } catch (error) {
    console.error('Failed to update lead in MongoDB, falling back to JSON:', error)
    if (!isVercel) {
      await ensureDataFile()
      const raw = await fs.readFile(LEADS_FILE, 'utf8')
      const arr: Lead[] = raw ? JSON.parse(raw) : []
      const idx = arr.findIndex(l => l.submission_id === submission_id)
      if (idx !== -1) {
        arr[idx] = { ...arr[idx], ...patch }
        await fs.writeFile(LEADS_FILE, JSON.stringify(arr, null, 2), 'utf8')
      }
    }
  }
}

export async function getPendingLeads(): Promise<Lead[]> {
  try {
    const db = await getDb()
    const leads = await db.collection('leads').find({ status: 'pending' }).toArray()
    return leads as Lead[]
  } catch (error) {
    console.error('Failed to get pending leads from MongoDB, falling back to JSON:', error)
    if (!isVercel) {
      await ensureDataFile()
      const raw = await fs.readFile(LEADS_FILE, 'utf8')
      const arr: Lead[] = raw ? JSON.parse(raw) : []
      return arr.filter(l => l.status === 'pending')
    }
    return []
  }
}
