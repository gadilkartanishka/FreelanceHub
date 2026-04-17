"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { signOut } from "@/app/auth/actions"

export function Navbar() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [supabase])

  return (
    <nav className="absolute top-0 right-0 left-0 z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-6 sm:px-10 lg:px-12">
      <span className="text-sm font-semibold tracking-[-0.02em] text-[var(--color-cream)]"></span>
      <div className="flex items-center gap-3">
        {user ? (
          <form action={signOut}>
            <Button
              size="default"
              className="h-10 rounded-full bg-white px-6 text-[var(--color-navy)] hover:bg-[var(--color-cream)]"
            >
              Sign out
            </Button>
          </form>
        ) : (
          <>
            <Link href="/login">
              <Button
                variant="ghost"
                size="default"
                className="h-10 rounded-full px-6 text-[var(--color-cream)] hover:bg-white/10 hover:text-white"
              >
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="default"
                className="h-10 rounded-full bg-[var(--color-cream)] px-6 text-[var(--color-navy)] hover:bg-white"
              >
                Sign up
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
