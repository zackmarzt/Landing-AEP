import PageCard from "@/components/pages/PageCard";
import { PlaceHolderImages } from '@/lib/placeholder-images'; // Import PlaceHolderImages

export default function PagesSection() {
    const staticPages = [
        {
            id: 'cultura',
            name: 'Cultura',
            summary: 'Explore os projetos culturais da AEP que enriquecem a comunidade e promovem a arte e o conhecimento.',
            imageUrls: [PlaceHolderImages.find(p => p.id === 'gallery-1')?.imageUrl || ''],
            status: 'published',
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-background" id="paginas">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Nossos Projetos
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed leading-relaxed">
                        Da base educacional à alta gestão de lideranças, nossos projetos traduzem o compromisso da AEP com uma formação humana completa. Explore nossas iniciativas e descubra como estamos construindo um legado de conhecimento e virtudes.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:gap-8 max-w-md mx-auto">
                    {staticPages.map((page) => (
                        <PageCard key={page.id} page={page} />
                    ))}
                </div>
            </div>
        </section>
    );
}
