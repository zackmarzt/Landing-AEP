import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { GraduationCap, PencilRuler, ToyBrick, Music, Swords, BrainCircuit } from 'lucide-react';

const ProgramsSection = () => {
  const programs = [
    {
      value: 'infantil',
      icon: <ToyBrick className="h-6 w-6 text-primary" />,
      title: 'Educação Infantil',
      content: 'Um ambiente lúdico e seguro onde as crianças dão os primeiros passos no mundo do conhecimento através de brincadeiras, exploração e muita criatividade. Nosso foco está no desenvolvimento socioemocional e cognitivo.',
    },
    {
      value: 'fundamental1',
      icon: <PencilRuler className="h-6 w-6 text-primary" />,
      title: 'Ensino Fundamental I',
      content: 'Nesta fase, consolidamos a alfabetização e introduzimos os alunos a diferentes áreas do saber. Incentivamos a curiosidade, o pensamento crítico e a autonomia com projetos interdisciplinares e aprendizado ativo.',
    },
    {
      value: 'fundamental2',
      icon: <GraduationCap className="h-6 w-6 text-primary" />,
      title: 'Ensino Fundamental II',
      content: 'Aprofundamos os conhecimentos e preparamos os alunos para os desafios do Ensino Médio. O currículo é enriquecido com tecnologia, debates e atividades que estimulam o protagonismo juvenil e a responsabilidade.',
    },
    {
      value: 'extracurriculares',
      icon: <Swords className="h-6 w-6 text-primary" />,
      title: 'Atividades Extracurriculares',
      content: 'Oferecemos uma variedade de atividades para complementar a formação dos alunos, incluindo esportes, artes, música, programação e clube de debates. Uma oportunidade para descobrir novos talentos e paixões.',
    },
     {
      value: 'tecnologia',
      icon: <BrainCircuit className="h-6 w-6 text-primary" />,
      title: 'Tecnologia e Inovação',
      content: 'Integramos a tecnologia ao currículo de forma significativa, com laboratórios modernos, programação, robótica e ferramentas digitais que preparam os alunos para um futuro cada vez mais tecnológico.',
    },
  ];

  return (
    <section id="programas" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            Nossos Programas Educacionais
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Da educação infantil ao ensino fundamental, nosso currículo é pensado para o desenvolvimento integral do aluno.
          </p>
        </div>

        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <Accordion type="single" collapsible defaultValue="infantil">
            {programs.map((program) => (
              <AccordionItem key={program.value} value={program.value}>
                <AccordionTrigger className="text-left font-headline hover:no-underline">
                  <div className="flex items-center gap-4">
                    {program.icon}
                    <span className="text-lg font-semibold">{program.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pl-14">
                  {program.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
