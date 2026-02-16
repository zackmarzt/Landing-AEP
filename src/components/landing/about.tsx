import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Target, Heart } from 'lucide-react';

const AboutSection = () => {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us');

  const values = [
    {
      icon: <Target className="h-10 w-10 text-muted-foreground" />, // Changed to text-muted-foreground
      title: 'Nossa Missão',
      description: 'Transformar a sociedade promovendo a excelência humana e acadêmica por meio da Educação, da Cultura e da Formação de Lideranças.',
    },
    {
      icon: <Heart className="h-10 w-10 text-muted-foreground" />, // Changed to text-muted-foreground
      title: 'Nossos Valores',
      description: 'Excelência, Formação Integral, Liderança, Responsabilidade Social, Cultura e Tradição.',
    },
  ];

  return (
    <section id="sobre" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-in fade-in slide-in-from-left-12 duration-1000">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">
              Um pouco sobre a Associação de Educação Personalizada - AEP
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              A Associação de Educação Personalizada (AEP) é uma entidade sem fins lucrativos que atua na transformação da sociedade através da excelência humana e acadêmica. Fundada por famílias e gerida por uma diretoria voluntária, a AEP é a mantenedora de projetos educacionais e expande sua missão através de pilares fundamentais: Educação, Cultura e Formação de Lideranças.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Mais do que uma instituição de ensino, somos um projeto de vida que une formação transcendente e responsabilidade social. Através de nossos colégios, projetos culturais e cursos de liderança, trabalhamos para formar as próximas gerações de líderes, mantendo vivos os valores e a visão que motivaram este sonho desde o início.
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
              <Card className="overflow-hidden rounded-2xl shadow-lg"> {/* Reduced shadow-2xl to shadow-lg */}
                <CardContent className="p-0">
                  <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    width={600}
                    height={700}
                    className="object-cover w-full h-full"
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
