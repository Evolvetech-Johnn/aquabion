import { NextRequest, NextResponse } from 'next/server'
import { issueToken } from '@/lib/adminAuth'

export async function POST(request: NextRequest) {
  try {
    let body: Record<string, unknown> = {}
    try {
      body = await request.json()
    } catch (parseErr) {
      console.error('[admin/login] Failed to parse JSON body:', parseErr)
      return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 })
    }

    const secret = String(body.secret || body.ADMIN_SECRET || '').trim()
    const expected = (process.env.ADMIN_SECRET || 'dev_admin_secret_change_me').trim()

    if (!secret || !expected || secret !== expected) {
      console.warn('[Admin Login] Mismatch. Secret input length:', secret.length, 'Expected secret length:', expected.length)
      return NextResponse.json({ ok: false }, { status: 401 })
    }

    const token = issueToken()
    const res = NextResponse.json({ ok: true })
    // set cookie
    res.headers.set('Set-Cookie', `admin_token=${token}; HttpOnly; Path=/; Max-Age=${8*60*60}; SameSite=Lax`)
    return res
  } catch (e) {
    console.error('[admin/login] Unexpected error:', e)
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
