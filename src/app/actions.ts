"use server";

import { db } from "@/db/drizzle";
import { pages } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

// Public Actions
export async function getPages() {
    return await db.query.pages.findMany({
        where: eq(pages.status, "Published"),
        orderBy: [desc(pages.createdAt)],
    });
}

export async function getPage(id: string) {
    return await db.query.pages.findFirst({
        where: eq(pages.id, id),
    });
}

export async function getAllPages() {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");
    return await db.query.pages.findMany({
        orderBy: [desc(pages.createdAt)],
    });
}

// Protected Actions
export async function createPage(formData: FormData) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const name = formData.get("name") as string;
    const summary = formData.get("summary") as string;
    const content = formData.get("content") as string; // New field
    const status = formData.get("status") as string;
    const imageUrl = formData.get("imageUrl") as string;

    await db.insert(pages).values({
        name,
        summary,
        content,
        status,
        imageUrls: imageUrl ? [imageUrl] : [], // Simple array with one URL for now
    });

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
}

export async function updatePage(id: string, formData: FormData) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const name = formData.get("name") as string;
    const summary = formData.get("summary") as string;
    const content = formData.get("content") as string; // New field
    const status = formData.get("status") as string;
    const imageUrl = formData.get("imageUrl") as string;

    await db
        .update(pages)
        .set({
            name,
            summary,
            content,
            status,
            imageUrls: imageUrl ? [imageUrl] : [],
            updatedAt: new Date(),
        })
        .where(eq(pages.id, id));

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
}

export async function deletePage(id: string) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    await db.delete(pages).where(eq(pages.id, id));
    revalidatePath("/admin");
}

export async function logout() {
    await signOut({ redirectTo: "/admin/login" });
}
