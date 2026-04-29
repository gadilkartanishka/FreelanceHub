"use client"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/landing/navbar"
import { Button } from "@/components/ui/button"
import { ShaderBackground } from "@/components/ui/shaders-hero-section"
import { heroContainer, heroItem } from "@/components/landing/data"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [supabase])

  return (
    <ShaderBackground>
      <Navbar />
      <section className="relative isolate min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(140%_120%_at_50%_0%,rgba(202,229,255,0.7)_0%,rgba(152,181,237,0.34)_38%,rgba(75,83,121,0.56)_100%)]" />
        <div className="absolute -top-24 left-1/2 h-[540px] w-[900px] -translate-x-1/2 rounded-full bg-white/18 blur-3xl" />
        <div className="absolute bottom-[-180px] left-1/2 h-[420px] w-[1200px] -translate-x-1/2 rounded-full bg-white/30 blur-3xl" />
        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center px-6 pt-28 pb-0 sm:px-10 lg:px-12">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="show"
            className="z-20 flex max-w-4xl flex-col items-center text-center"
          >
            <motion.div
              variants={heroItem}
              className="inline-flex items-center rounded-full border border-white/35 bg-white/20 px-4 py-1.5 text-xs font-medium tracking-tight text-white/90 backdrop-blur-sm"
            >
              Built for serious freelance teams
            </motion.div>

            <motion.h1
              variants={heroItem}
              className="mt-6 max-w-4xl text-4xl leading-[1.02] font-medium tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              You already deliver.
              <br />
              Start running it like a studio.
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="mt-4 max-w-xl text-sm leading-6 text-white/78 sm:text-base"
            >
              One clean workspace for clients, projects, and payments.
            </motion.p>

            <motion.div
              variants={heroItem}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <Link href={user ? "/dashboard" : "/login"}>
                <Button
                  size="lg"
                  className="h-12 rounded-full bg-[var(--color-navy)] px-7 text-[var(--color-cream)] hover:bg-[#151726]"
                >
                  {user ? "Go to Dashboard" : "Start managing smarter"}
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={heroItem}
            initial="hidden"
            animate="show"
            className="relative z-20 mt-12 w-full max-w-5xl"
          >
            <div className="mx-auto w-full rounded-[30px] border border-white/40 bg-white/14 p-2 shadow-[0_40px_120px_rgba(16,28,64,0.45)] backdrop-blur-sm">
              <div className="w-full overflow-hidden rounded-[24px] border border-white/40 bg-slate-100/80">
                <div className="flex h-10 items-center gap-2 border-b border-slate-400/25 bg-white/70 px-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#fd5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febb2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c840]" />
                </div>
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src="/workspace-snapshot.png"
                    alt="FreelanceHub workspace dashboard"
                    fill
                    priority
                    className="object-contain object-top bg-slate-100"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-52 bg-[linear-gradient(to_top,rgba(242,233,228,0.88),rgba(242,233,228,0))]" />
        <div className="pointer-events-none absolute -bottom-16 left-[8%] z-30 h-44 w-44 rounded-full bg-white/65 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-[8%] z-30 h-56 w-56 rounded-full bg-white/70 blur-3xl" />
      </section>
    </ShaderBackground>
  )
}
