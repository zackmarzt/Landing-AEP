import Link from 'next/link';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Logo />
            <p className="text-sm text-muted-foreground mt-2">
              © {currentYear} AEP. Todos os direitos reservados.
              <br />
              Uma instituição da <span className="font-semibold">Associação de Educação Personalizada</span>.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Facebook" asChild>
              <Link href="https://www.facebook.com/bosquemananciais">
                <Facebook className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Instagram" asChild>
              <Link href="https://www.instagram.com/bosquemananciais">
                <Instagram className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
