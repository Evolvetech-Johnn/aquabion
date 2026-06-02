import { promises as fs } from 'fs'
import path from 'path'
import { CRMLead, CRMNote, CRMActivity } from './types'
import { getDb } from '@/lib/mongodb'
import type { WithId, Document } from 'mongodb'

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

function mapMongoToCRMLead(doc: WithId<Document>): CRMLead {
  return {
    id: doc.id || doc._id.toString(),
    submission_id: doc.submission_id as string | undefined,
    name: doc.name as string | undefined,
    email: doc.email as string | undefined,
    phone: doc.phone as string | undefined,
    company: doc.company as string | undefined,
    segment: doc.segment as string | undefined,
    message: doc.message as string | undefined,
    city: doc.city as string | undefined,
    state: doc.state as string | undefined,
    source: doc.source as string | undefined,
    landing_page: doc.landing_page as string | undefined,
    utm: doc.utm as Record<string, string> | undefined,
    ip: doc.ip as string | undefined,
    user_agent: doc.user_agent as string | undefined,
    created_at: doc.created_at as string,
    status: doc.status as 'new' | 'contacted' | 'qualified' | 'meeting_scheduled' | 'won' | 'lost' | 'disqualified' | 'cold',
    assignee: doc.assignee as string | undefined,
    tags: doc.tags as string[] | undefined,
  }
}

function mapMongoToCRMNote(doc: WithId<Document>): CRMNote {
  return {
    id: doc.id || doc._id.toString(),
    leadId: doc.leadId as string,
    text: doc.text as string,
    created_at: doc.created_at as string,
    author: doc.author as string | undefined,
  }
}

function mapMongoToCRMActivity(doc: WithId<Document>): CRMActivity {
  return {
    id: doc.id || doc._id.toString(),
    leadId: doc.leadId as string,
    type: doc.type as string,
    payload: doc.payload as unknown | undefined,
    created_at: doc.created_at as string,
  }
}

export async function listLeads(): Promise<CRMLead[]> {
  try {
    const db = await getDb()
    const docs = await db.collection('crm_leads').find({}).sort({ created_at: -1 }).toArray()
    const leads = docs.map(mapMongoToCRMLead)
    await writeFile('leads.json', leads)
    return leads
  } catch (error) {
    console.error('Failed to list leads from MongoDB, falling back to JSON:', error)
    return readFile<CRMLead>('leads.json')
  }
}

export async function getLead(id: string): Promise<CRMLead | undefined> {
  try {
    const db = await getDb()
    const doc = await db.collection('crm_leads').findOne({ id })
    if (doc) {
      return mapMongoToCRMLead(doc)
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
    const docs = await db.collection('crm_notes').find({}).sort({ created_at: -1 }).toArray()
    const notes = docs.map(mapMongoToCRMNote)
    await writeFile('notes.json', notes)
    return notes
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
    const docs = await db.collection('crm_activities').find({}).sort({ created_at: -1 }).toArray()
    const activities = docs.map(mapMongoToCRMActivity)
    await writeFile('activities.json', activities)
    return activities
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
