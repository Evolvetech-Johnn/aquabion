import { NextRequest, NextResponse } from 'next/server'
import { issueToken } from '@/lib/adminAuth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(()=>({}))
    const secret = body.secret || body.ADMIN_SECRET
    if (!secret || secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ ok: false }, { status: 401 })
    }
    const token = issueToken()
    const res = NextResponse.json({ ok: true })
    // set cookie
    res.headers.set('Set-Cookie', `admin_token=${token}; HttpOnly; Path=/; Max-Age=${8*60*60}; SameSite=Lax`)
    return res
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
