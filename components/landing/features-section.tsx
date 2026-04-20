"use client"

import { featureRows } from "@/components/landing/data"
import { motion } from "framer-motion"

export function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fafc,rgba(226,232,240,0.72))]">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(74,78,105,0.2),transparent)]" />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
        >
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.22em] text-[var(--color-indigo)] uppercase">
              Features
            </p>
            <h2 className="mt-4 text-3xl leading-tight font-medium sm:text-4xl">
              The essentials you need, without the usual tool sprawl.
            </h2>
            <p className="mt-5 text-base leading-7 text-[rgba(34,34,59,0.74)]">
              Each part of the platform is meant to reduce friction, so staying organized takes
              less energy out of your day.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 22 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-[rgba(34,34,59,0.1)] bg-[linear-gradient(180deg,#f8fafc,#eef2f7)] p-3 shadow-[0_32px_90px_-20px_rgba(15,23,42,0.15)] transition-all duration-500 hover:shadow-[0_40px_100px_-20px_rgba(15,23,42,0.2)] lg:aspect-[16/9]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(143,45,86,0.05),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] border border-[rgba(148,163,184,0.22)] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <img
                src="/workspace-snapshot.png"
                alt="FreelanceHub Dashboard"
                className="h-full w-full object-contain object-center"
              />
            </div>
            <div className="absolute top-6 left-6 inline-flex rounded-full border border-white/20 bg-black/10 px-4 py-1.5 text-[10px] font-medium tracking-[0.18em] text-white uppercase backdrop-blur-md">
              Live Workspace
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-12 space-y-4">
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
              className="flex flex-col gap-4 rounded-[1.5rem] border border-[rgba(74,78,105,0.12)] bg-white/76 p-5 shadow-[0_18px_60px_rgba(74,78,105,0.08)] backdrop-blur-sm sm:flex-row sm:items-start sm:justify-between sm:p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-navy)] text-[var(--color-cream)]">
                  <Icon className="size-4.5" />
                </div>
                <div className="max-w-2xl">
                  <h3 className="text-xl font-medium sm:text-[1.35rem]">{title}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-[rgba(34,34,59,0.74)] sm:text-[15px]">
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
