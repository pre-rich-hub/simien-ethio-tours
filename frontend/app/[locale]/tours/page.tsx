import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHero } from '@/components/common/PageHero'
import { FaqSection } from '@/components/seo/FaqSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { CtaBand } from '@/features/enquiries'
import { getToursData } from '@/features/tours/api/tour-data.api'
import { TourTravelStyles } from '@/features/tours/components/TourTravelStyles'
import { TourCollection } from '@/features/tours/components/TourCollection'
import { TourPromises } from '@/features/tours/components/TourPromises'
import { cloudinaryImage } from '@/lib/cloudinary'
import { getToursFaqs } from '@/lib/i18n/faq-helpers'
import { faqPageJsonLd, graphJsonLd, organizationJsonLd } from '@/lib/seo/json-ld'
import { buildPageMetadata } from '@/lib/seo/metadata'

type PageProps = { params: Promise<{ locale: string }> }

// Cached at the CDN and rebuilt at most once a day to stay within ISR limits.
export const revalidate = 86400

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Tours' })
  return buildPageMetadata({
    title: t('heroEyebrow'),
    description: `${t('heroTitle')}. ${t('heroLede')}`,
    path: '/tours',
    locale,
    image: cloudinaryImage('simien-mountains', 1200),
    imageAlt: 'Simien Mountains escarpment in northern Ethiopia',
  })
}

export default async function ToursPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const tours = await getToursData(locale)
  const t = await getTranslations('Tours')
  const tc = await getTranslations('Crumbs')
  const ts = await getTranslations('Shared')
  const localFaqs = getToursFaqs(t)

  return (
    <>
      <JsonLd data={graphJsonLd(organizationJsonLd(), faqPageJsonLd(localFaqs, locale))} />
      <PageHero
        eyebrow={t('heroEyebrow')}
        title={t('heroTitle')}
        lede={t('heroLede')}
        image={cloudinaryImage('simien-mountains')}
        imageAlt="Simien Mountains escarpment in northern Ethiopia"
        crumbs={[{ label: tc('home'), href: '/' }, { label: tc('tours') }]}
        compact
      />

      <TourTravelStyles tours={tours} />

      <TourCollection tours={tours} />

      <TourPromises />

      <FaqSection
        title={t('faqTitle')}
        intro={t('faqIntro')}
        items={localFaqs}
        footerLink={{ label: t('faqFooterLink'), href: '/contact' }}
      />

      <CtaBand
        eyebrow={ts('speakWithDesigner')}
        title={t('ctaTitle')}
        text={t('ctaText')}
        primary={{ label: ts('planYourJourney'), href: '/contact' }}
        secondary={{ label: t('ctaSecondaryCta'), href: '/destinations' }}
      />
    </>
  )
}
