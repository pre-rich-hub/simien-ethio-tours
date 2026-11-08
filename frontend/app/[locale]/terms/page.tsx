import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHero } from '@/components/common/PageHero'
import { LegalContactCard, LegalContents, LegalSections } from '@/features/legal'
import { termsSections } from '@/features/legal/data/terms.data'
import { cloudinaryImage } from '@/lib/cloudinary'
import { company } from '@/lib/seo/entities'
import { buildPageMetadata } from '@/lib/seo/metadata'

type PageProps = { params: Promise<{ locale: string }> }

// Cached at the CDN and rebuilt at most once a day to stay within ISR limits.
export const revalidate = 86400

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Legal' })
  return buildPageMetadata({
    title: t('termsTitle'),
    description: t('termsLede', { company: company.name }),
    path: '/terms',
    locale,
    image: cloudinaryImage('simien-mountains', 1200),
    imageAlt: 'The Simien Mountains escarpment at first light',
  })
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Legal')
  const tc = await getTranslations('Crumbs')

  return (
    <>
      <PageHero
        eyebrow={t('termsEyebrow')}
        title={t('termsTitle')}
        lede={t('termsLede', { company: company.name })}
        image={cloudinaryImage('simien-mountains', 1920)}
        imageAlt="The Simien Mountains escarpment at first light"
        crumbs={[{ label: tc('home'), href: '/' }, { label: t('termsCrumb') }]}
        compact
      />
      <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[260px_1fr] lg:gap-20 lg:py-24">
        <LegalContents updated="September 23, 2026" sections={termsSections} />
        <div className="max-w-3xl">
          <LegalSections sections={termsSections} />
          <LegalContactCard related={{ label: t('relatedPrivacy'), href: '/privacy' }} />
        </div>
      </section>
    </>
  )
}
