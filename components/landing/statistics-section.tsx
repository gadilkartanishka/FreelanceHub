import { stats } from "@/components/landing/data"

export function StatisticsSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-indigo)]">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-navy),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-navy),transparent)]" />

      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm tracking-[0.22em] text-[rgba(242,233,228,0.68)] uppercase">
            Why It Lands
          </p>
          <h2 className="mt-4 text-4xl leading-tight font-medium text-[var(--color-cream)] sm:text-5xl">
            The outside story now matches the inside product.
          </h2>
        </div>

        <div className="mt-14 grid gap-8 border-t border-[rgba(242,233,228,0.12)] pt-8 lg:grid-cols-3 lg:gap-10">
          {stats.map(({ eyebrow, title, description }) => (
            <article key={title} className="max-w-sm">
              <p className="text-xs tracking-[0.18em] text-[var(--color-rose)] uppercase">
                {eyebrow}
              </p>
              <h3 className="mt-4 text-2xl leading-tight font-medium text-[var(--color-cream)]">
                {title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[rgba(242,233,228,0.74)]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
