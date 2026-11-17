import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VisaSearchCard } from '@/components/home/VisaSearchCard';
import { HeroBackdrop, HeroImages } from '@/components/home/HeroDecor';

const CHIPS = ['consultation', 'documents', 'support'] as const;

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative isolate overflow-hidden">
      <HeroBackdrop />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left content column */}
          <div className="space-y-8 lg:col-span-6">
            <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-semibold text-indigo-700">
              {t('home.hero.pill', 'Visa help for Indian travellers')}
            </span>

            <h1 className="anim-in text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {t('home.hero.titleStart', 'Your visa,')}{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-amber-500 bg-clip-text text-transparent">
                {t('home.hero.titleAccent', 'sorted')}
              </span>
              .
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {t('home.hero.subtitle')}
            </p>

            {/* Existing checker card, unchanged */}
            <VisaSearchCard />

            <ul className="flex flex-wrap gap-2.5">
              {CHIPS.map((chip) => (
                <li
                  key={chip}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-ink shadow-sm"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-500/20 text-accent-700">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {t(`home.hero.chips.${chip}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* Right column: floating destination images (desktop), scroll row (mobile) */}
          <div className="lg:col-span-6">
            <HeroImages />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;