import { promises as fs } from 'fs'
import path from 'path'
import { CRMLead, CRMNote, CRMActivity } from './types'
import { getDb } from '@/lib/mongodb'

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV
const DATA_DIR = path.join(process.cwd(), 'crm_data')

async function ensureFile(file: string, initial = '[]') {
  if (isVercel) return
  
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.access(file)
  } catch {
    await fs.writeFile(file, initial, 'utf8')
  }
}

async function readFile<T>(name: string): Promise<T[]> {
  if (isVercel) return []
  
  const file = path.join(DATA_DIR, name)
  await ensureFile(file)
  const raw = await fs.readFile(file, 'utf8')
  return raw ? JSON.parse(raw) : []
}

async function writeFile<T>(name: string, data: T[]) {
  if (isVercel) return
  
  const file = path.join(DATA_DIR, name)
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8')
}

export async function listLeads(): Promise<CRMLead[]> {
  try {
    const db = await getDb()
    const leads = await db.collection('crm_leads').find({}).sort({ created_at: -1 }).toArray()
    // Also save to JSON as backup for dev
    await writeFile('leads.json', leads as CRMLead[])
    return leads as CRMLead[]
  } catch (error) {
    console.error('Failed to list leads from MongoDB, falling back to JSON:', error)
    return readFile<CRMLead>('leads.json')
  }
}

export async function getLead(id: string): Promise<CRMLead | undefined> {
  try {
    const db = await getDb()
    const lead = await db.collection('crm_leads').findOne({ id }) as CRMLead | null
    if (lead) {
      return lead
    }
  } catch (error) {
    console.error('Failed to get lead from MongoDB, falling back to JSON:', error)
  }
  const leads = await listLeads()
  return leads.find(l => l.id === id)
}

export async function createLead(lead: CRMLead): Promise<void> {
  try {
    const db = await getDb()
    await db.collection('crm_leads').insertOne(lead)
    // Also save to JSON as backup
    const leads = await listLeads()
    await writeFile('leads.json', [lead, ...leads])
  } catch (error) {
    console.error('Failed to create lead in MongoDB, falling back to JSON:', error)
    const leads = await listLeads()
    leads.unshift(lead)
    await writeFile('leads.json', leads)
  }
}

export async function updateLead(id: string, patch: Partial<CRMLead>): Promise<void> {
  try {
    const db = await getDb()
    await db.collection('crm_leads').updateOne({ id }, { $set: patch })
    // Also update JSON as backup
    const leads = await listLeads()
    const idx = leads.findIndex(l => l.id === id)
    if (idx !== -1) {
      leads[idx] = { ...leads[idx], ...patch }
      await writeFile('leads.json', leads)
    }
  } catch (error) {
    console.error('Failed to update lead in MongoDB, falling back to JSON:', error)
    const leads = await listLeads()
    const idx = leads.findIndex(l => l.id === id)
    if (idx !== -1) {
      leads[idx] = { ...leads[idx], ...patch }
      await writeFile('leads.json', leads)
    }
  }
}

export async function listNotes(): Promise<CRMNote[]> {
  try {
    const db = await getDb()
    const notes = await db.collection('crm_notes').find({}).sort({ created_at: -1 }).toArray()
    await writeFile('notes.json', notes as CRMNote[])
    return notes as CRMNote[]
  } catch (error) {
    console.error('Failed to list notes from MongoDB, falling back to JSON:', error)
    return readFile<CRMNote>('notes.json')
  }
}

export async function createNote(note: CRMNote): Promise<void> {
  try {
    const db = await getDb()
    await db.collection('crm_notes').insertOne(note)
    const notes = await listNotes()
    await writeFile('notes.json', [note, ...notes])
  } catch (error) {
    console.error('Failed to create note in MongoDB, falling back to JSON:', error)
    const notes = await listNotes()
    notes.unshift(note)
    await writeFile('notes.json', notes)
  }
}

export async function listActivities(): Promise<CRMActivity[]> {
  try {
    const db = await getDb()
    const activities = await db.collection('crm_activities').find({}).sort({ created_at: -1 }).toArray()
    await writeFile('activities.json', activities as CRMActivity[])
    return activities as CRMActivity[]
  } catch (error) {
    console.error('Failed to list activities from MongoDB, falling back to JSON:', error)
    return readFile<CRMActivity>('activities.json')
  }
}

export async function createActivity(activity: CRMActivity): Promise<void> {
  try {
    const db = await getDb()
    await db.collection('crm_activities').insertOne(activity)
    const acts = await listActivities()
    await writeFile('activities.json', [activity, ...acts])
  } catch (error) {
    console.error('Failed to create activity in MongoDB, falling back to JSON:', error)
    const acts = await listActivities()
    acts.unshift(activity)
    await writeFile('activities.json', acts)
  }
}
