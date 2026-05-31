import { NextRequest, NextResponse } from 'next/server'
import { issueToken, validateCredentials } from '@/lib/adminAuth'

export async function POST(request: NextRequest) {
  try {
    let body: Record<string, unknown> = {}
    try {
      body = await request.json()
      console.log('[admin/login] Request body:', { hasUsername: !!body.username, hasPassword: !!body.password, hasSecret: !!body.secret })
    } catch (parseErr) {
      console.error('[admin/login] Failed to parse JSON body:', parseErr)
      return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 })
    }

    // Support both old secret-only and new username/password
    const username = String(body.username || '').trim()
    const password = String(body.password || '').trim()
    const secret = String(body.secret || body.ADMIN_SECRET || '').trim()
    
    let authenticated = false
    let loginUsername = ''
    const expectedSecret = (process.env.ADMIN_SECRET || 'dev_admin_secret_change_me').trim()
    
    console.log('[admin/login] Environment variables loaded:', {
      ADMIN_SECRET: expectedSecret ? 'set' : 'not set',
      ADMIN_USERNAME_FULL: process.env.ADMIN_USERNAME_FULL,
      ADMIN_USERNAME_RESTRICTED: process.env.ADMIN_USERNAME_RESTRICTED
    })
    
    if (username && password) {
      console.log('[admin/login] Attempting username/password login')
      const result = validateCredentials(username, password)
      authenticated = result.valid
      loginUsername = result.username
    } else if (secret && expectedSecret && secret === expectedSecret) {
      // For backwards compatibility
      console.log('[admin/login] Attempting secret login')
      authenticated = true
      loginUsername = 'admin'
    }

    if (!authenticated) {
      console.warn('[Admin Login] Failed authentication attempt.')
      return NextResponse.json({ ok: false }, { status: 401 })
    }

    const token = issueToken(loginUsername)
    const res = NextResponse.json({ ok: true, username: loginUsername })
    // set cookie
    res.headers.set('Set-Cookie', `admin_token=${token}; HttpOnly; Path=/; Max-Age=${8*60*60}; SameSite=Lax`)
    return res
  } catch (e) {
    console.error('[admin/login] Unexpected error:', e)
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
