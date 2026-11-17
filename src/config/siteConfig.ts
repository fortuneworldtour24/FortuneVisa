export const siteConfig = {
  name: 'Fortune Visa Services',
  logoPrimary: 'Fortune',
  logoSecondary: 'Visa Services',
  tagline: 'Visas made simple. Journeys made certain.',
  address: 'Kirti Nagar, New Delhi, 110015, India',
  phone: '+91 84509 55550',
  phoneHref: 'tel:+918450955550',
  email: 'contact@fortunevisaservices.in',
  whatsappNumber: '918450955550',
} as const;

export const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}`;
