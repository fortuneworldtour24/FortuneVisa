export const siteConfig = {
  name: 'Fortune Visa Services',
  logoPrimary: 'Fortune',
  logoSecondary: 'Visa Services',
  tagline: 'Visas made simple. Journeys made certain.',
  address: 'Level 15, 60 Station Street, Parramatta, NSW 2150, Australia',
  phone: '+61 2 8020 4701',
  phoneHref: 'tel:+61280204701',
  email: 'contact@fortunevisaservices.com',
  whatsappNumber: '61400000000',
} as const;

export const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}`;
