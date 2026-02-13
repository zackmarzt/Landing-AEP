
import { checkIsSetup, completeSetup } from "@/lib/setup";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default async function SetupPage() {
    const isSetup = await checkIsSetup();
    if (isSetup) {
        redirect("/");
    }

    async function handleSetup(formData: FormData) {
        "use server";

        const siteName = formData.get("siteName") as string;
        const adminName = formData.get("adminName") as string;
        const adminEmail = formData.get("adminEmail") as string;
        const adminPassword = formData.get("adminPassword") as string;

        if (!siteName || !adminName || !adminEmail || !adminPassword) {
            // In a real app, handle errors better (return to form with error)
            throw new Error("Missing fields");
        }

        await completeSetup({
            siteName,
            adminName,
            adminEmail,
            adminPassword
        });

        redirect("/admin/login");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Bem-vindo ao Setup</CardTitle>
                    <CardDescription>Configure seu site e crie o usuário administrador.</CardDescription>
                </CardHeader>
                <form action={handleSetup}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="siteName">Nome do Site</Label>
                            <Input id="siteName" name="siteName" placeholder="Meu Site Incrível" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="adminName">Nome do Admin</Label>
                            <Input id="adminName" name="adminName" placeholder="Seu Nome" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="adminEmail">Email do Admin</Label>
                            <Input id="adminEmail" name="adminEmail" type="email" placeholder="admin@exemplo.com" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="adminPassword">Senha do Admin</Label>
                            <Input id="adminPassword" name="adminPassword" type="password" required />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">Concluir Setup</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
