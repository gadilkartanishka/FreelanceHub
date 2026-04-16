"use client"

import { useState } from "react"
import { colors } from "@/lib/colors"
import { Plus } from "lucide-react"
import { CreateProjectModal } from "@/components/dashboard/create-project-modal"

const BORDER = "1px solid #E8E4E0"
const BORDER_LIGHT = "1px solid #F5F2EF"

type Status =
  | "pending"
  | "in_progress"
  | "in_review"
  | "completed"
  | "paid"
  | "overdue"

const STATUS_STYLE: Record<
  Status,
  { bg: string; color: string; label: string }
> = {
  pending: { bg: "#F5F2EF", color: "#9A8C98", label: "Pending" },
  in_progress: { bg: "#FEF3E2", color: "#92400E", label: "In Progress" },
  in_review: { bg: "#EFF6FF", color: "#1E40AF", label: "In Review" },
  completed: { bg: "#ECFDF5", color: "#065F46", label: "Completed" },
  paid: { bg: "#ECFDF5", color: "#065F46", label: "Paid" },
  overdue: { bg: "#FEF2F2", color: "#991B1B", label: "Overdue" },
}

type ProjectRow = {
  name: string
  client: string
  status: Status
  progress: number
  deadline: string
  value: string
  overdue: boolean
}

type PaymentRow = {
  client: string
  project: string
  amount: string
  date: string
  status: Status
}

