"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { signOut } from "@/app/auth/actions"
import { BrandLogo } from "@/components/ui/brand-logo"

export function Navbar() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [supabase])

  return (
    <nav className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-7xl px-6 pt-6 sm:px-10 lg:px-12">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center">
        <div className="justify-self-start">
          <BrandLogo collapsed iconSize={30} whiteIcon />
        </div>

        <div className="hidden items-center gap-8 text-sm font-medium text-white/75 lg:flex">
          <Link href="#" className="text-white">
            Home
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            How it works
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            Platforms
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            Referrals
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            FAQ
          </Link>
        </div>

        <div className="flex items-center gap-2 justify-self-end">
          {user ? (
            <form action={signOut}>
              <Button
                size="default"
                className="h-11 rounded-full bg-[#2a2838] px-7 text-white hover:bg-[#1f1d2c]"
              >
                Sign out
              </Button>
            </form>
          ) : (
            <>
              <Link href="/signup">
                <Button
                  size="default"
                  className="h-11 rounded-full border border-white/25 bg-white/8 px-6 text-white/90 hover:bg-white/15"
                >
                  Sign up
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="default"
                  className="h-12 rounded-full bg-[var(--color-navy)] px-7 text-[var(--color-cream)] hover:bg-[#151726]"
                >
                  Log in
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
