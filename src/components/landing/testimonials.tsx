import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const TestimonialsSection = () => {
  const testimonialAvatars = PlaceHolderImages.filter(p => p.id.startsWith('testimonial-'));

  const testimonials = [
    {
      quote: "Meu filho ama o Colégio do Bosque! O método de ensino é incrível e os professores são muito atenciosos. Vemos o desenvolvimento dele todos os dias.",
      name: 'Ana Silva',
      role: 'Mãe de aluno do Fundamental I',
      avatarId: 'testimonial-1',
    },
    {
      quote: "A infraestrutura é fantástica e as atividades extracurriculares são muito diversificadas. Sinto que minha filha está preparada para qualquer desafio.",
      name: 'Marcos Pereira',
      role: 'Pai de aluna do Fundamental II',
      avatarId: 'testimonial-2',
    },
    {
      quote: "Fiz amigos para a vida toda e aprendi a amar o estudo. Os projetos em grupo e o incentivo dos professores fizeram toda a diferença na minha formação.",
      name: 'Juliana Costa',
      role: 'Ex-aluna',
      avatarId: 'testimonial-3',
    },
    {
      quote: "O ambiente é acolhedor e seguro. A comunicação entre a escola e os pais é excelente, sempre nos sentimos parte da comunidade escolar.",
      name: 'Carla Martins',
      role: 'Mãe de aluno da Educação Infantil',
      avatarId: 'testimonial-4',
    },
  ];

  return (
    <section id="depoimentos" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            O que Nossas Famílias Dizem
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            A satisfação da nossa comunidade é o nosso maior orgulho.
          </p>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => {
              const avatarImage = testimonialAvatars.find(img => img.id === testimonial.avatarId);
              return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4">
                    <Card className="h-full flex flex-col justify-between shadow-lg">
                      <CardContent className="p-6">
                        <blockquote className="text-muted-foreground italic border-l-4 border-primary pl-4 mb-4">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="flex items-center gap-4 mt-6">
                          <Avatar>
                            {avatarImage && (
                              <AvatarImage src={avatarImage.imageUrl} alt={testimonial.name}/>
                            )}
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold font-headline">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
