"use client"

import { motion } from "framer-motion"

export function BuiltForSection() {
  const audiences = [
    {
      label: "01",
      title: "Designers",
      description: "Track briefs, milestones and final invoices per client.",
    },
    {
      label: "02",
      title: "Developers",
      description: "Manage retainers, sprint deadlines and partial payments.",
    },
    {
      label: "03",
      title: "Writers",
      description: "Keep drafts, deadlines and per-piece payments organised.",
    },
    {
      label: "04",
      title: "Consultants",
      description: "Hourly engagements, deliverables and a clean client portal.",
    },
  ]

  return (
    <section className="relative overflow-hidden py-28">
      <div className="orb-soft absolute -left-20 top-10 -z-10 h-56 w-56 animate-float opacity-70" />
      <div className="orb-soft absolute -right-24 bottom-10 -z-10 h-72 w-72 animate-float-slow opacity-60" />

      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-[11px] font-medium text-ink-soft">
              Built for independents
            </span>
            <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
              Made for the way you actually work.
            </h2>
            <p className="mt-4 max-w-md text-ink-soft">
              Whether you juggle three retainers or twenty one-off briefs, FreelanceHub bends to
              your workflow - not the other way around.
            </p>

            <div className="mt-8 max-w-[700px] overflow-hidden rounded-[1.25rem] border border-[#d9dfec]">
              <div className="grid gap-px bg-[#d9dfec] sm:grid-cols-2">
                {audiences.map((audience, index) => (
                  <motion.article
                    key={audience.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="group isolate relative min-h-[150px] overflow-hidden bg-white p-4 transition-all duration-700 ease-out hover:-translate-y-1 hover:bg-[var(--color-navy)] hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] sm:min-h-[165px] sm:p-5"
                  >
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-white/80 transition-transform duration-700 ease-out group-hover:scale-x-100" />
                    <div className="flex items-start justify-between">
                      <p className="text-[8px] font-semibold tracking-[0.16em] text-[#5c7192] transition-colors duration-700 ease-out group-hover:text-white/60">
                        {audience.label}
                      </p>
                      <span className="mt-1 h-px w-9 bg-[#cfd8e8] transition-all duration-700 ease-out group-hover:w-14 group-hover:bg-white/55" />
                    </div>

                    <h3 className="mt-5 text-[1.65rem] font-normal leading-none tracking-tight text-[#0f172a] transition-all duration-700 ease-out group-hover:-translate-y-0.5 group-hover:text-white">
                      {audience.title}
                    </h3>
                    <p className="mt-2 max-w-[30ch] text-[13.5px] leading-[1.4] text-[#5a6f8e] transition-colors duration-700 ease-out group-hover:text-white/70">
                      {audience.description}
                    </p>
                    <span className="pointer-events-none absolute bottom-4 right-4 text-base text-white/0 transition-all duration-700 ease-out group-hover:translate-x-0.5 group-hover:text-white/60">
                      →
                    </span>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[460px]"
          >
            <div className="absolute inset-0 grid place-items-center">
              <div className="orb absolute h-72 w-72 animate-pulse-soft opacity-50 blur-2xl" />
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="tilt-card absolute left-4 top-4 w-[78%] rounded-3xl border border-border bg-white p-5 shadow-3d"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">Active project</p>
              <p className="mt-1 text-base font-semibold text-ink">Brand identity · Northwind Co.</p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="rounded-full bg-amber-100 px-2.5 py-1 font-medium text-amber-700">
                  In review
                </span>
                <span className="text-ink-soft">Due May 14</span>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-cloud">
                <div className="h-full w-[68%] bg-gradient-accent" />
              </div>
              <div className="mt-3 flex justify-between text-[11px] text-ink-soft">
                <span>$3,200 of $4,800 received</span>
                <span>68%</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="tilt-card-r absolute right-2 top-40 w-[70%] rounded-3xl border border-border bg-white p-5 shadow-3d"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">Payment received</p>
              <div className="mt-2 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                  ✓
                </div>
                <div>
                  <p className="text-base font-semibold text-ink">$1,200.00</p>
                  <p className="text-xs text-ink-soft">Bank transfer · Acme Studio</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              className="tilt-card absolute bottom-2 left-10 w-[68%] rounded-3xl border border-border bg-white p-4 shadow-3d"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse-soft rounded-full bg-emerald-500" />
                <p className="text-xs font-medium text-ink">Client message</p>
              </div>
              <p className="mt-2 text-sm text-ink">"Loving the third option - let's go with that one!"</p>
              <p className="mt-2 text-[11px] text-ink-soft">Maya · 2 minutes ago</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const quotes = [
  {
    quote:
      "I was running my whole business on a spreadsheet and 11 WhatsApp threads. FreelanceHub made the chaos disappear in an afternoon.",
    name: "Priya R.",
    role: "Brand designer",
  },
  {
    quote:
      "The payment ledger alone is worth it. I finally know who owes me what — without scrolling through screenshots.",
    name: "Marcus L.",
    role: "Full-stack developer",
  },
  {
    quote:
      "My clients love the portal. It makes me look ten times more professional than emailing PDFs back and forth.",
    name: "Sara N.",
    role: "Copywriter",
  },
]

export function TestimonialsSection() {
  return (
    <section className="relative bg-cloud/40 py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-[11px] font-medium text-ink-soft">
            Loved by freelancers
          </span>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">Calm replaces chaos.</h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-3xl border border-border bg-white p-7 shadow-soft ${
                i === 1 ? "md:-translate-y-4" : ""
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-lavender-deep" fill="currentColor">
                <path d="M7 7c-2.2 0-4 1.8-4 4v6h6v-6H6c0-2.2 1.8-4 4-4V7H7zm10 0c-2.2 0-4 1.8-4 4v6h6v-6h-3c0-2.2 1.8-4 4-4V7h-3z" />
              </svg>
              <blockquote className="mt-4 text-[15px] leading-relaxed text-ink">"{q.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <span className="orb-soft h-9 w-9 animate-drift-x" />
                <div>
                  <p className="text-sm font-semibold text-ink">{q.name}</p>
                  <p className="text-xs text-ink-soft">{q.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export function GradientCtaSection() {
  return (
    <section id="referrals" className="relative px-6 py-28 sm:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-border bg-gradient-hero p-12 text-center shadow-3d sm:p-20"
      >
        <div className="orb absolute -left-16 -top-16 h-56 w-56 animate-float opacity-80" />
        <div className="orb-soft absolute -right-20 -bottom-20 h-64 w-64 animate-spin-slow opacity-90" />
        <div className="absolute inset-0 bg-grid mask-fade-edges opacity-30" />
        <div className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/2 rotate-[20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />

        <div className="relative">
          <span className="inline-flex items-center rounded-full border border-white/40 bg-white/20 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md">
            Built for independent operators
          </span>
          <h2 className="mt-5 font-display text-4xl text-white sm:text-6xl">
            Stop leaving productivity behind.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/85">
            Join 3,800+ freelancers who replaced five tools with one calm workspace.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-ink shadow-float transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-[#2563eb] hover:via-[#7c3aed] hover:to-[#ec4899] hover:text-white hover:shadow-[0_12px_34px_rgba(124,58,237,0.45)]"
            >
              Create a free account
              <span aria-hidden>→</span>
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-r hover:from-[#2563eb] hover:via-[#7c3aed] hover:to-[#ec4899] hover:text-white hover:shadow-[0_12px_34px_rgba(124,58,237,0.45)]"
            >
              See pricing
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export function NewFooterSection() {
  return (
    <footer className="border-t border-border bg-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-accent text-white">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M4 7l8-4 8 4-8 4-8-4z" />
                <path d="M4 12l8 4 8-4" />
                <path d="M4 17l8 4 8-4" />
              </svg>
            </span>
            <span className="text-sm font-semibold tracking-tight text-ink">FreelanceHub</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-ink-soft">
            The all-in-one post-hiring workspace for freelancers — without the chaos of juggling
            multiple tools.
          </p>
        </div>

        {[
          { title: "Product", links: ["How it works", "Features", "Pricing", "Client portal"] },
          { title: "Company", links: ["About", "Blog", "Contact", "Careers"] },
          { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
        ].map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{col.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-ink transition hover:text-lavender-deep">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-ink-soft sm:flex-row sm:px-10">
          <p>© 2026 FreelanceHub. Built for focused freelancers.</p>
          <p>Made with calm, in one tab.</p>
        </div>
      </div>
    </footer>
  )
}
