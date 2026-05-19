import { NextRequest, NextResponse } from 'next/server'
import { Lead } from '@/lib/types'
import { saveLead, updateLead } from '@/lib/leadStore'
import { sendLeadToCRM } from '@/lib/crm'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))

    const submission_id = body.submission_id || body.submissionId
    const name = body.name
    const email = body.email
    const phone = body.phone
    const landing_page = body.landing_page || body.landingPage || body.page
    const utm = body.utm || body.utm_params || null

    if (!submission_id) {
      return NextResponse.json({ ok: false, error: 'submission_id required' }, { status: 400 })
    }

    if (!email && !phone) {
      return NextResponse.json({ ok: false, error: 'email or phone required' }, { status: 400 })
    }

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || ''
    const user_agent = request.headers.get('user-agent') || ''

    const lead: Lead = {
      submission_id,
      name,
      email,
      phone,
      landing_page,
      utm,
      ip,
      user_agent,
      created_at: new Date().toISOString(),
      status: 'pending',
    }

    await saveLead(lead)

    // fire-and-forget CRM send but try to update store with result
    const crmResult = await sendLeadToCRM(lead)
    if (crmResult.success) {
      await updateLead(submission_id, { status: 'sent', crm_id: crmResult.crmId })
      return NextResponse.json({ ok: true, submission_id, crm_id: crmResult.crmId }, { status: 201 })
    } else {
      await updateLead(submission_id, { status: 'failed' })
      return NextResponse.json({ ok: false, error: crmResult.error }, { status: 502 })
    }
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
