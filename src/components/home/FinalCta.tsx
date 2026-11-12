import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/Reveal';

export function FinalCta() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-primary-700 px-6 py-12 text-white shadow-lift sm:px-12 sm:py-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent-500/20 blur-2xl" aria-hidden="true" />
          <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-3">
              <h2 className="text-3xl font-extrabold leading-[1.2] tracking-tight sm:text-4xl">{t('home.cta.title')}</h2>
              <p className="text-base leading-relaxed text-primary-100">{t('home.cta.body')}</p>
            </div>
            <Link
              to="/contact"
              className="inline-flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-accent-500 px-8 py-3.5 text-base font-bold text-ink shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-400 hover:shadow-lift"
            >
              {t('home.cta.button')}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
