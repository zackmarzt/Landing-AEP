import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';

export default function CulturaPage() {
  const culturaImage = PlaceHolderImages.find(p => p.id === 'gallery-1'); // Reusing gallery-1 for culture

  return (
    <>
      <Header />
      <main className="flex-grow"> {/* Added main tag for semantic structure */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Cultura na AEP
              </h1>
              <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed leading-relaxed mx-auto mt-4">
                Explore os projetos culturais da AEP que enriquecem a comunidade e promovem a arte, a música, o teatro e o conhecimento através de diversas iniciativas.
              </p>
            </div>

            {culturaImage && (
              <div className="relative w-full h-96 mb-12 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={culturaImage.imageUrl}
                  alt="Cultura na AEP"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="prose prose-lg mx-auto text-muted-foreground">
              <h2 className="text-3xl font-bold mb-4">Nossas Iniciativas</h2>
              <p>
                Acreditamos que a cultura é um pilar fundamental para a formação integral do indivíduo. Por isso, a AEP desenvolve e apoia uma série de projetos que visam estimular a criatividade, o pensamento crítico e o aprecio pelas diversas manifestações artísticas e culturais.
              </p>
              <p>
                Desde oficinas de arte e música até apresentações teatrais e festivais literários, nossas atividades são planejadas para envolver toda a comunidade, oferecendo oportunidades de aprendizado e expressão para crianças, jovens e adultos. Valorizamos a cultura local e buscamos integrá-la em nosso currículo, promovendo um diálogo contínuo entre tradição e inovação.
              </p>
              <h2 className="text-3xl font-bold mb-4 mt-8">Impacto na Comunidade</h2>
              <p>
                Os projetos culturais da AEP não apenas enriquecem a vida dos nossos alunos, mas também se estendem à comunidade ao redor. Organizamos eventos abertos ao público, convidando a todos a participar e vivenciar a riqueza da cultura em suas diversas formas.
              </p>
              <p>
                Com isso, buscamos não só desenvolver talentos artísticos, mas também fomentar a cidadania e o senso de pertencimento, contribuindo para uma sociedade mais engajada, crítica e sensível às belezas do mundo.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
