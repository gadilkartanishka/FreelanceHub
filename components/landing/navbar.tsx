"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { signOut } from "@/app/auth/actions"
import { BrandLogo } from "@/components/ui/brand-logo"

export function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [scrolled, setScrolled] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [supabase])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.72)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav className="fixed inset-x-0 top-0 z-50 mx-auto w-full max-w-[1400px] px-3 pt-2 sm:px-5 lg:px-6">
      <div
        className={`rounded-xl px-3 py-2 transition-all duration-300 ${
          scrolled ? "bg-transparent shadow-none backdrop-blur-0" : "bg-transparent"
        }`}
      >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center">
        <div className="justify-self-start">
          <BrandLogo collapsed iconSize={30} whiteIcon={!scrolled} />
        </div>

        <div
          className={`hidden items-center gap-8 text-sm font-medium lg:flex ${
            scrolled ? "text-[#4A4E69]" : "text-white/75"
          }`}
        >
          <Link href="#home" className={scrolled ? "text-[#22223B]" : "text-white"}>
            Home
          </Link>
          <Link href="#how-it-works" className={`transition-colors ${scrolled ? "hover:text-[#22223B]" : "hover:text-white"}`}>
            How it works
          </Link>
          <Link href="#platforms" className={`transition-colors ${scrolled ? "hover:text-[#22223B]" : "hover:text-white"}`}>
            Platforms
          </Link>
          <Link href="#referrals" className={`transition-colors ${scrolled ? "hover:text-[#22223B]" : "hover:text-white"}`}>
            Referrals
          </Link>
          <Link href="#faq" className={`transition-colors ${scrolled ? "hover:text-[#22223B]" : "hover:text-white"}`}>
            FAQ
          </Link>
        </div>

        <div className="flex items-center gap-2 justify-self-end">
          {user ? (
            <form action={signOut}>
              <Button
                size="default"
                className="h-11 rounded-full border border-transparent bg-[#2a2838] px-7 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-[#2563eb] hover:via-[#7c3aed] hover:to-[#ec4899] hover:text-white hover:shadow-[0_12px_34px_rgba(124,58,237,0.45)]"
              >
                Sign out
              </Button>
            </form>
          ) : (
            <>
              <Link href="/signup">
                <Button
                  size="default"
                  className={`h-11 rounded-full px-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-r hover:from-[#2563eb] hover:via-[#7c3aed] hover:to-[#ec4899] hover:text-white hover:shadow-[0_12px_34px_rgba(124,58,237,0.45)] ${
                    scrolled
                      ? "border border-[#e0e2e6] bg-white text-[#4A4E69]"
                      : "border border-white/25 bg-white/8 text-white/90"
                  }`}
                >
                  Sign up
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="default"
                  className={`h-12 rounded-full border border-transparent px-7 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-[#2563eb] hover:via-[#7c3aed] hover:to-[#ec4899] hover:text-white hover:shadow-[0_12px_34px_rgba(124,58,237,0.45)] ${
                    scrolled
                      ? "bg-[#22223B] text-white"
                      : "bg-[var(--color-navy)] text-[var(--color-cream)]"
                  }`}
                >
                  Log in
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      </div>
    </nav>
  )
}
