"use client"

import { useRef, useState } from "react"
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion"

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

function FeatureLayer({
  feature,
  index,
  total,
  progress,
}: {
  feature: (typeof features)[number]
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const enterStart = Math.max(0, (index - 1) / total)
  const enterEnd = index / total
  const coverStart = index / total
  const coverEnd = Math.min(1, (index + 1) / total)

  const y =
    index === 0
      ? useTransform(progress, [0, 1], ["0%", "0%"])
      : useTransform(progress, [0, enterStart, enterEnd, 1], ["100%", "100%", "0%", "0%"])

  const scale =
    index === total - 1
      ? useTransform(progress, [0, 1], [1, 1])
      : useTransform(progress, [0, coverStart, coverEnd, 1], [1, 1, 0.95, 0.95])

  const opacity =
    index === total - 1
      ? useTransform(progress, [0, 1], [1, 1])
      : useTransform(progress, [0, coverStart, coverEnd, 1], [1, 1, 0.88, 0.88])

  const featureId = String(index + 1).padStart(2, "0")
  const ringLayouts = [
    { x: "-28%", y: "-18%", size: "140%" },
    { x: "58%", y: "-26%", size: "118%" },
    { x: "-24%", y: "44%", size: "124%" },
    { x: "60%", y: "38%", size: "132%" },
    { x: "8%", y: "-34%", size: "128%" },
    { x: "44%", y: "-8%", size: "128%" },
  ]
  const ring = ringLayouts[index % ringLayouts.length]
  const ringColor = "111, 123, 210"
  const isSixthCard = index % ringLayouts.length === 5

  return (
    <motion.article
      style={{ y, scale, opacity, zIndex: index + 1 }}
      className="absolute inset-0 mx-auto grid min-h-[470px] w-full max-w-[1040px] grid-cols-1 overflow-hidden rounded-[44px] border border-[#dfe4f3] bg-[#f8f9fd] shadow-[0_10px_24px_rgba(34,34,59,0.08)] md:grid-cols-2"
    >
      <div
        className={`flex flex-col justify-between gap-6 px-7 py-8 sm:px-10 sm:py-10 ${index % 2 === 1 ? "md:order-2 md:rounded-r-[44px]" : "md:rounded-l-[44px]"}`}
      >
        <div className="space-y-7">
          <p className="text-sm font-semibold tracking-[0.2em] text-[#6f7bd2]">
            - {featureId}, FEATURE
          </p>
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-accent text-white shadow-soft">
            {feature.icon}
          </div>
          <h3 className="max-w-[16ch] text-3xl font-semibold leading-[1.1] text-[#22223b] sm:text-4xl">
            {feature.title}
          </h3>
          <p className="max-w-[34ch] text-base leading-[1.5] text-[#5a6274]">
            {feature.body}
          </p>
        </div>

        <span className="inline-flex w-fit items-center rounded-full border border-[#cdd4f4] bg-[#f0f3ff] px-5 py-2.5 text-base font-semibold text-[#6f7bd2]">
          FreelanceHub feature
        </span>
      </div>

      <div
        className={`relative flex items-center justify-center overflow-hidden ${index % 2 === 1 ? "md:order-1 md:rounded-l-[44px]" : "md:rounded-r-[44px]"}`}
        style={{ backgroundColor: "#edf0fb" }}
      >
        <div
          className={`pointer-events-none absolute rounded-full ${isSixthCard ? "opacity-90" : "opacity-75"}`}
          style={{
            left: ring.x,
            top: ring.y,
            width: ring.size,
            height: ring.size,
            backgroundImage:
              `repeating-radial-gradient(circle, rgba(${ringColor},0.24) 0 2px, rgba(${ringColor},0) 2px 15px)`,
          }}
        />
        <div
          className={`pointer-events-none absolute rounded-full ${isSixthCard ? "opacity-55" : "opacity-45"}`}
          style={{
            left: `calc(${ring.x} + 10%)`,
            top: `calc(${ring.y} + 8%)`,
            width: "82%",
            height: "82%",
            backgroundImage:
              `repeating-radial-gradient(circle, rgba(${ringColor},0.2) 0 1.5px, rgba(${ringColor},0) 1.5px 12px)`,
          }}
        />
        <span className="pointer-events-none absolute -bottom-8 right-4 text-[180px] font-semibold leading-none text-[#d6ddf8]">
          {featureId}
        </span>
      </div>
    </motion.article>
  )
}

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.35,
  })

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative bg-[#f8f9fd]"
      style={{ height: `${features.length * 92}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-[1120px]">
          <div className="relative min-h-[470px] overflow-hidden rounded-[44px]">
            {features.map((feature, index) => (
              <FeatureLayer
                key={feature.title}
                feature={feature}
                index={index}
                total={features.length}
                progress={smoothProgress}
              />
            ))}
          </div>
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
          {tiers.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.01 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
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
              {t.highlight && (
                <span className="pointer-events-none absolute inset-0 rounded-3xl border border-white/30 animate-glow" />
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
                className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-[#2563eb] hover:via-[#7c3aed] hover:to-[#ec4899] hover:text-white hover:shadow-[0_12px_34px_rgba(124,58,237,0.45)] ${
                  t.highlight
                    ? "bg-white text-ink"
                    : "bg-ink text-white"
                }`}
              >
                {t.cta}
              </a>
            </motion.div>
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
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
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
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border px-5 py-4 text-sm leading-relaxed text-ink-soft">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
