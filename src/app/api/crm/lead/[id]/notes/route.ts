import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { listNotes, createNote } from '@/crm/store'
import { isAdminRequest } from '@/lib/adminAuth'

function getLeadIdFromRequest(request: NextRequest) {
  const url = new URL(request.url)
  const segments = url.pathname.split('/').filter(Boolean)
  // /api/crm/lead/[id]/notes
  return segments[segments.length - 2] || ''
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ ok: false }, { status: 401 })
  const leadId = getLeadIdFromRequest(request)
  const notes = await listNotes()
  const leadNotes = notes.filter(n => n.leadId === leadId)
  return NextResponse.json({ ok: true, notes: leadNotes })
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ ok: false }, { status: 401 })
  const body = await request.json().catch(() => ({}))
  const now = new Date().toISOString()
  const leadId = getLeadIdFromRequest(request)
  const note = {
    id: crypto.randomUUID(),
    leadId,
    text: body.text || '',
    created_at: now,
    author: body.author || 'admin',
  }
  await createNote(note)
  return NextResponse.json({ ok: true, note }, { status: 201 })
}
