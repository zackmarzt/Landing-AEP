"use server";

import { db } from "@/db/drizzle";
import { projects } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

// Public Actions
export async function getProjects() {
    return await db.query.projects.findMany({
        where: eq(projects.status, "Published"),
        orderBy: [desc(projects.createdAt)],
    });
}

export async function getProject(id: string) {
    return await db.query.projects.findFirst({
        where: eq(projects.id, id),
    });
}

export async function getAllProjects() {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");
    return await db.query.projects.findMany({
        orderBy: [desc(projects.createdAt)],
    });
}

// Protected Actions
export async function createProject(formData: FormData) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;
    const imageUrl = formData.get("imageUrl") as string;

    await db.insert(projects).values({
        title,
        description,
        status,
        imageUrls: imageUrl ? [imageUrl] : [], // Simple array with one URL for now
    });

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
}

export async function updateProject(id: string, formData: FormData) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;
    const imageUrl = formData.get("imageUrl") as string;

    await db
        .update(projects)
        .set({
            title,
            description,
            status,
            imageUrls: imageUrl ? [imageUrl] : [],
            updatedAt: new Date(),
        })
        .where(eq(projects.id, id));

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
}

export async function deleteProject(id: string) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    await db.delete(projects).where(eq(projects.id, id));
    revalidatePath("/admin");
}

export async function logout() {
    await signOut({ redirectTo: "/admin/login" });
}
