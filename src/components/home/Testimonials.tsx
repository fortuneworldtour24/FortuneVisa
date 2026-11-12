import { Quote, UserRound } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/home/SectionHeading';

const TESTIMONIAL_IDS = [1, 2, 3] as const;

export function Testimonials() {
  const { t } = useTranslation();

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <SectionHeading title={t('home.testimonials.title')} subtitle={t('home.testimonials.subtitle')} />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIAL_IDS.map((id, index) => (
            <Reveal key={id} delay={index * 100}>
              <figure className="flex h-full flex-col rounded-3xl border border-dashed border-slate-300 bg-background p-7">
                <div className="flex items-center justify-between">
                  <Quote className="h-8 w-8 text-accent-500" aria-hidden="true" />
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-700">
                    {t('home.testimonials.placeholderBadge')}
                  </span>
                </div>
                <blockquote className="mt-6 flex-1 text-base leading-relaxed text-ink">
                  {t('home.testimonials.quote')}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                    <UserRound className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-bold text-ink">{t('home.testimonials.name')}</span>
                    <span className="text-xs text-muted">{t('home.testimonials.visa')}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
