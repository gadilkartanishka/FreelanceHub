"use client"

import { motion } from "framer-motion"

const IMPACT_STATS = [
  {
    value: "4.2hrs",
    label: "saved per week on average",
    accent: "#2bb6a8",
  },
  {
    value: "3,800+",
    label: "freelancers organised",
    accent: "#7f66cc",
  },
  {
    value: "£2.1M+",
    label: "in payments tracked",
    accent: "#d26f8f",
  },
  {
    value: "98%",
    label: "deadlines met on time",
    accent: "#d4943e",
  },
]

export function ImpactSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-2 divide-y divide-gray-50 md:grid-cols-4 md:divide-x md:divide-y-0">
          {IMPACT_STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center py-12 px-4 text-center md:py-4"
            >
              <h2 
                className="text-4xl font-semibold tracking-tight sm:text-5xl"
                style={{ 
                  color: stat.accent,
                  fontFamily: "var(--font-heading)",
                }}
              >
                {stat.value}
              </h2>
              <p className="mt-2.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-navy)]/30">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImpactSection
