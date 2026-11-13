import { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Globe2, Clock, Check, ChevronDown, ChevronUp, Link as LinkIcon, Scroll, ShieldCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '@/components/EmptyState';
import { useSeo } from '@/hooks/useSeo';
import { buildEnquiryPath, findDestination } from '@/lib/visaData';
import type { Destination, VisaTypeInfo } from '@/lib/visaData';
import { RequirementBadge } from '@/components/visa/RequirementBadge';

const TABS = [
  { id: 'visa-types', label: 'Visa Types' },
  { id: 'overview', label: 'Overview' },
  { id: 'process', label: 'Process' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'faqs', label: 'FAQs' },
] as const;

export function DestinationDetailPage() {
  const { t } = useTranslation();
  const { country } = useParams<{ country: string }>();
  const destination = country ? findDestination(country) : undefined;
  const [activeTab, setActiveTab] = useState<'visa-types' | 'overview' | 'process' | 'benefits' | 'faqs'>('visa-types');
  const [selectedVisaType, setSelectedVisaType] = useState<string>('');
  const [openFaq, setOpenFaq] = useState<number>(-1);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useSeo({
    title: destination ? `${destination.country} Visa Guide` : 'Destination Not Found',
    description: destination
      ? `Indicative visa requirements, fees, processing times and validity for ${destination.country} from Fortune Visa Services.`
      : undefined,
  });

  if (!destination) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <EmptyState
          icon={<Globe2 className="h-7 w-7" aria-hidden="true" />}
          title={t('destinationDetail.notFoundTitle')}
          body={t('destinationDetail.notFoundBody')}
          action={
            <Link
              to="/destinations"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary-700 px-6 text-sm font-semibold text-white shadow-card transition-colors hover:bg-primary-800"
            >
              {t('destinationDetail.notFoundCta')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />
      </section>
    );
  }

  const visaTypeList = destination.visaTypes;
  if (!selectedVisaType && visaTypeList.length > 0) {
    setSelectedVisaType(visaTypeList[0].type);
  }
  const selectedVisa = visaTypeList.find((v) => v.type === selectedVisaType) ?? visaTypeList[0];

  const totalAUD = selectedVisa?.indicativeFee
    ? selectedVisa.indicativeFee.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })
    : '';

  const scrollToSection = useCallback((id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const headerOffset = 120;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }, []);


  return (
    <>
      {/* Hero with large rounded image */}
      <section className="relative">
        <img
          src={destination.imageUrl}
          alt={t('destinationDetail.heroAlt', { country: destination.country })}
          className="h-64 w-full rounded-3xl object-cover shadow-card sm:h-80 lg:h-96"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 sm:p-8 lg:p-10">
          <h1 className="text-2xl font-extrabold uppercase tracking-wide text-white sm:text-3xl lg:text-4xl">
            {destination.country} visa
          </h1>
          <div className="mt-3 flex flex-wrap gap-2">
            {destination.highlights.slice(0, 3).map((h) => (
              <span
                key={h}
                className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky tab bar */}
      <nav className="sticky top-20 z-30 border-b border-slate-200/70 bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto pb-2 whitespace-nowrap sm:pb-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  scrollToSection(tab.id);
                }}
                className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary-700 border-b-2 border-primary-700'
                    : 'text-slate-600 border-b-2 border-transparent hover:text-slate-900 hover:border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main content sections */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Visa Types */}
        <section id="visa-types" ref={(el) => (sectionRefs.current['visa-types'] = el)} className="mb-16">
          <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-ink">{t('destinationDetail.visaTypesHeading')}</h2>
            {destination.visaTypes.length > 0 ? (
              <div className="grid gap-6">
                {destination.visaTypes.map((visa) => (
                  <article
                    key={visa.type}
                    className={`flex flex-col rounded-3xl border p-6 shadow-card sm:p-8 ${
                      visa.type === selectedVisaType
                        ? 'border-primary-300 bg-primary-50/50'
                        : 'border-slate-200/80 bg-white'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-xl font-bold text-ink">{t(`visaTypes.${visa.type}`)}</h3>
                      <RequirementBadge required={visa.required} />
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t('destinationDetail.validity')}</span>
                        <span className="font-medium">{visa.validity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t('destinationDetail.maximumStay')}</span>
                        <span className="font-medium">{visa.maximumStay}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t('destinationDetail.typicalProcessing')}</span>
                        <span className="font-medium">{visa.typicalProcessing}</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Link
                        to={buildEnquiryPath({ destination: destination.slug, visaType: visa.type })}
                        className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary-700 px-6 text-base font-semibold text-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-800 hover:shadow-lift"
                      >
                        {t('destinationDetail.enquire')}
                        <ArrowRight className="h-5 w-5" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Globe2 className="h-7 w-7" aria-hidden="true" />}
                title={t('destinationDetail.noVisaTypes')}
                body={t('checker.empty.body')}
              />
            )}
        </section>

        {/* Overview */}
        <section id="overview" ref={(el) => (sectionRefs.current['overview'] = el)} className="mb-16">
          <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-ink">{t('destinationDetail.overview')}</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <Scroll className="h-6 w-6 text-primary-700" aria-hidden="true" />
                <span className="text-sm font-semibold text-slate-600">{t('destinationDetail.purpose')}</span>
              </div>
              <p className="text-sm text-slate-600">{selectedVisa?.purpose ?? t('destinationDetail.noPurpose')}</p>
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="h-6 w-6 text-primary-700" aria-hidden="true" />
                <span className="text-sm font-semibold text-slate-600">{t('destinationDetail.validFor')}</span>
              </div>
              <p className="text-sm text-slate-600">{selectedVisa?.validity ?? t('destinationDetail.noValidity')}</p>
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="h-6 w-6 text-primary-700" aria-hidden="true" />
                <span className="text-sm font-semibold text-slate-600">{t('destinationDetail.stayFor')}</span>
              </div>
              <p className="text-sm text-slate-600">{selectedVisa?.stayFor ?? t('destinationDetail.noStayFor')}</p>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" ref={(el) => (sectionRefs.current['process'] = el)} className="mb-16">
          <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-ink">{t('destinationDetail.process')}</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {selectedVisa?.steps.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center text-center rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-card group">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 text-white mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-4 w-4 text-primary-700" aria-hidden="true" />
                  <h3 className="text-sm font-semibold text-ink">{step.title}</h3>
                </div>
                <p className="text-sm text-slate-600">{step.duration}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" ref={(el) => (sectionRefs.current['benefits'] = el)} className="mb-16">
          <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-ink">{t('destinationDetail.benefits')}</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {destination.highlights.map((highlight, index) => (
              <div
                key={highlight}
                className="flex items-center gap-3 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-card"
              >
                <ShieldCheck className="h-5 w-5 text-primary-700 shrink-0" aria-hidden="true" />
                <p className="text-sm text-slate-600">{highlight}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" ref={(el) => (sectionRefs.current['faqs'] = el)} className="mb-16">
          <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-ink">{t('destinationDetail.faqs')}</h2>
          <div className="space-y-3">
            {selectedVisa?.faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="rounded-3xl border border-slate-200/80 bg-white shadow-card"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="flex w-full items-center justify-between p-4 sm:p-6 text-left"
                  aria-expanded={openFaq === index}
                >
                  <span className="text-sm font-medium text-ink">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="h-4 w-4 text-slate-400 transition-transform" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400 transition-transform" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-4 sm:px-6 pb-4 border-t border-slate-100/50">
                    <p className="text-sm text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>


      {/* Mobile fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <span className="text-sm font-semibold text-slate-600">
            {totalAUD} · {t('destinationDetail.travellers')}: 1
          </span>
          <Link
            to={buildEnquiryPath({ destination: destination.slug, visaType: selectedVisaType })}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-primary-700 px-6 text-sm font-semibold text-white shadow-card transition-colors hover:bg-primary-800"
          >
            {t('destinationDetail.enquire')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  );
}


