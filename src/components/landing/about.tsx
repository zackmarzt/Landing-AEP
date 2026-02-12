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
      description: 'Oferecer uma educação de excelência, formando cidadãos críticos, criativos e conscientes, preparados para os desafios do futuro.',
    },
    {
      icon: <Eye className="h-10 w-10 text-primary" />,
      title: 'Nossa Visão',
      description: 'Ser referência em educação inovadora, promovendo um ambiente de aprendizado que inspira o desenvolvimento integral de cada aluno.',
    },
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      title: 'Nossos Valores',
      description: 'Ética, respeito à diversidade, sustentabilidade, colaboração e paixão pelo conhecimento são os pilares que sustentam nossa comunidade escolar.',
    },
  ];

  return (
    <section id="sobre" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-in fade-in slide-in-from-left-12 duration-1000">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">
              Uma Educação que Inspira e Transforma
            </h2>
            <p className="text-muted-foreground mb-8">
              No Colégio do Bosque Mananciais, acreditamos que cada aluno é único. Nossa abordagem pedagógica visa o desenvolvimento completo, unindo conhecimento acadêmico sólido com a formação de valores essenciais para a vida.
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
