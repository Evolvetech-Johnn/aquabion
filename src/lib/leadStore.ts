import { promises as fs } from 'fs'
import path from 'path'
import { Lead } from './types'

const DATA_DIR = path.join(process.cwd(), 'data')
const LEADS_FILE = path.join(DATA_DIR, 'leads.json')

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.access(LEADS_FILE)
  } catch {
    await fs.writeFile(LEADS_FILE, '[]', 'utf8')
  }
}

export async function saveLead(lead: Lead): Promise<void> {
  await ensureDataFile()
  const raw = await fs.readFile(LEADS_FILE, 'utf8')
  const arr: Lead[] = raw ? JSON.parse(raw) : []
  arr.push(lead)
  await fs.writeFile(LEADS_FILE, JSON.stringify(arr, null, 2), 'utf8')
}

export async function updateLead(submission_id: string, patch: Partial<Lead>): Promise<void> {
  await ensureDataFile()
  const raw = await fs.readFile(LEADS_FILE, 'utf8')
  const arr: Lead[] = raw ? JSON.parse(raw) : []
  const idx = arr.findIndex(l => l.submission_id === submission_id)
  if (idx === -1) return
  arr[idx] = { ...arr[idx], ...patch }
  await fs.writeFile(LEADS_FILE, JSON.stringify(arr, null, 2), 'utf8')
}

export async function getPendingLeads(): Promise<Lead[]> {
  await ensureDataFile()
  const raw = await fs.readFile(LEADS_FILE, 'utf8')
  const arr: Lead[] = raw ? JSON.parse(raw) : []
  return arr.filter(l => l.status === 'pending')
}
