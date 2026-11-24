import { LegalDocument } from '@/components/LegalDocument';
import type { LegalSection } from '@/components/LegalDocument';
import { useSeo } from '@/hooks/useSeo';

const EMAIL = 'contact@fortunevisaservices.in';
const PHONE = '+91 84509 55550';
const ADDRESS = 'Kirti Nagar, New Delhi 110015, India';
// Fill in once you appoint someone. Until then the email above is the grievance contact.
const GRIEVANCE_OFFICER = 'The Proprietor, Fortune Visa Services';

const sections: LegalSection[] = [
  {
    id: 'overview',
    title: 'Overview',
    body: (
      <>
        <p>
          Fortune Visa Services (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a visa guidance and application support
          business based at {ADDRESS}. This policy explains what personal data we collect through this website, why we collect
          it, who we share it with and what rights you have.
        </p>
        <p>
          We handle personal data in line with the Digital Personal Data Protection Act, 2023 and the rules made under it, and
          the Information Technology Act, 2000 and its rules, as they apply to us from time to time.
        </p>
      </>
    ),
  },
  {
    id: 'collect',
    title: 'Information we collect',
    body: (
      <>
        <p>Through our enquiry and contact forms we ask for:</p>
        <ul>
          <li><strong>Identity and contact details:</strong> your name, email address and phone or WhatsApp number.</li>
          <li><strong>Travel details:</strong> destination, visa type, passport nationality and any message you write.</li>
        </ul>
        <p>
          We do not ask for passport scans, bank statements or other documents through the website. If you become a client, we
          collect those documents directly from you after your consultation, usually by WhatsApp or email, and only what the
          application needs.
        </p>
        <p>
          Our hosting and database providers also record basic technical data such as IP address and browser type to keep the
          site working and secure.
        </p>
      </>
    ),
  },
  {
    id: 'how',
    title: 'How we collect it',
    body: (
      <p>
        You give us this data yourself, when you submit a form, call or message us on WhatsApp, or email us. Tools on this site,
        such as the visa checker and checklist, run in your browser and do not need you to give us personal data.
      </p>
    ),
  },
  {
    id: 'purposes',
    title: 'Why we use your data',
    body: (
      <>
        <p>We process your data on the basis of your consent, and only for these purposes:</p>
        <ul>
          <li>to reply to your enquiry and arrange a consultation;</li>
          <li>to prepare and submit your visa application, if you choose to become a client;</li>
          <li>to send you updates about your application;</li>
          <li>to keep records we need for accounts and legal compliance;</li>
          <li>to keep the website secure and working.</li>
        </ul>
        <p>We do not sell your personal data. We do not send marketing messages unless you have agreed to receive them.</p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies and similar technologies',
    body: (
      <p>
        This site stores a small amount of data in your browser, for example your language choice. We do not currently run
        advertising or cross-site tracking cookies. If we add analytics later, we will update this policy first.
      </p>
    ),
  },
  {
    id: 'sharing',
    title: 'Who we share data with',
    body: (
      <>
        <ul>
          <li>
            <strong>Service providers</strong> that run our website and database (for example our hosting and database providers)
            and messaging tools such as WhatsApp and email, which process data on our behalf.
          </li>
          <li>
            <strong>Embassies, consulates, visa centres and government portals,</strong> but only when you are a client and your
            application needs it.
          </li>
          <li>
            <strong>Authorities,</strong> if the law requires us to disclose data.
          </li>
        </ul>
        <p>We do not share your data with anyone else without your consent.</p>
      </>
    ),
  },
  {
    id: 'security',
    title: 'Storage, security and transfers',
    body: (
      <>
        <p>
          We use reasonable safeguards, including access controls and encrypted connections, to protect your data. No online
          system is completely secure, so we cannot promise absolute security.
        </p>
        <p>
          Some of our providers may store data on servers outside India. Where that happens, we transfer it only to the extent
          the law allows.
        </p>
      </>
    ),
  },
  {
    id: 'retention',
    title: 'How long we keep your data',
    body: (
      <p>
        We keep enquiry details only for as long as needed to deal with your enquiry. Client documents are kept for as long as
        your application needs and for any period the law requires, then deleted or anonymised. You can ask us to delete your
        data sooner (see your rights below).
      </p>
    ),
  },
  {
    id: 'rights',
    title: 'Your rights',
    body: (
      <>
        <p>As a data principal under the Digital Personal Data Protection Act, 2023, you can ask us to:</p>
        <ul>
          <li>tell you what personal data of yours we hold and how we use it;</li>
          <li>correct or complete inaccurate data;</li>
          <li>erase data we no longer need;</li>
          <li>withdraw your consent at any time (this does not affect what we did before you withdrew it);</li>
          <li>deal with a grievance you have about how we handle your data;</li>
          <li>nominate another person to exercise these rights if you die or cannot act.</li>
        </ul>
        <p>Write to {EMAIL} and we will respond within a reasonable time.</p>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    body: (
      <p>
        This website is for adults. If you are applying for a visa for a child under 18, a parent or legal guardian must give
        us the details and consent on the child&rsquo;s behalf.
      </p>
    ),
  },
  {
    id: 'grievance',
    title: 'Grievances and complaints',
    body: (
      <>
        <p>
          If you have a concern about your data, contact our grievance contact first: <strong>{GRIEVANCE_OFFICER}</strong>,
          at {EMAIL} or {PHONE}. We will try to resolve it promptly.
        </p>
        <p>
          If you are not satisfied with our response, you can complain to the Data Protection Board of India once it is
          operating under the Act.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: <p>We may update this policy. The date at the top shows when it last changed. Please check back from time to time.</p>,
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

export function PrivacyPage() {
  useSeo({
    title: 'Privacy Policy',
    description: 'How Fortune Visa Services collects, uses and protects your personal data under Indian law.',
  });
  return (
    <LegalDocument
      icon="privacy"
      title="Privacy Policy"
      intro="What we collect, why we collect it and the choices you have, in plain language."
      updated="24 November 2026"
      sections={sections}
    />
  );
}

export default PrivacyPage;