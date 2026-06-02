import { NextRequest, NextResponse } from 'next/server'
import { getLead, updateLead } from '@/crm/store'
import { isAdminRequest } from '@/lib/adminAuth'
import { AuditService } from '@/audit/service'

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
  const oldLead = await getLead(leadId)
  await updateLead(leadId, body)
  const newLead = await getLead(leadId)
  
  if (oldLead && newLead) {
    await AuditService.logLeadUpdated(oldLead, newLead, request)
  }
  
  return NextResponse.json({ ok: true, lead: newLead })
}

export async function DELETE(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ ok: false }, { status: 401 })
  const leadId = getLeadIdFromRequest(request)
  const oldLead = await getLead(leadId)
  
  // soft-delete by marking status lost
  await updateLead(leadId, { status: 'lost' })
  
  if (oldLead) {
    await AuditService.logLeadDeleted(oldLead, request)
  }
  
  return NextResponse.json({ ok: true })
}
