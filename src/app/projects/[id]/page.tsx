import { getProject } from "@/app/actions";
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

interface ProjectDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        redirect("/#projects");
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow container px-4 md:px-6 py-12">
                <div className="mb-8">
                    <Link href="/#projects">
                        <Button variant="ghost" className="pl-0 hover:pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Projetos
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Badge variant="outline" className="text-sm">
                                    {project.status === "Published" ? "Concluído" : "Em andamento"}
                                </Badge>
                                {project.createdAt && (
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Calendar className="mr-1 h-3 w-3" />
                                        {new Date(project.createdAt).toLocaleDateString("pt-BR")}
                                    </div>
                                )}
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
                                {project.title}
                            </h1>
                        </div>

                        <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted shadow-sm">
                            {project.imageUrls && project.imageUrls.length > 0 ? (
                                <Carousel className="w-full h-full">
                                    <CarouselContent>
                                        {project.imageUrls.map((url, index) => (
                                            <CarouselItem key={index}>
                                                <div className="relative aspect-video">
                                                    <Image
                                                        src={url ?? ""}
                                                        alt={`${project.title} image ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                        priority={index === 0}
                                                    />
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    {project.imageUrls.length > 1 && (
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
                                {project.description}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                            <h3 className="font-semibold text-xl mb-4">Sobre este Projeto</h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                Este projeto é uma das iniciativas da Associação Escola do Povo para promover o desenvolvimento comunitário e a educação.
                            </p>
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
