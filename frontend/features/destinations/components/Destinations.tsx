'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useDestinations } from '../hooks/useDestinations'
import { cloudinaryImage } from '@/lib/cloudinary'

export function Destinations() {
  const t = useTranslations('Home')
  const { featured, trackRef, active, scrollToIndex, onPointerDown, onPointerMove, endDrag, onCardClick } = useDestinations()

  return (
    <section id="destinations" className="overflow-hidden bg-primary text-primary-foreground">
      <div className="grid lg:grid-cols-[380px_1fr] xl:grid-cols-[440px_1fr]">
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:py-24">
          <p className="mb-6 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.24em] text-accent-light">
            {t('destEyebrow')}
          </p>
          <h2 className="text-balance font-serif text-4xl leading-[1.1] sm:text-5xl">
            {t('destTitle')}
          </h2>
          <p className="mt-6 max-w-sm text-pretty leading-relaxed text-primary-foreground/70">
            {t('destBody')}
          </p>
          <div className="mt-9 hidden items-center gap-2 lg:flex">
            <button
              onClick={() => scrollToIndex(active - 1)}
              aria-label={t('destPrevAriaLabel')}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/25 text-primary-foreground transition-colors duration-300 hover:border-accent-light hover:text-accent-light"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollToIndex(active + 1)}
              aria-label={t('destNextAriaLabel')}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/25 text-primary-foreground transition-colors duration-300 hover:border-accent-light hover:text-accent-light"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto pb-8 pl-6 pr-6 pt-8 [scrollbar-width:none] active:cursor-grabbing sm:pl-0 sm:pr-10 [&::-webkit-scrollbar]:hidden"
        >
          {featured.map((d) => (
            <Link prefetch={false}
              key={d.slug}
              href={`/destinations/${d.slug}`}
              onClick={onCardClick}
              draggable={false}
              className="group relative h-[440px] w-[280px] shrink-0 select-none snap-start overflow-hidden rounded-sm sm:h-[560px] sm:w-[360px]"
            >
              <Image
                src={d.image}
                alt={`${d.name}, Ethiopia`}
                fill
                draggable={false}
                sizes="(max-width: 640px) 280px, 360px"
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/20 to-transparent" />
              <span className="absolute left-4 top-4 rounded-sm bg-background px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground">
                {d.tag}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-serif text-2xl text-background sm:text-3xl">
                  {d.name}
                </h3>
                <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-background/70">
                  {d.duration} · {t('destPrivate')}
                </p>
                <span className="mt-4 inline-flex items-center border border-background/40 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-background transition-colors duration-300 group-hover:border-accent-light group-hover:text-accent-light">
                  {t('destViewCta')}
                </span>
              </div>
            </Link>
          ))}

          <Link prefetch={false}
            href="/destinations"
            onClick={onCardClick}
            draggable={false}
            className="group relative flex h-[440px] w-[280px] shrink-0 select-none snap-start flex-col items-center justify-center gap-6 overflow-hidden rounded-sm p-8 text-center sm:h-[560px] sm:w-[360px]"
          >
            <Image
              src={cloudinaryImage('bale-mountains')}
              alt="Ethiopian wolf territory in the Bale Mountains"
              fill
              draggable={false}
              sizes="(max-width: 640px) 280px, 360px"
              className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-charcoal/75" />
            <span className="relative inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-foreground transition-colors duration-300 group-hover:bg-accent/90">
              {t('destAllCta')}
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
