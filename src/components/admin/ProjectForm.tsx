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
import { createProject, updateProject } from "@/app/actions";
import { Loader2, X } from "lucide-react";
import Image from "next/image";

// Define schema locally since we only use it here for validation
const formSchema = z.object({
    title: z.string().min(2, {
        message: "O título deve ter pelo menos 2 caracteres.",
    }),
    description: z.string().min(10, {
        message: "A descrição deve ter pelo menos 10 caracteres.",
    }),
    status: z.enum(["Draft", "Published"]),
    imageUrl: z.string().url({ message: "Insira uma URL válida." }).optional().or(z.literal("")),
});

interface ProjectFormProps {
    initialData?: any; // Start strict, loosen if needed for Drizzle types
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Extract first image URL if it exists (for compatibility with new single-url input)
    const defaultImageUrl = initialData?.imageUrls?.[0] || "";

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || "",
            description: initialData?.description || "",
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
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("status", values.status);
            if (values.imageUrl) {
                formData.append("imageUrl", values.imageUrl);
            }

            if (initialData) {
                // We need updates to be handled by a server action that accepts the ID
                await updateProject(initialData.id, formData);
                toast({ title: "Projeto atualizado com sucesso!" });
            } else {
                await createProject(formData);
                toast({ title: "Projeto criado com sucesso!" });
            }

            // Redirect client-side to avoid try/catch issues with server redirects
            router.push("/admin");
            router.refresh();
        } catch (error) {
            console.error(error);
            toast({
                title: "Erro ao salvar projeto",
                description: "Ocorreu um erro ao tentar salvar o projeto. Tente novamente.",
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
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título do Projeto</FormLabel>
                            <FormControl>
                                <Input placeholder="Residencial Bosque das Águas" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição Completa</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Descreva os detalhes, desafios e resultados do projeto..."
                                    className="min-h-[200px]"
                                    {...field}
                                />
                            </FormControl>
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
                                Insira a URL de uma imagem para o projeto (ex: Unsplash).
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
                    {initialData ? "Salvar Alterações" : "Criar Projeto"}
                </Button>
            </form>
        </Form>
    );
}
