import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Hero } from '@/features/home/components/Hero'
import { BrandIntro } from '@/features/home/components/BrandIntro'
import { Destinations } from '@/features/destinations'
import { Journeys } from '@/features/tours'
import { Experiences } from '@/features/experiences'
import { WaysToTravel } from '@/features/tours'
import { SectionHeading } from '@/components/common/SectionHeading'
import { WhereToNext } from '@/features/home/components/WhereToNext'
import { Testimonial } from '@/features/home/components/Testimonial'
import { Gallery } from '@/features/home/components/Gallery'
import { PlanJourney } from '@/features/enquiries'
import { getToursData } from '@/features/tours/api/tour-data.api'
import { cloudinaryImage } from '@/lib/cloudinary'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  graphJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from '@/lib/seo/json-ld'
import { defaultDocumentTitle } from '@/lib/seo/entities'
import { buildPageMetadata } from '@/lib/seo/metadata'

type PageProps = { params: Promise<{ locale: string }> }

// Cached at the CDN and rebuilt at most once a day to stay within ISR limits.
export const revalidate = 86400

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Home' })
  return {
    ...buildPageMetadata({
      title: defaultDocumentTitle,
      description: t('heroBody'),
      path: '/',
      locale,
      image: cloudinaryImage('lalibela', 1200),
      imageAlt: 'Rock-hewn churches of Lalibela, Ethiopia',
    }),
    // Brand title on the home page; skip the "%s · Simien Ethiopia Tours" template.
    title: { absolute: defaultDocumentTitle },
  }
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const tours = await getToursData(locale)
  const t = await getTranslations('Home')

  return (
    <>
      <JsonLd data={graphJsonLd(organizationJsonLd(), websiteJsonLd(locale))} />
      <Hero />
      <BrandIntro />
      <Destinations />
      <Journeys tours={tours} />
      <section className="shell pb-20 sm:pb-24 lg:pb-32">
        <SectionHeading
          eyebrow={t('waysEyebrow')}
          title={t('waysTitle')}
          aside={t('waysAside')}
        />
        <WaysToTravel tours={tours} />
      </section>
      <Experiences />
      <WhereToNext />
      <Testimonial />
      <Gallery />
      <PlanJourney />
    </>
  )
}
