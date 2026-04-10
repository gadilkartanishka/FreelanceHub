"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CreditCard,
  MessageSquare,
  Settings,
  ChevronLeft,
} from "lucide-react"
import { colors } from "@/lib/colors"

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", Icon: LayoutDashboard },
  { href: "/dashboard/clients", label: "Clients", Icon: Users },
  { href: "/dashboard/projects", label: "Projects", Icon: FolderKanban },
  { href: "/dashboard/payments", label: "Payments", Icon: CreditCard },
  { href: "/dashboard/messages", label: "Messages", Icon: MessageSquare },
]

const BOTTOM_ITEMS = [
  { href: "/dashboard/settings", label: "Settings", Icon: Settings },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      style={{
        width: collapsed ? 64 : 220,
        minWidth: collapsed ? 64 : 220,
        background: colors.navy,
        color: colors.cream,
        transition: "width 0.22s ease, min-width 0.22s ease",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRight: `1px solid ${colors.indigo}`,
      }}
    >
      {/* Logo + toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "18px 0" : "18px 16px",
          borderBottom: `1px solid ${colors.indigo}`,
        }}
      >
        {!collapsed && (
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: colors.cream,
              whiteSpace: "nowrap",
            }}
          >
            FreelanceHub
          </span>
        )}

        <button
          onClick={onToggle}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          style={{
            display: "flex",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            borderRadius: 6,
            color: colors.mauve,
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = colors.cream)}
          onMouseLeave={(e) => (e.currentTarget.style.color = colors.mauve)}
        >
          <ChevronLeft
            size={16}
            style={{
              transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.22s ease",
            }}
          />
        </button>
      </div>

      {/* Nav items */}
      <nav
        style={{
          flex: 1,
          padding: "10px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const active = pathname === href
          return (
            <NavItem
              key={href}
              href={href}
              label={label}
              Icon={Icon}
              active={active}
              collapsed={collapsed}
            />
          )
        })}
      </nav>

      {/* Bottom items */}
      <div
        style={{
          padding: "10px 8px",
          borderTop: `1px solid ${colors.indigo}`,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {BOTTOM_ITEMS.map(({ href, label, Icon }) => {
          const active = pathname === href
          return (
            <NavItem
              key={href}
              href={href}
              label={label}
              Icon={Icon}
              active={active}
              collapsed={collapsed}
            />
          )
        })}

        {/* User pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: collapsed ? "8px 0" : "8px 10px",
            marginTop: 4,
            borderRadius: 8,
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              minWidth: 28,
              borderRadius: "50%",
              background: colors.mauve,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              fontWeight: 600,
              color: colors.navy,
            }}
          >
            JD
          </div>
          {!collapsed && (
            <div style={{ overflow: "hidden" }}>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: colors.cream,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                John Doe
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: colors.mauve,
                  whiteSpace: "nowrap",
                }}
              >
                Freelancer
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

function NavItem({
  href,
  label,
  Icon,
  active,
  collapsed,
}: {
  href: string
  label: string
  Icon: React.ElementType
  active: boolean
  collapsed: boolean
}) {
  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: collapsed ? "9px 0" : "9px 10px",
        borderRadius: 8,
        textDecoration: "none",
        justifyContent: collapsed ? "center" : "flex-start",
        background: active ? colors.indigo : "transparent",
        color: active ? colors.cream : colors.mauve,
        fontWeight: active ? 500 : 400,
        fontSize: 13,
        transition: "background 0.12s, color 0.12s",
        whiteSpace: "nowrap",
        overflow: "hidden",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = colors.indigo + "55"
          e.currentTarget.style.color = colors.cream
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = "transparent"
          e.currentTarget.style.color = colors.mauve
        }
      }}
    >
      <Icon size={16} style={{ minWidth: 16 }} />
      {!collapsed && <span>{label}</span>}
    </Link>
  )
}
