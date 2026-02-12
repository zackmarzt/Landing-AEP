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
      content: 'Optimist é um projeto educativo inovador e completo para a Educação Infantil. Partindo de investigações científicas realizadas sobre aprendizagens oportunas, oferece-se aos alunos uma rica e organizada estimulação para que alcancem, segundo as condições pessoais de cada um, níveis ótimos de maturidade, desenvolvimento e aprendizagem. Os programas específicos do projeto Optimist aproveitam o período de grande plasticidade neurológica e psicológica, em que a criança tem um enorme potencial de aprendizagem em todos os níveis, e cria um ambiente educativo rico em estímulos, potencializando a inteligência, a criatividade, a segurança e a alegria. Neste projeto, desenvolve-se um conjunto de competências que prepara as crianças para o futuro em todas as áreas. Tudo se desenvolve em um clima sereno e cordial, cujas professoras buscam ser exemplares e recebem um programa intensivo de formação humana e pedagógica. Nosso projeto, intitulado Educação Personalizada, desenvolve o aluno nas 5 dimensões humanas: física, afetivo-social, intelectual, moral e espiritual, em parceria com os pais, primeiros educadores, proporcionando um crescimento sólido e eficaz.',
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
      value: 'medio',
      icon: <GraduationCap className="h-6 w-6 text-primary" />,
      title: 'Ensino Médio',
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
