import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/home/SectionHeading';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { DESTINATIONS } from '@/lib/visaData';

const FEATURED_SLUGS = ['australia', 'united-states', 'united-kingdom', 'canada'];

export function PopularDestinations() {
  const { t } = useTranslation();
  const featured = DESTINATIONS.filter((d) => FEATURED_SLUGS.includes(d.slug));

  return (
    <section className="mx-auto max-w-7xl py-16 lg:py-24">
      <div className="px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading title={t('home.destinations.title')} subtitle={t('home.destinations.subtitle')} />
        </Reveal>
      </div>

      <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 [scrollbar-width:none] sm:px-6 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-4 lg:gap-6 lg:px-8 [&::-webkit-scrollbar]:hidden">
        {featured.map((dest, index) => (
          <Reveal key={dest.slug} delay={(index % 4) * 80} className="w-[80%] shrink-0 snap-start sm:w-[45%] md:w-auto">
            <DestinationCard destination={dest} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
