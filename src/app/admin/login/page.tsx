"use client";

import { useState } from "react";
import { signIn } from "next-auth/react"; // Use next-auth/react for client-side sign in
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                toast({
                    title: "Erro no login",
                    description: "Verifique suas credenciais e tente novamente.",
                    variant: "destructive",
                });
            } else {
                router.push("/admin");
                router.refresh(); // Refresh to update session
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Erro inesperado",
                description: "Ocorreu um erro ao tentar fazer login.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-center">Login Administrativo</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Email</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Senha</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Entrar"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
