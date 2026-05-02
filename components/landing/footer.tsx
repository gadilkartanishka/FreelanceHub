import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[radial-gradient(140%_120%_at_50%_100%,rgba(202,229,255,0.55)_0%,rgba(152,181,237,0.28)_28%,rgba(74,78,105,0.62)_54%,rgba(34,34,59,0.88)_100%)] text-white">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[280px] w-[820px] -translate-x-1/2 rounded-full bg-[#9a8c98]/18 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-44 w-44 rounded-full bg-white/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-56 w-56 rounded-full bg-[#c9ada7]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-10 sm:px-10 lg:px-12 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-white/30 bg-white/12 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
              Built for independent operators
            </span>

            <h2 className="max-w-[14ch] text-4xl leading-[1.02] font-medium sm:text-5xl">
              Stop leaving productivity behind.
            </h2>

            <Link href="/signup">
              <Button className="h-12 rounded-full bg-[#22223B] px-7 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-[#2563eb] hover:via-[#7c3aed] hover:to-[#ec4899] hover:text-white hover:shadow-[0_12px_34px_rgba(124,58,237,0.45)]">
                Create a free account
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:max-w-md sm:justify-self-end">
            <div>
              <p className="mb-4 text-xs tracking-[0.16em] uppercase text-white/60">Product</p>
              <ul className="space-y-3 text-[17px] text-white/88">
                <li><Link href="#" className="hover:text-white">How it works</Link></li>
                <li><Link href="#" className="hover:text-white">Clients</Link></li>
                <li><Link href="#" className="hover:text-white">Projects</Link></li>
                <li><Link href="#" className="hover:text-white">Payments</Link></li>
                <li><Link href="#" className="hover:text-white">Messages</Link></li>
              </ul>
            </div>

            <div>
              <p className="mb-4 text-xs tracking-[0.16em] uppercase text-white/60">Company</p>
              <ul className="space-y-3 text-[17px] text-white/88">
                <li><Link href="#" className="hover:text-white">FAQ</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy policy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms of service</Link></li>
                <li>
                  <a href="mailto:hello@freelancehub.app" className="inline-flex items-center gap-2 hover:text-white">
                    <Mail className="size-4" />
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/25 pt-5 text-sm text-[#22223B]">
          <p>© {new Date().getFullYear()} FreelanceHub. Built for focused freelancers.</p>
        </div>
      </div>
    </footer>
  )
}
