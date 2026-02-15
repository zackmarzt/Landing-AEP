"use client";

import PageForm from "@/components/admin/PageForm"; // Updated import
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NewPagePage() { // Renamed component for consistency
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/pages"> {/* Updated back link */}
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold">Nova Página</h1> {/* Updated text */}
            </div>
            <div className="max-w-2xl">
                <PageForm /> {/* Updated component usage */}
            </div>
        </div>
    );
}
