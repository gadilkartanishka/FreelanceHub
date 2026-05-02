"use client"

import { motion } from "framer-motion"

const POINTS = [
  "Centralize the Chaos",
  "Client Management",
  "Payment Tracking",
  "Deadline Visibility",
  "Professional Portals",
  "Contextual Chat",
  "Financial Health",
  "Proof of Work",
]

export function RunningHeadlines() {
  const items = [...POINTS, ...POINTS]

  return (
    <section className="relative overflow-hidden bg-[#f3f4f6] py-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[rgba(34,34,59,0.08)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[rgba(34,34,59,0.08)]" />

      <motion.div
        className="flex w-max items-center gap-6 pl-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        {items.map((point, idx) => (
          <div key={`${point}-${idx}`} className="flex items-center gap-6">
            <span className="text-sm font-medium tracking-[0.02em] text-[var(--color-deep-graphite)] sm:text-base">
              {point}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ocean-accent)]/55" />
          </div>
        ))}
      </motion.div>
    </section>
  )
}

export default RunningHeadlines
