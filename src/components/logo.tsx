import Image from 'next/image';
import logoImg from '@/app/logo.png';
import { cn } from '@/lib/utils';

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2 text-primary", className)}>
      <div className="relative h-8 w-8"> {/* Adjusted size slightly larger than 20px (h-5) to show details, since it's an image */}
        <Image
          src={logoImg}
          alt="AEP Logo"
          fill
          className="object-contain" // Keeps aspect ratio
        />
      </div>
      <span className="font-headline font-bold text-xl text-foreground">
        AEP
      </span>
    </div>
  );
};

export default Logo;
