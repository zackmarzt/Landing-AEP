import ProjectForm from "@/components/admin/ProjectForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getProject } from "@/app/actions";
import { redirect } from "next/navigation";

interface EditProjectPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        redirect("/admin");
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold">Editar Projeto</h1>
            </div>
            <div className="max-w-2xl">
                <ProjectForm initialData={project} />
            </div>
        </div>
    );
}
