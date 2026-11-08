import { getTranslations } from 'next-intl/server'
import { Reveal } from '@/components/common/Reveal'
import { longer } from '@/features/experiences/data/longer-adventures'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export async function LongerAdventures() {
  const t = await getTranslations('Experiences')

  return (
    <section className="relative isolate overflow-hidden bg-secondary text-secondary-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-3xl"
      />
      <div className="shell py-16 sm:py-20 lg:py-24">
        <Reveal className="mb-10 max-w-2xl sm:mb-12">
          <p className="eyebrow mb-4 text-accent">
            {t('longerEyebrow')}
          </p>
          <h2 className="text-balance text-3xl leading-[1.1] text-background sm:text-4xl">
            {t('longerTitle')}
          </h2>
        </Reveal>
        <div className="grid gap-px border border-background/15 bg-background/15 md:grid-cols-3">
          {longer.map((l, i) => (
            <Reveal key={l.title} delay={i * 90} className="h-full">
              <Link prefetch={false}
                href={l.href}
                className="group flex h-full flex-col bg-secondary p-7 transition-colors duration-500 hover:bg-charcoal sm:p-9"
              >
                <span className="font-serif text-2xl text-background">{l.title}</span>
                <span className="mt-3 flex-1 text-sm leading-relaxed text-background/65">{l.text}</span>
                <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                  {t('longerExploreCta')}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
