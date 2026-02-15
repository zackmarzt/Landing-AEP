import PageForm from "@/components/admin/PageForm"; // Updated import
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getPage } from "@/app/actions"; // Updated import
import { redirect } from "next/navigation";

interface EditPagePageProps { // Renamed interface
    params: { id: string }; // params should not be a Promise
}

export default async function EditPagePage({ params }: EditPagePageProps) { // Renamed component
    const { id } = params; // No await needed for params
    const page = await getPage(id); // Renamed variable and function

    if (!page) {
        redirect("/admin/pages"); // Updated redirect
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/pages"> {/* Updated back link */}
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold">Editar Página</h1> {/* Updated text */}
            </div>
            <div className="max-w-2xl">
                <PageForm initialData={page} /> {/* Updated component usage and prop */}
            </div>
        </div>
    );
}
