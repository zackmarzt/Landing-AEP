"use server";

import { db } from "@/db/drizzle";
import { pages } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth, signOut } from "@/auth";
import { getAllContacts, updateContactStatus, getContactStats } from "@/lib/contacts";

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
export async function getContacts() {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");
    return await getAllContacts();
}

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

export async function submitContactForm(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // Server-side validation (basic)
    if (!name || !email || !message) {
        return { success: false, error: "Missing required fields" };
    }

    const { createContact } = await import("@/lib/contacts");
    const result = await createContact({
        name,
        email,
        phone,
        subject,
        message,
    });

    if (result.success) {
        revalidatePath("/admin/contacts");
        return { success: true };
    } else {
        return { success: false, error: "Failed to submit form" };
    }
}

export async function updateContactStatusAction(id: string, status: string) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const result = await updateContactStatus(id, status);
    if (result.success) {
        revalidatePath("/admin/contacts");
        return { success: true };
    } else {
        return { success: false, error: "Failed to update contact status" };
    }
}

export async function getContactStatsAction() {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");
    return await getContactStats();
}
