import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { colors } from "@/lib/colors"

export function BrandLogo({
  collapsed = false,
  href = "/",
  iconSize = 20,
  whiteIcon = false,
}: {
  collapsed?: boolean
  href?: string
  iconSize?: number
  whiteIcon?: boolean
}) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        textDecoration: "none",
      }}
      aria-label="FreelanceHub"
    >
      <Logo
        style={{ width: iconSize, height: iconSize, flexShrink: 0 }}
        className={whiteIcon ? "brightness-0 invert" : undefined}
      />
      {!collapsed && (
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
      )}
    </Link>
  )
}
