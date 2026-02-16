"use client";

import { Palette } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
}

const categories: Category[] = [
  {
    id: "art",
    label: "Cultura",
    icon: Palette,
    description: "Expressão artística e desenvolvimento criativo"
  },
  /*{
    id: "education",
    label: "Educação",
    icon: GraduationCap,
    description: "Aprendizado contínuo e formação acadêmica"
  },*/
];

const CategoryGrid = () => {
  const handleClick = (id: string) => {
    console.log(`Navigate to ${id}`);
    // Future navigation logic here
  };

  return (
    <div id="projetos" className="w-full max-w-5xl mx-auto py-20 px-4">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Conheça nossos projetos
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore as iniciativas que transformam vidas através da cultura e educação
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 md:gap-8 justify-center max-w-4xl mx-auto">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className={cn(
                "group relative flex flex-col items-center text-center p-8 md:p-10 rounded-3xl",
                "bg-card border border-border/50 hover:border-primary/50",
                "transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
                "overflow-hidden"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative mb-6 p-4 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                <Icon className="h-10 w-10 md:h-12 md:w-12" />
              </div>

              <span className="relative text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {cat.label}
              </span>

              <span className="relative text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                {cat.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;
