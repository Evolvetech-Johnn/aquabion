import { NextRequest, NextResponse } from 'next/server'
import { getLead, updateLead } from '@/crm/store'
import { isAdminRequest } from '@/lib/adminAuth'

function getLeadIdFromRequest(request: NextRequest) {
  const url = new URL(request.url)
  const segments = url.pathname.split('/').filter(Boolean)
  return segments[segments.length - 2] || ''
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ ok: false }, { status: 401 })
  const leadId = getLeadIdFromRequest(request)
  const lead = await getLead(leadId)
  if (!lead) return NextResponse.json({ ok: false }, { status: 404 })
  return NextResponse.json({ ok: true, lead })
}

export async function PATCH(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ ok: false }, { status: 401 })
  const body = await request.json().catch(() => ({}))
  const leadId = getLeadIdFromRequest(request)
  await updateLead(leadId, body)
  const lead = await getLead(leadId)
  return NextResponse.json({ ok: true, lead })
}

export async function DELETE(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ ok: false }, { status: 401 })
  const leadId = getLeadIdFromRequest(request)
  // soft-delete by marking status lost
  await updateLead(leadId, { status: 'lost' })
  return NextResponse.json({ ok: true })
}
