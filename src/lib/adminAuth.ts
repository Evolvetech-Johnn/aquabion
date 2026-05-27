import crypto from 'crypto'
import { NextRequest } from 'next/server'

function getSecret(): string {
  return (process.env.ADMIN_SECRET || 'dev_admin_secret_change_me').trim()
}
const COOKIE_NAME = 'admin_token'

function base64url(input: Buffer | string) {
  return Buffer.from(input).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

export function issueToken(ttlSeconds = 8 * 60 * 60) {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + ttlSeconds
  const payload = { iat, exp }
  const b = base64url(JSON.stringify(payload))
  const sig = crypto.createHmac('sha256', getSecret()).update(b).digest('base64')
  const s = base64url(sig)
  return `${b}.${s}`
}

export function verifyToken(token?: string) {
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [b, s] = parts
  try {
    const expectedSig = base64url(crypto.createHmac('sha256', getSecret()).update(b).digest('base64'))
    if (s !== expectedSig) return false
    const payloadRaw = Buffer.from(b, 'base64').toString('utf8')
    const payload = JSON.parse(payloadRaw)
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp && payload.exp < now) return false
    return true
  } catch {
    return false
  }
}

export function getTokenFromRequest(req: NextRequest) {
  try {
    const cookie = req.headers.get('cookie') || ''
    const match = cookie.split(';').map(s=>s.trim()).find(c=>c.startsWith(COOKIE_NAME+'='))
    if (match) return match.split('=')[1]
    const header = req.headers.get('x-admin-secret')
    if (header && header === getSecret()) return 'header:' + header
    return undefined
  } catch {
    return undefined
  }
}

export function isAdminRequest(req: NextRequest) {
  const token = getTokenFromRequest(req)
  if (!token) return false
  if (token.startsWith('header:')) return true
  return verifyToken(token)
}
