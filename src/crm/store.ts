import { promises as fs } from 'fs'
import path from 'path'
import { CRMLead, CRMNote, CRMActivity } from './types'

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
  return readFile<CRMLead>('leads.json')
}

export async function getLead(id: string): Promise<CRMLead | undefined> {
  const leads = await listLeads()
  return leads.find(l => l.id === id)
}

export async function createLead(lead: CRMLead): Promise<void> {
  const leads = await listLeads()
  leads.unshift(lead)
  await writeFile('leads.json', leads)
}

export async function updateLead(id: string, patch: Partial<CRMLead>): Promise<void> {
  const leads = await listLeads()
  const idx = leads.findIndex(l => l.id === id)
  if (idx === -1) return
  leads[idx] = { ...leads[idx], ...patch }
  await writeFile('leads.json', leads)
}

export async function listNotes(): Promise<CRMNote[]> {
  return readFile<CRMNote>('notes.json')
}

export async function createNote(note: CRMNote): Promise<void> {
  const notes = await listNotes()
  notes.unshift(note)
  await writeFile('notes.json', notes)
}

export async function listActivities(): Promise<CRMActivity[]> {
  return readFile<CRMActivity>('activities.json')
}

export async function createActivity(activity: CRMActivity): Promise<void> {
  const acts = await listActivities()
  acts.unshift(activity)
  await writeFile('activities.json', acts)
}
