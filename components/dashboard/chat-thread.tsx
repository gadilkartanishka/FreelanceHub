"use client"

import { colors } from "@/lib/colors"

interface ChatThreadProps {
  name: string
  lastMessage: string
  time: string
  active?: boolean
  onClick?: () => void
}

const BORDER_LIGHT = "1px solid #F5F2EF"

export function ChatThread({
  name,
  lastMessage,
  time,
  active,
  onClick,
}: ChatThreadProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "16px 20px",
        background: active ? "#F5F2EF" : "transparent",
        border: "none",
        borderBottom: BORDER_LIGHT,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        transition: "background 0.1s",
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.background = "#FAFAFA"
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = "transparent"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: colors.navy,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontSize: 11,
            color: "#9A8C98",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {time}
        </span>
      </div>
      <p
        style={{
          fontSize: 12,
          color: "#9A8C98",
          margin: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {lastMessage}
      </p>
    </button>
  )
}
