import { workflowSteps } from "@/components/landing/data"

export function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-[rgba(242,233,228,0.66)]">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(74,78,105,0.16),transparent)]" />

      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm tracking-[0.22em] text-[var(--color-indigo)] uppercase">
            How it works
          </p>
          <h2 className="mt-4 text-4xl leading-tight font-medium sm:text-5xl">
            A simple rhythm from kickoff to closeout.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[rgba(34,34,59,0.74)]">
            Instead of rebuilding your process in separate apps, you move through the work in one
            consistent flow.
          </p>
        </div>

        <div className="mt-14">
          {workflowSteps.map(({ number, title, description }) => (
            <article
              key={number}
              className="grid gap-6 border-t border-[rgba(74,78,105,0.14)] py-8 first:border-t-0 first:pt-0 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-10 lg:py-10"
            >
              <div className="text-5xl leading-none font-medium tracking-[-0.04em] text-[rgba(74,78,105,0.72)] sm:text-6xl">
                {number}
              </div>
              <div className="max-w-3xl">
                <h3 className="text-2xl font-medium sm:text-3xl">{title}</h3>
                <p className="mt-4 text-base leading-8 text-[rgba(34,34,59,0.74)] sm:text-lg">
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
