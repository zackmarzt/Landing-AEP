"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { createPage, updatePage } from "@/app/actions"; // Updated imports
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import { pages } from "@/db/schema"; // Assuming 'pages' is the correct schema export

// Infer the type for the Page from Drizzle schema
type Page = typeof pages.$inferSelect;

// Define schema locally since we only use it here for validation
const formSchema = z.object({
    name: z.string().min(2, {
        message: "O nome deve ter pelo menos 2 caracteres.",
    }),
    summary: z.string().min(10, {
        message: "O resumo deve ter pelo menos 10 caracteres.",
    }),
    content: z.string().optional(), // New field for main content
    status: z.enum(["Draft", "Published"]),
    imageUrl: z.string().url({ message: "Insira uma URL válida." }).optional().or(z.literal("")),
});

interface PageFormProps {
    initialData?: Page; // Use the Page type from schema
}

export default function PageForm({ initialData }: PageFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Extract first image URL if it exists (for compatibility with new single-url input)
    const defaultImageUrl = initialData?.imageUrls?.[0] || "";

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name || "",
            summary: initialData?.summary || "",
            content: initialData?.content || "", // New content field
            status: initialData?.status || "Draft",
            imageUrl: defaultImageUrl,
        },
    });

    const watchedImageUrl = form.watch("imageUrl");

    useEffect(() => {
        setImageError(false);
    }, [watchedImageUrl]);


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("summary", values.summary);
            formData.append("content", values.content || ""); // Include content
            formData.append("status", values.status);
            if (values.imageUrl) {
                formData.append("imageUrl", values.imageUrl);
            }

            if (initialData) {
                // We need updates to be handled by a server action that accepts the ID
                await updatePage(initialData.id, formData);
                toast({ title: "Página atualizada com sucesso!" });
            } else {
                await createPage(formData);
                toast({ title: "Página criada com sucesso!" });
            }

            // Redirect client-side to avoid try/catch issues with server redirects
            router.push("/admin/pages"); // Redirect to /admin/pages
            router.refresh();
        } catch (error) {
            console.error(error);
            toast({
                title: "Erro ao salvar página",
                description: "Ocorreu um erro ao tentar salvar a página. Tente novamente.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título da Página</FormLabel>
                            <FormControl>
                                <Input placeholder="Título da sua página" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Resumo da Página</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Um breve resumo sobre a página..."
                                    className="min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Conteúdo da Página</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Conteúdo completo da sua página (ex: Markdown, HTML)"
                                    className="min-h-[300px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Adicione o conteúdo detalhado da sua página aqui.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Draft">Rascunho</SelectItem>
                                    <SelectItem value="Published">Publicado</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL da Imagem de Capa</FormLabel>
                            <FormControl>
                                <Input placeholder="https://exemplo.com/imagem.jpg" {...field} />
                            </FormControl>
                            <FormDescription>
                                Insira a URL de uma imagem para a página (ex: Unsplash).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {form.watch("imageUrl") && (
                    <div className="space-y-2">
                        <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-md border bg-muted">
                            {/* Use standard img for preview to bypass Next.js strict domain checks in Admin */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={form.watch("imageUrl")!}
                                alt="Preview"
                                className={`h-full w-full object-cover transition-opacity ${imageError ? "opacity-50" : "opacity-100"}`}
                                onError={() => setImageError(true)}
                                onLoad={() => setImageError(false)}
                            />
                        </div>
                        {imageError && (
                            <p className="text-sm font-medium text-destructive">
                                Não foi possível carregar a imagem. Verifique se a URL está correta e é acessível publicamente.
                            </p>
                        )}
                    </div>
                )}

                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Salvar Página" : "Criar Página"}
                </Button>
            </form>
        </Form>
    );
}
