"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { KeyRound, FolderKanban, MessagesSquare, Receipt } from "lucide-react"

type Step = {
  icon: typeof KeyRound
  index: string
  kicker: string
  title: string
  body: string
}

const steps: Step[] = [
  {
    icon: KeyRound,
    index: "01",
    kicker: "Access",
    title: "Sign up or log in",
    body: "Create your workspace and land in a freelance-ops dashboard.",
  },
  {
    icon: FolderKanban,
    index: "02",
    kicker: "Organize",
    title: "Add clients and projects",
    body: "Set up clients, active projects, and deadlines in one structure.",
  },
  {
    icon: MessagesSquare,
    index: "03",
    kicker: "Collaborate",
    title: "Manage communication in one place",
    body: "Handle project conversations and client portal visibility without context switching.",
  },
  {
    icon: Receipt,
    index: "04",
    kicker: "Deliver",
    title: "Track payments and stay ahead",
    body: "Monitor invoices, received payments, and upcoming tasks from one view.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-[#f8f9fd] px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center font-display text-3xl leading-tight text-[#22223b] sm:text-4xl lg:text-5xl"
        >
          How it works
        </motion.h2>

        <StepRail />
      </div>
    </section>
  )
}

function StepRail() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  })
  const railHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div ref={ref} className="relative mt-16">
      <div aria-hidden className="absolute left-4 top-0 hidden h-full w-px -translate-x-1/2 bg-[#d7dced] md:block lg:left-1/2" />
      <motion.div
        aria-hidden
        className="absolute left-4 top-0 hidden w-px -translate-x-1/2 origin-top bg-[#6f7bd2] md:block lg:left-1/2"
        style={{ height: railHeight }}
      />

      <div className="space-y-20 md:space-y-24">
        {steps.map((s, i) => (
          <StepRow key={s.title} step={s} index={i} />
        ))}
      </div>
    </div>
  )
}

function StepRow({ step, index }: { step: Step; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 85%", "end 30%"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [56, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [0, 1, 1, 0.6])
  const dot = useTransform(scrollYProgress, [0, 0.4, 1], [0.4, 1, 1])

  const Icon = step.icon
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={rowRef}
      style={{ opacity }}
      className="relative min-h-[150px] pl-12 md:min-h-[170px] md:pl-0"
    >
      <div className="absolute left-4 top-1 md:left-1/2 md:-translate-x-1/2">
        <motion.div
          style={{ scale: dot }}
          className="relative z-10 grid h-8 w-8 place-items-center rounded-full text-[9px] font-medium tracking-[0.12em] text-white"
        >
          <span
            className="absolute inset-0 rounded-full bg-[#6f7bd2]"
            style={{
              boxShadow: "0 8px 18px -10px rgba(111,123,210,0.75), inset 0 1px 0 rgba(255,255,255,0.35)",
            }}
          />
          <span className="relative">{step.index}</span>
        </motion.div>
      </div>

      <motion.div
        style={{ y }}
        className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? "md:mr-auto md:pr-14 md:text-right" : "md:ml-auto md:pl-14 md:text-left"}`}
      >
        <div className={`${isLeft ? "md:ml-auto" : ""} max-w-xl`}>
          <div className={`flex items-center gap-3 ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
            <Icon className="h-4 w-4 text-[#6f7bd2]" strokeWidth={1.6} />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#5a6274]">
              {step.index} - {step.kicker}
            </span>
          </div>
          <h3 className="font-display mt-3 text-2xl leading-[1.1] text-[#22223b] md:text-3xl">{step.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-[#5a6274] md:text-[15px]">{step.body}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default HowItWorksSection
