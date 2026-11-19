import type { FlagOption } from '@/components/FlagSelect';

const OTHER = [
    'AE', 'AF', 'AL', 'AM', 'AR', 'AT', 'AU', 'AZ', 'BD', 'BE', 'BG', 'BH', 'BR', 'BT', 'CA', 'CH', 'CL', 'CN',
    'CO', 'CZ', 'DE', 'DK', 'DZ', 'EG', 'ES', 'ET', 'FI', 'FJ', 'FR', 'GB', 'GE', 'GH', 'GR', 'HK', 'HU', 'ID',
    'IE', 'IL', 'IQ', 'IR', 'IT', 'JO', 'JP', 'KE', 'KG', 'KH', 'KR', 'KW', 'KZ', 'LB', 'LK', 'MA', 'MM', 'MN',
    'MU', 'MV', 'MX', 'MY', 'NG', 'NL', 'NO', 'NP', 'NZ', 'OM', 'PH', 'PK', 'PL', 'PT', 'QA', 'RO', 'RS', 'RU',
    'SA', 'SE', 'SG', 'TH', 'TJ', 'TR', 'TW', 'TZ', 'UA', 'UG', 'US', 'UZ', 'VN', 'ZA', 'ZM', 'ZW',
];

export function getPassportOptions(lang = 'en'): FlagOption[] {
    let names: Intl.DisplayNames | null = null;
    try {
        names = new Intl.DisplayNames([lang], { type: 'region' });
    } catch {
        names = null;
    }
    const nameOf = (c: string) => names?.of(c) ?? c;
    const rest = OTHER.map((c) => ({ value: c, label: nameOf(c), code: c.toLowerCase() })).sort((a, b) =>
        a.label.localeCompare(b.label)
    );
    return [{ value: 'IN', label: nameOf('IN'), code: 'in' }, ...rest];
}