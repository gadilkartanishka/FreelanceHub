import { colors } from "@/lib/colors"
import { Plus } from "lucide-react"

const BORDER = "1px solid #E8E4E0"
const BORDER_LIGHT = "1px solid #F5F2EF"

const METRICS = [
  {
    label: "Revenue this month",
    value: "$4,820",
    sub: "↑ 18% vs March",
    subColor: "#4A7C59",
  },
  {
    label: "Active clients",
    value: "12",
    sub: "↑ 2 this month",
    subColor: "#4A7C59",
  },
  {
    label: "Open projects",
    value: "7",
    sub: "3 due this week",
    subColor: "#9A8C98",
  },
  {
    label: "Unpaid invoices",
    value: "$1,240",
    sub: "2 overdue",
    subColor: "#A0522D",
  },
]

type Status =
  | "progress"
  | "track"
  | "review"
  | "risk"
  | "paid"
  | "pending"
  | "overdue"

const STATUS_STYLE: Record<
  Status,
  { bg: string; color: string; label: string }
> = {
  progress: { bg: "#FEF3E2", color: "#92400E", label: "In progress" },
  track: { bg: "#ECFDF5", color: "#065F46", label: "On track" },
  review: { bg: "#EFF6FF", color: "#1E40AF", label: "In review" },
  risk: { bg: "#FEF2F2", color: "#991B1B", label: "At risk" },
  paid: { bg: "#ECFDF5", color: "#065F46", label: "Paid" },
  pending: { bg: "#FEF3E2", color: "#92400E", label: "Pending" },
  overdue: { bg: "#FEF2F2", color: "#991B1B", label: "Overdue" },
}

const PROJECTS = [
  {
    name: "Brand refresh",
    client: "Acme Co",
    status: "progress" as Status,
    progress: 72,
    deadline: "Apr 14",
    value: "$3,200",
  },
  {
    name: "Mobile app",
    client: "NovaTech",
    status: "track" as Status,
    progress: 45,
    deadline: "Apr 22",
    value: "$8,500",
  },
  {
    name: "API documentation",
    client: "Streamline",
    status: "review" as Status,
    progress: 90,
    deadline: "Apr 12",
    value: "$1,800",
  },
  {
    name: "Dashboard redesign",
    client: "Clearpath",
    status: "risk" as Status,
    progress: 30,
    deadline: "Apr 18",
    value: "$5,600",
  },
]

const PAYMENTS = [
  {
    client: "NovaTech",
    invoice: "#INV-041",
    amount: "$2,000",
    date: "Apr 8",
    status: "paid" as Status,
  },
  {
    client: "Acme Co",
    invoice: "#INV-040",
    amount: "$1,580",
    date: "Apr 5",
    status: "paid" as Status,
  },
  {
    client: "Streamline",
    invoice: "#INV-039",
    amount: "$900",
    date: "Apr 1",
    status: "pending" as Status,
  },
  {
    client: "Clearpath",
    invoice: "#INV-038",
    amount: "$340",
    date: "Mar 28",
    status: "overdue" as Status,
  },
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

export default function OverviewPage() {
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
            April 11, 2026
          </span>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "6px 14px",
              border: BORDER,
              background: colors.navy,
              color: "#fff",
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "system-ui, sans-serif",
              borderRadius: 3,
              borderColor: colors.navy,
            }}
          >
            <Plus size={11} strokeWidth={2.5} />
            New project
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Main */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px" }}>
          {/* Metrics strip — no cards, just a bordered grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              border: BORDER,
              borderRight: "none",
              marginBottom: 36,
            }}
          >
            {METRICS.map(({ label, value, sub, subColor }) => (
              <div
                key={label}
                style={{ padding: "20px 20px 18px", borderRight: BORDER }}
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
                    color: colors.navy,
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

          {/* Projects table */}
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
                {PROJECTS.map(
                  ({ name, client, status, progress, deadline, value }) => (
                    <tr key={name}>
                      <td style={{ ...tdStyle, fontWeight: 500 }}>{name}</td>
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
                              background: colors.rose,
                            }}
                          />
                        </div>
                      </td>
                      <td style={{ ...tdStyle, color: "#9A8C98" }}>
                        {deadline}
                      </td>
                      <td style={{ ...tdStyle, textAlign: "right" }}>
                        {value}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Payments table */}
          <div>
            <SectionHead title="Recent payments" link="/dashboard/payments" />
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: BORDER }}>
                  <th style={{ ...thStyle, width: "26%" }}>Client</th>
                  <th style={thStyle}>Invoice</th>
                  <th style={thStyle}>Amount</th>
                  <th style={thStyle}>Date</th>
                  <th style={{ ...thStyle, textAlign: "right" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {PAYMENTS.map(({ client, invoice, amount, date, status }) => (
                  <tr key={invoice}>
                    <td style={{ ...tdStyle, fontWeight: 500 }}>{client}</td>
                    <td style={{ ...tdStyle, color: "#9A8C98" }}>{invoice}</td>
                    <td style={tdStyle}>{amount}</td>
                    <td style={{ ...tdStyle, color: "#9A8C98" }}>{date}</td>
                    <td style={{ ...tdStyle, textAlign: "right" }}>
                      <Pill status={status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
