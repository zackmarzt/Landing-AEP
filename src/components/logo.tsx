import { Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2 text-primary", className)}>
      <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
        <Leaf className="h-5 w-5" />
      </div>
      <span className="font-headline font-bold text-xl text-foreground">
        Bosque Mananciais
      </span>
    </div>
  );
};

export default Logo;
