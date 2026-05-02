"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(242,233,228,0.7),rgba(201,173,167,0.28))]">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(74,78,105,0.14),transparent)]" />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[2rem] border border-[rgba(74,78,105,0.14)] bg-[rgba(255,255,255,0.82)] px-8 py-9 text-[var(--color-navy)] shadow-[0_28px_100px_rgba(74,78,105,0.12)] backdrop-blur-sm sm:px-10 lg:px-12 lg:py-11"
        >
          <div className="max-w-4xl">
            <div className="max-w-3xl">
              <p className="text-xs tracking-[0.22em] text-[var(--color-indigo)] uppercase">
                Get started
              </p>
              <h2 className="mt-4 text-3xl leading-tight font-medium sm:text-4xl">
                Start with a workspace that already fits the way you work.
              </h2>
              
              <div className="mt-8">
                <Link href="/login">
                <Button
                  size="lg"
                  className="h-12 rounded-full bg-[var(--color-navy)] px-6 text-[var(--color-cream)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-[#2563eb] hover:via-[#7c3aed] hover:to-[#ec4899] hover:text-white hover:shadow-[0_12px_34px_rgba(124,58,237,0.45)]"
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
