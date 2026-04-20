import { workflowSteps } from "@/components/landing/data"

export function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(74,78,105,0.16),transparent)]" />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.22em] text-[var(--color-indigo)] uppercase">
            How it works
          </p>
          <h2 className="mt-4 text-3xl leading-tight font-medium sm:text-4xl">
            A simple rhythm from kickoff to closeout.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[rgba(34,34,59,0.74)]">
            Instead of rebuilding your process in separate apps, you move through the work in one
            consistent flow.
          </p>
        </div>

        <div className="mt-12">
          {workflowSteps.map(({ number, title, description }) => (
            <article
              key={number}
              className="grid gap-5 border-t border-[rgba(74,78,105,0.14)] py-7 first:border-t-0 first:pt-0 lg:grid-cols-[140px_minmax(0,1fr)] lg:gap-8 lg:py-8"
            >
              <div className="text-4xl leading-none font-medium tracking-[-0.04em] text-[rgba(74,78,105,0.72)] sm:text-5xl">
                {number}
              </div>
              <div className="max-w-3xl">
                <h3 className="text-xl font-medium sm:text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[rgba(34,34,59,0.74)] sm:text-base sm:leading-7">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
