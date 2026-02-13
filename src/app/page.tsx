import Header from '@/components/landing/header';
import HeroSection from '@/components/landing/hero';
import AboutSection from '@/components/landing/about';
import ProgramsSection from '@/components/landing/programs';
import ProjectsSection from '@/components/landing/projects';
import GallerySection from '@/components/landing/gallery';
import TestimonialsSection from '@/components/landing/testimonials';
import ContactSection from '@/components/landing/contact';
import Footer from '@/components/landing/footer';

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
        <HeroSection />
        <AboutSection />
        {/*<ProgramsSection />*/}
        <ProjectsSection />
        {/*<GallerySection />
        {/*<TestimonialsSection />*/}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
