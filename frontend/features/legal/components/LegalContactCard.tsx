import { getTranslations } from 'next-intl/server'
import { contact } from '@/lib/constants/contact'
import { ArrowRight, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export async function LegalContactCard({ related }: { related: { label: string; href: string } }) {
  const t = await getTranslations('Legal')

  return (
    <div className="mt-6 bg-secondary p-8 text-secondary-foreground sm:p-10">
      <p className="eyebrow text-accent">
        {t('questionsEyebrow')}
      </p>
      <p className="mt-4 max-w-lg font-serif text-2xl leading-snug text-background sm:text-3xl">
        {t('questionsTitle')}
      </p>
      <div className="mt-7 flex flex-col gap-3 text-sm text-background/75 sm:flex-row sm:gap-8">
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex items-center gap-2.5 py-1 transition-colors hover:text-background"
        >
          <Mail className="h-4 w-4 text-accent" strokeWidth={1.5} />
          {contact.email}
        </a>
        <a
          href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
          className="inline-flex items-center gap-2.5 py-1 transition-colors hover:text-background"
        >
          <Phone className="h-4 w-4 text-accent" strokeWidth={1.5} />
          {contact.phone}
        </a>
      </div>
      <Link prefetch={false}
        href={related.href}
        className="group mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent transition-colors hover:text-background sm:text-xs"
      >
        {related.label}
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  )
}
