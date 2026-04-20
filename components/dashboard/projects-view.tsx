"use client"

import { useState } from "react"
import { Plus, Search, Calendar, DollarSign, ExternalLink, Pencil, Trash2 } from "lucide-react"
import { colors } from "@/lib/colors"
import { useRouter, useSearchParams } from "next/navigation"
import { CreateProjectModal } from "./create-project-modal"
import { EditProjectModal } from "./edit-project-modal"
import { deleteProjectAction } from "@/app/dashboard/projects/actions"

const BORDER = "1px solid #E2E8F0"
const BORDER_LIGHT = "1px solid #F1F5F9"

type Status = "pending" | "in_progress" | "in_review" | "completed"

export type ProjectDisplay = {
  id: string
  title: string
  client: string
  clientId: string
  description: string
  agreedValue: number
  amountPaid: number
  startDate: string
  deadline: string
  status: Status
  overdue: boolean
  internalNotes: string
  attachments: string[]
}

const STATUS_STYLE: Record<
  Status,
  { bg: string; color: string; label: string }
> = {
  pending: { bg: "#F1F5F9", color: "#64748B", label: "Pending" },
  in_progress: { bg: "#FEF3E2", color: "#92400E", label: "In Progress" },
  in_review: { bg: "#EFF6FF", color: "#1E40AF", label: "In Review" },
  completed: { bg: "#ECFDF5", color: "#065F46", label: "Completed" },
}

const FILTERS: { label: string; value: Status | "all" | "overdue" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in_progress" },
  { label: "In Review", value: "in_review" },
  { label: "Completed", value: "completed" },
  { label: "Overdue", value: "overdue" },
]

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

function ProgressBar({
  value,
  max,
  overdue,
}: {
  value: number
  max: number
  overdue: boolean
}) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100)
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "#64748B",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          ${value.toLocaleString()} paid
        </span>
        <span
          style={{
            fontSize: 11,
            color: "#64748B",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {pct}%
        </span>
      </div>
      <div
        style={{
          height: 3,
          background: "#E2E8F0",
          borderRadius: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: overdue
              ? "#991B1B"
              : pct === 100
                ? "#065F46"
                : colors.rose,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "#64748B",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          of ${max.toLocaleString()} agreed
        </span>
        <span
          style={{
            fontSize: 11,
            fontFamily: "system-ui, sans-serif",
            color: overdue ? "#991B1B" : "#64748B",
          }}
        >
          ${Math.max(0, max - value).toLocaleString()} remaining
        </span>
      </div>
    </div>
  )
}

export function ProjectsView({
  initialProjects,
  clients,
}: {
  initialProjects: ProjectDisplay[]
  clients: { id: string; name: string }[]
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const clientParam = searchParams.get("client")

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<Status | "all" | "overdue">("all")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const selected =
    initialProjects.find((p) => p.id === selectedId) ||
    (clientParam ? initialProjects.find((p) => p.clientId === clientParam) : null) ||
    initialProjects[0] ||
    null

  const filtered = initialProjects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "overdue"
          ? p.overdue
          : p.status === filter
    return matchesSearch && matchesFilter
  })

  const handleDelete = async () => {
    if (!selected || isDeleting) return
    const confirmed = window.confirm(`Delete project "${selected.title}"? This action cannot be undone.`)
    if (!confirmed) return

    setIsDeleting(true)
    const result = await deleteProjectAction(selected.id)
    setIsDeleting(false)

    if (result && "error" in result && result.error) {
      window.alert(result.error)
      return
    }

    router.refresh()
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
          Projects
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
          New project
        </button>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left — project list */}
        <div
          style={{
            width: 300,
            minWidth: 300,
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
                  color: "#64748B",
                }}
              />
              <input
                placeholder="Search projects…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "6px 10px 6px 28px",
                  fontSize: 12,
                  border: "1px solid #E2E8F0",
                  borderRadius: 3,
                  background: "#F8FAFC",
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
              overflowX: "auto",
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
                      ? `2px solid ${f.value === "overdue" ? "#991B1B" : colors.navy}`
                      : "2px solid transparent",
                  color:
                    filter === f.value
                      ? f.value === "overdue"
                        ? "#991B1B"
                        : colors.navy
                      : "#64748B",
                  cursor: "pointer",
                  fontWeight: filter === f.value ? 500 : 400,
                  marginBottom: -1,
                  whiteSpace: "nowrap",
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
                  color: "#64748B",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                No projects found.
              </p>
            ) : (
              filtered.map((project) => {
                const isSelected = selected?.id === project.id
                const pct =
                  project.agreedValue === 0
                    ? 0
                    : Math.round(
                        (project.amountPaid / project.agreedValue) * 100
                      )
                return (
                  <div
                    key={project.id}
                    onClick={() => setSelectedId(project.id)}
                    style={{
                      padding: "12px 16px",
                      borderBottom: BORDER_LIGHT,
                      cursor: "pointer",
                      background: isSelected
                        ? "#F1F5F9"
                        : project.overdue
                          ? "#FFFBFB"
                          : "transparent",
                      borderLeft: isSelected
                        ? `2px solid ${colors.rose}`
                        : project.overdue
                          ? "2px solid #991B1B"
                          : "2px solid transparent",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected)
                        e.currentTarget.style.background = "#F8FAFC"
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected)
                        e.currentTarget.style.background = project.overdue
                          ? "#FFFBFB"
                          : "transparent"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 3,
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
                        {project.title}
                      </span>
                      <Pill status={project.status} />
                    </div>
                    <p
                      style={{
                        fontSize: 11,
                        color: "#64748B",
                        fontFamily: "system-ui, sans-serif",
                        marginBottom: 6,
                      }}
                    >
                      {project.client}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          color: project.overdue ? "#991B1B" : "#64748B",
                          fontFamily: "system-ui, sans-serif",
                        }}
                      >
                        Due {project.deadline}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: "#64748B",
                          fontFamily: "system-ui, sans-serif",
                        }}
                      >
                        {pct}% paid
                      </span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Right — project detail */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "28px 32px",
            background: "#F8FAFC",
          }}
        >
          {selected ? (
            <>
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
                        margin: 0,
                      }}
                    >
                      {selected.title}
                    </h2>
                    <Pill status={selected.status} />
                    {selected.overdue && (
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 500,
                          padding: "2px 8px",
                          borderRadius: 2,
                          background: "#FEF2F2",
                          color: "#991B1B",
                          fontFamily: "system-ui, sans-serif",
                        }}
                      >
                        Overdue
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => router.push(`/dashboard/clients`)}
                    style={{
                      fontSize: 12.5,
                      color: "#64748B",
                      fontFamily: "system-ui, sans-serif",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                    }}
                  >
                    {selected.client}
                  </button>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => setShowEditModal(true)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "6px 14px",
                      background: "#fff",
                      color: colors.navy,
                      fontSize: 12,
                      cursor: "pointer",
                      fontFamily: "system-ui, sans-serif",
                      borderRadius: 3,
                      border: BORDER,
                    }}
                  >
                    <Pencil size={11} />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "6px 14px",
                      background: "#fff",
                      color: "#991B1B",
                      fontSize: 12,
                      cursor: isDeleting ? "not-allowed" : "pointer",
                      fontFamily: "system-ui, sans-serif",
                      borderRadius: 3,
                      border: "1px solid #FECACA",
                      opacity: isDeleting ? 0.7 : 1,
                    }}
                  >
                    <Trash2 size={11} />
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    onClick={() => router.push(`/dashboard/payments`)}
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
                    View payments
                  </button>
                </div>
              </div>

              {/* Stats strip */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  border: BORDER,
                  borderRight: "none",
                  background: "#fff",
                  marginBottom: 24,
                }}
              >
                {[
                  {
                    label: "Agreed value",
                    value: `$${selected.agreedValue.toLocaleString()}`,
                  },
                  {
                    label: "Amount paid",
                    value: `$${selected.amountPaid.toLocaleString()}`,
                  },
                  {
                    label: "Remaining",
                    value: `$${Math.max(0, selected.agreedValue - selected.amountPaid).toLocaleString()}`,
                  },
                  { label: "Deadline", value: selected.deadline },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    style={{ padding: "16px 20px", borderRight: BORDER }}
                  >
                    <p
                      style={{
                        fontSize: 11,
                        color: "#64748B",
                        marginBottom: 6,
                        fontFamily: "system-ui, sans-serif",
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: colors.navy,
                        letterSpacing: "-0.02em",
                        fontFamily: "system-ui, sans-serif",
                        margin: 0,
                      }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Payment progress */}
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
                    margin: "0 0 14px 0",
                  }}
                >
                  Payment Progress
                </p>
                <ProgressBar
                  value={selected.amountPaid}
                  max={selected.agreedValue}
                  overdue={selected.overdue}
                />
              </div>

              {/* Description */}
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
                    margin: "0 0 14px 0",
                  }}
                >
                  Description
                </p>
                <p
                  style={{
                    fontSize: 12.5,
                    color: colors.indigo,
                    fontFamily: "system-ui, sans-serif",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {selected.description || "No description provided."}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    marginTop: 14,
                    paddingTop: 14,
                    borderTop: BORDER_LIGHT,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Calendar size={12} color="#64748B" />
                    <span
                      style={{
                        fontSize: 11,
                        color: "#64748B",
                        fontFamily: "system-ui, sans-serif",
                      }}
                    >
                      Started {selected.startDate || "TBD"}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <DollarSign size={12} color="#64748B" />
                    <span
                      style={{
                        fontSize: 11,
                        color: "#64748B",
                        fontFamily: "system-ui, sans-serif",
                      }}
                    >
                      ${selected.agreedValue.toLocaleString()} agreed
                    </span>
                  </div>
                </div>
              </div>

              {/* Attachments */}
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
                    margin: "0 0 14px 0",
                  }}
                >
                  Attachments
                </p>
                {selected.attachments.length === 0 ? (
                  <p
                    style={{
                      fontSize: 12,
                      color: "#64748B",
                      fontFamily: "system-ui, sans-serif",
                      margin: 0,
                    }}
                  >
                    No attachments yet.
                  </p>
                ) : (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {selected.attachments.map((file) => (
                      <div
                        key={file}
                        style={{
                          padding: "5px 12px",
                          border: BORDER,
                          borderRadius: 2,
                          fontSize: 11,
                          color: colors.indigo,
                          fontFamily: "system-ui, sans-serif",
                          background: "#F8FAFC",
                          cursor: "pointer",
                        }}
                      >
                        {file}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Internal notes */}
              <div style={{ background: "#fff", border: BORDER, padding: "20px" }}>
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
                      margin: 0,
                    }}
                  >
                    Internal Notes
                  </p>
                  <span
                    style={{
                      fontSize: 10,
                      color: "#64748B",
                      fontFamily: "system-ui, sans-serif",
                      fontStyle: "italic",
                    }}
                  >
                    Not visible to client
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 12.5,
                    color: colors.indigo,
                    fontFamily: "system-ui, sans-serif",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {selected.internalNotes || "No notes yet."}
                </p>
              </div>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#64748B", fontSize: 13 }}>
              Select a project to view details
            </div>
          )}
        </div>
      </div>
      
      <CreateProjectModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        clients={clients}
      />
      <EditProjectModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        project={selected}
      />
    </div>
  )
}
