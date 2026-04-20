export function Footer() {
  return (
    <footer className="bg-[rgba(226,232,240,0.58)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-7 text-sm text-[rgba(34,34,59,0.66)] sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div className="text-xs tracking-[0.2em] text-[var(--color-indigo)] uppercase">FreelanceHub</div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <span>Built for a calmer freelance workflow.</span>
          <span>Clients, projects, timelines, and payments in one place.</span>
          <a
            href="#"
            className="text-xs tracking-[0.14em] text-[var(--color-indigo)] uppercase transition-colors hover:text-[var(--color-navy)]"
          >
            Contact us
          </a>
        </div>
      </div>
    </footer>
  )
}
