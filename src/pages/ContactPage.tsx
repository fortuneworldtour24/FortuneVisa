import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { siteConfig, whatsappHref } from '@/config/siteConfig';
import { PageHero } from '@/components/PageHero';
import { EnquiryForm } from '@/components/contact/EnquiryForm';
import { useSeo } from '@/hooks/useSeo';

type ContactCardProps = {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
};

function ContactCard({ icon: Icon, title, children }: ContactCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:p-7">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h2 className="text-lg font-bold text-ink">{title}</h2>
        <div className="mt-2 text-sm leading-relaxed text-muted">{children}</div>
      </div>
    </div>
  );
}

const linkClass = 'font-semibold text-primary-700 transition-colors hover:text-primary-800 hover:underline';

export function ContactPage() {
  const { t } = useTranslation();
  useSeo({
    title: 'Contact Fortune Visa Services',
    description: 'Talk to a Fortune visa consultant in Parramatta. Call, email or send an enquiry online.',
  });

  return (
    <>
      <PageHero
        eyebrow={t('contact.eyebrow')}
        title={t('contact.title')}
        description={t('contact.description')}
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-20">
        <div className="lg:col-span-7">
          <EnquiryForm />
        </div>

        <div className="grid content-start gap-5 lg:col-span-5">
          <ContactCard icon={MapPin} title={t('contact.visitTitle')}>
            <p>{siteConfig.address}</p>
          </ContactCard>

          <ContactCard icon={Phone} title={t('contact.callTitle')}>
            <a href={siteConfig.phoneHref} className={linkClass}>
              {siteConfig.phone}
            </a>
            <p className="mt-3 flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
              {t('contact.hours')}
            </p>
          </ContactCard>

          <ContactCard icon={Mail} title={t('contact.emailTitle')}>
            <a href={`mailto:${siteConfig.email}`} className={`break-all ${linkClass}`}>
              {siteConfig.email}
            </a>
          </ContactCard>

          <ContactCard icon={MessageCircle} title={t('contact.whatsappTitle')}>
            <p>{t('contact.whatsappBody')}</p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-3 inline-block ${linkClass}`}
            >
              {t('footer.whatsapp')}
            </a>
          </ContactCard>

          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-2 shadow-card">
            <iframe
              title="Fortune Visa Services office location map"
              src="https://www.google.com/maps?q=Level+15,+60+Station+Street,+Parramatta+NSW+2150,+Australia&output=embed"
              width="100%"
              height="320"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl border-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
