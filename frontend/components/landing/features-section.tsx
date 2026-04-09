"use client"

import { featureRows } from "@/components/landing/data"
import { motion } from "framer-motion"

export function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-cream),rgba(201,173,167,0.22))]">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(74,78,105,0.2),transparent)]" />

      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
        >
          <div className="max-w-xl">
            <p className="text-sm tracking-[0.22em] text-[var(--color-indigo)] uppercase">
              Features
            </p>
            <h2 className="mt-4 text-4xl leading-tight font-medium sm:text-5xl">
              The essentials you need, without the usual tool sprawl.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[rgba(34,34,59,0.74)]">
              Each part of the platform is meant to reduce friction, so staying organized takes
              less energy out of your day.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[320px] items-end overflow-hidden rounded-[2rem] border border-[rgba(74,78,105,0.14)] bg-[linear-gradient(135deg,var(--color-indigo),var(--color-navy))] p-6 shadow-[0_24px_80px_rgba(74,78,105,0.16)] sm:min-h-[360px] sm:p-8"
          >
            <div className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm tracking-[0.18em] text-[var(--color-cream)] uppercase backdrop-blur-sm">
              Workspace snapshot
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-14 space-y-5">
          {featureRows.map(({ icon: Icon, title, description }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.95,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col gap-5 rounded-[2rem] border border-[rgba(74,78,105,0.12)] bg-white/70 p-6 shadow-[0_18px_60px_rgba(74,78,105,0.08)] backdrop-blur-sm sm:flex-row sm:items-start sm:justify-between sm:p-7"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-navy)] text-[var(--color-cream)]">
                  <Icon className="size-5" />
                </div>
                <div className="max-w-2xl">
                  <h3 className="text-2xl font-medium">{title}</h3>
                  <p className="mt-3 text-base leading-7 text-[rgba(34,34,59,0.74)]">
                    {description}
                  </p>
                </div>
              </div>
              <div className="h-px w-full bg-[linear-gradient(90deg,rgba(74,78,105,0.16),transparent)] sm:hidden" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
