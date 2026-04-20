"use client"

import { colors } from "@/lib/colors"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export type DeadlineProject = {
  id: string
  name: string
  clientName: string
  deadline: string // YYYY-MM-DD
  status: "pending" | "in_progress" | "in_review" | "completed"
}

const STATUS_LABELS: Record<DeadlineProject["status"], string> = {
  pending: "Pending",
  in_progress: "In Progress",
  in_review: "In Review",
  completed: "Completed",
}

const STATUS_COLORS: Record<DeadlineProject["status"], { bg: string; text: string }> = {
  pending:     { bg: "#F8FAFC", text: "#64748B" },
  in_progress: { bg: "#FFF7ED", text: "#C2410C" },
  in_review:   { bg: "#FDF4FF", text: "#9333EA" },
  completed:   { bg: "#F0FDF4", text: "#16A34A" },
}

function getUrgency(deadlineStr: string): { label: string; color: string; bg: string } {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const deadline = new Date(deadlineStr + "T00:00:00")
  const diff = Math.round((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  if (diff < 0)  return { label: `${Math.abs(diff)}d overdue`, color: "#DC2626", bg: "#FEF2F2" }
  if (diff === 0) return { label: "Due today",                  color: "#EA580C", bg: "#FFF7ED" }
  if (diff <= 3)  return { label: `${diff}d left`,              color: "#EA580C", bg: "#FFF7ED" }
  if (diff <= 7)  return { label: `${diff}d left`,              color: "#CA8A04", bg: "#FEFCE8" }
  return              { label: `${diff}d left`,              color: "#64748B", bg: "#F8FAFC" }
}

export function UpcomingDeadlines({ projects }: { projects: DeadlineProject[] }) {
  if (projects.length === 0) {
    return (
      <div style={{
        background: "#fff", border: "1px solid #F1F5F9", borderRadius: 8,
        padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: 12, color: "#94A3B8", fontFamily: "system-ui" }}>No upcoming deadlines</span>
      </div>
    )
  }

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #F1F5F9",
      borderRadius: 8,
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        padding: "12px 18px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid #F8FAFC",
      }}>
        <div>
          <span style={{ fontSize: 12, fontWeight: 600, color: colors.navy, fontFamily: "system-ui" }}>
            Upcoming Deadlines
          </span>
          <span style={{ fontSize: 11, color: "#94A3B8", fontFamily: "system-ui", marginLeft: 8 }}>
            Next {projects.length} due
          </span>
        </div>
        <Link
          href="/dashboard/projects"
          style={{
            display: "flex", alignItems: "center", gap: 4,
            fontSize: 11, color: "#94A3B8", fontFamily: "system-ui",
            textDecoration: "none",
          }}
        >
          View all <ArrowRight size={11} />
        </Link>
      </div>

      {/* Rows */}
      {projects.map((p, i) => {
        const urgency = getUrgency(p.deadline)
        const status = STATUS_COLORS[p.status]
        const deadlineFormatted = new Date(p.deadline + "T00:00:00").toLocaleDateString("en-US", {
          month: "short", day: "numeric",
        })

        return (
          <div
            key={p.id}
            style={{
              padding: "10px 18px",
              display: "grid",
              gridTemplateColumns: "1fr auto auto",
              alignItems: "center",
              gap: 12,
              borderBottom: i < projects.length - 1 ? "1px solid #F8FAFC" : "none",
            }}
          >
            {/* Project + client */}
            <div style={{ minWidth: 0 }}>
              <p style={{
                margin: 0, fontSize: 12, fontWeight: 500, color: colors.navy,
                fontFamily: "system-ui", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>
                {p.name}
              </p>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: "#94A3B8", fontFamily: "system-ui" }}>
                {p.clientName} · {deadlineFormatted}
              </p>
            </div>

            {/* Status badge */}
            <span style={{
              fontSize: 10, fontWeight: 500,
              color: status.text, background: status.bg,
              padding: "2px 7px", borderRadius: 20,
              fontFamily: "system-ui", whiteSpace: "nowrap",
            }}>
              {STATUS_LABELS[p.status]}
            </span>

            {/* Urgency badge */}
            <span style={{
              fontSize: 10, fontWeight: 600,
              color: urgency.color, background: urgency.bg,
              padding: "2px 7px", borderRadius: 20,
              fontFamily: "system-ui", whiteSpace: "nowrap",
              minWidth: 60, textAlign: "center",
            }}>
              {urgency.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}