import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { listLeads, createLead } from '@/crm/store'
import { CRMLead } from '@/crm/types'
import { isAdminRequest } from '@/lib/adminAuth'

type SortableKey = 'created_at' | 'name' | 'email'

export async function GET(request: NextRequest) {
  // admin-protected listing with pagination, sorting and optional status filter
  if (!isAdminRequest(request)) return NextResponse.json({ ok: false }, { status: 401 })

  const url = new URL(request.url)
  const params = url.searchParams
  const page = Math.max(1, parseInt(params.get('page') || '1', 10))
  const per_page = Math.min(200, Math.max(1, parseInt(params.get('per_page') || '25', 10)))
  const sort_by = (params.get('sort_by') || 'created_at') as SortableKey
  const sort_dir = (params.get('sort_dir') || 'desc').toLowerCase()
  const statusFilter = params.get('status') || null
  const search = params.get('search') || null

  let leads = await listLeads()
  if (statusFilter) {
    leads = leads.filter(l => String(l.status) === statusFilter)
  }

  if (search) {
    const q = String(search).toLowerCase()
    leads = leads.filter(l => {
      const checks = [l.name, l.email, l.phone, l.company, l.segment, l.city, l.state, l.message, l.landing_page, JSON.stringify(l.utm || {})]
      return checks.some(v => (v || '').toString().toLowerCase().includes(q))
    })
  }

  // Sorting helper
  leads.sort((a, b) => {
    const va = a[sort_by]
    const vb = b[sort_by]
    if (va === undefined && vb === undefined) return 0
    if (va === undefined) return sort_dir === 'asc' ? -1 : 1
    if (vb === undefined) return sort_dir === 'asc' ? 1 : -1

    // prefer date compare for created_at
    if (sort_by === 'created_at') {
      const da = Date.parse(String(va)) || 0
      const db = Date.parse(String(vb)) || 0
      return sort_dir === 'asc' ? da - db : db - da
    }

    if (typeof va === 'number' && typeof vb === 'number') {
      return sort_dir === 'asc' ? va - vb : vb - va
    }

    const sa = String(va).toLowerCase()
    const sb = String(vb).toLowerCase()
    if (sa < sb) return sort_dir === 'asc' ? -1 : 1
    if (sa > sb) return sort_dir === 'asc' ? 1 : -1
    return 0
  })

  const total = leads.length
  const total_pages = Math.max(1, Math.ceil(total / per_page))
  const start = (page - 1) * per_page
  const items = leads.slice(start, start + per_page)

  return NextResponse.json({ ok: true, leads: items, meta: { total, page, per_page, total_pages } })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const now = new Date().toISOString()
    const lead: CRMLead = {
      id: crypto.randomUUID(),
      submission_id: body.submission_id || body.submissionId,
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      segment: body.segment,
      message: body.message,
      city: body.city,
      state: body.state,
      source: body.source || body.utm?.utm_source || 'web',
      landing_page: body.landing_page || body.page || '/contato',
      utm: body.utm || null,
      ip: request.headers.get('x-forwarded-for') || '',
      user_agent: request.headers.get('user-agent') || '',
      created_at: now,
      status: 'new',
      assignee: undefined,
    }

    await createLead(lead)
    return NextResponse.json({ ok: true, lead }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
