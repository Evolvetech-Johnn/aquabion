import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/adminAuth'

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ ok: false }, { status: 401 })
  return NextResponse.json({ ok: true })
}
