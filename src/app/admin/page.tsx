import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Plus, Trash2 } from "lucide-react";
import { getAllProjects, deleteProject } from "@/app/actions";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default async function AdminDashboard() {
    const projects = await getAllProjects();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Projetos</h1>
                <Link href="/admin/projects/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Novo Projeto
                    </Button>
                </Link>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Data de Criação</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                    Nenhum projeto encontrado.
                                </TableCell>
                            </TableRow>
                        ) : (
                            projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell className="font-medium">{project.title}</TableCell>
                                    <TableCell>
                                        <Badge variant={project.status === "Published" ? "default" : "secondary"}>
                                            {project.status === "Published" ? "Publicado" : "Rascunho"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {project.createdAt ? new Date(project.createdAt).toLocaleDateString("pt-BR") : 'N/A'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/projects/edit/${project.id}`}>
                                                <Button variant="ghost" size="icon">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <form action={async () => {
                                                        "use server"
                                                        await deleteProject(project.id)
                                                    }}>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Excluir Projeto?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Esta ação não pode ser desfeita. O projeto será permanentemente removido.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                            <AlertDialogAction type="submit" className="bg-red-500 hover:bg-red-600">
                                                                Excluir
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </form>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
