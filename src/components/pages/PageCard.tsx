import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Basic Page Interface for UI
interface PageUI {
    id: string;
    name: string; // Changed from title to name
    summary: string; // Changed from description to summary
    imageUrls: string[] | null;
    status: string | null;
}

interface PageCardProps {
    page: PageUI; // Changed from project to page
}

export default function PageCard({ page }: PageCardProps) { // Changed from ProjectCard to PageCard, and project to page
    return (
        <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300 border-none"> {/* Removed border, relying on shadow */}
            <div className="relative w-full h-48">
                {page.imageUrls && page.imageUrls.length > 0 ? (
                    <Image
                        src={page.imageUrls[0]!}
                        alt={page.name} // Changed from project.title to page.name
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                        Sem Imagem
                    </div>
                )}
            </div>
            <CardHeader>
                <CardTitle className="text-xl line-clamp-1">{page.name}</CardTitle> {/* Changed from project.title to page.name */}
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed"> {/* Added leading-relaxed */}
                    {page.summary} {/* Changed from project.description to page.summary */}
                </p>
            </CardContent>
            <CardFooter>
                <Link href={`/pages/${page.id}`} className="w-full"> {/* Changed from /projects/${project.id} to /pages/${page.id} */}
                    <Button variant="outline" className="w-full group">
                        Ver Detalhes
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
