import { NextRequest, NextResponse } from 'next/server'
import { issueToken, validateCredentials } from '@/lib/adminAuth'
import { AuditService } from '@/audit/service'

export async function POST(request: NextRequest) {
  try {
    let body: Record<string, unknown> = {}
    try {
      body = await request.json()
    } catch (parseErr) {
      return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 })
    }

    const username = String(body.username || '').trim()
    const password = String(body.password || '').trim()
    const secret = String(body.secret || body.ADMIN_SECRET || '').trim()
    
    let authenticated = false
    let loginUsername = ''
    const expectedSecret = (process.env.ADMIN_SECRET || 'dev_admin_secret_change_me').trim()
    
    if (username && password) {
      const result = validateCredentials(username, password)
      authenticated = result.valid
      loginUsername = result.username
    } else if (secret && expectedSecret && secret === expectedSecret) {
      authenticated = true
      loginUsername = 'admin'
    }

    if (!authenticated) {
      await AuditService.logLogin(false, username, request)
      return NextResponse.json({ ok: false }, { status: 401 })
    }

    await AuditService.logLogin(true, loginUsername, request)
    const token = issueToken(loginUsername)
    const res = NextResponse.json({ ok: true, username: loginUsername })
    res.headers.set('Set-Cookie', `admin_token=${token}; HttpOnly; Path=/; Max-Age=${8*60*60}; SameSite=Lax`)
    return res
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
