import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type ConsultationCtaProps = {
  className?: string;
};

export function ConsultationCta({ className = '' }: ConsultationCtaProps) {
  const { t } = useTranslation();

  return (
    <section className={`mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 ${className}`}>
      <div className="overflow-hidden rounded-3xl bg-primary-700 px-6 py-10 text-center shadow-lift sm:px-12 sm:py-14">
        <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{t('consultation.title')}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-primary-100 sm:text-base">{t('consultation.body')}</p>
        <Link
          to="/contact"
          className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-primary-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-50"
        >
          {t('consultation.cta')}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
