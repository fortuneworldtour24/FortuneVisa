import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { siteConfig } from '@/config/siteConfig';

const WHATSAPP_MESSAGE = encodeURIComponent('Hi Fortune Visa Services, I\'d like help with a visa.');
const WHATSAPP_HREF = `https://wa.me/${siteConfig.whatsappNumber}?text=${WHATSAPP_MESSAGE}`;

export function WhatsAppButton() {
  const { t } = useTranslation();

  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp.ariaLabel')}
      title={t('whatsapp.tooltip')}
      className="group fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-all duration-300 hover:scale-105 hover:bg-[#1ebe5d] sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
    >
      <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
      <span className="absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-card transition-opacity duration-200 group-hover:opacity-100 sm:block">
        {t('whatsapp.tooltip')}
      </span>
    </a>
  );
}
