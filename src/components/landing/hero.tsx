import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const HeroSection = () => {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <section id="inicio" className="relative h-[80dvh] min-h-[500px] flex items-center justify-center text-center text-white p-4 overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover z-0"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50 z-10" /> {/* Overlay for better text readability */}

      {/* Main text content */}
      <div className="relative z-20 flex flex-col items-center justify-start h-full pt-8 animate-in fade-in zoom-in-95 duration-1000">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tight drop-shadow-lg text-center">
          Líderes que Transformam,<br />Valores que Permanecem.
        </h1>
      </div>

      {/* Footer text and button */}
      <div className="absolute bottom-4 left-0 right-0 z-20 p-4 animate-in fade-in zoom-in-95 duration-1000">
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-white font-medium drop-shadow-lg text-center mb-4">
          A AEP é a voz de uma comunidade que acredita no poder da formação humana. Através de nossos colégios e projetos culturais, despertamos o protagonismo que o amanhã exige de nós hoje.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="#contato" passHref>
            <Button size="lg" variant="ghost" className="text-white transition-all duration-300 underline">
              Saiba Mais
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
