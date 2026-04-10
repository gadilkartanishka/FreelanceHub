"use client"

import { motion } from "framer-motion"
import {
  TrendingUp,
  Clock,
  DollarSign,
  FolderKanban,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Circle,
  AlertCircle,
} from "lucide-react"
import { colors } from "@/lib/colors"

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
}

const STATS = [
  {
    label: "Revenue this month",
    value: "$8,420",
    change: "+12%",
    up: true,
    Icon: DollarSign,
    accent: colors.indigo,
  },
  {
    label: "Active projects",
    value: "6",
    change: "+2 new",
    up: true,
    Icon: FolderKanban,
    accent: colors.rose,
  },
  {
    label: "Hours logged",
    value: "94h",
    change: "-8% vs last month",
    up: false,
    Icon: Clock,
    accent: colors.mauve,
  },
  {
    label: "Avg. project value",
    value: "$1,403",
    change: "+5%",
    up: true,
    Icon: TrendingUp,
    accent: colors.indigo,
  },
]

const PROJECTS = [
  {
    name: "Brand Identity — Orin Studio",
    client: "Orin Studio",
    due: "Apr 18",
    status: "on-track",
    progress: 72,
  },
  {
    name: "Web Redesign — Calla Co.",
    client: "Calla Co.",
    due: "Apr 22",
    status: "at-risk",
    progress: 38,
  },
  {
    name: "Copy Deck — Meadow Foods",
    client: "Meadow Foods",
    due: "Apr 30",
    status: "on-track",
    progress: 55,
  },
  {
    name: "Mobile App UI — Vesper",
    client: "Vesper",
    due: "May 10",
    status: "not-started",
    progress: 0,
  },
]

const TASKS = [
  { label: "Send revised proposal to Orin Studio", done: true },
  { label: "Review Calla Co. wireframes", done: false },
  { label: "Invoice Meadow Foods — milestone 2", done: false },
  { label: "Schedule kickoff with Vesper team", done: false },
  { label: "Update contract template", done: true },
]

const statusMeta: Record<
  string,
  { label: string; color: string; Icon: React.ElementType }
> = {
  "on-track": { label: "On track", color: "#6EBF8B", Icon: CheckCircle2 },
  "at-risk": { label: "At risk", color: "#E07A5F", Icon: AlertCircle },
  "not-started": { label: "Not started", color: colors.mauve, Icon: Circle },
}

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      style={{ maxWidth: 960, margin: "0 auto" }}
    >
      {/* Header */}
      <motion.div variants={item} style={{ marginBottom: 32 }}>
        <p
          style={{
            fontSize: 12,
            color: colors.mauve,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          {today}
        </p>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: colors.navy,
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
          }}
        >
          Good morning, John.
        </h1>
        <p style={{ fontSize: 14, color: colors.indigo, marginTop: 4 }}>
          You have 3 open tasks and 2 invoices pending this week.
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        variants={item}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 14,
          marginBottom: 28,
        }}
      >
        {STATS.map((s) => (
          <div
            key={s.label}
            style={{
              background: "#fff",
              border: `1px solid ${colors.rose}55`,
              borderRadius: 14,
              padding: "18px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{ fontSize: 12, color: colors.mauve, fontWeight: 500 }}
              >
                {s.label}
              </span>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: s.accent + "18",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <s.Icon size={14} color={s.accent} />
              </div>
            </div>
            <div>
              <p
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: colors.navy,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  fontSize: 11,
                  marginTop: 5,
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  color: s.up ? "#6EBF8B" : "#E07A5F",
                  fontWeight: 500,
                }}
              >
                {s.up ? (
                  <ArrowUpRight size={12} />
                ) : (
                  <ArrowDownRight size={12} />
                )}
                {s.change}
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Two-col: Projects + Tasks */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: 14,
          alignItems: "start",
        }}
      >
        {/* Projects */}
        <motion.div
          variants={item}
          style={{
            background: "#fff",
            border: `1px solid ${colors.rose}55`,
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: `1px solid ${colors.rose}33`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: colors.navy }}>
              Active Projects
            </span>
            <a
              href="/dashboard/projects"
              style={{
                fontSize: 12,
                color: colors.mauve,
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              View all →
            </a>
          </div>

          <div>
            {PROJECTS.map((p, i) => {
              const meta = statusMeta[p.status]
              return (
                <div
                  key={p.name}
                  style={{
                    padding: "14px 20px",
                    borderBottom:
                      i < PROJECTS.length - 1
                        ? `1px solid ${colors.cream}`
                        : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: colors.navy,
                          marginBottom: 2,
                        }}
                      >
                        {p.name}
                      </p>
                      <p style={{ fontSize: 11, color: colors.mauve }}>
                        Due {p.due}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "3px 8px",
                        borderRadius: 20,
                        background: meta.color + "18",
                      }}
                    >
                      <meta.Icon size={10} color={meta.color} />
                      <span
                        style={{
                          fontSize: 11,
                          color: meta.color,
                          fontWeight: 500,
                        }}
                      >
                        {meta.label}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div
                    style={{
                      height: 4,
                      borderRadius: 99,
                      background: colors.cream,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${p.progress}%`,
                        borderRadius: 99,
                        background:
                          p.status === "at-risk" ? "#E07A5F" : colors.indigo,
                        transition: "width 0.6s ease",
                      }}
                    />
                  </div>
                  <p
                    style={{
                      fontSize: 10,
                      color: colors.mauve,
                      marginTop: 4,
                      textAlign: "right",
                    }}
                  >
                    {p.progress}% complete
                  </p>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Tasks */}
        <motion.div
          variants={item}
          style={{
            background: "#fff",
            border: `1px solid ${colors.rose}55`,
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: `1px solid ${colors.rose}33`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: colors.navy }}>
              Tasks
            </span>
            <span style={{ fontSize: 11, color: colors.mauve }}>
              {TASKS.filter((t) => t.done).length}/{TASKS.length} done
            </span>
          </div>

          <div
            style={{
              padding: "10px 12px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {TASKS.map((t) => (
              <div
                key={t.label}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "9px 8px",
                  borderRadius: 8,
                  cursor: "pointer",
                  transition: "background 0.12s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = colors.cream)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <CheckCircle2
                  size={15}
                  style={{ marginTop: 1, minWidth: 15 }}
                  color={t.done ? "#6EBF8B" : colors.rose}
                  fill={t.done ? "#6EBF8B22" : "none"}
                />
                <span
                  style={{
                    fontSize: 12,
                    color: t.done ? colors.mauve : colors.navy,
                    textDecoration: t.done ? "line-through" : "none",
                    lineHeight: 1.45,
                  }}
                >
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
