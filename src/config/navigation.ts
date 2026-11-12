import { BookOpen, ClipboardCheck, FileText, Globe2, Mail, ShieldCheck, Stamp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  to: string;
  labelKey: string;
  icon: LucideIcon;
};

export const NAV_LINKS: NavItem[] = [
  { to: '/destinations', labelKey: 'nav.destinations', icon: Globe2 },
  { to: '/checker', labelKey: 'nav.visaChecker', icon: ShieldCheck },
  { to: '/services', labelKey: 'nav.services', icon: Stamp },
  { to: '/checklist', labelKey: 'nav.checklist', icon: ClipboardCheck },
  { to: '/blog', labelKey: 'nav.blog', icon: BookOpen },
  { to: '/contact', labelKey: 'nav.contact', icon: Mail },
];

export const LEGAL_LINKS: NavItem[] = [
  { to: '/privacy', labelKey: 'footer.privacy', icon: FileText },
  { to: '/terms', labelKey: 'footer.terms', icon: FileText },
];
