import { getProjects } from "@/app/actions";
import ProjectCard from "@/components/projects/ProjectCard";
import { Loader2 } from "lucide-react";

export default async function ProjectsSection() {
    const projects = await getProjects();

    // if (projects.length === 0) return null;

    return (
        <section className="py-16 md:py-24 bg-slate-50" id="projetos">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Nossos Projetos
                    </h2>
                    <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                        Conheça algumas das iniciativas transformadoras realizadas pela Associação Escola do Povo.
                    </p>
                </div>

                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        <p>Em breve novos projetos serão adicionados.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
