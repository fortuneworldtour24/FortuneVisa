import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { whatsappHref } from '@/config/siteConfig';

export function WhatsAppButton() {
  const { t } = useTranslation();
  const [broken, setBroken] = useState(false);

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('footer.whatsapp', 'Chat on WhatsApp')}
      className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition hover:scale-105 sm:bottom-6 sm:right-6"
    >
      {broken ? (
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
          <MessageCircle className="h-7 w-7" aria-hidden="true" />
        </span>
      ) : (
        <img
          src="/whatsapp-icon.png"
          alt=""
          width={56}
          height={56}
          onError={() => setBroken(true)}
          className="h-14 w-14 rounded-full object-contain"
        />
      )}
    </a>
  );
}

export default WhatsAppButton;