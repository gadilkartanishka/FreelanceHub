"use client"

import { Button } from "@/components/ui/button"
import { ShaderBackground } from "@/components/ui/shaders-hero-section"
import { ArrowRight } from "lucide-react"

export default function Page() {
  return (
    <main className="bg-[var(--color-cream)] text-[var(--color-navy)]">
      <ShaderBackground>
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,34,59,0.18),rgba(34,34,59,0.56))]" />

          <div className="relative mx-auto flex min-h-[88vh] w-full max-w-7xl flex-col justify-center px-6 py-20 sm:px-10 lg:px-12">
            <div className="max-w-4xl">
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs tracking-[0.24em] text-[var(--color-cream)] uppercase backdrop-blur-sm">
                FreelanceHub
              </div>

              <h1 className="mt-6 max-w-4xl text-5xl leading-[0.95] font-medium tracking-tight text-white sm:text-6xl lg:text-7xl">
                One place to manage clients, projects, payments, and conversations.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-[rgba(242,233,228,0.84)]">
                FreelanceHub helps freelancers run the business side of their work with more
                clarity, less context switching, and a calmer daily workflow.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
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
              </div>
            </div>
          </div>
        </section>
      </ShaderBackground>
    </main>
  )
}
