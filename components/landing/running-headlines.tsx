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
  const items = [...POINTS, ...POINTS, ...POINTS]
  const separators = ["#2bb6a8", "#7f66cc", "#d26f8f", "#d4943e"]

  return (
    <section className="relative overflow-hidden border-y border-gray-50 bg-white py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white to-transparent" />

      <motion.div
        className="flex w-max items-center gap-12"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        {items.map((point, idx) => (
          <div key={`${point}-${idx}`} className="flex items-center gap-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap text-[var(--color-navy)]/40">
              {point}
            </span>
            <span 
              className="h-1.5 w-1.5 rounded-full opacity-60" 
              style={{ backgroundColor: separators[idx % separators.length] }}
            />
          </div>
        ))}
      </motion.div>
    </section>
  )
}

export default RunningHeadlines
