import { CircleDollarSign, Compass, ShieldCheck, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/home/SectionHeading';

const BENEFITS: { key: 'clarity' | 'checks' | 'transparent' | 'personal'; icon: LucideIcon }[] = [
  { key: 'clarity', icon: Compass },
  { key: 'checks', icon: ShieldCheck },
  { key: 'transparent', icon: CircleDollarSign },
  { key: 'personal', icon: Users },
];

export function WhyFortune() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <Reveal>
        <SectionHeading title={t('home.why.title')} subtitle={t('home.why.subtitle')} />
      </Reveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map(({ key, icon: Icon }, index) => (
          <Reveal key={key} delay={index * 100}>
            <article className="group h-full rounded-3xl border border-slate-200/80 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-700 group-hover:text-white">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-lg font-bold text-ink">{t(`home.why.${key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(`home.why.${key}.body`)}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
