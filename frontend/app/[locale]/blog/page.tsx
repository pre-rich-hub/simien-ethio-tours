import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHero } from '@/components/common/PageHero'
import { CtaBand } from '@/features/enquiries'
import { BlogArchive } from '@/features/blog/components/BlogArchive'
import { JournalNewsletter } from '@/features/blog/components/JournalNewsletter'
import { cloudinaryImage } from '@/lib/cloudinary'
import { buildPageMetadata } from '@/lib/seo/metadata'

type PageProps = { params: Promise<{ locale: string }> }

// Cached at the CDN and rebuilt at most once a day to stay within ISR limits.
export const revalidate = 86400

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params
  const tn = await getTranslations({ locale, namespace: 'Nav' })
  const t = await getTranslations({ locale, namespace: 'Blog' })
  return buildPageMetadata({
    title: tn('journal'),
    description: t('metaDescription'),
    path: '/blog',
    locale,
    image: cloudinaryImage('coffee-cupping-and-ceremony', 1200),
    imageAlt: t('metaImageAlt'),
  })
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Blog')
  const tc = await getTranslations('Crumbs')
  const tn = await getTranslations('Nav')

  return (
    <>
      <PageHero
        eyebrow={t('heroEyebrow')}
        title={t('heroTitle')}
        lede={t('heroLede')}
        image="https://res.cloudinary.com/wwgwrs4y/image/upload/f_auto,q_auto,w_1600/coffee-cupping-and-ceremony.png"
        imageAlt={t('heroImageAlt')}
        crumbs={[{ label: tc('home'), href: '/' }, { label: tn('journal') }]}
        compact
      />

      {/* All posts */}
      <BlogArchive />

      {/* Newsletter */}
      <JournalNewsletter />

      <CtaBand
        title={t('ctaTitle')}
        text={t('ctaText')}
        secondary={{ label: t('ctaSecondary'), href: '/tours' }}
        image="https://res.cloudinary.com/wwgwrs4y/image/upload/f_auto,q_auto,w_1600/the-historic-route.png"
      />
    </>
  )
}
