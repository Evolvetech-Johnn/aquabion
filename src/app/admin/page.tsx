"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Users,
  TrendingUp,
  Image as ImageIcon,
  FolderOpen,
  PieChart,
  ChevronRight,
  Search,
  RefreshCw,
  Download,
  LogOut,
  Sliders,
  DollarSign,
  Building,
  CheckCircle2,
  Clock,
  Briefcase,
  AlertTriangle,
  UploadCloud,
  Copy,
  Trash2,
  ExternalLink,
  MessageSquare,
  ChevronLeft,
  Calendar,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import type { CRMLead, CRMNote } from "@/crm/types";
import type { CloudinaryMedia } from "@/lib/cloudinaryStore";

export default function UnifiedAdminDashboard() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [adminUsername, setAdminUsername] = useState<string>("");
  const [adminPassword, setAdminPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"executive" | "crm" | "media" | "cards">("executive");
  const [currentUser, setCurrentUser] = useState<string>("");

  // CRM State
  const [leads, setLeads] = useState<CRMLead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null);
  const [leadNotes, setLeadNotes] = useState<CRMNote[]>([]);
  const [newNoteText, setNewNoteText] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("created_at");
  const sortDir = "desc";

  // Media Manager State
  const [mediaList, setMediaList] = useState<CloudinaryMedia[]>([]);
  const [isCloudinaryActive, setIsCloudinaryActive] = useState(false);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Card Slots State
  const [slotsList, setSlotsList] = useState<{ id: string; page: string; title: string; description: string; defaultImage: string; currentImage: string; publicId?: string }[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);
  const [librarySearch, setLibrarySearch] = useState("");
  const slotFileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Executive Stats
  const [execStats, setExecStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    won: 0,
    lost: 0,
    conversionRate: 0,
    conversionGoal: 70, // Meta de 70% de conversão
    segmentStats: {} as Record<string, number>,
    sourceStats: {} as Record<string, number>,
    projectedRoi: 0
  });

  // Check session on load
  useEffect(() => {
    fetch("/api/admin/session", { credentials: "same-origin" })
      .then((r) => r.json())
      .then((j) => {
        if (j?.ok) {
          setIsAuth(true);
          if (j?.username) {
            setCurrentUser(j.username);
          }
        }
      })
      .catch(() => {});
  }, []);

  // Reset active tab if user is restricted and on restricted tab
  useEffect(() => {
    const restrictedUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME_RESTRICTED?.toLowerCase();
    if (currentUser.toLowerCase() === restrictedUsername && (activeTab === "media" || activeTab === "cards")) {
      setActiveTab("executive");
    }
  }, [currentUser, activeTab]);

  // Fetch leads and update executive stats
  const fetchLeadsData = useCallback(async () => {
    if (!isAuth) return;
    setLoadingLeads(true);
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("per_page", String(perPage));
    params.set("sort_by", sortBy);
    params.set("sort_dir", sortDir);
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (searchQuery) params.set("search", searchQuery);

    try {
      const res = await fetch(`/api/crm/leads?${params.toString()}`, { credentials: "same-origin" });
      const json = await res.json();
      if (json?.ok) {
        setLeads(json.leads);
        if (json.meta) {
          setTotalLeads(json.meta.total || 0);
          setTotalPages(json.meta.total_pages || 1);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingLeads(false);
    }
  }, [isAuth, page, perPage, sortBy, sortDir, statusFilter, searchQuery]);

  // Fetch all leads (no pagination) to compute real executive metrics
  const fetchAllLeadsForStats = useCallback(async () => {
    if (!isAuth) return;
    try {
      const res = await fetch(`/api/crm/leads?page=1&per_page=1000`, { credentials: "same-origin" });
      const json = await res.json();
      if (json?.ok && json.leads) {
        const allLeads = json.leads as CRMLead[];
        const total = allLeads.length;

        const counts = {
          new: 0,
          contacted: 0,
          qualified: 0,
          won: 0,
          lost: 0
        };

        const segments: Record<string, number> = {
          Industria: 0,
          Agro: 0,
          Hospitalar: 0,
          Hotelaria: 0,
          Condominios: 0,
          Outro: 0
        };

        const sources: Record<string, number> = {};

        allLeads.forEach((lead) => {
          // Status counts
          const st = lead.status || "new";
          if (st in counts) counts[st as keyof typeof counts]++;

          // Segment counts
          const landing = (lead.landing_page || "").toLowerCase();
          if (landing.includes("indus") || landing.includes("aplicacoes")) {
            segments["Industria"]++;
          } else if (landing.includes("agro") || landing.includes("sprout")) {
            segments["Agro"]++;
          } else if (landing.includes("hosp") || landing.includes("clinic")) {
            segments["Hospitalar"]++;
          } else if (landing.includes("hot") || landing.includes("resort")) {
            segments["Hotelaria"]++;
          } else if (landing.includes("condo") || landing.includes("predial")) {
            segments["Condominios"]++;
          } else {
            segments["Outro"]++;
          }

          // Source counts
          const src = lead.source || "Direto";
          sources[src] = (sources[src] || 0) + 1;
        });

        const conversionRate = total > 0 ? Math.round((counts.won / total) * 100) : 0;
        
        // ROI projetado simplificado: R$ 25.000 de retorno estimado médio por lead Won, R$ 5.000 por Qualified
        const projectedRoi = (counts.won * 25000) + (counts.qualified * 5000);

        setExecStats({
          total,
          new: counts.new,
          contacted: counts.contacted,
          qualified: counts.qualified,
          won: counts.won,
          lost: counts.lost,
          conversionRate,
          conversionGoal: 70,
          segmentStats: segments,
          sourceStats: sources,
          projectedRoi
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, [isAuth]);

  // Fetch Cloudinary media assets
  const fetchMediaData = useCallback(async () => {
    if (!isAuth) return;
    setLoadingMedia(true);
    try {
      const res = await fetch("/api/admin/cloudinary/media", { credentials: "same-origin" });
      const json = await res.json();
      if (json?.ok) {
        setMediaList(json.media || []);
        setIsCloudinaryActive(json.cloudinaryConfigured || false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMedia(false);
    }
  }, [isAuth]);

  // Fetch page image slots
  const fetchSlotsData = useCallback(async () => {
    if (!isAuth) return;
    setLoadingSlots(true);
    try {
      const res = await fetch("/api/admin/page-images", { credentials: "same-origin" });
      const json = await res.json();
      if (json?.ok) {
        setSlotsList(json.slots || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingSlots(false);
    }
  }, [isAuth]);

  // Initial fetches upon authentication
  useEffect(() => {
    if (isAuth) {
      fetchLeadsData();
      fetchAllLeadsForStats();
      fetchMediaData();
      fetchSlotsData();
    }
  }, [isAuth, fetchLeadsData, fetchAllLeadsForStats, fetchMediaData, fetchSlotsData]);

  // Refresh current data trigger
  const handleRefresh = () => {
    if (activeTab === "media") {
      fetchMediaData();
    } else if (activeTab === "cards") {
      fetchSlotsData();
      fetchMediaData();
    } else {
      fetchLeadsData();
      fetchAllLeadsForStats();
    }
  };

  // Bind slot image
  const handleBindSlot = async (slotId: string, imageUrl: string, imagePublicId?: string) => {
    try {
      const res = await fetch("/api/admin/page-images", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slotId, url: imageUrl, publicId: imagePublicId }),
        credentials: "same-origin"
      });
      const json = await res.json();
      if (json?.ok) {
        fetchSlotsData();
      } else {
        alert(`Erro ao vincular imagem: ${json.error || "Erro desconhecido"}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Unbind slot image
  const handleUnbindSlot = async (slotId: string) => {
    if (!confirm("Deseja realmente restaurar a imagem padrão para este card?")) return;
    try {
      const res = await fetch("/api/admin/page-images", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slotId, url: "" }),
        credentials: "same-origin"
      });
      const json = await res.json();
      if (json?.ok) {
        fetchSlotsData();
      } else {
        alert(`Erro ao restaurar padrão: ${json.error || "Erro desconhecido"}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Direct upload trigger for a card slot
  const handleUploadForSlot = async (e: React.ChangeEvent<HTMLInputElement>, slotId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadProgress(`Fazendo upload da imagem para o card...`);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/cloudinary/upload", {
        method: "POST",
        body: formData,
        credentials: "same-origin"
      });
      const json = await res.json();
      if (json?.ok) {
        const uploadedUrl = json.media.url;
        const uploadedPublicId = json.media.publicId;
        await fetch("/api/admin/page-images", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ slotId, url: uploadedUrl, publicId: uploadedPublicId }),
          credentials: "same-origin"
        });
        setUploadProgress("Upload e vínculo concluídos!");
        fetchSlotsData();
        fetchMediaData();
        setTimeout(() => setUploadProgress(null), 3000);
      } else {
        setUploadProgress(`Falha: ${json.error || "Erro desconhecido"}`);
        setTimeout(() => setUploadProgress(null), 4000);
      }
    } catch (err) {
      setUploadProgress("Erro ao conectar com a API de upload.");
      console.error(err);
      setTimeout(() => setUploadProgress(null), 4000);
    }
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username: adminUsername, password: adminPassword }),
        credentials: "same-origin"
      });
      const j = await res.json();
      if (j?.ok) {
        setIsAuth(true);
        if (j?.username) {
          setCurrentUser(j.username);
        }
      } else {
        setLoginError("Usuário ou senha incorreto. Tente novamente.");
      }
    } catch {
      setLoginError("Ocorreu um erro no servidor ao tentar autenticar.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST", credentials: "same-origin" });
    setIsAuth(false);
    setSelectedLead(null);
  };

  // Select a lead and fetch its notes
  const handleSelectLead = async (lead: CRMLead) => {
    setSelectedLead(lead);
    try {
      const res = await fetch(`/api/crm/lead/${lead.id}/notes`, { credentials: "same-origin" });
      const json = await res.json();
      if (json?.ok) {
        setLeadNotes(json.notes);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Update lead status
  const handleUpdateStatus = async (leadId: string, status: 'contacted' | 'qualified' | 'won' | 'lost' | 'new') => {
    try {
      const res = await fetch(`/api/crm/lead/${leadId}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status }),
        credentials: "same-origin"
      });
      const json = await res.json();
      if (json?.ok) {
        // Refresh local items
        fetchLeadsData();
        fetchAllLeadsForStats();
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead(json.lead);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Add note to lead
  const handleAddNote = async () => {
    if (!selectedLead || !newNoteText.trim()) return;
    try {
      const res = await fetch(`/api/crm/lead/${selectedLead.id}/notes`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text: newNoteText, author: "Gestor Executivo" }),
        credentials: "same-origin"
      });
      const json = await res.json();
      if (json?.ok) {
        setLeadNotes((prev) => [json.note, ...prev]);
        setNewNoteText("");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete lead (soft delete)
  const handleDeleteLead = async (leadId: string) => {
    if (!confirm("Deseja realmente arquivar este lead?")) return;
    try {
      const res = await fetch(`/api/crm/lead/${leadId}`, {
        method: "DELETE",
        credentials: "same-origin"
      });
      const json = await res.json();
      if (json?.ok) {
        fetchLeadsData();
        fetchAllLeadsForStats();
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead(null);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Export CSV
  const handleExportCSV = async () => {
    const params = new URLSearchParams();
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (searchQuery) params.set("search", searchQuery);
    
    try {
      const res = await fetch(`/api/crm/export?${params.toString()}`, { credentials: "same-origin" });
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads_aquabion_${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };

  // Cloudinary Upload handler
  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadProgress("Enviando arquivo...");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/cloudinary/upload", {
        method: "POST",
        body: formData,
        credentials: "same-origin"
      });
      const json = await res.json();
      if (json?.ok) {
        setUploadProgress(json.message || "Upload concluído!");
        fetchMediaData();
        setTimeout(() => setUploadProgress(null), 4000);
      } else {
        setUploadProgress(`Falha: ${json.error || "Erro desconhecido"}`);
      }
    } catch (err) {
      setUploadProgress("Erro ao conectar com a API de upload.");
      console.error(err);
    }
  };

  // Delete Media asset
  const handleDeleteMedia = async (mediaId: string) => {
    if (!confirm("Deseja realmente remover permanentemente esta mídia?")) return;
    try {
      const res = await fetch(`/api/admin/cloudinary/media?id=${mediaId}`, {
        method: "DELETE",
        credentials: "same-origin"
      });
      const json = await res.json();
      if (json?.ok) {
        fetchMediaData();
      } else {
        alert(`Erro ao excluir: ${json.error || "Erro desconhecido"}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Copy text to clipboard helper
  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Format bytes helper
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Format date helper
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return isoString;
    }
  };

  // --- INTERFACE DE LOGIN ---
  if (!isAuth) {
    return (
      <div className="min-h-[85vh] bg-slate-950 flex items-center justify-center px-6 py-12 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-cyan-950 border border-cyan-800/50 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-950/40">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Aquabion Brasil</h1>
            <p className="text-slate-400 mt-2">Área Administrativa e Executiva Restrita</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                Usuário
              </label>
              <input
                id="username"
                type="text"
                required
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                placeholder="Seu usuário"
                className="w-full h-12 px-4 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Sua senha"
                  className="w-full h-12 px-4 pr-12 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-950/50 border border-red-900/50 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={isLoggingIn}
              className="w-full h-12 bg-cyan-600 text-white hover:bg-cyan-500 shadow-lg shadow-cyan-600/20 font-semibold disabled:opacity-70"
            >
              {isLoggingIn ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Autenticando...
                </div>
              ) : (
                "Entrar no Painel"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center text-xs text-slate-500 border-t border-slate-800/80 pt-4">
            Acesso exclusivo para administradores e executivos da Aquabion.
          </div>
        </div>
      </div>
    );
  }

  // --- DASHBOARD PRINCIPAL ---
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Header do Painel */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logoaquabion.png" alt="Aquabion" className="w-10 h-10 object-contain brightness-110" width={40} height={40} />
            </Link>
            <div className="h-6 w-[1px] bg-slate-800 hidden md:block" />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Painel Administrativo & Executivo
                <span className="text-xs bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-full px-2 py-0.5 font-medium">
                  Controle Total
                </span>
              </h1>
              <p className="text-xs text-slate-400 hidden md:block">Gestão de leads, métricas de negócio e mídias Cloudinary</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="p-2 bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-800 transition-colors flex items-center gap-2 text-sm"
              title="Recarregar Dados"
            >
              <RefreshCw className={`w-4 h-4 ${loadingLeads || loadingMedia ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Atualizar</span>
            </button>

            {activeTab === "crm" && (
              <button
                onClick={handleExportCSV}
                className="p-2 bg-blue-650 hover:bg-blue-600 text-white rounded-xl transition-colors flex items-center gap-2 text-sm px-4"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Exportar CSV</span>
              </button>
            )}

            <button
              onClick={handleLogout}
              className="p-2 bg-red-950/20 hover:bg-red-950/50 text-red-400 hover:text-red-300 rounded-xl border border-red-900/30 transition-colors flex items-center gap-2 text-sm px-4"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Abas e Visualização do Dashboard */}
      <div className="container mx-auto px-6 py-8 flex-grow flex flex-col gap-6">
        {/* Navegação de Abas */}
        <div className="flex bg-slate-200/60 p-1.5 rounded-2xl self-start gap-1 border border-slate-300/40 w-full md:w-auto overflow-x-auto shadow-inner">
          <button
            onClick={() => { setActiveTab("executive"); setSelectedLead(null); }}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
              activeTab === "executive"
                ? "bg-slate-900 text-white shadow-md shadow-slate-950/10 scale-[1.02]"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-300/40"
            }`}
          >
            <PieChart className="w-4 h-4" />
            Visão Executiva (Analytics)
          </button>
          <button
            onClick={() => { setActiveTab("crm"); setSelectedLead(null); }}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
              activeTab === "crm"
                ? "bg-slate-900 text-white shadow-md shadow-slate-950/10 scale-[1.02]"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-300/40"
            }`}
          >
            <Users className="w-4 h-4" />
            CRM Lead Manager ({totalLeads})
          </button>
          {currentUser.toLowerCase() !== process.env.NEXT_PUBLIC_ADMIN_USERNAME_RESTRICTED?.toLowerCase() && (
            <>
              <button
                onClick={() => { setActiveTab("media"); setSelectedLead(null); }}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeTab === "media"
                    ? "bg-slate-900 text-white shadow-md shadow-slate-950/10 scale-[1.02]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-300/40"
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                Mídias Cloudinary
              </button>
              <button
                onClick={() => { setActiveTab("cards"); setSelectedLead(null); }}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeTab === "cards"
                    ? "bg-slate-900 text-white shadow-md shadow-slate-950/10 scale-[1.02]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-300/40"
                }`}
              >
                <Sliders className="w-4 h-4" />
                Gerenciador de Cards ({slotsList.length})
              </button>
            </>
          )}
        </div>

        {/* 📊 TAB 1: VISÃO EXECUTIVA (ANALYTICS) */}
        {activeTab === "executive" && (
          <div className="space-y-8 animate-fade-in">
            {/* Grid de Metas Executivas */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex items-center gap-5">
                <div className="w-14 h-14 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner">
                  <Users className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total de Leads</p>
                  <p className="text-3xl font-bold text-slate-950 mt-1">{execStats.total}</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex items-center gap-5">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Leads Ganhos (Won)</p>
                  <p className="text-3xl font-bold text-slate-950 mt-1">{execStats.won}</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex items-center gap-5">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <div className="flex-grow">
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Taxa de Conversão</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-bold text-slate-950">{execStats.conversionRate}%</span>
                    <span className="text-xs text-slate-400">Meta: {execStats.conversionGoal}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex items-center gap-5">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner">
                  <DollarSign className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Pipeline (ROI Projetado)</p>
                  <p className="text-3xl font-bold text-slate-950 mt-1">
                    R$ {(execStats.projectedRoi / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>
            </div>

            {/* Seção Gráfica Principal */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Funil de Vendas Comercial (SVG Dinâmico) */}
              <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-950 mb-6 flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-cyan-600" />
                  Funil de Conversão Comercial (Real-Time)
                </h3>
                
                {/* Visualização de Funil Vertical em SVG */}
                <div className="flex flex-col md:flex-row items-center gap-8 py-4">
                  <div className="relative w-full max-w-[280px] h-[340px] flex flex-col justify-between items-center">
                    {/* Estágio 1: Leads */}
                    <div className="w-full bg-cyan-600 text-white text-xs font-bold py-3.5 rounded-2xl flex justify-between px-4 items-center shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                      <span>Leads Captados</span>
                      <span className="bg-white/20 px-2.5 py-0.5 rounded-full">{execStats.total}</span>
                    </div>

                    <div className="w-0.5 bg-slate-200 flex-grow relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-cyan-600 to-amber-500" />
                    </div>

                    {/* Estágio 2: Contatados */}
                    <div className="w-[85%] bg-sky-500 text-white text-xs font-bold py-3 rounded-2xl flex justify-between px-4 items-center shadow-md transition-transform duration-300 hover:scale-[1.02]">
                      <span>Contatados</span>
                      <span className="bg-white/20 px-2.5 py-0.5 rounded-full">
                        {execStats.contacted + execStats.qualified + execStats.won}
                      </span>
                    </div>

                    <div className="w-0.5 bg-slate-200 flex-grow relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-sky-500 to-amber-600" />
                    </div>

                    {/* Estágio 3: Qualificados */}
                    <div className="w-[70%] bg-amber-500 text-white text-xs font-bold py-2.5 rounded-2xl flex justify-between px-4 items-center shadow-md transition-transform duration-300 hover:scale-[1.02]">
                      <span>Qualificados</span>
                      <span className="bg-white/20 px-2.5 py-0.5 rounded-full">{execStats.qualified + execStats.won}</span>
                    </div>

                    <div className="w-0.5 bg-slate-200 flex-grow relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-amber-500 to-emerald-500" />
                    </div>

                    {/* Estágio 4: Ganhos */}
                    <div className="w-[55%] bg-emerald-600 text-white text-xs font-bold py-2 rounded-2xl flex justify-between px-4 items-center shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                      <span>Ganhos (Won)</span>
                      <span className="bg-white/20 px-2.5 py-0.5 rounded-full">{execStats.won}</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm mb-1">Métricas de Transição do Funil</h4>
                      <p className="text-xs text-slate-500">Comportamento real baseado nos leads ativos do sistema.</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span>Taxa de Qualificação (Qualificados / Total)</span>
                          <span>
                            {execStats.total > 0
                              ? Math.round(((execStats.qualified + execStats.won) / execStats.total) * 100)
                              : 0}
                            %
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 transition-all duration-500"
                            style={{
                              width: `${
                                execStats.total > 0
                                  ? Math.round(((execStats.qualified + execStats.won) / execStats.total) * 100)
                                  : 0
                              }%`
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span>Taxa de Fechamento (Ganhos / Qualificados)</span>
                          <span>
                            {execStats.qualified + execStats.won > 0
                              ? Math.round((execStats.won / (execStats.qualified + execStats.won)) * 100)
                              : 0}
                            %
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 transition-all duration-500"
                            style={{
                              width: `${
                                execStats.qualified + execStats.won > 0
                                  ? Math.round((execStats.won / (execStats.qualified + execStats.won)) * 100)
                                  : 0
                              }%`
                            }}
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 text-xs text-slate-600 leading-relaxed">
                        📈 **Análise Executiva:** Atualmente, a sua taxa geral de conversão de leads fechados é de **{execStats.conversionRate}%**, o que está
                        {execStats.conversionRate >= execStats.conversionGoal ? " acima da meta corporativa " : " abaixo da meta corporativa "} 
                        de **{execStats.conversionGoal}%**. Concentrar esforços na qualificação inicial pode otimizar a transição comercial.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Distribuição por Segmento de Negócio */}
              <div className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-950 mb-6 flex items-center gap-2">
                  <Building className="w-5 h-5 text-cyan-600" />
                  Demanda por Segmento
                </h3>
                
                <div className="space-y-5">
                  {Object.entries(execStats.segmentStats).map(([segment, count]) => {
                    const pct = execStats.total > 0 ? Math.round((count / execStats.total) * 100) : 0;
                    return (
                      <div key={segment} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-slate-800">
                          <span>{segment === "Condominios" ? "Condomínios" : segment === "Industria" ? "Indústrias" : segment}</span>
                          <span className="text-slate-500">{count} leads ({pct}%)</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ${
                              segment === "Industria" ? "bg-cyan-600" :
                              segment === "Agro" ? "bg-emerald-500" :
                              segment === "Hospitalar" ? "bg-red-500" :
                              segment === "Hotelaria" ? "bg-amber-500" :
                              segment === "Condominios" ? "bg-indigo-500" : "bg-slate-400"
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}

                  {Object.keys(execStats.segmentStats).length === 0 && (
                    <div className="text-center py-12 text-slate-400 text-sm">Sem dados de segmento</div>
                  )}
                </div>
              </div>
            </div>

            {/* Performance dos Canais de Aquisição */}
            <div className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm max-w-2xl">
              <h3 className="text-xl font-bold text-slate-950 mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-cyan-600" />
                Canais de Aquisição de Tráfego (Origem)
              </h3>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-4">
                  {Object.entries(execStats.sourceStats).map(([src, count]) => {
                    const pct = execStats.total > 0 ? Math.round((count / execStats.total) * 100) : 0;
                    return (
                      <div key={src} className="flex items-center gap-4">
                        <div className="w-24 text-xs font-bold text-slate-700 truncate capitalize">{src}</div>
                        <div className="flex-grow h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-600" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="w-16 text-right text-xs font-bold text-slate-500">{count} ({pct}%)</div>
                      </div>
                    );
                  })}

                  {Object.keys(execStats.sourceStats).length === 0 && (
                    <div className="text-center py-6 text-slate-400 text-xs">Sem dados de origem</div>
                  )}
                </div>

                <div className="p-5 bg-cyan-50/50 rounded-2xl border border-cyan-100 flex flex-col justify-center text-xs text-cyan-850 leading-relaxed gap-2">
                  💡 **Dica de Performance:** Canais digitais como **WhatsApp** e **Formulário Web** costumam ter taxas de conversão de leads 2x maiores que e-mails frios. Priorize esses pontos de contato no site Aquabion!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 👥 TAB 2: CRM LEAD MANAGER */}
        {activeTab === "crm" && (
          <div className="grid gap-6 lg:grid-cols-3 items-start animate-fade-in flex-grow">
            {/* Lista Lateral de Leads */}
            <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col h-[70vh]">
              {/* Barra de Filtros e Busca */}
              <div className="space-y-3 flex-shrink-0">
                <div className="relative">
                  <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                    placeholder="Pesquisar por nome, email ou fone"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/60 text-sm focus:outline-none focus:border-cyan-500 transition-colors text-slate-900"
                  />
                </div>

                <div className="flex gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                    className="border border-slate-200 bg-slate-50/60 h-10 px-3 rounded-lg text-xs font-semibold text-slate-700 flex-1 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="all">Todos os Status</option>
                    <option value="new">Novos (New)</option>
                    <option value="contacted">Contatados</option>
                    <option value="qualified">Qualificados</option>
                    <option value="won">Ganhos (Won)</option>
                    <option value="lost">Perdidos (Lost)</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                    className="border border-slate-200 bg-slate-50/60 h-10 px-3 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-cyan-500"
                    title="Ordenar por"
                  >
                    <option value="created_at">Data</option>
                    <option value="name">Nome</option>
                    <option value="email">Email</option>
                  </select>
                </div>
              </div>

              {/* Lista Scrollável de Leads */}
              <div className="space-y-3 overflow-y-auto flex-grow pr-1">
                {loadingLeads ? (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-400 text-xs gap-3">
                    <RefreshCw className="w-8 h-8 animate-spin text-cyan-600" />
                    <span>Buscando leads na plataforma...</span>
                  </div>
                ) : leads.length === 0 ? (
                  <div className="text-center py-20 text-slate-400 text-sm font-medium">
                    Nenhum lead encontrado para este filtro.
                  </div>
                ) : (
                  leads.map((lead) => {
                    const isSelected = selectedLead?.id === lead.id;
                    const st = lead.status || "new";
                    return (
                      <div
                        key={lead.id}
                        onClick={() => handleSelectLead(lead)}
                        className={`p-4 border rounded-2xl cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? "bg-slate-900 border-slate-900 text-white shadow-md scale-[1.01]"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200/70"
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2 mb-1.5">
                          <h4 className="font-bold text-sm truncate max-w-[70%]">
                            {lead.name || lead.email || "Lead sem nome"}
                          </h4>
                          <span
                            className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                              isSelected
                                ? st === "won" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                                  st === "lost" ? "bg-red-500/20 text-red-400 border border-red-500/30" :
                                  st === "qualified" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                                  "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                                : st === "won" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                                  st === "lost" ? "bg-red-50 text-red-700 border border-red-200" :
                                  st === "qualified" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                                  "bg-cyan-50 text-cyan-700 border border-cyan-200"
                            }`}
                          >
                            {st}
                          </span>
                        </div>
                        <div className={`text-xs truncate ${isSelected ? "text-slate-400" : "text-slate-500"} mb-1`}>
                          {lead.email}
                        </div>
                        <div className={`text-[10px] ${isSelected ? "text-slate-500" : "text-slate-400"} flex items-center gap-1`}>
                          <Calendar className="w-3 h-3" />
                          {formatDate(lead.created_at)}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Paginação da Lista */}
              <div className="border-t border-slate-200/80 pt-4 flex-shrink-0 flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Pág. {page} / {totalPages}</span>
                <div className="flex gap-1.5">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Painel de Detalhes do Lead Selecionado */}
            <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm min-h-[70vh] flex flex-col">
              {!selectedLead ? (
                <div className="flex flex-col items-center justify-center flex-grow py-32 text-slate-400 gap-4">
                  <div className="w-16 h-16 bg-slate-50 text-slate-300 border border-slate-200/60 rounded-2xl flex items-center justify-center shadow-inner">
                    <Users className="w-8 h-8" />
                  </div>
                  <p className="font-semibold">Selecione um lead ao lado para gerenciar detalhes, anotações e comercial.</p>
                </div>
              ) : (
                <div className="space-y-8 flex-grow flex flex-col justify-between">
                  {/* Cabeçalho do Lead */}
                  <div className="border-b border-slate-100 pb-6 flex flex-col sm:flex-row justify-between items-start gap-4 flex-shrink-0">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-950">{selectedLead.name || "Lead sem nome"}</h2>
                      <p className="text-slate-500 text-sm font-semibold mt-1">
                        {selectedLead.email} • {selectedLead.phone || "Sem telefone"}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-slate-600 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {formatDate(selectedLead.created_at)}
                        </span>
                        
                        {selectedLead.landing_page && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-cyan-50 rounded-full border border-cyan-200 text-cyan-700 flex items-center gap-1">
                            <Building className="w-3.5 h-3.5 text-cyan-400" />
                            {selectedLead.landing_page.replace('/', '') || "Página Inicial"}
                          </span>
                        )}

                        <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-sky-50 rounded-full border border-sky-200 text-sky-700 flex items-center gap-1">
                          <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                          Origem: {selectedLead.source}
                        </span>
                      </div>
                    </div>

                    {/* Mudança de Status Comercial */}
                    <div className="flex flex-wrap gap-1.5 bg-slate-50 p-1.5 border border-slate-200 rounded-2xl">
                      <button
                        onClick={() => handleUpdateStatus(selectedLead.id, "contacted")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          selectedLead.status === "contacted"
                            ? "bg-sky-500 text-white shadow-sm"
                            : "text-slate-600 hover:text-slate-800 hover:bg-slate-200/50"
                        }`}
                      >
                        Contatar
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedLead.id, "qualified")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          selectedLead.status === "qualified"
                            ? "bg-amber-500 text-white shadow-sm"
                            : "text-slate-600 hover:text-slate-800 hover:bg-slate-200/50"
                        }`}
                      >
                        Qualificar
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedLead.id, "won")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          selectedLead.status === "won"
                            ? "bg-emerald-600 text-white shadow-sm"
                            : "text-slate-600 hover:text-slate-800 hover:bg-slate-200/50"
                        }`}
                      >
                        Ganhar (Won)
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedLead.id, "lost")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          selectedLead.status === "lost"
                            ? "bg-red-650 text-white shadow-sm"
                            : "text-slate-600 hover:text-slate-800 hover:bg-slate-200/50"
                        }`}
                      >
                        Perder (Lost)
                      </button>
                    </div>
                  </div>

                  {/* Informações detalhadas do UTM Tracking */}
                  {selectedLead.utm && Object.keys(selectedLead.utm).length > 0 && (
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 flex-shrink-0">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-cyan-600" />
                        Parâmetros de Rastreamento (UTM Marketing Campaign)
                      </h4>
                      <div className="grid gap-4 sm:grid-cols-3 text-xs">
                        {Object.entries(selectedLead.utm).map(([key, val]) => (
                          <div key={key} className="bg-white p-2.5 rounded-xl border border-slate-200">
                            <span className="text-slate-400 block font-semibold mb-0.5 capitalize">{key.replace('utm_', '')}</span>
                            <span className="font-bold text-slate-800 truncate block">{String(val)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Histórico de Anotações (Notes) */}
                  <div className="flex-grow mt-6 flex flex-col justify-between h-[300px]">
                    <div className="overflow-hidden flex flex-col h-full justify-between">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2 flex-shrink-0">
                        <MessageSquare className="w-4 h-4 text-cyan-600" />
                        Histórico de Observações e Follow-ups ({leadNotes.length})
                      </h4>

                      {/* Lista de Notas */}
                      <div className="space-y-3 overflow-y-auto pr-1 flex-grow mb-4">
                        {leadNotes.length === 0 ? (
                          <div className="text-center py-10 text-slate-400 text-xs font-medium bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                            Nenhuma observação registrada neste lead ainda.
                          </div>
                        ) : (
                          leadNotes.map((note) => (
                            <div key={note.id} className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl relative shadow-sm">
                              <p className="text-sm text-slate-700 leading-relaxed font-medium">{note.text}</p>
                              <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2 font-semibold">
                                <span className="text-slate-500 uppercase tracking-wide">Autor: {note.author || "admin"}</span>
                                <span>{formatDate(note.created_at)}</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Criador de Notas */}
                      <div className="flex gap-2 flex-shrink-0">
                        <input
                          value={newNoteText}
                          onChange={(e) => setNewNoteText(e.target.value)}
                          placeholder="Registrar nova ligação, e-mail enviado ou histórico..."
                          className="flex-grow h-12 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                          onKeyDown={(e) => { if (e.key === 'Enter') handleAddNote(); }}
                        />
                        <button
                          onClick={handleAddNote}
                          className="h-12 px-6 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-500 transition-colors text-sm shadow-md"
                        >
                          Adicionar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Rodapé de Ações do Painel Lateral */}
                  <div className="border-t border-slate-100 pt-6 flex justify-between items-center flex-shrink-0 mt-6">
                    <button
                      onClick={() => handleDeleteLead(selectedLead.id)}
                      className="text-xs text-red-500 hover:text-red-600 font-bold flex items-center gap-1.5 p-2 bg-red-50 hover:bg-red-100 rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                      Arquivar / Deletar Lead
                    </button>

                    <button
                      onClick={() => setSelectedLead(null)}
                      className="text-xs text-slate-500 hover:text-slate-700 font-bold px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50"
                    >
                      Fechar Detalhes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 🖼️ TAB 3: GERENCIADOR DE MÍDIAS DO CLOUDINARY */}
        {activeTab === "media" && currentUser.toLowerCase() !== process.env.NEXT_PUBLIC_ADMIN_USERNAME_RESTRICTED?.toLowerCase() && (
          <div className="space-y-8 animate-fade-in flex-grow flex flex-col justify-between">
            {/* Status do Cloudinary & File Upload */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Card de Configuração e Status */}
              <div className="md:col-span-1 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between gap-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-950 mb-2 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-cyan-600" />
                    Status da Conexão
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Verifique se o seu servidor Next.js está conectado de forma autêntica à CDN global do Cloudinary.
                  </p>
                </div>

                <div className="space-y-4">
                  {isCloudinaryActive ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                      <div className="text-xs">
                        <span className="font-bold block">Cloudinary Produção Ativo</span>
                        As imagens serão hospedadas na CDN internacional.
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-amber-50 border border-amber-200 text-amber-850 rounded-2xl flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                        <div className="text-xs">
                          <span className="font-bold block">Modo Simulação Local</span>
                          Usando `/public/uploads` temporário de desenvolvimento.
                        </div>
                      </div>
                      <p className="text-[10px] text-amber-700 leading-relaxed font-semibold border-t border-amber-200/60 pt-2">
                        💡 **Para ativar em produção:** Adicione as variáveis `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` e `CLOUDINARY_API_SECRET` ao seu arquivo `.env.local`.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Área Drag & Drop */}
              <div className="md:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center text-center relative group">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleUploadFile}
                  accept="image/*"
                  className="hidden"
                />

                <div className="max-w-md space-y-4">
                  <div className="w-16 h-16 bg-cyan-50 border border-cyan-200/60 text-cyan-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner transition-transform group-hover:scale-105 duration-200">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Arraste ou escolha uma imagem</h4>
                    <p className="text-xs text-slate-400 mt-1">Formatos suportados: PNG, JPG, JPEG, SVG, WebP. Limite de 10MB.</p>
                  </div>

                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    size="lg"
                    className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-6 h-11 text-xs font-semibold"
                  >
                    Selecionar Arquivo
                  </Button>

                  {uploadProgress && (
                    <div className="text-xs font-bold text-cyan-600 bg-cyan-50 px-3 py-1.5 rounded-lg border border-cyan-150 animate-pulse mt-2">
                      {uploadProgress}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Galeria de Mídias Cadastradas */}
            <div className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-sm flex-grow min-h-[40vh] mt-6">
              <h3 className="text-xl font-bold text-slate-950 mb-6 flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-cyan-600" />
                Biblioteca de Mídias Ativas ({mediaList.length})
              </h3>

              {loadingMedia ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400 text-xs gap-3">
                  <RefreshCw className="w-8 h-8 animate-spin text-cyan-600" />
                  <span>Carregando galeria de imagens...</span>
                </div>
              ) : mediaList.length === 0 ? (
                <div className="text-center py-24 text-slate-400 text-sm font-medium border border-dashed border-slate-200 rounded-2xl bg-slate-50">
                  Nenhuma imagem carregada na biblioteca da plataforma ainda.
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {mediaList.map((media) => (
                    <div
                      key={media.id}
                      className="group bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Visualizador de Imagem */}
                      <div className="aspect-video bg-slate-900 flex items-center justify-center overflow-hidden relative border-b border-slate-200">
                        <Image src={media.url} alt={media.name} fill className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300" />
                        <span className="absolute bottom-2 right-2 text-[8px] bg-slate-950/70 border border-white/10 text-white font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {media.format}
                        </span>
                      </div>

                      {/* Detalhes da Imagem */}
                      <div className="p-4 space-y-3">
                        <div>
                          <h4 className="font-bold text-xs text-slate-800 truncate" title={media.name}>
                            {media.name}
                          </h4>
                          <div className="mt-1">
                            <input 
                              type="text" 
                              readOnly 
                              value={media.url} 
                              className="w-full text-[9px] bg-slate-50 border border-slate-200 px-2 py-1 rounded-lg text-slate-600 font-mono truncate"
                              onClick={(e) => e.currentTarget.select()}
                            />
                          </div>
                          <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-semibold">
                            <span>{formatBytes(media.bytes)}</span>
                            <span>{formatDate(media.createdAt)}</span>
                          </div>
                        </div>

                        {/* Ações da Mídia */}
                        <div className="flex gap-1.5 border-t border-slate-200/80 pt-3">
                          <button
                            onClick={() => handleCopyUrl(media.url, media.id)}
                            className={`flex-grow h-8 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 px-2 border ${
                              copiedId === media.id
                                ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            <Copy className="w-3.5 h-3.5" />
                            {copiedId === media.id ? "Copiado!" : "Copiar URL"}
                          </button>

                          <a
                            href={media.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center"
                            title="Ver em tamanho real"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>

                          <button
                            onClick={() => handleDeleteMedia(media.id)}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-500 border border-red-200/30 rounded-lg transition-colors flex items-center justify-center"
                            title="Remover mídia permanentemente"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 🎴 TAB 4: GERENCIADOR DE CARDS DAS PÁGINAS */}
        {activeTab === "cards" && currentUser.toLowerCase() !== process.env.NEXT_PUBLIC_ADMIN_USERNAME_RESTRICTED?.toLowerCase() && (
          <div className="space-y-8 animate-fade-in flex-grow flex flex-col justify-between">
            {/* Top Bar / Filter */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-950 flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-cyan-600" />
                  Gerenciador de Imagens Estratégicas
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Vincule imagens personalizadas aos cards, banners e seções de cada página do website.
                </p>
              </div>

              {uploadProgress && (
                <div className="text-xs font-bold text-cyan-600 bg-cyan-50 px-4 py-2 rounded-xl border border-cyan-150 animate-pulse">
                  {uploadProgress}
                </div>
              )}
            </div>

            {/* Slots Grid */}
            {loadingSlots ? (
              <div className="flex flex-col items-center justify-center py-32 text-slate-400 text-xs gap-3">
                <RefreshCw className="w-8 h-8 animate-spin text-cyan-600" />
                <span>Carregando slots de imagem...</span>
              </div>
            ) : slotsList.length === 0 ? (
              <div className="text-center py-24 text-slate-400 text-sm font-medium border border-dashed border-slate-200 rounded-2xl bg-white">
                Nenhum slot estratégico mapeado no sistema.
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {slotsList.map((slot) => {
                  const hasCustomImage = !!slot.currentImage;
                  const displayImage = slot.currentImage || slot.defaultImage;

                  return (
                    <div
                      key={slot.id}
                      className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Badge e cabeçalho */}
                      <div className="p-5 pb-3">
                        <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-cyan-50 border border-cyan-100 text-cyan-700 rounded-full mb-2">
                          {slot.page}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm">{slot.title}</h4>
                        <p className="text-xs text-slate-400 mt-1 leading-normal italic line-clamp-2" title={slot.description}>
                          {slot.description}
                        </p>
                      </div>

                      {/* Image Preview Container */}
                      <div className="aspect-video bg-slate-900 flex items-center justify-center overflow-hidden relative border-y border-slate-100">
                        {displayImage ? (
                          <Image
                            src={displayImage}
                            alt={slot.title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                            unoptimized
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-slate-400 text-xs gap-2">
                            <ImageIcon className="w-8 h-8 opacity-40" />
                            <span>Sem Imagem</span>
                          </div>
                        )}

                        <div className="absolute top-2 right-2 flex gap-1.5 z-10">
                          {hasCustomImage ? (
                            <span className="text-[9px] bg-emerald-500/90 border border-emerald-400/30 text-white font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
                              Personalizada
                            </span>
                          ) : (
                            <span className="text-[9px] bg-slate-500/90 border border-slate-400/30 text-white font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
                              Padrão do Sistema
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="p-5 space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => slotFileInputRefs.current[slot.id]?.click()}
                            className="h-9 rounded-xl text-[10px] font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <UploadCloud className="w-3.5 h-3.5" />
                            Subir Imagem
                          </button>
                          
                          <button
                            onClick={() => {
                              setSelectedSlotId(slot.id);
                              setIsLibraryModalOpen(true);
                            }}
                            className="h-9 rounded-xl text-[10px] font-bold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <FolderOpen className="w-3.5 h-3.5" />
                            Escolher Galeria
                          </button>
                        </div>

                        {hasCustomImage && (
                          <button
                            onClick={() => handleUnbindSlot(slot.id)}
                            className="w-full h-9 rounded-xl text-[10px] font-bold bg-red-50 hover:bg-red-100 text-red-500 border border-red-200/20 transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Restaurar Padrão
                          </button>
                        )}

                        <input
                          type="file"
                          accept="image/*"
                          ref={(el) => {
                            slotFileInputRefs.current[slot.id] = el;
                          }}
                          onChange={(e) => handleUploadForSlot(e, slot.id)}
                          className="hidden"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Library Selector Modal */}
            {isLibraryModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-fade-in">
                <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-[2rem] shadow-2xl flex flex-col h-[80vh] overflow-hidden">
                  {/* Modal Header */}
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div>
                      <h4 className="text-lg font-bold text-slate-950">Selecione uma imagem da Biblioteca</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Escolha um arquivo já hospedado para vincular a este card.</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsLibraryModalOpen(false);
                        setSelectedSlotId(null);
                        setLibrarySearch("");
                      }}
                      className="text-xs text-slate-500 hover:text-slate-700 font-bold px-4 py-2 border border-slate-250 rounded-xl hover:bg-slate-100 transition-colors"
                    >
                      Fechar
                    </button>
                  </div>

                  {/* Modal Filter */}
                  <div className="p-4 border-b border-slate-100 flex-shrink-0 bg-white">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input
                        value={librarySearch}
                        onChange={(e) => setLibrarySearch(e.target.value)}
                        placeholder="Pesquisar imagem pelo nome ou formato..."
                        className="w-full h-10 pl-9 pr-4 rounded-xl border border-slate-200 bg-slate-50/60 text-sm focus:outline-none focus:border-cyan-500 text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Modal Grid content */}
                  <div className="flex-grow overflow-y-auto p-6 bg-slate-50/50">
                    {mediaList.filter(m => m.name.toLowerCase().includes(librarySearch.toLowerCase())).length === 0 ? (
                      <div className="text-center py-20 text-slate-400 text-sm font-medium">
                        Nenhuma imagem correspondente na biblioteca.
                      </div>
                    ) : (
                      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                        {mediaList
                          .filter(m => m.name.toLowerCase().includes(librarySearch.toLowerCase()))
                          .map((media) => (
                            <div
                              key={media.id}
                              onClick={() => {
                                if (selectedSlotId) {
                                  handleBindSlot(selectedSlotId, media.url, media.publicId);
                                  setIsLibraryModalOpen(false);
                                  setSelectedSlotId(null);
                                  setLibrarySearch("");
                                }
                              }}
                              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer hover:border-cyan-500 transition-all duration-200 flex flex-col justify-between"
                            >
                              <div className="aspect-video bg-slate-900 flex items-center justify-center overflow-hidden relative">
                                <Image src={media.url} alt={media.name} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-200" unoptimized />
                              </div>
                              <div className="p-3 bg-white border-t border-slate-100">
                                <h5 className="font-bold text-[10px] text-slate-700 truncate" title={media.name}>
                                  {media.name}
                                </h5>
                                <p className="text-[8px] text-slate-400 mt-0.5">{media.format.toUpperCase()} • {formatBytes(media.bytes)}</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
