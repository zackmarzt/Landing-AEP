import { getPage } from "@/app/actions"; // Updated import
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface PageDetailsPageProps { // Renamed interface
    params: { id: string }; // params should not be a Promise
}

export default async function PageDetailsPage({ params }: PageDetailsPageProps) { // Renamed component
    const { id } = params; // No await needed for params
    const page = await getPage(id); // Renamed variable and function

    if (!page) {
        redirect("/#pages"); // Updated redirect
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow container px-4 md:px-6 py-12">
                <div className="mb-8">
                    <Link href="/#pages"> {/* Updated link */}
                        <Button variant="ghost" className="pl-0 hover:pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Páginas {/* Updated text */}
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Badge variant="outline" className="text-sm">
                                    {page.status === "Published" ? "Publicado" : "Rascunho"} {/* Changed from "Concluído" to "Publicado" for status */}
                                </Badge>
                                {page.createdAt && (
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Calendar className="mr-1 h-3 w-3" />
                                        {new Date(page.createdAt).toLocaleDateString("pt-BR")}
                                    </div>
                                )}
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
                                {page.name} {/* Updated from project.title to page.name */}
                            </h1>
                        </div>

                        <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted shadow-sm">
                            {page.imageUrls && page.imageUrls.length > 0 ? (
                                <Carousel className="w-full h-full">
                                    <CarouselContent>
                                        {page.imageUrls.map((url, index) => (
                                            <CarouselItem key={index}>
                                                <div className="relative aspect-video">
                                                    <Image
                                                        src={url ?? ""}
                                                        alt={`${page.name} image ${index + 1}`} // Updated alt text
                                                        fill
                                                        className="object-cover"
                                                        priority={index === 0}
                                                    />
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    {page.imageUrls.length > 1 && (
                                        <>
                                            <CarouselPrevious className="left-4" />
                                            <CarouselNext className="right-4" />
                                        </>
                                    )}
                                </Carousel>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                    Sem imagens disponíveis
                                </div>
                            )}
                        </div>

                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
                                {page.summary} {/* Display summary first */}
                            </p>
                            {page.content && (
                                <div dangerouslySetInnerHTML={{ __html: page.content }} /> // Render content as HTML
                            )}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                            <h3 className="font-semibold text-xl mb-4">Sobre esta Página</h3> {/* Updated text */}
                            <Separator className="my-4" />
                            <div className="space-y-4">
                                <h4 className="text-sm font-medium">Compartilhar</h4>
                                <p className="text-sm text-muted-foreground">
                                    Implementação de compartilhamento pendente.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
