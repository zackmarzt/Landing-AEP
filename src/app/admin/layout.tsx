import { checkIsSetup } from "@/lib/setup";
import { redirect } from "next/navigation";
import { logout } from "@/app/actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    if (!(await checkIsSetup())) {
        redirect("/setup");
    }
    // Middleware handles protection
    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-white border-r">
                <div className="p-6">
                    <h2 className="text-xl font-bold">Painel Admin</h2>
                </div>
                <nav className="px-4 space-y-2">
                    <a href="/admin" className="block px-4 py-2 hover:bg-gray-100 rounded">
                        Projetos
                    </a>
                    <a href="/admin/projects/new" className="block px-4 py-2 hover:bg-gray-100 rounded">
                        Novo Projeto
                    </a>
                    {/* Logout needs to be a server action or client component. For now let's just make a simple form */}
                    <form action={logout}>
                        <button
                            type="submit"
                            className="w-full flex justify-start px-4 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                        >
                            Sair
                        </button>
                    </form>
                </nav>
            </aside>
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
