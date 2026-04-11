// app/dashboard/clients/page.tsx
"use client"

import { useState } from "react"
import { Plus, Search, Mail, Phone, ExternalLink, FileText } from "lucide-react"
import { colors } from "@/lib/colors"
import { useRouter } from "next/navigation"

const BORDER = "1px solid #E8E4E0"
const BORDER_LIGHT = "1px solid #F5F2EF"

type Status = "active" | "inactive" | "archived"

type Client = {
  id: number
  name: string
  company: string
  email: string
  phone: string
  status: Status
  activeProjects: number
  totalBilled: string
  lastActivity: string
  tags: string[]
  internalNotes: string
  projects: { name: string; status: string; value: string }[]
}

const CLIENTS: Client[] = [
  {
    id: 1,
    name: "Sarah Chen",
    company: "Acme Co",
    email: "sarah@acme.co",
    phone: "+1 (555) 101-2020",
    status: "active",
    activeProjects: 2,
    totalBilled: "$12,400",
    lastActivity: "Today",
    tags: ["design", "branding"],
    internalNotes:
      "Prefers communication via email. Usually responds within 24 hours. Budget-conscious but pays on time.",
    projects: [
      { name: "Brand refresh", status: "In Progress", value: "$3,200" },
      { name: "Website redesign", status: "In Progress", value: "$9,200" },
    ],
  },
  {
    id: 2,
    name: "James Okafor",
    company: "NovaTech",
    email: "james@novatech.io",
    phone: "+1 (555) 203-4040",
    status: "active",
    activeProjects: 1,
    totalBilled: "$28,750",
    lastActivity: "Yesterday",
    tags: ["development", "mobile"],
    internalNotes:
      "High-value client. Prefers weekly progress updates. Has a technical background — goes into detail on specs.",
    projects: [{ name: "Mobile app", status: "In Progress", value: "$8,500" }],
  },
  {
    id: 3,
    name: "Priya Nair",
    company: "Streamline",
    email: "priya@streamline.com",
    phone: "+1 (555) 305-6060",
    status: "active",
    activeProjects: 1,
    totalBilled: "$7,200",
    lastActivity: "2 days ago",
    tags: ["writing", "docs"],
    internalNotes:
      "Very organized. Sends detailed briefs. Prefers Notion for file sharing.",
    projects: [
      { name: "API documentation", status: "In Review", value: "$1,800" },
    ],
  },
  {
    id: 4,
    name: "Tom Brewer",
    company: "Clearpath",
    email: "tom@clearpath.co",
    phone: "+1 (555) 407-8080",
    status: "active",
    activeProjects: 1,
    totalBilled: "$15,600",
    lastActivity: "3 days ago",
    tags: ["design", "dev"],
    internalNotes:
      "Scope tends to creep — always confirm changes in writing before proceeding.",
    projects: [
      { name: "Dashboard redesign", status: "In Progress", value: "$5,600" },
    ],
  },
  {
    id: 5,
    name: "Elena Russo",
    company: "Brightfield",
    email: "elena@brightfield.eu",
    phone: "+1 (555) 509-1010",
    status: "inactive",
    activeProjects: 0,
    totalBilled: "$4,900",
    lastActivity: "3 weeks ago",
    tags: ["design"],
    internalNotes: "Project paused by client. Follow up in May to resume.",
    projects: [],
  },
  {
    id: 6,
    name: "Marcus Webb",
    company: "Driftwood Labs",
    email: "marcus@driftwood.io",
    phone: "+1 (555) 611-2020",
    status: "archived",
    activeProjects: 0,
    totalBilled: "$9,100",
    lastActivity: "1 month ago",
    tags: ["development"],
    internalNotes:
      "Engagement ended. Good experience overall — open to future work.",
    projects: [],
  },
]

const STATUS_STYLE: Record<
  Status,
  { bg: string; color: string; label: string }
> = {
  active: { bg: "#ECFDF5", color: "#065F46", label: "Active" },
  inactive: { bg: "#F5F2EF", color: "#9A8C98", label: "Inactive" },
  archived: { bg: "#F1F5F9", color: "#64748B", label: "Archived" },
}

const PROJECT_STATUS_COLOR: Record<string, string> = {
  "In Progress": "#92400E",
  "In Review": "#1E40AF",
  Completed: "#065F46",
  Pending: "#9A8C98",
}

