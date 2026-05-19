import { Lead } from './types'

const CRM_ENDPOINT = process.env.CRM_ENDPOINT
const CRM_API_KEY = process.env.CRM_API_KEY

if (!CRM_ENDPOINT) {
  // it's okay for local development, we will fail gracefully at runtime
}

async function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms))
}

export async function sendLeadToCRM(lead: Lead): Promise<{ success: boolean; crmId?: string; error?: string }> {
  if (!CRM_ENDPOINT) return { success: false, error: 'CRM_ENDPOINT not configured' }

  const payload = {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    source: lead.source,
    landing_page: lead.landing_page,
    utm: lead.utm,
    submission_id: lead.submission_id,
  }

  const maxAttempts = 3
  let attempt = 0
  let lastError: string | null = null

  while (attempt < maxAttempts) {
    try {
      const res = await fetch(CRM_ENDPOINT!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(CRM_API_KEY ? { Authorization: `Bearer ${CRM_API_KEY}` } : {}),
        },
        body: JSON.stringify(payload),
      })

      const text = await res.text()
      if (res.ok) {
        // Try parse id from response
        try {
          const json = JSON.parse(text) as { id?: string; crm_id?: string }
          return { success: true, crmId: json.id || json.crm_id || undefined }
        } catch {
          return { success: true }
        }
      } else {
        lastError = `status=${res.status} body=${text}`
        attempt++
        await sleep(500 * attempt)
      }
    } catch {
      lastError = 'Unknown error sending lead to CRM'
      attempt++
      await sleep(500 * attempt)
    }
  }

  return { success: false, error: lastError || undefined }
}
