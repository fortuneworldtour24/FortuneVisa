import { AlertTriangle, Clock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { useSeo } from '@/hooks/useSeo';
import { siteConfig } from '@/config/siteConfig';

const TOC_ITEMS = [
  { id: 'overview', title: '1. Overview & Commitment' },
  { id: 'collection', title: '2. Information We Collect' },
  { id: 'how-collected', title: '3. How Information is Collected' },
  { id: 'purposes', title: '4. Purposes for Using Information' },
  { id: 'cookies', title: '5. Cookies & Tracking Technologies' },
  { id: 'disclosure', title: '6. Disclosure & Third Parties' },
  { id: 'security', title: '7. Data Security & Storage' },
  { id: 'rights', title: '8. Access & Correction Rights' },
  { id: 'complaints', title: '9. Complaints & OAIC Contact' },
  { id: 'contact', title: '10. Privacy Officer Contact' },
];

export function PrivacyPage() {
  useSeo({
    title: 'Privacy Policy',
    description:
      'Fortune Visa Services Privacy Policy. How we collect, handle, and safeguard your personal information under the Australian Privacy Act 1988 and Australian Privacy Principles.',
  });

  return (
    <>
      <PageHero
        eyebrow="Legal & Compliance"
        title="Privacy Policy"
        description="How Fortune Visa Services collects, holds, uses, and discloses personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles."
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
                This Privacy Policy is an indicative operational draft prepared for Fortune Visa Services to reflect
                our data handling processes under the <em>Privacy Act 1988 (Cth)</em> and the Australian Privacy Principles (APPs).
                This document is subject to ongoing review by an Australian-qualified legal practitioner prior to final commercial ratification.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Table of Contents Sticky Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-7">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-700">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
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

          {/* Main Legal Content */}
          <div className="space-y-12 lg:col-span-8">
            {/* Section 1 */}
            <article id="overview" className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                1. Overview & Commitment to Privacy
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                <p>
                  Fortune Visa Services (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates from Level 15,
                  60 Station Street, Parramatta, NSW 2150, Australia. We are committed to protecting the privacy of your
                  personal information in accordance with the <em>Privacy Act 1988 (Cth)</em> and the Australian Privacy
                  Principles (APPs).
                </p>
                <p>
                  This policy outlines how we collect, hold, use, disclose, and protect your personal information when you
                  visit our website, utilize our interactive visa checker or document checklist tools, or submit an enquiry.
                </p>
              </div>
            </article>

            {/* Section 2 */}
            <article id="collection" className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                2. Personal Information We Collect
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                <p>
                  The personal information we collect depends on the nature of your interaction with us. Information collected
                  via our enquiry form and consultation requests may include:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li><strong>Identity Information:</strong> Full legal name, preferred title, and passport nationality country code.</li>
                  <li><strong>Contact Details:</strong> Email address, mobile telephone number, and residential location.</li>
                  <li><strong>Travel & Visa Context:</strong> Intended travel destination, visa subclass/category of interest, planned travel dates, and current residency status.</li>
                  <li><strong>Enquiry Details:</strong> Specific questions, background context, or personal circumstances provided voluntarily in your message.</li>
                  <li><strong>Technical & Analytical Data:</strong> IP address, browser type, device information, and interaction records collected via cookies.</li>
                </ul>
              </div>
            </article>

            {/* Section 3 */}
            <article id="how-collected" className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                3. How We Collect Personal Information
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                <p>We collect personal information directly from you through reasonable and lawful means, including when you:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Complete our online enquiry form on our website;</li>
                  <li>Contact us directly by telephone, email, or WhatsApp messaging;</li>
                  <li>Save progress on our interactive document checklist (saved locally in your browser’s localStorage);</li>
                  <li>Interact with our website, where automated cookies and analytics scripts record telemetry data.</li>
                </ul>
              </div>
            </article>

            {/* Section 4 */}
            <article id="purposes" className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                4. Purposes for Using Your Information
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                <p>We only collect and use your personal information for purposes directly related to our business functions, including:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Responding to your visa enquiry and discussing document preparation services;</li>
                  <li>Providing personalized document checklists and verifying evidentiary readiness;</li>
                  <li>Communicating operational updates, consultation appointments, and administrative notices;</li>
                  <li>Protecting our services against spam, fraud, and bot submissions (via honeypot mechanisms);</li>
                  <li>Complying with applicable Australian statutory, legal, and regulatory obligations.</li>
                </ul>
                <p>We will never sell, rent, or trade your personal information to third parties for marketing purposes.</p>
              </div>
            </article>

            {/* Section 5 */}
            <article id="cookies" className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                5. Cookies & Tracking Technologies
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                <p>
                  Our website uses cookies and similar storage technologies (such as HTML5 LocalStorage) to enhance security,
                  remember your language preferences, and save document checklist progress.
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li><strong>Essential Cookies & Storage:</strong> Necessary for core site functionality, anti-spam validation, and checklist persistence.</li>
                  <li><strong>Analytical Cookies:</strong> Help us measure visitor engagement, popular visa guides, and interface performance.</li>
                </ul>
                <p>
                  You can manage your preferences at any time using our cookie consent banner or by adjusting your browser settings.
                  Disabling essential cookies may impact certain interactive features.
                </p>
              </div>
            </article>

            {/* Section 6 */}
            <article id="disclosure" className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                6. Disclosure to Third Parties
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                <p>We may disclose your personal information only to trusted third parties in the following circumstances:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li><strong>Cloud Infrastructure Providers:</strong> Managed database services (Supabase) that adhere to stringent enterprise-grade security standards;</li>
                  <li><strong>Professional Advisers:</strong> Registered migration agents or legal practitioners, strictly when you explicitly request referral for formal migration advice;</li>
                  <li><strong>Law Enforcement & Regulators:</strong> When required by Australian law, court order, or regulatory warrant.</li>
                </ul>
              </div>
            </article>

            {/* Section 7 */}
            <article id="security" className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                7. Data Security & Storage
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                <p>
                  We take reasonable administrative, technical, and physical precautions to safeguard your personal data against
                  loss, misuse, unauthorized access, modification, or disclosure:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>All web communications are encrypted in transit using industry-standard TLS (HTTPS).</li>
                  <li>Enquiry submissions stored in our database utilize Row-Level Security (RLS) to restrict unauthorized access.</li>
                  <li>We retain personal information only for as long as necessary to fulfil the purposes for which it was collected or to comply with statutory retention laws.</li>
                </ul>
              </div>
            </article>

            {/* Section 8 */}
            <article id="rights" className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                8. Your Rights Under Australian Privacy Principles
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                <p>Under the APPs, you possess distinct legal rights regarding your personal information:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li><strong>Access:</strong> You may request access to personal information we hold about you.</li>
                  <li><strong>Correction:</strong> If information we hold is inaccurate, incomplete, or out-of-date, you may request correction.</li>
                  <li><strong>Withdrawal of Consent:</strong> You may request that we delete or discontinue processing your contact details for enquiries.</li>
                </ul>
                <p>To exercise any of these rights, please contact our Privacy Officer in writing using the details below.</p>
              </div>
            </article>

            {/* Section 9 */}
            <article id="complaints" className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                9. Privacy Complaints & OAIC
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                <p>
                  If you have concerns about how we have handled your personal information, please contact our Privacy Officer.
                  We aim to acknowledge complaints within 5 business days and provide a substantive written response within 30 days.
                </p>
                <p>
                  If you are unsatisfied with our response, you may escalate your complaint to the <strong>Office of the Australian Information Commissioner (OAIC)</strong>:
                </p>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-700 sm:text-sm">
                  <p><strong>Website:</strong> <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-primary-700 underline">www.oaic.gov.au</a></p>
                  <p><strong>Phone:</strong> 1300 363 992</p>
                  <p><strong>Post:</strong> GPO Box 5218, Sydney NSW 2001</p>
                </div>
              </div>
            </article>

            {/* Section 10 */}
            <article id="contact" className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                10. Privacy Officer Contact Details
              </h2>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <p>For questions, access requests, or privacy concerns, please contact:</p>
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