type Metrics = {
  revenueThisMonth: number
  activeProjects: number
  pendingPayments: number
  overdueProjects: number
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

function SectionHead({ title, link }: { title: string; link: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "#9A8C98",
          letterSpacing: "0.06em",
          textTransform: "uppercase" as const,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {title}
      </span>
      <a
        href={link}
        style={{
          fontSize: 12,
          color: "#9A8C98",
          textDecoration: "none",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        View all
      </a>
    </div>
  )
}

const thStyle: React.CSSProperties = {
  textAlign: "left",
  paddingBottom: 10,
  fontSize: 11,
  fontWeight: 500,
  color: "#9A8C98",
  letterSpacing: "0.04em",
  fontFamily: "system-ui, sans-serif",
}

const tdStyle: React.CSSProperties = {
  padding: "11px 0",
  color: colors.navy,
  verticalAlign: "middle",
  fontSize: 12.5,
  fontFamily: "system-ui, sans-serif",
  borderBottom: BORDER_LIGHT,
}

export function OverviewView({
  metrics,
  projects,
  payments,
  clients,
}: {
  metrics: Metrics
  projects: ProjectRow[]
  payments: PaymentRow[]
  clients: { id: string; name: string }[]
}) {
  const [showProjectModal, setShowProjectModal] = useState(false)

  const today = new Date()
  const dateStr = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const METRICS = [
    {
      label: "Revenue this month",
      value: `$${metrics.revenueThisMonth.toLocaleString()}`,
      sub: metrics.revenueThisMonth > 0 ? "Current month total" : "No payments yet",
      subColor: "#4A7C59",
      alert: false,
    },
    {
      label: "Active projects",
      value: String(metrics.activeProjects),
      sub: metrics.activeProjects > 0 ? `${metrics.activeProjects} in progress` : "No active projects",
      subColor: "#9A8C98",
      alert: false,
    },
    {
      label: "Pending payments",
      value: `$${metrics.pendingPayments.toLocaleString()}`,
      sub:
        metrics.pendingPayments > 0
          ? "Awaiting payment"
          : "All clear",
      subColor: "#92400E",
      alert: metrics.pendingPayments > 0,
    },
    {
      label: "Overdue tasks",
      value: String(metrics.overdueProjects),
      sub:
        metrics.overdueProjects > 0
          ? "Immediate attention needed"
          : "No overdue tasks",
      subColor: "#991B1B",
      alert: metrics.overdueProjects > 0,
    },
  ]

  const hasData = projects.length > 0 || payments.length > 0

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
          Overview
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontSize: 12,
              color: "#9A8C98",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {dateStr}
          </span>
          <button
            onClick={() => setShowProjectModal(true)}
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
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "28px" }}>
        {/* Metrics strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            border: BORDER,
            borderRight: "none",
            marginBottom: 36,
          }}
        >
          {METRICS.map(({ label, value, sub, subColor, alert }) => (
            <div
              key={label}
              style={{
                padding: "20px 20px 18px",
                borderRight: BORDER,
                background: alert ? "#FFFBFB" : "#fff",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  color: "#9A8C98",
                  marginBottom: 8,
                  fontFamily: "system-ui, sans-serif",
                  letterSpacing: "0.02em",
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: alert ? subColor : colors.navy,
                  letterSpacing: "-0.03em",
                  marginBottom: 4,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {value}
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: subColor,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {sub}
              </p>
            </div>
          ))}
        </div>

        {!hasData ? (
          /* Empty state */
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              border: BORDER,
              background: "#FAFAFA",
            }}
          >
            <p
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: colors.navy,
                marginBottom: 8,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Welcome to FreelanceHub!
            </p>
            <p
              style={{
                fontSize: 13,
                color: "#9A8C98",
                marginBottom: 20,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Create your first client to get started.
            </p>
            <a
              href="/dashboard/clients"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "8px 18px",
                background: colors.navy,
                color: "#fff",
                fontSize: 12,
                fontFamily: "system-ui, sans-serif",
                borderRadius: 3,
                textDecoration: "none",
              }}
            >
              <Plus size={12} />
              Create your first client
            </a>
          </div>
        ) : (
          <>
            {/* Projects table */}
            {projects.length > 0 && (
              <div style={{ marginBottom: 36 }}>
                <SectionHead title="Active projects" link="/dashboard/projects" />
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: BORDER }}>
                      <th style={{ ...thStyle, width: "26%" }}>Project</th>
                      <th style={{ ...thStyle, width: "16%" }}>Client</th>
                      <th style={{ ...thStyle, width: "13%" }}>Status</th>
                      <th style={{ ...thStyle, width: "14%" }}>Progress</th>
                      <th style={thStyle}>Deadline</th>
                      <th style={{ ...thStyle, textAlign: "right" }}>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map(
                      ({
                        name,
                        client,
                        status,
                        progress,
                        deadline,
                        value,
                        overdue,
                      }) => (
                        <tr
                          key={name}
                          style={{ background: overdue ? "#FFFBFB" : "transparent" }}
                        >
                          <td style={{ ...tdStyle, fontWeight: 500 }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                              }}
                            >
                              {overdue && (
                                <span
                                  style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    background: "#991B1B",
                                    flexShrink: 0,
                                    display: "inline-block",
                                  }}
                                />
                              )}
                              {name}
                            </div>
                          </td>
                          <td style={{ ...tdStyle, color: "#9A8C98" }}>{client}</td>
                          <td style={tdStyle}>
                            <Pill status={status} />
                          </td>
                          <td style={tdStyle}>
                            <div
                              style={{
                                width: 56,
                                height: 3,
                                background: "#F0EDE9",
                                overflow: "hidden",
                                borderRadius: 0,
                              }}
                            >
                              <div
                                style={{
                                  width: `${progress}%`,
                                  height: "100%",
                                  background: overdue ? "#991B1B" : colors.rose,
                                }}
                              />
                            </div>
                          </td>
                          <td
                            style={{
                              ...tdStyle,
                              color: overdue ? "#991B1B" : "#9A8C98",
                              fontWeight: overdue ? 500 : 400,
                            }}
                          >
                            {deadline}
                          </td>
                          <td style={{ ...tdStyle, textAlign: "right" }}>{value}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Payments table */}
            {payments.length > 0 && (
              <div>
                <SectionHead title="Recent payments" link="/dashboard/payments" />
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: BORDER }}>
                      <th style={{ ...thStyle, width: "26%" }}>Client</th>
                      <th style={thStyle}>Project</th>
                      <th style={thStyle}>Amount</th>
                      <th style={thStyle}>Date</th>
                      <th style={{ ...thStyle, textAlign: "right" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map(({ client, project, amount, date, status }) => (
                      <tr
                        key={`${client}-${date}-${amount}`}
                        style={{
                          background:
                            status === "overdue" ? "#FFFBFB" : "transparent",
                        }}
                      >
                        <td style={{ ...tdStyle, fontWeight: 500 }}>{client}</td>
                        <td style={{ ...tdStyle, color: "#9A8C98" }}>{project}</td>
                        <td
                          style={{
                            ...tdStyle,
                            color: status === "overdue" ? "#991B1B" : colors.navy,
                            fontWeight: status === "overdue" ? 500 : 400,
                          }}
                        >
                          {amount}
                        </td>
                        <td style={{ ...tdStyle, color: "#9A8C98" }}>{date}</td>
                        <td style={{ ...tdStyle, textAlign: "right" }}>
                          <Pill status={status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      <CreateProjectModal
        open={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        clients={clients}
      />
    </div>
  )
}
