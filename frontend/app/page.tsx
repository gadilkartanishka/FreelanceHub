"use client"

import { Button } from "@/components/ui/button"
import { ShaderBackground } from "@/components/ui/shaders-hero-section"
import { motion } from "framer-motion"
import { ArrowRight, Hourglass, MessagesSquare, UserRound } from "lucide-react"

const heroContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.28,
      delayChildren: 0.3,
    },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const featureRows = [
  {
    icon: UserRound,
    title: "Clients stay organized from day one",
    description:
      "Keep contact details, project notes, and working history together so every relationship feels easier to manage.",
  },
  {
    icon: Hourglass,
    title: "Projects and deadlines stay visible",
    description:
      "See what is active, what is coming up next, and where attention is needed before a timeline starts slipping.",
  },
  {
    icon: MessagesSquare,
    title: "Payments and conversations stay connected",
    description:
      "Track invoice status and client chat in the same workspace, so follow-ups happen with full context.",
  },
]

export default function Page() {
  return (
    <main className="bg-[var(--color-cream)] text-[var(--color-navy)]">
      <ShaderBackground>
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,34,59,0.18),rgba(34,34,59,0.56))]" />

          <div className="relative mx-auto flex min-h-[88vh] w-full max-w-7xl flex-col justify-center px-6 py-20 sm:px-10 lg:px-12">
            <motion.div
              variants={heroContainer}
              initial="hidden"
              animate="show"
              className="max-w-4xl"
            >
              <motion.div
                variants={heroItem}
                className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs tracking-[0.24em] text-[var(--color-cream)] uppercase backdrop-blur-sm"
              >
                FreelanceHub
              </motion.div>

              <motion.h1
                variants={heroItem}
                className="mt-6 max-w-4xl text-5xl leading-[0.95] font-medium tracking-tight text-white sm:text-6xl lg:text-7xl"
              >
                One place to manage clients, projects, payments, and conversations.
              </motion.h1>

              <motion.p
                variants={heroItem}
                className="mt-6 max-w-2xl text-lg leading-8 text-[rgba(242,233,228,0.84)]"
              >
                FreelanceHub helps freelancers run the business side of their work with more
                clarity, less context switching, and a calmer daily workflow.
              </motion.p>

              <motion.div variants={heroItem} className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="h-12 rounded-full bg-[var(--color-cream)] px-6 text-[var(--color-navy)] hover:bg-white"
                >
                  Start managing smarter
                  <ArrowRight className="size-4" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-full border-white/20 bg-white/8 px-6 text-white hover:bg-white/14 hover:text-white"
                >
                  Explore the workflow
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </ShaderBackground>

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
                Built for freelancers who want one calm system instead of five separate tools.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[rgba(34,34,59,0.74)]">
                FreelanceHub keeps the business side of freelance work simple, visible, and easy
                to follow every day.
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
    </main>
  )
}
