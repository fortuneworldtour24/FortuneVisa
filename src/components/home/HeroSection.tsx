import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VisaSearchCard } from '@/components/home/VisaSearchCard';

const HERO_IMAGE =
  'https://images.pexels.com/photos/15571947/pexels-photo-15571947.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const CHIPS = ['consultation', 'documents', 'support'] as const;

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[40rem] bg-gradient-to-b from-primary-50 to-background" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="space-y-8 lg:col-span-6">
          <div className="space-y-5">
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {t('home.hero.title')}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">{t('home.hero.subtitle')}</p>
          </div>

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

        <div className="relative lg:col-span-6">
          <div className="overflow-hidden rounded-[2rem] shadow-lift">
            <img
              src={HERO_IMAGE}
              alt={t('home.hero.imageAlt')}
              className="aspect-[4/3] w-full object-cover lg:aspect-[5/6]"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
