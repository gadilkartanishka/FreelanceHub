"use client"

import { useState } from "react"

const features = [
  {
    title: "Client workspace",
    body: "One profile per client with projects, payments, notes and chat — never lose context again.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
      </svg>
    ),
  },
  {
    title: "Project tracking",
    body: "Statuses, deadlines, agreed values and briefs — sorted by what's most urgent.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M7 9h10M7 13h7M7 17h5" />
      </svg>
    ),
  },
  {
    title: "Payment ledger",
    body: "Log partial and full payments. Upload proofs. Always know exactly who still owes you.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
        <rect x="2" y="6" width="20" height="13" rx="2.5" />
        <path d="M2 11h20M6 16h4" />
      </svg>
    ),
  },
  {
    title: "Client portal",
    body: "Magic-link invites give clients a clean, read-only view of their projects and payments.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
        <path d="M3 12h12M11 6l6 6-6 6" />
        <path d="M21 4v16" />
      </svg>
    ),
  },
  {
    title: "In-app chat",
    body: "Threaded conversations scoped to each project. Files, context and decisions in one place.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
        <path d="M4 5h16v11H8l-4 4z" />
      </svg>
    ),
  },
  {
    title: "Smart dashboard",
    body: "Earnings, pending amounts and overdue tasks at a glance — with alerts that matter.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
        <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
      </svg>
    ),
  },
]

const tiers = [
  {
    name: "Starter",
    price: "Free",
    sub: "Forever",
    desc: "For freelancers just getting organised.",
    features: ["Up to 3 clients", "Unlimited projects", "Manual payment tracking", "Client portal"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$12",
    sub: "/ month",
    desc: "For working freelancers running 5+ active projects.",
    features: [
      "Unlimited clients",
      "Payment proofs & files",
      "In-app chat per project",
      "Email reminders",
      "Priority support",
    ],
    cta: "Start 14-day trial",
    highlight: true,
  },
  {
    name: "Studio",
    price: "$29",
    sub: "/ month",
    desc: "For boutique studios with multiple collaborators.",
    features: ["Everything in Pro", "Up to 5 collaborators", "Custom branding", "Invoice exports", "API access"],
    cta: "Talk to us",
    highlight: false,
  },
]

const faqs = [
  {
    q: "Is there really a free tier?",
    a: "Yes — Starter is free forever and supports up to 3 active clients. Perfect for freelancers just starting out.",
  },
  {
    q: "Can clients see my other clients or earnings?",
    a: "Never. The client portal is read-only and scoped to a single client. They only see their own projects, payment status and chat.",
  },
  {
    q: "Do you process payments?",
    a: "Not in the MVP. FreelanceHub is a payment ledger — you log payments manually with optional proof uploads. Online payments via Stripe are on the roadmap.",
  },
  {
    q: "Can I import my existing client list?",
    a: "Yes, you can import clients via CSV. Most freelancers get fully migrated in under 10 minutes.",
  },
  {
    q: "Is my data secure?",
    a: "All data is isolated per workspace via row-level security. Payment proof files live in private buckets with short-lived signed URLs.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Plans are month-to-month. Cancel from settings — no calls, no emails required.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative bg-cloud/40 py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-[11px] font-medium text-ink-soft">
              Everything in one place
            </span>
            <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
              The tools you'd cobble together — finally combined.
            </h2>
          </div>
          <p className="max-w-md text-ink-soft">
            No more spreadsheets, scattered chats, screenshots in your gallery, or invoice files lost
            in email. Just one calm workspace.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-float"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-accent text-white shadow-soft">
                  {f.icon}
                </span>
                <h3 className="text-base font-semibold text-ink">{f.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{f.body}</p>
              <div className="orb-soft pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 opacity-0 transition group-hover:opacity-60" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-28 bg-paper">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-[11px] font-medium text-ink-soft">
            Pricing
          </span>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
            Simple plans. No surprises.
          </h2>
          <p className="mt-3 text-ink-soft">Start free. Upgrade when your client list grows.</p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-3xl border p-7 transition ${
                t.highlight
                  ? "border-[#7f89db] bg-[linear-gradient(180deg,#7f89db_0%,#6674cc_100%)] text-white shadow-3d"
                  : "border-border bg-white text-ink shadow-soft hover:-translate-y-1 hover:shadow-float"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-float">
                  Most popular
                </span>
              )}
              <p className={`text-sm font-semibold ${t.highlight ? "text-white/80" : "text-ink-soft"}`}>
                {t.name}
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl">{t.price}</span>
                <span className={`text-sm ${t.highlight ? "text-white/70" : "text-ink-soft"}`}>{t.sub}</span>
              </div>
              <p className={`mt-2 text-sm ${t.highlight ? "text-white/75" : "text-ink-soft"}`}>{t.desc}</p>

              <ul className="mt-6 space-y-2.5 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span
                      className={`mt-0.5 grid h-4 w-4 place-items-center rounded-full ${
                        t.highlight ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12l5 5 9-11" />
                      </svg>
                    </span>
                    <span className={t.highlight ? "text-white/90" : "text-ink"}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition ${
                  t.highlight
                    ? "bg-white text-ink hover:opacity-90"
                    : "bg-ink text-white hover:opacity-90"
                }`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative bg-cloud/40 py-28">
      <div className="mx-auto max-w-3xl px-6 sm:px-10">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-[11px] font-medium text-ink-soft">
            FAQ
          </span>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
            Questions, answered.
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div
                key={f.q}
                className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-ink">{f.q}</span>
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cloud text-ink transition ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-border px-5 py-4 text-sm leading-relaxed text-ink-soft">
                    {f.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
