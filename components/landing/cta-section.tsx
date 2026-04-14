"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-cream),rgba(201,173,167,0.2))]">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(74,78,105,0.14),transparent)]" />

      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[2.5rem] border border-[rgba(74,78,105,0.14)] bg-[rgba(255,255,255,0.78)] px-8 py-10 text-[var(--color-navy)] shadow-[0_28px_100px_rgba(74,78,105,0.12)] backdrop-blur-sm sm:px-10 lg:px-14 lg:py-14"
        >
          <div className="max-w-4xl">
            <div className="max-w-3xl">
              <p className="text-sm tracking-[0.22em] text-[var(--color-indigo)] uppercase">
                Get started
              </p>
              <h2 className="mt-4 text-4xl leading-tight font-medium sm:text-5xl">
                Spend less time managing freelance admin and more time doing the work.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[rgba(34,34,59,0.74)]">
                FreelanceHub helps you stay organized from the first client conversation to the
                final payment follow-up.
              </p>
              
              <div className="mt-8">
                <Link href="/login">
                <Button
                  size="lg"
                  className="h-12 rounded-full bg-[var(--color-navy)] px-6 text-[var(--color-cream)] hover:bg-[var(--color-indigo)]"
                >
                  Get Started
                  <ArrowRight className="size-4" />
                </Button>
                </Link>
                </div>
                
              
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
