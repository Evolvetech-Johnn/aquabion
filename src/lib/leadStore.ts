import { promises as fs } from 'fs'
import path from 'path'
import { Lead } from './types'
import { getDb } from './mongodb'
import type { WithId, Document } from 'mongodb'

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

function mapMongoToLead(doc: WithId<Document>): Lead {
  return {
    submission_id: doc.submission_id as string,
    name: doc.name as string | undefined,
    email: doc.email as string | undefined,
    phone: doc.phone as string | undefined,
    source: doc.source as string | undefined,
    landing_page: doc.landing_page as string | undefined,
    utm: doc.utm as Record<string, string> | undefined,
    ip: doc.ip as string | undefined,
    user_agent: doc.user_agent as string | undefined,
    created_at: doc.created_at as string | undefined,
    status: doc.status as 'pending' | 'sent' | 'failed' | undefined,
    crm_id: doc.crm_id as string | undefined,
  }
}

export async function saveLead(lead: Lead): Promise<void> {
  try {
    const db = await getDb()
    await db.collection('leads').insertOne(lead)
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
    const docs = await db.collection('leads').find({ status: 'pending' }).toArray()
    return docs.map(mapMongoToLead)
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
