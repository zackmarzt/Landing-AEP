import Link from 'next/link';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram } from 'lucide-react';

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
          <div className="flex items-center gap-2">
            <Link href="https://www.facebook.com/bosquemananciais" passHref>
              <Button variant="ghost" size="icon" aria-label="Facebook" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://www.instagram.com/bosquemananciais" passHref>
              <Button variant="ghost" size="icon" aria-label="Instagram" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          <Logo className="w-10 h-10" /> {/* Added AEP logo to the right */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
