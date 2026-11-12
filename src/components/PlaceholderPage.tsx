import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageHero } from '@/components/PageHero';

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PlaceholderPage({ eyebrow, title, description }: PlaceholderPageProps) {
  const { t } = useTranslation();

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-card sm:p-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-700">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {t('placeholder.comingSoon')}
          </span>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">{t('placeholder.body')}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-700 px-6 py-3 text-sm font-semibold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-primary-800"
            >
              {t('placeholder.contactUs')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-slate-50"
            >
              {t('placeholder.backHome')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
