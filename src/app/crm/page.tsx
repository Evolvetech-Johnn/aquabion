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

  async function updateStatus(newStatus: Lead['status']) {
    if (!selected || !isAuth) return
    const res = await fetch(`/api/crm/lead/${selected.id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ status: newStatus })
    })
    if (res.ok) {
      fetchLeads()
      selectLead({ ...selected, status: newStatus })
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
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">CRM Admin — Login</h2>
          <input 
            value={adminInput} 
            onChange={e=>setAdminInput(e.target.value)} 
            placeholder="ADMIN_SECRET" 
            className="w-full border border-slate-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            type="password"
          />
          <button 
            onClick={doLogin} 
            className="w-full px-4 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
          >
            Entrar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="flex flex-col gap-3 mb-3">
            <h1 className="text-2xl font-bold text-slate-900">CRM Aquabion</h1>
            <div className="flex gap-2">
              <input 
                value={query} 
                onChange={e=>setQuery(e.target.value)} 
                placeholder="Pesquisar nome, email, telefone, cidade, estado..." 
                className="border border-slate-300 p-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-cyan-500" 
              />
              <select 
                value={statusFilter} 
                onChange={e=>setStatusFilter(e.target.value)} 
                className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="all">Todos</option>
                <option value="new">Novo</option>
                <option value="contacted">Contatado</option>
                <option value="qualified">Qualificado</option>
                <option value="won">Ganho</option>
                <option value="lost">Perdido</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 mb-4 flex-wrap">
            <button 
              disabled={loading} 
              onClick={()=>{ setPage(1); fetchLeads() }} 
              className="px-4 py-2 bg-slate-800 text-white rounded-lg disabled:opacity-50 hover:bg-slate-700 transition-colors"
            >
              {loading ? 'Carregando...' : 'Atualizar'}
            </button>
            <button 
              disabled={loading} 
              onClick={()=>exportCSV()} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-colors"
            >
              Exportar CSV
            </button>
            <button 
              disabled={loading} 
              onClick={async ()=>{ await fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin' }); setIsAuth(false) }} 
              className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50 hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <label className="text-sm text-slate-600 font-medium">Ordenar por:</label>
            <select 
              value={sortBy} 
              onChange={e=>{ setSortBy(e.target.value); setPage(1) }} 
              className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="created_at">Data de Criação</option>
              <option value="name">Nome</option>
              <option value="email">E-mail</option>
            </select>
            <select 
              value={sortDir} 
              onChange={e=>{ setSortDir(e.target.value); setPage(1) }} 
              className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="desc">Decrescente</option>
              <option value="asc">Crescente</option>
            </select>
          </div>

          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="text-sm text-slate-600">Página {page} / {totalPages} — {total} leads</div>
            <div className="flex gap-2 items-center flex-wrap">
              <label className="text-sm text-slate-600">Por página</label>
              <select 
                value={perPage} 
                onChange={e=>{ setPerPage(Number(e.target.value)); setPage(1) }} 
                className="border border-slate-300 p-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <button 
                disabled={page<=1} 
                onClick={()=>setPage(p=>Math.max(1,p-1))} 
                className="px-2 py-1 border border-slate-300 rounded disabled:opacity-50 hover:bg-slate-100 transition-colors"
              >
                Anterior
              </button>
              <button 
                disabled={page>=totalPages} 
                onClick={()=>setPage(p=>Math.min(totalPages,p+1))} 
                className="px-2 py-1 border border-slate-300 rounded disabled:opacity-50 hover:bg-slate-100 transition-colors"
              >
                Próxima
              </button>
              <div className="flex items-center gap-2">
                <label className="text-sm text-slate-600">Ir para</label>
                <input 
                  type="number" 
                  min={1} 
                  max={totalPages} 
                  defaultValue={page} 
                  onKeyDown={e=>{ 
                    if (e.key==='Enter'){ 
                      const v = Number((e.target as HTMLInputElement).value); 
                      if (v>=1 && v<=totalPages) setPage(v) 
                    } 
                  }} 
                  className="border border-slate-300 p-1 w-20 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500" 
                />
              </div>
            </div>
          </div>

          <div className="space-y-2 max-h-[65vh] overflow-y-auto">
            <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 flex gap-3 font-semibold text-sm">
              <div className="flex-1">Nome/Contato</div>
              <div className="w-32">Status</div>
              <div className="w-32">Criado</div>
            </div>
            {leads.map((l: Lead) => (
              <div 
                key={l.id} 
                className={`p-4 border border-slate-200 rounded-xl cursor-pointer transition-all ${selected?.id===l.id? 'bg-cyan-50 border-cyan-400 shadow-sm':'bg-white hover:bg-slate-50'}`} 
                onClick={()=>selectLead(l)}
              >
                <div className="flex flex-col gap-1">
                  <div className="font-semibold text-slate-900">{l.name || l.email || l.phone}</div>
                  <div className="text-sm text-slate-600">
                    {l.email} {l.phone ? ` • ${l.phone}` : ''}
                  </div>
                  {l.city || l.state ? (
                    <div className="text-xs text-slate-500">
                      {l.city} {l.state ? `(${l.state})` : ''}
                    </div>
                  ) : null}
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      l.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                      l.status === 'contacted' ? 'bg-green-100 text-green-800' : 
                      l.status === 'qualified' ? 'bg-amber-100 text-amber-800' : 
                      l.status === 'won' ? 'bg-emerald-100 text-emerald-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {
                        l.status === 'new' ? 'Novo' : 
                        l.status === 'contacted' ? 'Contatado' : 
                        l.status === 'qualified' ? 'Qualificado' : 
                        l.status === 'won' ? 'Ganho' : 
                        'Perdido'
                      }
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    {new Date(l.created_at).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          {!selected && (
            <div className="p-8 border border-slate-200 rounded-2xl bg-white flex items-center justify-center h-full min-h-[400px]">
              <p className="text-slate-500 text-lg">Selecione um lead para ver os detalhes.</p>
            </div>
          )}
          {selected && (
            <div className="p-6 border border-slate-200 rounded-2xl bg-white space-y-6">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{selected.name || selected.email || 'Lead sem nome'}</h3>
                  <div className="text-slate-600 mt-1">
                    {selected.email} {selected.phone ? ` • ${selected.phone}` : ''}
                  </div>
                  <div className="text-sm text-slate-500 mt-2">
                    Criado em: {new Date(selected.created_at).toLocaleString('pt-BR')}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={()=>updateStatus('new')} 
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      selected.status === 'new' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                    }`}
                  >
                    Novo
                  </button>
                  <button 
                    onClick={()=>updateStatus('contacted')} 
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      selected.status === 'contacted' ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                    }`}
                  >
                    Contatado
                  </button>
                  <button 
                    onClick={()=>updateStatus('qualified')} 
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      selected.status === 'qualified' ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                    }`}
                  >
                    Qualificado
                  </button>
                  <button 
                    onClick={()=>updateStatus('won')} 
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      selected.status === 'won' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                    }`}
                  >
                    Ganho
                  </button>
                  <button 
                    onClick={()=>updateStatus('lost')} 
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      selected.status === 'lost' ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                    }`}
                  >
                    Perdido
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selected.company && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-sm font-semibold text-slate-700">Empresa</div>
                    <div className="text-slate-900">{selected.company}</div>
                  </div>
                )}
                {selected.segment && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-sm font-semibold text-slate-700">Segmento</div>
                    <div className="text-slate-900">
                      {
                        selected.segment === 'industria' ? 'Indústria' :
                        selected.segment === 'agro' ? 'Agronegócio' :
                        selected.segment === 'hospitalar' ? 'Hospitalar' :
                        selected.segment === 'hotelaria' ? 'Hotelaria' :
                        selected.segment === 'condominios' ? 'Condomínios' :
                        'Outro'
                      }
                    </div>
                  </div>
                )}
                {selected.city && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-sm font-semibold text-slate-700">Cidade</div>
                    <div className="text-slate-900">{selected.city}</div>
                  </div>
                )}
                {selected.state && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-sm font-semibold text-slate-700">Estado</div>
                    <div className="text-slate-900">{selected.state}</div>
                  </div>
                )}
              </div>

              {selected.message && (
                <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-200">
                  <div className="text-sm font-semibold text-cyan-700 mb-2">Mensagem</div>
                  <div className="text-slate-900 whitespace-pre-wrap">{selected.message}</div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-lg font-semibold text-slate-900 mb-3">Notas</h4>
                <div className="mb-4 flex gap-2">
                  <input 
                    value={noteText} 
                    onChange={e=>setNoteText(e.target.value)} 
                    className="border border-slate-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-cyan-500" 
                    placeholder="Adicionar nota..." 
                  />
                  <button 
                    onClick={addNote} 
                    className="px-4 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
                  >
                    Adicionar
                  </button>
                </div>
                <div className="space-y-3">
                  {notes.map(n => (
                    <div key={n.id} className="p-4 border border-slate-200 rounded-xl bg-white">
                      <div className="text-slate-900">{n.text}</div>
                      <div className="text-xs text-slate-400 mt-2">{n.author} • {new Date(n.created_at).toLocaleString('pt-BR')}</div>
                    </div>
                  ))}
                  {notes.length===0 && <div className="text-slate-500 p-4 bg-slate-50 rounded-xl">Nenhuma nota ainda</div>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
