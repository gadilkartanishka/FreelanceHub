"use client"
// Add this import at the top
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Button } from "@/components/ui/button"
import { ShaderBackground } from "@/components/ui/shaders-hero-section"
import { heroContainer, heroItem } from "@/components/landing/data"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [supabase])

  return (
    <ShaderBackground>
      <Navbar />
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
              Run the business side of freelance work with more clarity.
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="mt-6 max-w-2xl text-lg leading-8 text-[rgba(242,233,228,0.84)]"
            >
              FreelanceHub gives you a calmer workspace for the moving parts
              behind every project, from first conversations to final
              follow-ups.
            </motion.p>

            <motion.div
              variants={heroItem}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <Link href={user ? "/dashboard" : "/login"}>
                <Button
                  size="lg"
                  className="h-12 rounded-full bg-[var(--color-cream)] px-6 text-[var(--color-navy)] hover:bg-white"
                >
                  {user ? "Go to Dashboard" : "Start managing smarter"}
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </ShaderBackground>
  )
}
