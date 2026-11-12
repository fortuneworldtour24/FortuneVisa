import visasJson from '@/data/visas.json';

export const VISA_TYPES = ['tourist', 'student', 'work', 'family'] as const;

export type VisaType = (typeof VISA_TYPES)[number];

export type VisaTypeInfo = {
  type: VisaType;
  required: boolean;
  indicativeFee: number;
  processingTime: string;
  validity: string;
  notes: string;
};

export type Destination = {
  slug: string;
  country: string;
  flag: string;
  visaTypes: VisaTypeInfo[];
};

export const DESTINATIONS = visasJson.countries as Destination[];

export function findDestination(slug: string): Destination | undefined {
  return DESTINATIONS.find((destination) => destination.slug === slug);
}

export function findVisaTypeInfo(destination: Destination, type: string): VisaTypeInfo | undefined {
  return destination.visaTypes.find((visa) => visa.type === type);
}

export function isVisaType(value: string): value is VisaType {
  return (VISA_TYPES as readonly string[]).includes(value);
}

export type EnquiryPrefill = {
  passport?: string;
  destination?: string;
  visaType?: string;
};

export function buildEnquiryPath(prefill: EnquiryPrefill): string {
  const params = new URLSearchParams();
  if (prefill.passport) params.set('passport', prefill.passport);
  if (prefill.destination) params.set('destination', prefill.destination);
  if (prefill.visaType) params.set('visaType', prefill.visaType);
  const query = params.toString();
  return query ? `/contact?${query}` : '/contact';
}
