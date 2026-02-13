"use client";

import ProjectForm from "@/components/admin/ProjectForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NewProjectPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold">Novo Projeto</h1>
            </div>
            <div className="max-w-2xl">
                <ProjectForm />
            </div>
        </div>
    );
}
