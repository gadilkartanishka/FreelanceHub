"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const cards = [
  {
    id: "01",
    title: "Client work, zero clutter.",
    body: "Keep every client, brief, and scope in one place.",
    tone: "bg-[linear-gradient(165deg,#edf4ff,#e9eef6)]",
    span: "md:col-span-1",
  },
  {
    id: "02",
    title: "Revenue that stays visible.",
    body: "Track paid, pending, and overdue amounts live.",
    tone: "bg-[linear-gradient(165deg,#54a8ff,#a8ccf2)] text-white",
    span: "md:col-span-1",
  },
  {
    id: "03",
    title: "Live payment pulse.",
    body: "One number to know exactly what moved today.",
    tone: "bg-[linear-gradient(165deg,#eaf0ff,#f4f6fb)]",
    span: "md:col-span-1",
  },
  {
    id: "04",
    title: "Every session captured.",
    body: "Messages and updates logged with project context.",
    tone: "bg-[linear-gradient(165deg,#e9f0fb,#f1f4f9)]",
    span: "md:col-span-1",
  },
  {
    id: "05",
    title: "Forecast what’s next.",
    body: "Deadlines and payouts, visible before they become stress.",
    tone: "bg-[linear-gradient(165deg,#eef3fc,#f4f7fc)]",
    span: "md:col-span-1",
  },
]

export function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-wide text-[#2563eb]">Platform</p>
            <h2 className="mt-3 text-4xl font-medium leading-tight text-[#22223B] sm:text-5xl">
              Everything in one <span className="text-[#2563eb]">workspace</span>
            </h2>
            <p className="mt-4 text-xl leading-8 text-[#64748b]">
              Run clients, projects, communication, and payments from a single operating layer.
            </p>
          </div>

          <Link href="/signup">
            <Button className="h-12 rounded-full bg-[#22223B] px-7 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-[#2563eb] hover:via-[#7c3aed] hover:to-[#ec4899] hover:text-white hover:shadow-[0_12px_34px_rgba(124,58,237,0.45)]">
              Create a free account
              <ArrowRight className="ml-1 size-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map((card, idx) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`${card.span} min-h-[270px] rounded-[28px] border border-[#e8edf5] p-7 ${card.tone}`}
            >
              <p className="text-[28px] font-semibold tracking-tight text-inherit/80">[{card.id}]</p>
              <div className="mt-12">
                <h3 className="text-3xl font-medium leading-tight text-inherit">{card.title}</h3>
                <p className="mt-4 text-xl leading-8 text-inherit/70">{card.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
