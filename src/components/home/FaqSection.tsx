import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/home/SectionHeading';

const FAQ_IDS = [1, 2, 3, 4, 5, 6] as const;

export function FaqSection() {
  const { t } = useTranslation();
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <Reveal>
        <SectionHeading title={t('home.faq.title')} subtitle={t('home.faq.subtitle')} align="center" />
      </Reveal>
      <div className="mt-12 space-y-3">
        {FAQ_IDS.map((id) => {
          const isOpen = openId === id;
          const panelId = `faq-panel-${id}`;
          const buttonId = `faq-button-${id}`;
          return (
            <Reveal key={id}>
              <div
                className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-200 ${
                  isOpen ? 'border-primary-200 shadow-card' : 'border-slate-200 hover:border-primary-100'
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : id)}
                    className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                  >
                    <span className="text-base font-semibold text-ink">{t(`home.faq.q${id}.question`)}</span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen ? 'rotate-180 bg-primary-700 text-white' : 'bg-slate-100 text-ink'
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6 sm:text-base">
                      {t(`home.faq.q${id}.answer`)}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
