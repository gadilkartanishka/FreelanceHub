"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="absolute top-0 right-0 left-0 z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-6 sm:px-10 lg:px-12">
      <span className="text-sm font-semibold tracking-[-0.02em] text-[var(--color-cream)]"></span>
      <div className="flex items-center gap-3">
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
      </div>
    </nav>
  )
}
