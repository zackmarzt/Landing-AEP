import Header from '@/components/landing/header';
import IntroTextSection from '@/components/landing/IntroTextSection'; // New import
import HeroSection from '@/components/landing/hero';
import AboutSection from '@/components/landing/about';
import ProgramsSection from '@/components/landing/programs';
import PagesSection from '@/components/landing/pages';
import GallerySection from '@/components/landing/gallery';
import TestimonialsSection from '@/components/landing/testimonials';
import ClientContactSectionWrapper from '@/components/landing/ClientContactSectionWrapper';
import Footer from '@/components/landing/footer';
import BackToTopButton from '@/components/ui/back-to-top-button';

import { checkIsSetup } from '@/lib/setup';
import { redirect } from 'next/navigation';

export default async function Home() {
  const isSetup = await checkIsSetup();
  if (!isSetup) {
    redirect('/setup');
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <IntroTextSection />
        <HeroSection />
        <PagesSection />
        <AboutSection />
        <ClientContactSectionWrapper />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
