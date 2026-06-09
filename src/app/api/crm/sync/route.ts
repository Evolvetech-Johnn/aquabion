import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/adminAuth'
import { syncJsonToMongoDB } from '@/crm/store'

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  try {
    const result = await syncJsonToMongoDB()
    return NextResponse.json({ ok: true, ...result })
  } catch (error) {
    console.error('Sync failed:', error)
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 })
  }
}
