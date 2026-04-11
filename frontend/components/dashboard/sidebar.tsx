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
import { Logo } from "@/components/ui/logo"

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
        width: collapsed ? 52 : 240,
        minWidth: collapsed ? 52 : 240,
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
          padding: "0 16px",
          borderBottom: BORDER,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          width: "100%",
        }}
      >
        {collapsed ? (
          <Logo style={{ width: 20, height: 20, flexShrink: 0 }} />
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Logo style={{ width: 20, height: 20, flexShrink: 0 }} />
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
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: "8px 0",
          display: "flex",
          flexDirection: "column",
        }}
      >
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

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          style={{
            marginTop: "auto",
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: collapsed ? "8px 0" : "8px 16px",
            justifyContent: collapsed ? "center" : "flex-start",
            background: "none",
            border: "none",
            borderTop: BORDER,
            cursor: "pointer",
            color: "#9A8C98",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors.navy
            e.currentTarget.style.background = "#FAFAFA"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#9A8C98"
            e.currentTarget.style.background = "transparent"
          }}
        >
          {collapsed ? (
            <ChevronRight size={14} />
          ) : (
            <>
              <ChevronLeft size={14} />
              <span
                style={{
                  fontSize: 12.5,
                  fontFamily: "system-ui, sans-serif",
                  color: "#9A8C98",
                }}
              >
                Collapse
              </span>
            </>
          )}
        </button>
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
