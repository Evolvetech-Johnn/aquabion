import { NextResponse } from 'next/server'

export async function GET() {
  console.log('[test-env] Environment variables:')
  console.log('ADMIN_USERNAME_FULL:', process.env.ADMIN_USERNAME_FULL)
  console.log('ADMIN_USERNAME_RESTRICTED:', process.env.ADMIN_USERNAME_RESTRICTED)
  console.log('ADMIN_SECRET:', process.env.ADMIN_SECRET ? 'set' : 'not set')
  
  return NextResponse.json({
    ADMIN_USERNAME_FULL: process.env.ADMIN_USERNAME_FULL,
    ADMIN_USERNAME_RESTRICTED: process.env.ADMIN_USERNAME_RESTRICTED,
    ADMIN_SECRET: process.env.ADMIN_SECRET ? 'set' : 'not set'
  })
}
