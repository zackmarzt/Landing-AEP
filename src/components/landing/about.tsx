import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Target, Eye, Heart } from 'lucide-react';

const AboutSection = () => {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us');

  const values = [
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: 'Nossa Missão',
      description: 'Ajudar os pais a garantir para os seus filhos uma educação de excelência, inspirada numa visão transcendente e cristã da vida.',
    },
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      title: 'Nossos Valores',
      description: 'Laboriosidade, Sinceridade, Generosidade, Alegria.',
    },
  ];

  return (
    <section id="sobre" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-in fade-in slide-in-from-left-12 duration-1000">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">
              Associação de Educação Personalizada - AEP
            </h2>
            <p className="text-muted-foreground mb-8">
              O Colégio do Bosque Mananciais é apoiado pela sua mantenedora AEP, formada por diretores altamente capacitados que se dedicam voluntariamente ao projeto educativo. A Associação de Educação Personalizada (AEP) é uma entidade de caráter educativo e sem fins lucrativos. Foi fundada por pais, avós e familiares que sonhavam em criar um colégio de excelência, com uma formação educacional, humana e transcendente completa, para formar os líderes das próximas gerações.
            </p>
            <p className="text-muted-foreground mb-8">
              Juntos, trabalhamos para proporcionar a melhor educação para os nossos alunos, mantendo sempre os valores e a visão que motivou esse projeto desde o início.
            </p>
            <div className="grid gap-6">
              {values.map((value, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0">{value.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold font-headline mb-1">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="animate-in fade-in slide-in-from-right-12 duration-1000">
            {aboutImage && (
              <Card className="overflow-hidden rounded-2xl shadow-2xl">
                <CardContent className="p-0">
                  <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    width={600}
                    height={700}
                    className="object-cover w-full h-full"
                    data-ai-hint={aboutImage.imageHint}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
