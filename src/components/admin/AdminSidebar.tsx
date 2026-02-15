"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/actions";
import { cn } from "@/lib/utils";

export default function AdminSidebar() {
    const pathname = usePathname();

    const navItems = [
        { href: "/admin", label: "Dashboard" },
        { href: "/admin/pages", label: "Páginas" },
        { href: "/admin/pages/new", label: "Nova Página" },
        // Add other admin links here if needed
    ];

    return (
        <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col p-4 shadow-lg">
            <div className="text-2xl font-bold mb-8 text-primary-foreground">Painel Admin</div>
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href} passHref>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start text-lg",
                                pathname === item.href
                                    ? "bg-gray-700 text-primary-foreground"
                                    : "hover:bg-gray-700 hover:text-primary-foreground"
                            )}
                        >
                            {item.label}
                        </Button>
                    </Link>
                ))}
            </nav>
            <form action={logout} className="mt-8">
                <Button
                    type="submit"
                    variant="ghost"
                    className="w-full justify-start text-lg text-red-400 hover:bg-red-900 hover:text-red-300"
                >
                    Sair
                </Button>
            </form>
        </aside>
    );
}
