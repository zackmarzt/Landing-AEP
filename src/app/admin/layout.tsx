import { checkIsSetup } from "@/lib/setup";
import { redirect } from "next/navigation";
import { logout } from "@/app/actions";
import AdminSidebar from "@/components/admin/AdminSidebar"; // New import
import { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    if (!(await checkIsSetup())) {
        redirect("/setup");
    }
    // Middleware handles protection
    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar /> {/* Use the new AdminSidebar component */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
