import { HeroSection } from '@/components/home/HeroSection';
import { useSeo } from '@/hooks/useSeo';
import { TrustStrip } from '@/components/home/TrustStrip';
import { PopularDestinations } from '@/components/home/PopularDestinations';
import { HowItWorks } from '@/components/home/HowItWorks';
import { WhyFortune } from '@/components/home/WhyFortune';
import { Testimonials } from '@/components/home/Testimonials';
import { ConsultationCta } from '@/components/ConsultationCta';
import { FaqSection } from '@/components/home/FaqSection';
import { FinalCta } from '@/components/home/FinalCta';

export function HomePage() {
  useSeo({
    description:
      'Fortune Visa Services — Australian visa consultancy in Parramatta. Check visa requirements, explore destinations, and get expert guidance.',
  });
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <PopularDestinations />
      <HowItWorks />
      <WhyFortune />
      <ConsultationCta />
      <Testimonials />
      <FaqSection />
      <FinalCta />
    </>
  );
}