function Pill({ status }: { status: Status }) {
  const s = STATUS_STYLE[status]
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

const FILTERS: { label: string; value: Status | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Archived", value: "archived" },
]

export default function ClientsPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<Status | "all">("all")
  const [selected, setSelected] = useState<Client>(CLIENTS[0])

  const filtered = CLIENTS.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || c.status === filter
    return matchesSearch && matchesFilter
  })

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
            width: 280,
            minWidth: 280,
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

          {/* Filter tabs */}
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

          {/* List */}
          <div style={{ overflowY: "auto", flex: 1 }}>
            {filtered.length === 0 ? (
              <p
                style={{
                  padding: "20px 16px",
                  fontSize: 12,
                  color: "#9A8C98",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                No clients found.
              </p>
            ) : (
              filtered.map((client) => {
                const isSelected = selected.id === client.id
                return (
                  <div
                    key={client.id}
                    onClick={() => setSelected(client)}
                    style={{
                      padding: "12px 16px",
                      borderBottom: BORDER_LIGHT,
                      cursor: "pointer",
                      background: isSelected ? "#F5F2EF" : "transparent",
                      borderLeft: isSelected
                        ? `2px solid ${colors.rose}`
                        : "2px solid transparent",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected)
                        e.currentTarget.style.background = "#FAFAFA"
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected)
                        e.currentTarget.style.background = "transparent"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12.5,
                          fontWeight: 500,
                          color: colors.navy,
                          fontFamily: "system-ui, sans-serif",
                        }}
                      >
                        {client.name}
                      </span>
                      <Pill status={client.status} />
                    </div>
                    <p
                      style={{
                        fontSize: 11,
                        color: "#9A8C98",
                        fontFamily: "system-ui, sans-serif",
                        marginBottom: 4,
                      }}
                    >
                      {client.company}
                    </p>
                    <div style={{ display: "flex", gap: 12 }}>
                      <span
                        style={{
                          fontSize: 11,
                          color: "#9A8C98",
                          fontFamily: "system-ui, sans-serif",
                        }}
                      >
                        {client.activeProjects} project
                        {client.activeProjects !== 1 ? "s" : ""}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: "#9A8C98",
                          fontFamily: "system-ui, sans-serif",
                        }}
                      >
                        {client.lastActivity}
                      </span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Right — client detail */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "28px 32px",
            background: "#FAFAFA",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: 28,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 4,
                }}
              >
                <h2
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: colors.navy,
                    letterSpacing: "-0.02em",
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {selected.name}
                </h2>
                <Pill status={selected.status} />
              </div>
              <p
                style={{
                  fontSize: 12.5,
                  color: "#9A8C98",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {selected.company}
              </p>
              {/* Tags */}
              {selected.tags.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    marginTop: 8,
                    flexWrap: "wrap",
                  }}
                >
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 10,
                        padding: "2px 8px",
                        borderRadius: 2,
                        background: "#F0EDE9",
                        color: colors.indigo,
                        fontFamily: "system-ui, sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() =>
                router.push(`/dashboard/projects?client=${selected.id}`)
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "6px 14px",
                background: "transparent",
                color: colors.navy,
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "system-ui, sans-serif",
                borderRadius: 3,
                border: BORDER,
              }}
            >
              <ExternalLink size={11} />
              View projects
            </button>
          </div>

          {/* Stats strip */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              border: BORDER,
              borderRight: "none",
              background: "#fff",
              marginBottom: 24,
            }}
          >
            {[
              {
                label: "Active projects",
                value: String(selected.activeProjects),
              },
              { label: "Total billed", value: selected.totalBilled },
              { label: "Last activity", value: selected.lastActivity },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{ padding: "16px 20px", borderRight: BORDER }}
              >
                <p
                  style={{
                    fontSize: 11,
                    color: "#9A8C98",
                    marginBottom: 6,
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: colors.navy,
                    letterSpacing: "-0.02em",
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div
            style={{
              background: "#fff",
              border: BORDER,
              padding: "20px",
              marginBottom: 24,
            }}
          >
            <p
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: colors.rose,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                fontFamily: "system-ui, sans-serif",
                marginBottom: 14,
              }}
            >
              Contact
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Mail size={13} color="#9A8C98" />
                <span
                  style={{
                    fontSize: 12.5,
                    color: colors.navy,
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {selected.email}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Phone size={13} color="#9A8C98" />
                <span
                  style={{
                    fontSize: 12.5,
                    color: colors.navy,
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {selected.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Internal notes */}
          <div
            style={{
              background: "#fff",
              border: BORDER,
              padding: "20px",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 14,
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: colors.rose,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                Internal Notes
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <FileText size={10} color="#9A8C98" />
                <span
                  style={{
                    fontSize: 10,
                    color: "#9A8C98",
                    fontFamily: "system-ui, sans-serif",
                    fontStyle: "italic",
                  }}
                >
                  Not visible to client
                </span>
              </div>
            </div>
            <p
              style={{
                fontSize: 12.5,
                color: colors.indigo,
                fontFamily: "system-ui, sans-serif",
                lineHeight: 1.6,
              }}
            >
              {selected.internalNotes || "No notes yet."}
            </p>
          </div>

          {/* Projects */}
          <div style={{ background: "#fff", border: BORDER, padding: "20px" }}>
            <p
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: colors.rose,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                fontFamily: "system-ui, sans-serif",
                marginBottom: 14,
              }}
            >
              Projects
            </p>
            {selected.projects.length === 0 ? (
              <p
                style={{
                  fontSize: 12,
                  color: "#9A8C98",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                No active projects.
              </p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: BORDER }}>
                    {["Project", "Status", "Value"].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          paddingBottom: 8,
                          fontSize: 11,
                          fontWeight: 500,
                          color: "#9A8C98",
                          fontFamily: "system-ui, sans-serif",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selected.projects.map((p) => (
                    <tr key={p.name}>
                      <td
                        style={{
                          padding: "10px 0",
                          fontSize: 12.5,
                          fontWeight: 500,
                          color: colors.navy,
                          fontFamily: "system-ui, sans-serif",
                          borderBottom: BORDER_LIGHT,
                        }}
                      >
                        {p.name}
                      </td>
                      <td
                        style={{
                          padding: "10px 0",
                          borderBottom: BORDER_LIGHT,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 500,
                            padding: "2px 8px",
                            borderRadius: 2,
                            background: "#F5F2EF",
                            color: PROJECT_STATUS_COLOR[p.status] ?? "#9A8C98",
                            fontFamily: "system-ui, sans-serif",
                          }}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "10px 0",
                          fontSize: 12.5,
                          color: colors.navy,
                          fontFamily: "system-ui, sans-serif",
                          borderBottom: BORDER_LIGHT,
                        }}
                      >
                        {p.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
