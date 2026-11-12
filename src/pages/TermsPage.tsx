import { AlertTriangle, Clock, Mail, MapPin, Phone, Scale } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { useSeo } from '@/hooks/useSeo';
import { siteConfig } from '@/config/siteConfig';

const TOC_ITEMS = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'regulatory-scope', title: '2. Regulatory Status & Scope' },
  { id: 'no-guarantee', title: '3. No Guarantee of Visa Outcomes' },
  { id: 'consumer-law', title: '4. Australian Consumer Law (ACL)' },
  { id: 'client-duties', title: '5. Client Responsibilities & Accuracy' },
  { id: 'fees-refunds', title: '6. Indicative Fees & Payment' },
  { id: 'intellectual-property', title: '7. Intellectual Property & Site Use' },
  { id: 'liability', title: '8. Limitation of Liability' },
  { id: 'governing-law', title: '9. Governing Law & Jurisdiction' },
  { id: 'contact', title: '10. Contact Information' },
];

export function TermsPage() {
  useSeo({
    title: 'Terms of Use',
    description:
      'Fortune Visa Services Terms of Use. Service scope, Australian Consumer Law protections, non-guarantee of visa grants, and client responsibilities.',
  });

  return (
    <>
      <PageHero
        eyebrow="Legal & Terms"
        title="Terms of Use"
        description="The terms and conditions governing your use of the Fortune Visa Services website, tools, and administrative document preparation services."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Legal Draft Notice */}
        <div className="mb-10 rounded-3xl border border-amber-200 bg-amber-50/70 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-800">Draft Document Notice</p>
              <h2 className="mt-1 text-base font-bold text-amber-950 sm:text-lg">
                Draft Pending Formal Legal Review
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-amber-900 sm:text-sm">
                These Terms of Use are an indicative operational draft prepared for Fortune Visa Services in compliance
                with Australian law, including Schedule 2 of the <em>Competition and Consumer Act 2010 (Cth)</em> (Australian Consumer Law).
                This document is subject to formal review by an Australian-qualified legal practitioner prior to commercial finalization.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Table of Contents Sticky Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-7">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-700">
                <Scale className="h-4 w-4" aria-hidden="true" />
                Table of Contents
              </div>
              <nav aria-label="Table of Contents" className="mt-4">
                <ul className="space-y-2 text-xs font-semibold sm:text-sm">
                  {TOC_ITEMS.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block rounded-xl px-3 py-2 text-muted transition-colors hover:bg-primary-50 hover:text-primary-700"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-6 border-t border-slate-100 pt-4 text-xs text-muted">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  Last updated: November 2026
                </span>
              </div>
            </div>
          </aside>

          {/* Main Terms Content */}
          <div className="space-y-12 lg:col-span-8">
            {/* Section 1 */}
            <article id="acceptance" className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                1. Acceptance of Terms
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                <p>
                  These Terms of Use (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;User&rdquo; or &ldquo;Client&rdquo;)
                  and Fortune Visa Services (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), registered in New South Wales, Australia.
                </p>
                <p>
                  By accessing our website, using our interactive visa checker or document checklist tools, or submitting an enquiry,
                  you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
                </p>
              </div>
            </article>

            {/* Section 2 */}
            <article id="regulatory-scope" className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                2. Regulatory Scope & Nature of Services
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                <div className="rounded-2xl border border-primary-100 bg-primary-50/70 p-4 text-sm font-semibold text-primary-900">
                  IMPORTANT NOTICE: Fortune Visa Services provides administrative document preparation and general information only.
                  We are not registered migration agents (MARA) and do not provide immigration or legal advice.
                </div>
                <p>
                  Our services are strictly limited to clerical document checking, formatting support, certified translation coordination,
                  and administrative assistance. Nothing on this website or in our communications constitutes formal migration advice under
                  the <em>Migration Act 1958 (Cth)</em>.
                </p>
                <p>
                  If your circumstances require legal advice, formal representation before the Administrative Review Tribunal (ART), or
                  statutory migration assessment, you must consult a registered migration agent or an Australian legal practitioner.
                </p>
              </div>
            </article>

            {/* Section 3 */}
            <article id="no-guarantee" className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                3. No Guarantee of Visa Outcomes or Processing Times
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                <p>
                  All visa grant decisions are made exclusively at the sovereign discretion of the Australian Department of Home Affairs
                  (or relevant foreign government authorities).
                </p>
                <p>
                  <strong>Fortune Visa Services cannot and does not guarantee that any visa application will be granted, nor do we guarantee processing timeframes.</strong>
                </p>
                <p>
                  Processing durations and government visa application fees (VAC) displayed on our website are indicative estimates only,
                  derived from publicly available benchmarks, and may change at any time without notice.
                </p>
              </div>
            </article>

            {/* Section 4 */}
            <article id="consumer-law" className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                4. Australian Consumer Law (ACL) Protections
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                <p>
                  Nothing in these Terms excludes, restricts, or modifies any statutory guarantees, rights, or remedies that you are entitled to
                  under Schedule 2 of the <em>Competition and Consumer Act 2010 (Cth)</em> (the Australian Consumer Law) that cannot lawfully be excluded.
                </p>
                <p>
                  Where services provided fail to meet an applicable consumer guarantee under the ACL, you are entitled to statutory remedies,
                  including having the services resupplied with due care and skill, or a refund for a major failure.
                </p>
              </div>
            </article>

            {/* Section 5 */}
            <article id="client-duties" className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                5. Client Responsibilities & Document Authenticity
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                <p>As a client utilizing our document review services, you warrant and agree that:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>All information, statements, and documentation you provide to us are truthful, genuine, and accurate;</li>
                  <li>You will not provide fraudulent, misleading, or counterfeit documents (under Australian law, providing bogus documents can trigger a 10-year visa exclusion period under PIC 4020);</li>
                  <li>You are solely responsible for verifying the completeness of your final lodgement before submitting to government authorities.</li>
                </ul>
              </div>
            </article>

            {/* Section 6 */}
            <article id="fees-refunds" className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                6. Service Fees, Government Charges & Refunds
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                <p>
                  Initial online enquiries, standard document checklists, and preliminary consultations are provided free of charge.
                  Where formal document checking or translation packages are contracted, specific fee agreements will be provided prior to commencement.
                </p>
                <p>
                  Government Visa Application Charges (VAC) and third-party fees (such as biometric testing, medical examinations, or police checks)
                  are paid directly by you to the relevant government authorities or third-party providers and are strictly non-refundable by Fortune Visa Services.
                </p>
              </div>
            </article>

            {/* Section 7 */}
            <article id="intellectual-property" className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                7. Intellectual Property & Site Use
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                <p>
                  All content, text, designs, brand graphics, checklists, and software code on this website are the intellectual property of
                  Fortune Visa Services or our licensors and are protected under the <em>Copyright Act 1968 (Cth)</em>.
                </p>
                <p>
                  You are granted a limited, revocable licence to access the site and print checklists for personal, non-commercial use.
                  You must not scrape, reproduce, republish, or commercially exploit any content without prior written permission.
                </p>
              </div>
            </article>

            {/* Section 8 */}
            <article id="liability" className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                8. Limitation of Liability
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                <p>
                  To the maximum extent permitted by Australian law and subject to your non-excludable rights under the ACL:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Our total liability for any claim arising out of our services is limited to resupplying the services or refunding the fee paid to us;</li>
                  <li>We are not liable for indirect, consequential, economic, or punitive damages, including missed flight costs, loss of employment opportunities, or delays resulting from government processing;</li>
                  <li>We are not liable for visa refusals or cancellations decided by government departments.</li>
                </ul>
              </div>
            </article>

            {/* Section 9 */}
            <article id="governing-law" className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                9. Governing Law & Jurisdiction
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                <p>
                  These Terms are governed by and construed in accordance with the laws of the State of New South Wales and the Commonwealth of Australia.
                  You irrevocably submit to the exclusive jurisdiction of the courts of New South Wales.
                </p>
              </div>
            </article>

            {/* Section 10 */}
            <article id="contact" className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                10. Contact Us Regarding Terms
              </h2>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <p>If you have questions regarding these Terms of Use, please reach out to our office:</p>
                <div className="mt-3 space-y-2 font-medium">
                  <p className="flex items-center gap-2.5">
                    <MapPin className="h-4 w-4 text-primary-700" aria-hidden="true" />
                    <span>{siteConfig.name}, {siteConfig.address}</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-primary-700" aria-hidden="true" />
                    <a href={siteConfig.phoneHref} className="text-primary-700 underline">{siteConfig.phone}</a>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-primary-700" aria-hidden="true" />
                    <a href={`mailto:${siteConfig.email}`} className="text-primary-700 underline">{siteConfig.email}</a>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

