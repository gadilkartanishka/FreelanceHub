"use client"

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { MotionValue } from "framer-motion"
import { useRef } from "react"

const STEPS = [
  {
    id: "01",
    label: "ACCESS",
    title: "Sign up or log in",
    body: "Create your workspace in minutes and jump straight into a single dashboard built for freelance operations.",
    chip: "Quick onboarding",
    side: "Signup + Login",
    accent: "#2bb6a8",
    textPanel: "#ffffff",
    visualPanel: "#e8f3f1",
    chipBg: "#eaf8f6",
    chipBorder: "#a9dcd6",
    watermark: "#cde7e3",
  },
  {
    id: "02",
    label: "ORGANIZE",
    title: "Add clients and projects",
    body: "Set up your client list, active projects, and key deadlines so your work pipeline stays structured from day one.",
    chip: "Structured workflow",
    side: "Clients + Projects",
    accent: "#7f66cc",
    textPanel: "#f7f3ff",
    visualPanel: "#ede7ff",
    chipBg: "#efe9ff",
    chipBorder: "#cfc0f8",
    watermark: "#dbd1fb",
  },
  {
    id: "03",
    label: "COLLABORATE",
    title: "Manage communication in one place",
    body: "Handle project conversations, updates, and client portal visibility without chasing context across different apps.",
    chip: "Message with context",
    side: "Messages + Portal",
    accent: "#d26f8f",
    textPanel: "#fff5f8",
    visualPanel: "#ffeaf1",
    chipBg: "#fff0f5",
    chipBorder: "#f3bfd0",
    watermark: "#f8d5e2",
  },
  {
    id: "04",
    label: "DELIVER",
    title: "Track payments and stay ahead",
    body: "Monitor invoices, received payments, and upcoming tasks in one view so you always know what needs attention next.",
    chip: "Revenue + deadlines",
    side: "Payments + Tasks",
    accent: "#d4943e",
    textPanel: "#ffffff",
    visualPanel: "#fff5dc",
    chipBg: "#fff9ea",
    chipBorder: "#f0ddb0",
    watermark: "#f7e6bd",
  },
]

function StepLayer({
  step,
  index,
  total,
  progress,
}: {
  step: (typeof STEPS)[number]
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
      : useTransform(
          progress,
          [0, enterStart, enterEnd, 1],
          ["100%", "100%", "0%", "0%"]
        )

  const scale =
    index === total - 1
      ? useTransform(progress, [0, 1], [1, 1])
      : useTransform(progress, [0, coverStart, coverEnd, 1], [1, 1, 0.95, 0.95])

  const opacity =
    index === total - 1
      ? useTransform(progress, [0, 1], [1, 1])
      : useTransform(
          progress,
          [0, coverStart, coverEnd, 1],
          [1, 1, 0.88, 0.88]
        )

  return (
    <motion.article
      style={{ y, scale, opacity, zIndex: index + 1 }}
      className="absolute inset-0 mx-auto grid min-h-[470px] w-full max-w-[1040px] grid-cols-1 overflow-hidden rounded-[44px] border border-[#e0e2e6] bg-[#f8fafc] shadow-[0_10px_24px_rgba(34,34,59,0.08)] md:grid-cols-2"
    >
      <div
        className={`flex flex-col justify-between gap-6 px-7 py-8 sm:px-10 sm:py-10 ${index % 2 === 1 ? "md:order-2 md:rounded-r-[44px]" : "md:rounded-l-[44px]"}`}
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="space-y-7">
          <p
            className="text-sm font-semibold tracking-[0.2em]"
            style={{ color: step.accent }}
          >
            — {step.id}, {step.label}
          </p>
          <h3 className="max-w-[16ch] text-3xl font-semibold leading-[1.1] text-[var(--color-slate-ink)] sm:text-4xl">
            {step.title}
          </h3>
          <p className="max-w-[34ch] text-base leading-[1.5] text-[var(--color-deep-graphite)]">
            {step.body}
          </p>
        </div>

        <span
          className="inline-flex w-fit items-center rounded-full border px-5 py-2.5 text-base font-semibold"
          style={{
            borderColor: step.chipBorder,
            backgroundColor: step.chipBg,
            color: step.accent,
          }}
        >
          {step.chip}
        </span>
      </div>

      <div
        className={`relative flex items-center justify-center overflow-hidden ${index % 2 === 1 ? "md:order-1 md:rounded-l-[44px]" : "md:rounded-r-[44px]"}`}
        style={{ backgroundColor: step.visualPanel }}
      >
        <span
          className="inline-flex items-center rounded-full border px-7 py-2.5 text-2xl font-semibold tracking-[0.08em]"
          style={{
            borderColor: step.chipBorder,
            backgroundColor: step.chipBg,
            color: step.accent,
          }}
        >
          {step.side}
        </span>
        <span
          className="pointer-events-none absolute -bottom-8 right-4 text-[180px] font-semibold leading-none"
          style={{ color: step.watermark }}
        >
          {step.id}
        </span>
      </div>
    </motion.article>
  )
}

export function HowItWorksSection() {
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
      ref={sectionRef}
      className="relative bg-[var(--color-white-canvas)]"
      style={{ height: `${STEPS.length * 92}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-[1120px]">
          <div className="relative min-h-[470px] overflow-hidden rounded-[44px]">
            {STEPS.map((step, index) => (
              <StepLayer
                key={step.id}
                step={step}
                index={index}
                total={STEPS.length}
                progress={smoothProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
