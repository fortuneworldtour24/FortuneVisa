import { ArrowRight, Briefcase, ClipboardCheck, GraduationCap, Map, Plane, Users, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { LucideIcon } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { buildEnquiryPath } from '@/lib/visaData';
import type { VisaType } from '@/lib/visaData';
import { ConsultationCta } from '@/components/ConsultationCta';
import { useSeo } from '@/hooks/useSeo';

type ServiceCategory = {
  key: string;
  visaType: VisaType;
  icon: LucideIcon;
};

const CATEGORIES: ServiceCategory[] = [
  { key: 'tourist', visaType: 'tourist', icon: Plane },
  { key: 'student', visaType: 'student', icon: GraduationCap },
  { key: 'skilled', visaType: 'work', icon: Briefcase },
  { key: 'family', visaType: 'family', icon: Users },
  { key: 'business', visaType: 'work', icon: Briefcase },
  { key: 'pathways', visaType: 'work', icon: Map },
  { key: 'documents', visaType: 'tourist', icon: Wrench },
];

export function ServicesPage() {
  const { t } = useTranslation();
  useSeo({
    title: 'Visa and Migration Services',
    description: 'Tourist, student, skilled, partner, business and migration pathway services from Fortune Visa Services in Parramatta.',
  });

  return (
    <>
      <PageHero
        eyebrow={t('services.eyebrow')}
        title={t('services.title')}
        description={t('services.description')}
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map(({ key, visaType, icon: Icon }) => (
            <article
              key={key}
              className="group flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-700 group-hover:text-white">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-lg font-bold text-ink">{t(`services.categories.${key}.title`)}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t(`services.categories.${key}.body`)}</p>
              <div className="mt-6">
                <Link
                  to={buildEnquiryPath({ visaType })}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-800"
                >
                  {t('services.enquire')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-slate-200/80 bg-background p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-500/15 text-accent-700">
              <ClipboardCheck className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-ink">{t('checklist.title')}</h2>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">{t('checklist.description')}</p>
              <Link
                to="/checklist"
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-primary-200 hover:bg-primary-50"
              >
                {t('nav.checklist')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
