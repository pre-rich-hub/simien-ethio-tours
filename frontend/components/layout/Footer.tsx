import type { ReactNode } from 'react'
import Image from 'next/image'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { contact } from '@/lib/constants/contact'
import { company } from '@/lib/seo/entities'
import { getLocalizedDestinations } from '@/features/destinations/utils/destination.utils'
import { getLocalizedTours } from '@/features/tours/utils/tour-catalog.utils'
import { NewsletterForm } from '@/features/newsletter'
import {
  FacebookMark,
  GetYourGuideLogo,
  InstagramMark,
  MastercardLogo,
  PayPalLogo,
  SafariBookingsLogo,
  TikTokMark,
  TripadvisorLogo,
  ViatorLogo,
  VisaLogo,
  XMark,
  YouTubeMark,
} from './BrandMarks'

// Fill in each profile / listing URL to make its badge a link. Badges
// without a URL still show, but as plain marks rather than dead links.
const socials = [
  { name: 'Instagram', href: 'https://www.instagram.com/simien_ethiopa_tours', mark: <InstagramMark /> },
  { name: 'YouTube', href: '', mark: <YouTubeMark /> },
  { name: 'Facebook', href: '', mark: <FacebookMark /> },
  { name: 'TikTok', href: 'https://www.tiktok.com/@urbannomad34', mark: <TikTokMark /> },
  { name: 'X', href: '', mark: <XMark /> },
]

const platforms = [
  { name: 'Viator', href: '', mark: <ViatorLogo /> },
  { name: 'Tripadvisor', href: 'https://www.tripadvisor.com/Attraction_Review-g293791-d9999161-Reviews-Simien_Ethiopia_Tours_Day_Tours-Addis_Ababa.html', mark: <TripadvisorLogo /> },
  { name: 'SafariBookings', href: '', mark: <SafariBookingsLogo /> },
  { name: 'GetYourGuide', href: '', mark: <GetYourGuideLogo /> },
]

const payments = [
  { name: 'Visa', mark: <VisaLogo /> },
  { name: 'Mastercard', mark: <MastercardLogo /> },
  { name: 'PayPal', mark: <PayPalLogo /> },
]

function MaybeLink({
  href,
  label,
  className,
  children,
}: {
  href: string
  label: string
  className: string
  children: ReactNode
}) {
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className={className}>
      {children}
    </a>
  ) : (
    <span role="img" aria-label={label} title={label} className={className}>
      {children}
    </span>
  )
}

const tileClass =
  'flex h-16 items-center justify-center rounded-md bg-background px-3 shadow-sm ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-0.5'

export async function Footer() {
  const t = await getTranslations('Footer')
  const locale = await getLocale()
  const destinations = getLocalizedDestinations(locale)
  const tours = getLocalizedTours(locale)

  const columns = [
    {
      title: t('destinations'),
      links: [
        ...destinations
          .slice(0, 5)
          .map((d) => ({ label: d.name, href: `/destinations/${d.slug}` })),
        { label: t('allDestinations'), href: '/destinations', more: true },
      ],
    },
    {
      title: t('tours'),
      links: [
        ...tours
          .slice(0, 4)
          .map((tour) => ({ label: tour.title, href: `/tours/${tour.slug}` })),
        { label: t('customItineraries'), href: '/contact' },
        { label: t('allTours'), href: '/tours', more: true },
      ],
    },
    {
      title: t('explore'),
      links: [
        { label: t('ourStory'), href: '/about' },
        { label: t('travelJournal'), href: '/blog' },
        { label: t('experiences'), href: '/experiences' },
        { label: t('responsibleTourism'), href: '/blog/responsible-travel-in-the-omo' },
        { label: t('whenToVisit'), href: '/blog/when-to-visit-ethiopia' },
        { label: t('contactUs'), href: '/contact' },
      ],
    },
  ]

  return (
    <footer className="bg-charcoal text-background">
      <div className="shell py-16 sm:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 lg:row-span-2">
            <Image
              src="/images/simien-logo-light.png"
              alt={t('logoAlt', { name: company.name })}
              width={747}
              height={240}
              sizes="250px"
              className="h-20 w-auto"
            />
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-background/60">
              {t('tagline')}
            </p>

            <ul className="mt-7 space-y-2 text-sm text-background/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" />
                <span>{contact.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
                  className="flex items-center gap-3 py-1 transition-colors hover:text-background"
                >
                  <Phone className="h-4 w-4 shrink-0 text-accent-light" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 py-1 transition-colors hover:text-background"
                >
                  <Mail className="h-4 w-4 shrink-0 text-accent-light" />
                  {contact.email}
                </a>
              </li>
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {socials.map(({ name, href, mark }) => (
                <MaybeLink
                  key={name}
                  href={href}
                  label={name}
                  className="grid h-11 w-11 place-items-center rounded-full bg-white p-2.5 shadow-sm ring-1 ring-black/10 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {mark}
                </MaybeLink>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="mb-4 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-light sm:text-[11px]">
                {col.title}
              </h3>
              <ul className="space-y-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={
                        link.more
                          ? 'group inline-flex items-center gap-1.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-light transition-colors duration-300 hover:text-background'
                          : 'inline-block py-1.5 text-sm text-background/65 transition-colors duration-300 hover:text-background'
                      }
                    >
                      {link.label}
                      {link.more && (
                        <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 flex flex-col gap-5 sm:col-span-3 lg:flex-row lg:items-end lg:justify-between lg:self-end">
            <div>
              <p className="font-serif text-xl text-background sm:text-2xl">
                {t('newsletterTitle')}
              </p>
              <p className="mt-1.5 text-sm text-background/60">{t('newsletterBlurb')}</p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-background/15 pt-10 lg:grid-cols-[4fr_3fr] lg:gap-12">
          <section aria-labelledby="footer-platforms">
            <h3 id="footer-platforms" className="font-serif text-xl text-background sm:text-2xl">
              {t('platformsTitle')}
            </h3>
            <p className="mt-1.5 text-sm text-background/60">{t('platformsBlurb')}</p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {platforms.map(({ name, href, mark }) => (
                <MaybeLink key={name} href={href} label={name} className={tileClass}>
                  {mark}
                </MaybeLink>
              ))}
            </div>
          </section>
          <section aria-labelledby="footer-payments">
            <h3 id="footer-payments" className="font-serif text-xl text-background sm:text-2xl">
              {t('paymentsTitle')}
            </h3>
            <p className="mt-1.5 text-sm text-background/60">{t('paymentsBlurb')}</p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {payments.map(({ name, mark }) => (
                <span key={name} role="img" aria-label={name} title={name} className={tileClass}>
                  {mark}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-background/15 pt-8 text-xs text-background/50 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6">
          <p>
            &copy; {new Date().getFullYear()} {company.name}. {t('rightsReserved')}
          </p>
          <p className="order-last text-center text-[13px] font-semibold text-background/75 md:order-none">
            {t.rich('builtBy', {
              link: (chunks) => (
                <a
                  href="https://melba.et"
                  target="_blank"
                  rel="noopener"
                  className="font-extrabold text-background transition-colors hover:text-accent-light"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 md:justify-end">
            <Link href="/privacy" className="py-1 transition-colors hover:text-background/80">
              {t('privacy')}
            </Link>
            <Link href="/terms" className="py-1 transition-colors hover:text-background/80">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
