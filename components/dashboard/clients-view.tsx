"use client"

import { useState, useTransition } from "react"
import { Plus, Search, Mail, Phone, ExternalLink, Send } from "lucide-react"
import { colors } from "@/lib/colors"
import { useRouter } from "next/navigation"
import { inviteClientAction } from "@/app/dashboard/clients/actions"
import type { Client, Project } from "@/lib/types"
import { CreateClientModal } from "@/components/dashboard/create-client-modal"
import { EditClientModal } from "@/components/dashboard/edit-client-modal"

const BORDER = "1px solid #E8E4E0"
const BORDER_LIGHT = "1px solid #F5F2EF"

const STATUS_STYLE: Record<
  string,
  { bg: string; color: string; label: string }
> = {
  active: { bg: "#ECFDF5", color: "#065F46", label: "Active" },
  inactive: { bg: "#F5F2EF", color: "#9A8C98", label: "Inactive" },
  archived: { bg: "#F1F5F9", color: "#64748B", label: "Archived" },
}

const PROJECT_STATUS_COLOR: Record<string, string> = {
  "in_progress": "#92400E",
  "in_review": "#1E40AF",
  "completed": "#065F46",
  "pending": "#9A8C98",
}

function StatusPill({ status }: { status: string }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE.inactive
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: 10,
        fontWeight: 500,
        padding: "2px 8px",
        borderRadius: 2,
        background: s.bg,
        color: s.color,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {s.label}
    </span>
  )
}

const FILTERS: { label: string; value: string | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Archived", value: "archived" },
]

export interface ClientsViewProps {
  initialClients: (Client & { projects: Project[] })[]
}

