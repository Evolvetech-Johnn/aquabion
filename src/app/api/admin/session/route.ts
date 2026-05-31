import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest, getUsernameFromRequest } from '@/lib/adminAuth'

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ ok: false }, { status: 401 })
  const username = getUsernameFromRequest(request)
  return NextResponse.json({ ok: true, username })
}
