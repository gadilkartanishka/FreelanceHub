"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { colors } from "@/lib/colors"

const BORDER_LIGHT = "1px solid #E2E8F0"
const MIN_WIDTH = 180
const MAX_WIDTH = 400
const DEFAULT_WIDTH = 224

const PAYMENTS = [
  { label: "Received", value: "$3,580", color: colors.navy },
  { label: "Pending", value: "$1,240", color: "#A0522D" },
  { label: "Overdue", value: "$620", color: "#991B1B" },
  { label: "Invoices sent", value: "8", color: colors.navy },
]

const DEADLINES = [
  { name: "API docs", date: "Tomorrow", progress: 90, color: colors.indigo },
  { name: "Brand refresh", date: "3 days", progress: 72, color: colors.rose },
  { name: "Dashboard", date: "7 days", progress: 30, color: colors.mauve },
  { name: "Mobile app", date: "11 days", progress: 45, color: colors.mauve },
]

const MESSAGES = [
  { label: "Unread", value: "4", color: colors.rose },
  { label: "From clients", value: "3", color: colors.navy },
]

function PanelLabel({ children }: { children: string }) {
  return (
    <p
      style={{
        fontSize: 10,
        fontWeight: 600,
        color: colors.rose,
        letterSpacing: "0.07em",
        textTransform: "uppercase" as const,
        marginBottom: 12,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {children}
    </p>
  )
}

function StatRow({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: string
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: "7px 0",
        borderBottom: BORDER_LIGHT,
      }}
    >
      <span
        style={{
          fontSize: 12.5,
          color: colors.indigo,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 13,
          fontWeight: 500,
          color,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {value}
      </span>
    </div>
  )
}

export function RightPanel() {
  const [width, setWidth] = useState(DEFAULT_WIDTH)
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(0)
  const startWidthRef = useRef(DEFAULT_WIDTH)

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      startXRef.current = e.clientX
      startWidthRef.current = width
      setIsDragging(true)
    },
    [width]
  )

  useEffect(() => {
    if (!isDragging) return

    const onMouseMove = (e: MouseEvent) => {
      // Dragging left increases width (panel is on the right)
      const delta = startXRef.current - e.clientX
      const next = Math.min(
        MAX_WIDTH,
        Math.max(MIN_WIDTH, startWidthRef.current + delta)
      )
      setWidth(next)
    }

    const onMouseUp = () => setIsDragging(false)

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }
  }, [isDragging])

  return (
    <aside
      style={{
        width,
        minWidth: width,
        borderLeft: "1px solid #E2E8F0",
        overflowY: "auto" as const,
        padding: "24px 20px",
        background: "#F8FAFC",
        display: "flex",
        flexDirection: "column",
        gap: 24,
        position: "relative",
        flexShrink: 0,
        userSelect: isDragging ? "none" : "auto",
      }}
    >
      {/* Resize handle */}
      <div
        onMouseDown={onMouseDown}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          cursor: "col-resize",
          zIndex: 10,
          background: isDragging ? colors.rose : "transparent",
          transition: isDragging ? "none" : "background 0.15s",
        }}
        onMouseEnter={(e) => {
          if (!isDragging)
            (e.currentTarget as HTMLDivElement).style.background = "#E2E8F0"
        }}
        onMouseLeave={(e) => {
          if (!isDragging)
            (e.currentTarget as HTMLDivElement).style.background = "transparent"
        }}
      />

      <div>
        <PanelLabel>Payments</PanelLabel>
        {PAYMENTS.map((p) => (
          <StatRow key={p.label} {...p} />
        ))}
      </div>

      <div>
        <PanelLabel>Deadlines</PanelLabel>
        {DEADLINES.map(({ name, date, progress, color }) => (
          <div
            key={name}
            style={{ padding: "8px 0", borderBottom: BORDER_LIGHT }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 2,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: colors.navy,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {name}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "#64748B",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {date}
              </span>
            </div>
            <div
              style={{
                height: 2,
                background: "#EDE8E3",
                overflow: "hidden",
                marginTop: 6,
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <PanelLabel>Messages</PanelLabel>
        {MESSAGES.map((m) => (
          <StatRow key={m.label} {...m} />
        ))}
      </div>
    </aside>
  )
}
