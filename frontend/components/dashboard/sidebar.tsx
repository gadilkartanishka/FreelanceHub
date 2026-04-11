"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CreditCard,
  Mail,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { colors } from "@/lib/colors"

const NAV = [
  { href: "/dashboard", label: "Overview", Icon: LayoutDashboard },
  { href: "/dashboard/clients", label: "Clients", Icon: Users },
  { href: "/dashboard/projects", label: "Projects", Icon: FolderKanban },
  { href: "/dashboard/payments", label: "Payments", Icon: CreditCard },
  { href: "/dashboard/messages", label: "Messages", Icon: Mail },
  { href: "/dashboard/settings", label: "Settings", Icon: Settings },
]

const BORDER = "1px solid #E8E4E0"

export function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean
  onToggle: () => void
}) {
  const pathname = usePathname()

  return (
    <aside
      style={{
        width: collapsed ? 52 : 196,
        minWidth: collapsed ? 52 : 196,
        background: "#fff",
        borderRight: BORDER,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "width 0.2s ease, min-width 0.2s ease",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          height: 52,
          padding: collapsed ? "0" : "0 16px",
          borderBottom: BORDER,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
        }}
      >
        {!collapsed && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: colors.rose,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: colors.navy,
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
              }}
            >
              FreelanceHub
            </span>
          </div>
        )}
        <button
          onClick={onToggle}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#9A8C98",
            display: "flex",
            padding: 2,
            borderRadius: 2,
            flexShrink: 0,
          }}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "8px 0" }}>
        {NAV.map(({ href, label, Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: collapsed ? "8px 0" : "8px 16px",
                justifyContent: collapsed ? "center" : "flex-start",
                textDecoration: "none",
                color: active ? colors.navy : "#9A8C98",
                background: active ? "#F5F2EF" : "transparent",
                fontFamily: "system-ui, sans-serif",
                fontSize: 12.5,
                fontWeight: active ? 500 : 400,
                transition: "color 0.1s, background 0.1s",
                whiteSpace: "nowrap",
                overflow: "hidden",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.color = colors.navy
                  e.currentTarget.style.background = "#FAFAFA"
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.color = "#9A8C98"
                  e.currentTarget.style.background = "transparent"
                }
              }}
            >
              <Icon size={14} style={{ minWidth: 14, flexShrink: 0 }} />
              {!collapsed && (
                <>
                  <span style={{ flex: 1 }}>{label}</span>
                  {active && (
                    <span
                      style={{
                        width: 2,
                        height: 14,
                        background: colors.rose,
                        flexShrink: 0,
                      }}
                    />
                  )}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div
        style={{
          borderTop: BORDER,
          padding: collapsed ? "10px 0" : "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          justifyContent: collapsed ? "center" : "flex-start",
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            minWidth: 26,
            border: BORDER,
            borderRadius: 3,
            background: "#F5F2EF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            fontWeight: 600,
            color: colors.indigo,
            fontFamily: "system-ui, sans-serif",
            flexShrink: 0,
          }}
        >
          JD
        </div>
        {!collapsed && (
          <div>
            <p
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: colors.navy,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              John Doe
            </p>
            <p
              style={{
                fontSize: 11,
                color: "#9A8C98",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Freelancer
            </p>
          </div>
        )}
      </div>
    </aside>
  )
}
