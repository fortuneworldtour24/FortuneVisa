export const VISA_TYPE_IDS = [
  'student',
  'visitor',
  'skilled',
  'nominated',
  'partner',
  'workingHoliday',
] as const;

export type VisaTypeId = (typeof VISA_TYPE_IDS)[number];

export const PASSPORT_COUNTRY_CODES = [
  'IN',
  'CN',
  'PH',
  'NP',
  'VN',
  'MY',
  'SG',
  'ID',
  'LK',
  'PK',
  'KR',
  'JP',
  'ZA',
  'NG',
  'BR',
  'GB',
  'IE',
  'DE',
  'FR',
  'US',
  'CA',
  'NZ',
] as const;

export const DESTINATION_COUNTRY_CODE = 'AU';

export function countryFlag(code: string): string {
  return String.fromCodePoint(...code.split('').map((char) => 127397 + char.charCodeAt(0)));
}
