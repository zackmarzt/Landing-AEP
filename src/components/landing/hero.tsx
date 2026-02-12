import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const HeroSection = () => {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <section className="relative h-[80dvh] min-h-[500px] flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 p-4 animate-in fade-in zoom-in-95 duration-1000">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tight drop-shadow-lg">
          MVP - Colégio do Bosque Mananciais
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-white/90 drop-shadow-md">
          A escola do seu filho com os valores da sua família.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="#programas">Conheça Nossos Programas</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
            <Link href="#contato">Agende uma Visita</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
