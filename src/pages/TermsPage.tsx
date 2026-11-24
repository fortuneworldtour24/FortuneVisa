import { Link } from 'react-router-dom';
import { LegalDocument } from '@/components/LegalDocument';
import type { LegalSection } from '@/components/LegalDocument';
import { useSeo } from '@/hooks/useSeo';

const EMAIL = 'contact@fortunevisaservices.in';
const PHONE = '+91 84509 55550';
const ADDRESS = 'Kirti Nagar, New Delhi 110015, India';

const sections: LegalSection[] = [
  {
    id: 'acceptance',
    title: 'Acceptance of terms',
    body: (
      <p>
        By using this website or asking us for help, you agree to these terms. If you do not agree, please do not use the site
        or our services.
      </p>
    ),
  },
  {
    id: 'who-we-are',
    title: 'Who we are and what we do',
    body: (
      <>
        <p>
          Fortune Visa Services is an early-stage visa guidance business based at {ADDRESS}. We help travellers understand
          visa requirements, prepare documents and submit applications.
        </p>
        <p>
          We are not a government body, embassy, consulate or visa centre, and we are not a law firm. We do not provide legal
          advice, and we do not offer overseas job placement or recruitment services.
        </p>
      </>
    ),
  },
  {
    id: 'no-guarantee',
    title: 'No guarantee of visa outcomes',
    body: (
      <p>
        Only the immigration authority of the destination country decides whether to grant a visa, how long it takes and what
        conditions apply. We cannot guarantee approval, a particular processing time or entry to any country.
      </p>
    ),
  },
  {
    id: 'information',
    title: 'Information on this website',
    body: (
      <p>
        Visa rules, fees and processing times change often. The information on this site is general and indicative. We try to
        keep it accurate, but you should confirm the current position with us and with the official source before you book
        travel or pay for anything that depends on it.
      </p>
    ),
  },
  {
    id: 'responsibilities',
    title: 'Your responsibilities',
    body: (
      <>
        <p>You agree that:</p>
        <ul>
          <li>the information and documents you give us are true, complete and genuine;</li>
          <li>you will tell us about any previous visa refusal, deportation or overstay;</li>
          <li>you will keep your passport valid for the period the destination requires;</li>
          <li>you are responsible for your travel bookings and for following the entry rules of the destination.</li>
        </ul>
        <p>We may decline or stop work on an application if we believe a document is false or misleading.</p>
      </>
    ),
  },
  {
    id: 'fees',
    title: 'Fees and payment',
    body: (
      <>
        <p>
          Prices are not fixed on this website. After a free consultation, we give you a written quote that shows the
          government fee, any visa centre fee and our service fee separately.
        </p>
        <p>
          You pay us directly after the consultation, not through this website. Government and visa centre fees are paid to
          those bodies and are set by them. See our <Link to="/pricing" className="font-semibold text-primary-700 hover:underline">Pricing</Link> page.
        </p>
      </>
    ),
  },
  {
    id: 'refunds',
    title: 'Refunds',
    body: (
      <p>
        If we have not yet submitted your application, you are entitled to a full refund. Once we have submitted it, fees are
        not refundable, including if the visa is refused. The full rules are in our{' '}
        <Link to="/refund-policy" className="font-semibold text-primary-700 hover:underline">Refund Policy</Link>.
      </p>
    ),
  },
  {
    id: 'consumer-law',
    title: 'Your consumer rights',
    body: (
      <p>
        Nothing in these terms takes away any right you have under the Consumer Protection Act, 2019 or any other Indian law
        that cannot be excluded by agreement. If our service is deficient, you can raise it with us and, if needed, with the
        consumer forum that has authority over your complaint.
      </p>
    ),
  },
  {
    id: 'ip',
    title: 'Intellectual property and site use',
    body: (
      <>
        <p>
          The content, design and logo on this site belong to Fortune Visa Services or its licensors. You may view it for your
          own use, but you may not copy or resell it without our written permission.
        </p>
        <p>You agree not to misuse the site, attempt to break its security or send us false enquiries.</p>
      </>
    ),
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    body: (
      <p>
        To the extent the law allows, we are not liable for visa refusals, delays, changes in government rules, or losses that
        come from your travel plans, such as flight or hotel bookings made before a visa is granted. Our total liability for a
        service is limited to the service fee you paid us for it. Nothing here limits liability that cannot be limited by law.
      </p>
    ),
  },
  {
    id: 'law',
    title: 'Governing law and jurisdiction',
    body: (
      <p>
        These terms are governed by the laws of India. The courts at New Delhi have jurisdiction over any dispute, subject to
        any right you have under consumer protection law to bring a complaint elsewhere.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    body: <p>We may update these terms. The date at the top shows the latest version. Continuing to use the site means you accept the update.</p>,
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: (
      <p>
        Fortune Visa Services, {ADDRESS}. Email: {EMAIL}. Phone and WhatsApp: {PHONE}.
      </p>
    ),
  },
];

export function TermsPage() {
  useSeo({
    title: 'Terms of Use',
    description: 'The terms for using the Fortune Visa Services website and our visa support services.',
  });
  return (
    <LegalDocument
      icon="terms"
      title="Terms of Use"
      intro="The ground rules for using our website and working with us."
      updated="24 November 2026"
      sections={sections}
    />
  );
}

export default TermsPage;