export function ClientsView({ initialClients }: ClientsViewProps) {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<string | "all">("all")
  const [selected, setSelected] = useState<(Client & { projects: Project[] }) | null>(initialClients[0] || null)
  const [isPending, startTransition] = useTransition()
  const [inviteStatus, setInviteStatus] = useState<{ id: string; success?: boolean; error?: string } | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const filtered = initialClients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.company?.toLowerCase() || "").includes(search.toLowerCase())
    const matchesFilter = filter === "all" || c.status === filter
    return matchesSearch && matchesFilter
  })

  const handleInvite = (id: string, email: string) => {
    startTransition(async () => {
      const res = await inviteClientAction(id, email)
      if (res.success && res.inviteUrl) {
        // Copy to clipboard
        try {
          await navigator.clipboard.writeText(res.inviteUrl)
          setInviteStatus({ id, success: true, message: 'Link copied to clipboard!' })
        } catch (err) {
          setInviteStatus({ id, success: true, message: 'Link generated! (Copy manually below)' })
        }
      } else {
        setInviteStatus({ id, error: res.error || "Failed to generate link" })
      }
    })
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflow: "hidden",
      }}
    >
      {/* Topbar */}
      <div
        style={{
          height: 52,
          padding: "0 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: BORDER,
          background: "#fff",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: colors.navy,
            letterSpacing: "-0.01em",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Clients
        </span>
        <button
          onClick={() => setShowCreateModal(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "6px 14px",
            background: colors.navy,
            color: "#fff",
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "system-ui, sans-serif",
            borderRadius: 3,
            border: "none",
          }}
        >
          <Plus size={11} strokeWidth={2.5} />
          New client
        </button>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left — client list */}
        <div
          style={{
            width: 320,
            minWidth: 320,
            borderRight: BORDER,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            background: "#fff",
          }}
        >
          {/* Search */}
          <div style={{ padding: "12px 16px", borderBottom: BORDER_LIGHT }}>
            <div style={{ position: "relative" }}>
              <Search
                size={13}
                style={{
                  position: "absolute",
                  left: 9,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9A8C98",
                }}
              />
              <input
                placeholder="Search clients…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "6px 10px 6px 28px",
                  fontSize: 12,
                  border: "1px solid #F0EDE9",
                  borderRadius: 3,
                  background: "#FAFAFA",
                  color: colors.navy,
                  fontFamily: "system-ui, sans-serif",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              borderBottom: BORDER,
              padding: "0 16px",
              gap: 2,
            }}
          >
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                style={{
                  padding: "8px 10px",
                  fontSize: 11,
                  fontFamily: "system-ui, sans-serif",
                  background: "none",
                  border: "none",
                  borderBottom:
                    filter === f.value
                      ? `2px solid ${colors.navy}`
                      : "2px solid transparent",
                  color: filter === f.value ? colors.navy : "#9A8C98",
                  cursor: "pointer",
                  fontWeight: filter === f.value ? 500 : 400,
                  marginBottom: -1,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div style={{ overflowY: "auto", flex: 1 }}>
            {filtered.length === 0 ? (
              <p style={{ padding: "20px 16px", fontSize: 12, color: "#9A8C98" }}>No clients found.</p>
            ) : (
              filtered.map((client) => (
                <div
                  key={client.id}
                  onClick={() => setSelected(client)}
                  style={{
                    padding: "12px 16px",
                    borderBottom: BORDER_LIGHT,
                    cursor: "pointer",
                    background: selected?.id === client.id ? "#F5F2EF" : "transparent",
                    transition: "background 0.1s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 500 }}>{client.name}</span>
                    <StatusPill status={client.status} />
                  </div>
                  <p style={{ fontSize: 11, color: "#9A8C98", margin: 0 }}>{client.company || "No company"}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right — detail */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px", background: "#FAFAFA" }}>
          {selected ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 4px 0" }}>{selected.name}</h2>
                  <p style={{ fontSize: 13, color: "#9A8C98", margin: 0 }}>{selected.company}</p>
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    {selected.tags?.map(t => (
                      <span key={t} style={{ fontSize: 10, padding: "2px 6px", background: "#E8E4E0", borderRadius: 2 }}>{t}</span>
                    ))}
                  </div>
                </div>
                
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={() => setShowEditModal(true)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 16px",
                      background: "#fff",
                      border: BORDER,
                      fontSize: 12,
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  >
                    Edit Client
                  </button>
                  
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 16px",
                      background: colors.rose,
                      color: "#fff",
                      fontSize: 12,
                      fontWeight: 500,
                      borderRadius: 4,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Send size={14} />
                    Invite Client
                  </button>
                  
                  <button
                    onClick={() => router.push(`/dashboard/projects?client=${selected.id}`)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 16px",
                      background: "#fff",
                      border: BORDER,
                      fontSize: 12,
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  >
                    <ExternalLink size={14} />
                    View Projects
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
                <div style={{ background: "#fff", padding: 20, border: BORDER }}>
                  <h3 style={{ fontSize: 11, fontWeight: 600, color: colors.rose, textTransform: "uppercase", margin: "0 0 12px 0" }}>Contact</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}><Mail size={14} /> {selected.email}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}><Phone size={14} /> {selected.phone || "No phone"}</div>
                  </div>
                </div>
                <div style={{ background: "#fff", padding: 20, border: BORDER }}>
                  <h3 style={{ fontSize: 11, fontWeight: 600, color: colors.rose, textTransform: "uppercase", margin: "0 0 12px 0" }}>Internal Notes</h3>
                  <p style={{ fontSize: 13, color: "#666", margin: 0 }}>{selected.notes || "No internal notes yet."}</p>
                </div>
              </div>

              <div style={{ background: "#fff", padding: 20, border: BORDER }}>
                <h3 style={{ fontSize: 11, fontWeight: 600, color: colors.rose, textTransform: "uppercase", margin: "0 0 16px 0" }}>Projects</h3>
                {selected.projects.length === 0 ? (
                  <p style={{ fontSize: 13, color: "#9A8C98" }}>No projects for this client yet.</p>
                ) : (
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: BORDER, textAlign: "left" }}>
                        <th style={{ padding: "8px 0", fontSize: 11, color: "#9A8C98" }}>Project</th>
                        <th style={{ padding: "8px 0", fontSize: 11, color: "#9A8C98" }}>Status</th>
                        <th style={{ padding: "8px 0", fontSize: 11, color: "#9A8C98", textAlign: "right" }}>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selected.projects.map(p => (
                        <tr key={p.id} style={{ borderBottom: BORDER_LIGHT }}>
                          <td style={{ padding: "12px 0", fontSize: 13, fontWeight: 500 }}>{p.title}</td>
                          <td style={{ padding: "12px 0" }}>
                            <span style={{ fontSize: 10, padding: "2px 8px", background: "#F5F2EF", color: PROJECT_STATUS_COLOR[p.status] || "#666" }}>
                              {p.status}
                            </span>
                          </td>
                          <td style={{ padding: "12px 0", fontSize: 13, textAlign: "right" }}>${p.agreed_value.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#9A8C98" }}>
              Select a client to view details
            </div>
          )}
        </div>
      </div>
      
      <CreateClientModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
      <EditClientModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        client={selected}
      />
    </div>
  )
}
