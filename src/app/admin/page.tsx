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
import { getAllPages, deletePage } from "@/app/actions"; // Updated imports
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
    const pages = await getAllPages(); // Renamed variable

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Páginas</h1> {/* Updated text */}
                <Link href="/admin/pages/new"> {/* Updated link */}
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Nova Página {/* Updated text */}
                    </Button>
                </Link>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Título</TableHead> {/* Updated text */}
                            <TableHead>Status</TableHead>
                            <TableHead>Data de Criação</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pages.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                    Nenhuma página encontrada. {/* Updated text */}
                                </TableCell>
                            </TableRow>
                        ) : (
                            pages.map((page) => ( // Renamed variable
                                <TableRow key={page.id}>
                                    <TableCell className="font-medium">{page.name}</TableCell> {/* Updated to page.name */}
                                    <TableCell>
                                        <Badge variant={page.status === "Published" ? "default" : "secondary"}>
                                            {page.status === "Published" ? "Publicado" : "Rascunho"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {page.createdAt ? new Date(page.createdAt).toLocaleDateString("pt-BR") : 'N/A'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/pages/edit/${page.id}`}> {/* Updated link */}
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
                                                        await deletePage(page.id) // Updated action
                                                    }}>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Excluir Página?</AlertDialogTitle> {/* Updated text */}
                                                            <AlertDialogDescription>
                                                                Esta ação não pode ser desfeita. A página será permanentemente removida. {/* Updated text */}
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
