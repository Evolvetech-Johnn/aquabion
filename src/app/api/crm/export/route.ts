import { NextRequest, NextResponse } from 'next/server'
import { CRMLead } from '@/crm/types'
import { listLeads } from '@/crm/store'
import { isAdminRequest } from '@/lib/adminAuth'

function toCSV(rows: CRMLead[], headers: string[]) {
  const esc = (v: string | number | boolean | null | undefined | Record<string, unknown>) => {
    if (v === null || v === undefined) return ''
    const s = typeof v === 'object' ? JSON.stringify(v) : String(v)
    return `"${s.replace(/"/g, '""')}"`
  }
  const lines = [headers.join(',')]
  for (const r of rows) {
    const record = r as Record<string, unknown>
    lines.push(headers.map(h => esc(record[h] as string | number | boolean | null | undefined | Record<string, unknown>)).join(','))
  }
  return lines.join('\n')
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ ok: false }, { status: 401 })
  const url = new URL(request.url)
  const params = url.searchParams
  const statusFilter = params.get('status') || null
  const search = params.get('search') || null

  let leads = await listLeads()
  if (statusFilter) leads = leads.filter(l => String(l.status) === statusFilter)
  if (search) {
    const q = String(search).toLowerCase()
    leads = leads.filter(l => {
      const checks = [l.name, l.email, l.phone, l.company, l.segment, l.city, l.state, l.message, l.landing_page, JSON.stringify(l.utm || {})]
      return checks.some(v => (v || '').toString().toLowerCase().includes(q))
    })
  }
  const headers = ['id','submission_id','name','email','phone','company','segment','city','state','message','source','landing_page','created_at','status','assignee']
  const csv = toCSV(leads, headers)
  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="leads_export_${Date.now()}.csv"`,
    },
  })
}
