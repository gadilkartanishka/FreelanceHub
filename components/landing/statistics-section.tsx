import { stats } from "@/components/landing/data"

export function StatisticsSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-indigo)]">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-navy),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-navy),transparent)]" />

      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-6xl justify-items-center gap-12 text-center sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex w-full max-w-[220px] flex-col items-center">
              <div className="text-5xl leading-none font-medium tracking-[-0.05em] text-[var(--color-cream)] sm:text-6xl">
                {value}
              </div>
              <p className="mt-5 text-base text-[var(--color-rose)]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
