import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, Globe2, Phone, ShieldCheck, X } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '@/components/EmptyState';
import { RequirementBadge } from '@/components/visa/RequirementBadge';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { ExtraVisaInfo } from '@/components/destinations/ExtraVisaInfo';
import { EnquirySidebar } from '@/components/destinations/EnquirySidebar';
import { useSeo } from '@/hooks/useSeo';
import { findDestination } from '@/lib/visaData';
import type { Destination } from '@/lib/visaData';
import { formatMoney } from '@/lib/money';
import { PHONE_TEL } from '@/lib/contactInfo';


type TabId = 'visa-types' | 'overview' | 'process' | 'benefits' | 'faqs';

export function DestinationDetailPage() {
  const { t } = useTranslation();
  const { country } = useParams<{ country: string }>();
  const destination = country ? findDestination(country) : undefined;

  const [activeTab, setActiveTab] = useState<TabId>('visa-types');
  const [selectedType, setSelectedType] = useState('');
  const [openFaq, setOpenFaq] = useState(-1);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [heroBroken, setHeroBroken] = useState(false);

  const slug = destination?.slug;

  useSeo({
    title: destination ? `${destination.country} Visa Guide` : 'Destination Not Found',
    description: destination
      ? `Indicative visa requirements, fees, processing times and validity for ${destination.country} for Indian travellers, from Fortune Visa Services.`
      : undefined,
  });

  // Reset page state when moving to another destination
  useEffect(() => {
    setSelectedType('');
    setOpenFaq(-1);
    setSheetOpen(false);
    setHeroBroken(false);
  }, [slug]);

  const visas = destination?.visaTypes ?? [];
  const selectedVisa = visas.find((v) => v.type === selectedType) ?? visas[0];
  const faqs = selectedVisa?.faqs ?? [];
  const steps = selectedVisa?.steps ?? [];
  const highlights = destination?.highlights ?? [];

  const tabs: { id: TabId; label: string }[] = [
    { id: 'visa-types' as TabId, label: t('destinationDetail.tabs.visaTypes', 'Visa types'), show: visas.length > 0 },
    { id: 'overview' as TabId, label: t('destinationDetail.tabs.overview', 'Overview'), show: Boolean(selectedVisa) },
    { id: 'process' as TabId, label: t('destinationDetail.tabs.process', 'Process'), show: steps.length > 0 },
    { id: 'benefits' as TabId, label: t('destinationDetail.tabs.benefits', 'Benefits'), show: true },
    { id: 'faqs' as TabId, label: t('destinationDetail.tabs.faqs', 'FAQs'), show: faqs.length > 0 },
  ]
    .filter((x) => x.show)
    .map(({ id, label }) => ({ id, label }));

  const tabKey = tabs.map((x) => x.id).join('|');

  // Highlight the tab of the section currently on screen
  useEffect(() => {
    const els = tabKey
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0 || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setActiveTab(top.target.id as TabId);
      },
      { rootMargin: '-150px 0px -55% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [tabKey]);

  // Mobile enquiry sheet: close on Escape and lock page scroll
  useEffect(() => {
    if (!sheetOpen) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSheetOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [sheetOpen]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  if (!destination) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <EmptyState
          icon={<Globe2 className="h-7 w-7" aria-hidden="true" />}
          title={t('destinationDetail.notFoundTitle', 'Destination not found')}
          body={t('destinationDetail.notFoundBody', 'We could not find that destination.')}
          action={
            <Link
              to="/destinations"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary-700 px-6 text-sm font-semibold text-white shadow-card transition-colors hover:bg-primary-800"
            >
              {t('destinationDetail.notFoundCta', 'Browse destinations')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />
      </section>
    );
  }

  const iso = ((destination as Destination & { iso_code?: string }).iso_code ?? '').toLowerCase();
  const relatedSlugs = (destination as Destination & { relatedDestinations?: string[] }).relatedDestinations ?? [];
  const related = relatedSlugs
    .map((s) => findDestination(s))
    .filter((d): d is Destination => Boolean(d));

  const onRequest = t('destinations.onRequest', 'On request');
  const feeOf = (fee?: number) => (fee && fee > 0 ? formatMoney(fee) : onRequest);
  const feeText = feeOf(selectedVisa?.indicativeFee);

  const sidebarProps = {
    country: destination.country,
    slug: destination.slug,
    visaTypes: visas.map((v) => ({ type: v.type, label: t(`visaTypes.${v.type}`, v.type) })),
    selectedType: selectedVisa?.type ?? '',
    onTypeChange: setSelectedType,
    feeText,
  };

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-900 shadow-card">
          {destination.imageUrl && !heroBroken ? (
            <img
              src={destination.imageUrl}
              alt={destination.country}
              onError={() => setHeroBroken(true)}
              className="h-64 w-full object-cover sm:h-80 lg:h-96"
            />
          ) : (
            <div className="h-64 w-full sm:h-80 lg:h-96" />
          )}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3">
              {iso ? (
                <span className="inline-flex h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/80">
                  <span className={`fi fis fi-${iso}`} style={{ fontSize: 40, lineHeight: 1 }} />
                </span>
              ) : null}
              <h1 className="text-2xl font-extrabold uppercase tracking-wide text-white sm:text-3xl lg:text-4xl">
                {destination.country} visa
              </h1>
            </div>
            {highlights.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {highlights.slice(0, 3).map((h) => (
                  <span key={h} className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                    {h}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Sticky tab bar */}
      <nav aria-label="Page sections" className="sticky top-20 z-30 mt-6 border-b border-slate-200/70 bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto whitespace-nowrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  scrollToSection(tab.id);
                }}
                className={`inline-flex items-center px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.id
                  ? 'border-b-2 border-primary-700 text-primary-700'
                  : 'border-b-2 border-transparent text-slate-600 hover:text-slate-900'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-10 pb-28 sm:px-6 lg:px-8 lg:py-14 lg:pb-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left: content */}
          <div className="min-w-0 space-y-14 lg:col-span-7">
            {visas.length > 0 ? (
              <section id="visa-types" className="scroll-mt-40">
                <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-ink">
                  {t('destinationDetail.visaTypesHeading', 'Visa types')}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {visas.map((visa) => {
                    const active = visa.type === selectedVisa?.type;
                    return (
                      <button
                        key={visa.type}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setSelectedType(visa.type)}
                        className={`rounded-2xl border p-4 text-left transition ${active ? 'border-primary-300 bg-primary-50/50 ring-2 ring-primary-100' : 'border-slate-200/80 bg-white hover:border-slate-300'
                          }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-base font-bold capitalize text-ink">{t(`visaTypes.${visa.type}`, visa.type)}</h3>
                          <RequirementBadge required={visa.required} />
                        </div>
                        <dl className="mt-3 space-y-1.5 text-sm text-slate-600">
                          <div className="flex justify-between gap-3">
                            <dt className="text-slate-500">{t('destinationDetail.validity', 'Validity')}</dt>
                            <dd className="text-right font-medium">{visa.validity}</dd>
                          </div>
                          <div className="flex justify-between gap-3">
                            <dt className="text-slate-500">{t('destinationDetail.maximumStay', 'Maximum stay')}</dt>
                            <dd className="text-right font-medium">{visa.maximumStay}</dd>
                          </div>
                          <div className="flex justify-between gap-3">
                            <dt className="text-slate-500">{t('destinationDetail.typicalProcessing', 'Typical processing')}</dt>
                            <dd className="text-right font-medium">{visa.typicalProcessing}</dd>
                          </div>
                        </dl>
                        <p className="mt-3 text-sm font-bold text-primary-700">{feeOf(visa.indicativeFee)}</p>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-4 text-xs text-slate-500">
                  {t('destinationDetail.indicativeNote', 'Fees and times are indicative and can change. We confirm the current details before you apply.')}
                </p>
              </section>
            ) : (
              <EmptyState
                icon={<Globe2 className="h-7 w-7" aria-hidden="true" />}
                title={t('destinationDetail.noVisaTypes', 'No visa types listed yet')}
                body={t('destinationDetail.noVisaTypesBody', 'Send us an enquiry and we will help.')}
              />
            )}

            {selectedVisa ? (
              <section id="overview" className="scroll-mt-40">
                <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-ink">{t('destinationDetail.overview', 'Overview')}</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: t('destinationDetail.purpose', 'Purpose'), value: selectedVisa.purpose },
                    { label: t('destinationDetail.validFor', 'Valid for'), value: selectedVisa.validity },
                    { label: t('destinationDetail.stayFor', 'Stay for'), value: selectedVisa.stayFor },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</p>
                      <p className="mt-2 text-sm text-slate-700">{item.value || '—'}</p>
                    </div>
                  ))}
                </div>
                {selectedVisa.notes ? <p className="mt-4 text-sm leading-relaxed text-slate-600">{selectedVisa.notes}</p> : null}
                <ExtraVisaInfo visa={selectedVisa} />
              </section>
            ) : null}

            {steps.length > 0 ? (
              <section id="process" className="scroll-mt-40">
                <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-ink">{t('destinationDetail.process', 'Process')}</h2>
                <ol className="space-y-3">
                  {steps.map((step, i) => (
                    <li key={step.title} className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-700 text-sm font-bold text-white">{i + 1}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-ink">{step.title}</p>
                        <p className="text-sm text-slate-600">{step.duration}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            <section id="benefits" className="scroll-mt-40">
              <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-ink">{t('destinationDetail.benefits', 'Why apply with us')}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  t('destinationDetail.benefit1', 'Free consultation and eligibility check'),
                  t('destinationDetail.benefit2', 'We review your documents before submission'),
                  t('destinationDetail.benefit3', 'Written quote with government fee and service fee shown separately'),
                  t('destinationDetail.benefit4', 'Pay us directly after your consultation, never on this website'),
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-primary-700" aria-hidden="true" />
                    <p className="text-sm text-slate-700">{text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                {t('destinationDetail.noGuarantee', 'The immigration authority makes every visa decision. We cannot guarantee approval.')}{' '}
                <Link to="/pricing" className="font-semibold text-primary-700 hover:underline">{t('destinationDetail.pricingLink', 'How pricing works')}</Link>
                {' · '}
                <Link to="/refund-policy" className="font-semibold text-primary-700 hover:underline">{t('destinationDetail.refundLink', 'Refund policy')}</Link>
              </p>
            </section>

            {faqs.length > 0 ? (
              <section id="faqs" className="scroll-mt-40">
                <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-ink">{t('destinationDetail.faqs', 'Frequently asked questions')}</h2>
                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <div key={faq.question} className="rounded-2xl border border-slate-200/80 bg-white shadow-card">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                        className="flex w-full items-center justify-between gap-3 p-4 text-left"
                        aria-expanded={openFaq === index}
                      >
                        <span className="text-sm font-medium text-ink">{faq.question}</span>
                        {openFaq === index ? <ChevronUp className="h-4 w-4 shrink-0 text-slate-400" /> : <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />}
                      </button>
                      {openFaq === index ? (
                        <div className="border-t border-slate-100 px-4 pb-4 pt-3">
                          <p className="text-sm text-slate-600">{faq.answer}</p>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          {/* Right: sticky enquiry form (desktop) */}
          <aside className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-40">
              <EnquirySidebar {...sidebarProps} />
            </div>
          </aside>
        </div>

        {related.length > 0 ? (
          <section className="mt-16">
            <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-ink">
              {t('destinationDetail.moreDestinations', 'Explore more destinations')}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((d) => (
                <DestinationCard key={d.slug} destination={d} />
              ))}
            </div>
          </section>
        ) : null}
      </div>

      {/* Mobile and tablet bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 pr-24">
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white text-sm font-semibold text-slate-800"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call now
          </a>
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary-700 text-sm font-semibold text-white shadow-card"
          >
            {t('destinationDetail.enquire', 'Enquire')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile enquiry sheet */}
      {sheetOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Enquiry form">
          <button type="button" aria-label="Close" className="absolute inset-0 bg-black/50" onClick={() => setSheetOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-slate-50 p-4 pb-8">
            <div className="mb-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                aria-label="Close enquiry form"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <EnquirySidebar {...sidebarProps} />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default DestinationDetailPage;