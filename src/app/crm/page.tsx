"use client"
import React, { useCallback, useEffect, useState } from 'react'
import type { CRMLead, CRMNote } from '@/crm/types'

type Lead = CRMLead
type Note = CRMNote

export default function CRMAdmin() {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [adminInput, setAdminInput] = useState<string>('')
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selected, setSelected] = useState<Lead | null>(null)
  const [notes, setNotes] = useState<Note[]>([])
  const [noteText, setNoteText] = useState('')
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(25)
  const [total, setTotal] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [sortBy, setSortBy] = useState<string>('created_at')
  const [sortDir, setSortDir] = useState<string>('desc')

  useEffect(() => {
    // check session
    fetch('/api/admin/session', { credentials: 'same-origin' }).then(r=>r.json()).then(j=>{ if (j?.ok) setIsAuth(true) }).catch(()=>{})
  }, [])

  const fetchLeads = useCallback(async () => {
    if (!isAuth) return
    setLoading(true)
    const params = new URLSearchParams()
    params.set('page', String(page))
    params.set('per_page', String(perPage))
    params.set('sort_by', sortBy)
    params.set('sort_dir', sortDir)
    if (statusFilter !== 'all') params.set('status', statusFilter)
    if (query) params.set('search', query)
    const res = await fetch(`/api/crm/leads?${params.toString()}`, { credentials: 'same-origin' })
    const json = await res.json()
    if (json?.ok) {
      setLeads(json.leads)
      if (json.meta) {
        setTotal(json.meta.total || 0)
        setTotalPages(json.meta.total_pages || 1)
      }
    }
    setLoading(false)
  }, [isAuth, page, perPage, sortBy, sortDir, statusFilter, query])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  async function doLogin() {
    try {
      const res = await fetch('/api/admin/login', { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify({ secret: adminInput }), credentials: 'same-origin' })
      const j = await res.json()
      if (j?.ok) setIsAuth(true)
    } catch {
    }
  }

  // server-side search & filters are used; no client-side filtering required

  async function selectLead(lead: Lead) {
    setSelected(lead)
    if (!isAuth) return
    const res = await fetch(`/api/crm/lead/${lead.id}/notes`, { credentials: 'same-origin' })
    const json = await res.json()
    if (json?.ok) setNotes(json.notes)
  }

  async function addNote() {
    if (!selected || !isAuth || !noteText) return
    const res = await fetch(`/api/crm/lead/${selected.id}/notes`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, credentials: 'same-origin', body: JSON.stringify({ text: noteText, author: 'admin' })
    })
    const json = await res.json()
    if (json?.ok) {
      setNotes(prev => [json.note, ...prev])
      setNoteText('')
    }
  }

  async function exportCSV() {
    if (!isAuth) return
    const params = new URLSearchParams()
    if (statusFilter !== 'all') params.set('status', statusFilter)
    if (query) params.set('search', query)
    const res = await fetch(`/api/crm/export?${params.toString()}`, { credentials: 'same-origin' })
    if (!res.ok) return
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads_export.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!isAuth) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">CRM Admin — Login</h2>
        <input value={adminInput} onChange={e=>setAdminInput(e.target.value)} placeholder="ADMIN_SECRET" className="border p-2 mt-4" />
        <button onClick={doLogin} className="ml-2 px-4 py-2 bg-sky-600 text-white rounded">Entrar</button>
      </div>
    )
  }

  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      <div className="col-span-1">
        <div className="flex gap-2 mb-3">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Pesquisar nome, email, telefone" className="border p-2 flex-1" />
          <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="border p-2">
            <option value="all">Todos</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
        </div>
        <div className="flex gap-2 mb-4">
          <button disabled={loading} onClick={()=>{ setPage(1); fetchLeads() }} className="px-3 py-2 bg-slate-800 text-white rounded disabled:opacity-50">{loading ? 'Carregando...' : 'Refresh'}</button>
          <button disabled={loading} onClick={()=>exportCSV()} className="px-3 py-2 bg-blue-600 text-white rounded disabled:opacity-50">Export CSV</button>
          <button disabled={loading} onClick={async ()=>{ await fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin' }); setIsAuth(false) }} className="px-3 py-2 bg-red-600 text-white rounded disabled:opacity-50">Logout</button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <label className="text-sm">Sort:</label>
          <select value={sortBy} onChange={e=>{ setSortBy(e.target.value); setPage(1) }} className="border p-2">
            <option value="created_at">Created At</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
          <select value={sortDir} onChange={e=>{ setSortDir(e.target.value); setPage(1) }} className="border p-2">
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-slate-600">Showing page {page} / {totalPages} — {total} leads</div>
          <div className="flex gap-2 items-center">
            <label className="text-sm">Per page</label>
            <select value={perPage} onChange={e=>{ setPerPage(Number(e.target.value)); setPage(1) }} className="border p-2">
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <button disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-2 py-1 border rounded disabled:opacity-50">Prev</button>
            <button disabled={page>=totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))} className="px-2 py-1 border rounded disabled:opacity-50">Next</button>
            <div className="flex items-center gap-2">
              <label className="text-sm">Go to</label>
              <input type="number" min={1} max={totalPages} defaultValue={page} onKeyDown={e=>{ if (e.key==='Enter'){ const v = Number((e.target as HTMLInputElement).value); if (v>=1 && v<=totalPages) setPage(v) } }} className="border p-1 w-20" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-2 bg-slate-50 rounded border flex gap-4 font-semibold">
            <div className="w-1/3 cursor-pointer" onClick={()=>{ if (sortBy==='name') setSortDir(d=> d==='asc' ? 'desc' : 'asc'); setSortBy('name'); setPage(1) }}>Name {sortBy==='name' && (sortDir==='asc'?'↑':'↓')}</div>
            <div className="w-1/3 cursor-pointer" onClick={()=>{ if (sortBy==='email') setSortDir(d=> d==='asc' ? 'desc' : 'asc'); setSortBy('email'); setPage(1) }}>Email {sortBy==='email' && (sortDir==='asc'?'↑':'↓')}</div>
            <div className="w-1/3 cursor-pointer" onClick={()=>{ if (sortBy==='created_at') setSortDir(d=> d==='asc' ? 'desc' : 'asc'); setSortBy('created_at'); setPage(1) }}>Created {sortBy==='created_at' && (sortDir==='asc'?'↑':'↓')}</div>
            <div className="w-1/6">Status</div>
          </div>
          {leads.map((l: Lead) => (
            <div key={l.id} className={`p-3 border rounded cursor-pointer ${selected?.id===l.id? 'bg-slate-100':''}`} onClick={()=>selectLead(l)}>
              <div className="flex justify-between">
                <div className="w-1/3">{l.name || l.email || l.phone}</div>
                <div className="w-1/3 text-sm text-slate-600">{l.email}</div>
                <div className="w-1/3 text-xs text-slate-400">{l.created_at}</div>
                <div className="w-1/6 text-sm">{l.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-2">
        {!selected && <div className="p-6 border rounded">Selecione um lead para ver detalhes.</div>}
        {selected && (
          <div className="p-6 border rounded">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{selected.name || selected.email}</h3>
                <div className="text-sm text-slate-600">{selected.email} • {selected.phone}</div>
                <div className="text-xs text-slate-400">{selected.created_at} • {selected.status}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={async ()=>{ await fetch(`/api/crm/lead/${selected.id}`, { method: 'PATCH', headers: {'content-type':'application/json'}, credentials: 'same-origin', body: JSON.stringify({status:'contacted'}) }); fetchLeads(); selectLead(selected) }} className="px-3 py-2 bg-green-600 text-white rounded">Mark Contacted</button>
                <button onClick={async ()=>{ await fetch(`/api/crm/lead/${selected.id}`, { method: 'PATCH', headers: {'content-type':'application/json'}, credentials: 'same-origin', body: JSON.stringify({status:'qualified'}) }); fetchLeads(); selectLead(selected) }} className="px-3 py-2 bg-amber-600 text-white rounded">Qualify</button>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Notes</h4>
              <div className="mb-2 flex gap-2">
                <input value={noteText} onChange={e=>setNoteText(e.target.value)} className="border p-2 flex-1" placeholder="Add note..." />
                <button onClick={addNote} className="px-3 py-2 bg-sky-600 text-white rounded">Add</button>
              </div>
              <div className="space-y-2">
                {notes.map(n => (
                  <div key={n.id} className="p-2 border rounded">
                    <div className="text-sm">{n.text}</div>
                    <div className="text-xs text-slate-400">{n.author} • {n.created_at}</div>
                  </div>
                ))}
                {notes.length===0 && <div className="text-slate-500">No notes</div>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
