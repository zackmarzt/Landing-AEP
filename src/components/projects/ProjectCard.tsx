import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Basic Project Interface for UI
interface ProjectUI {
    id: string;
    title: string;
    description: string;
    imageUrls: string[] | null;
    status: string | null;
}

interface ProjectCardProps {
    project: ProjectUI;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
            <div className="relative w-full h-48">
                {project.imageUrls && project.imageUrls.length > 0 ? (
                    <Image
                        src={project.imageUrls[0]!}
                        alt={project.title}
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
                <CardTitle className="text-xl line-clamp-1">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3 text-sm">
                    {project.description}
                </p>
            </CardContent>
            <CardFooter>
                <Link href={`/projects/${project.id}`} className="w-full">
                    <Button variant="outline" className="w-full group">
                        Ver Detalhes
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
