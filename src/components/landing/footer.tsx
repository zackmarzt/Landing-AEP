import Link from 'next/link';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram } from 'lucide-react';
import Image from 'next/image';
import logoImg from '@/app/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border"> {/* Changed background to bg-card, added top border */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Logo />
            <p className="text-muted-foreground mt-2 leading-relaxed"> {/* Added leading-relaxed */}
              © {currentYear} AEP. Todos os direitos reservados.
              <br />
              Uma instituição da <span className="font-semibold text-foreground">Associação de Educação Personalizada</span>.
            </p>
          </div>
          <div className="relative w-24 h-24">
            <Image
              src={logoImg}
              alt="Logo AEP"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
