import { promises as fs } from 'fs'
import path from 'path'
import { ObjectId } from 'mongodb'
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
    if (db) {
      const docs = await db.collection('crm_leads').find({}).sort({ created_at: -1 }).toArray()
      const leads = docs.map(mapMongoToCRMLead)
      await writeFile('leads.json', leads)
      return leads
    }
  } catch (error) {
    console.error('Failed to list leads from MongoDB, falling back to JSON:', error)
  }
  return readFile<CRMLead>('leads.json')
}

export async function getLead(id: string): Promise<CRMLead | undefined> {
  try {
    const db = await getDb()
    if (db) {
      let doc: WithId<Document> | null = null
      
      // Try finding by id field first
      doc = await db.collection('crm_leads').findOne({ id })
      
      // If not found, try by _id
      if (!doc && ObjectId.isValid(id)) {
        doc = await db.collection('crm_leads').findOne({ _id: new ObjectId(id) })
      }
      
      if (doc) {
        return mapMongoToCRMLead(doc)
      }
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
    if (db) {
      await db.collection('crm_leads').insertOne(lead)
    }
  } catch (error) {
    console.error('Failed to create lead in MongoDB, falling back to JSON:', error)
  }
  const leads = await listLeads()
  leads.unshift(lead)
  await writeFile('leads.json', leads)
}

export async function updateLead(id: string, patch: Partial<CRMLead>): Promise<void> {
  try {
    // Try updating in MongoDB first
    try {
      const db = await getDb()
      if (db) {
        // Try updating by id first
        const updateResult = await db.collection('crm_leads').updateOne({ id }, { $set: patch })
        
        // If no document matched, try updating by _id
        if (updateResult.matchedCount === 0 && ObjectId.isValid(id)) {
          await db.collection('crm_leads').updateOne({ _id: new ObjectId(id) }, { $set: patch })
        }
      }
    } catch (mongoError) {
      console.error('MongoDB update failed, proceeding with JSON:', mongoError)
    }
    
    // Always update the JSON file as fallback/sync
    const leads = await readFile<CRMLead>('leads.json')
    const idx = leads.findIndex(l => l.id === id)
    if (idx !== -1) {
      leads[idx] = { ...leads[idx], ...patch }
      await writeFile('leads.json', leads)
    } else {
      console.warn('Lead not found in JSON file:', id)
    }
  } catch (error) {
    console.error('Failed to update lead:', error)
    throw error
  }
}

export async function listNotes(): Promise<CRMNote[]> {
  try {
    const db = await getDb()
    if (db) {
      const docs = await db.collection('crm_notes').find({}).sort({ created_at: -1 }).toArray()
      const notes = docs.map(mapMongoToCRMNote)
      await writeFile('notes.json', notes)
      return notes
    }
  } catch (error) {
    console.error('Failed to list notes from MongoDB, falling back to JSON:', error)
  }
  return readFile<CRMNote>('notes.json')
}

export async function createNote(note: CRMNote): Promise<void> {
  try {
    const db = await getDb()
    if (db) {
      await db.collection('crm_notes').insertOne(note)
    }
  } catch (error) {
    console.error('Failed to create note in MongoDB, falling back to JSON:', error)
  }
  const notes = await listNotes()
  notes.unshift(note)
  await writeFile('notes.json', notes)
}

export async function listActivities(): Promise<CRMActivity[]> {
  try {
    const db = await getDb()
    if (db) {
      const docs = await db.collection('crm_activities').find({}).sort({ created_at: -1 }).toArray()
      const activities = docs.map(mapMongoToCRMActivity)
      await writeFile('activities.json', activities)
      return activities
    }
  } catch (error) {
    console.error('Failed to list activities from MongoDB, falling back to JSON:', error)
  }
  return readFile<CRMActivity>('activities.json')
}

export async function createActivity(activity: CRMActivity): Promise<void> {
  try {
    const db = await getDb()
    if (db) {
      await db.collection('crm_activities').insertOne(activity)
    }
  } catch (error) {
    console.error('Failed to create activity in MongoDB, falling back to JSON:', error)
  }
  const acts = await listActivities()
  acts.unshift(activity)
  await writeFile('activities.json', acts)
}

/**
 * Syncs JSON files to MongoDB (for local development when switching to MongoDB)
 * This will only run if MONGODB_URI is available and in development mode
 */
export async function syncJsonToMongoDB(): Promise<{ success: boolean; syncedLeads: number; syncedNotes: number; syncedActivities: number; error?: string }> {
  if (isVercel) {
    return { success: false, syncedLeads: 0, syncedNotes: 0, syncedActivities: 0, error: 'Sync not available in Vercel' }
  }
  
  try {
    const db = await getDb()
    if (!db) {
      return { success: false, syncedLeads: 0, syncedNotes: 0, syncedActivities: 0, error: 'MongoDB not configured' }
    }
    
    // Sync Leads
    const jsonLeads = await readFile<CRMLead>('leads.json')
    let syncedLeads = 0
    for (const lead of jsonLeads) {
      const existing = await db.collection('crm_leads').findOne({ id: lead.id })
      if (!existing) {
        await db.collection('crm_leads').insertOne(lead)
        syncedLeads++
      }
    }
    
    // Sync Notes
    const jsonNotes = await readFile<CRMNote>('notes.json')
    let syncedNotes = 0
    for (const note of jsonNotes) {
      const existing = await db.collection('crm_notes').findOne({ id: note.id })
      if (!existing) {
        await db.collection('crm_notes').insertOne(note)
        syncedNotes++
      }
    }
    
    // Sync Activities
    const jsonActivities = await readFile<CRMActivity>('activities.json')
    let syncedActivities = 0
    for (const activity of jsonActivities) {
      const existing = await db.collection('crm_activities').findOne({ id: activity.id })
      if (!existing) {
        await db.collection('crm_activities').insertOne(activity)
        syncedActivities++
      }
    }
    
    // Update local files from DB
    await listLeads()
    await listNotes()
    await listActivities()
    
    return { success: true, syncedLeads, syncedNotes, syncedActivities }
  } catch (error) {
    console.error('Failed to sync JSON to MongoDB:', error)
    return { success: false, syncedLeads: 0, syncedNotes: 0, syncedActivities: 0, error: String(error) }
  }
}
