import { NextRequest, NextResponse } from 'next/server'
import { AuditService } from '@/audit/service'
import { getUsernameFromRequest } from '@/lib/adminAuth'

export async function POST(request: NextRequest) {
  const username = getUsernameFromRequest(request)
  await AuditService.logLogout(username, request)
  
  const res = NextResponse.json({ ok: true })
  res.headers.set('Set-Cookie', `admin_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`)
  return res
}
