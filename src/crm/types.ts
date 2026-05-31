export type CRMLead = {
  id: string
  submission_id?: string
  name?: string
  email?: string
  phone?: string
  company?: string
  segment?: string
  message?: string
  city?: string
  state?: string
  source?: string
  landing_page?: string
  utm?: Record<string, string>
  ip?: string
  user_agent?: string
  created_at: string
  status: 'new' | 'contacted' | 'qualified' | 'won' | 'lost'
  assignee?: string
  tags?: string[]
}

export type CRMNote = {
  id: string
  leadId: string
  text: string
  created_at: string
  author?: string
}

export type CRMActivity = {
  id: string
  leadId: string
  type: string
  payload?: unknown
  created_at: string
}
