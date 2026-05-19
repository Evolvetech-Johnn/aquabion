export type Lead = {
  submission_id: string
  name?: string
  email?: string
  phone?: string
  source?: string
  landing_page?: string
  utm?: Record<string, string>
  ip?: string
  user_agent?: string
  created_at?: string
  status?: 'pending' | 'sent' | 'failed'
  crm_id?: string
}
