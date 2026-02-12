import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Logo />
            <p className="text-sm text-muted-foreground mt-2">
              © {currentYear} Colégio do Bosque Mananciais. Todos os direitos reservados.
              <br />
              Uma instituição do <span className="font-semibold">Grupo AEP</span>.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
