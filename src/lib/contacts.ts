import { db } from "@/db/drizzle";
import { contactSubmissions } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { sendMail } from "@/lib/mail";

export type CreateContactData = {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
};

export async function createContact(data: CreateContactData) {
    try {
        // 1. Save to database
        const [submission] = await db.insert(contactSubmissions).values({
            name: data.name,
            email: data.email,
            phone: data.phone,
            subject: data.subject,
            message: data.message,
        }).returning();

        // 2. Send email
        const contactEmail = process.env.CONTACT_EMAIL || "cultura@aepbr.org.br";

        const mailHtml = `
            <h2>Nova Mensagem de Contato</h2>
            <p><strong>Nome:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Telefone:</strong> ${data.phone}</p>
            <p><strong>Assunto:</strong> ${data.subject}</p>
            <p><strong>Mensagem:</strong></p>
            <p>${data.message.replace(/\n/g, '<br>')}</p>
        `;

        await sendMail({
            to: contactEmail,
            subject: `Novo Contato: ${data.subject}`,
            html: mailHtml,
        });

        return { success: true, submission };
    } catch (error) {
        console.error("Error creating contact:", error);
        return { success: false, error };
    }
}

export async function getAllContacts() {
    return await db.query.contactSubmissions.findMany({
        orderBy: [desc(contactSubmissions.createdAt)],
    });
}

export async function updateContactStatus(id: string, status: string) {
    try {
        await db.update(contactSubmissions)
            .set({ status })
            .where(eq(contactSubmissions.id, id));
        return { success: true };
    } catch (error) {
        console.error("Error updating contact status:", error);
        return { success: false, error };
    }
}

export async function getContactStats() {
    const all = await db.select().from(contactSubmissions);
    const total = all.length;
    const unread = all.filter(c => c.status === "Unread" || !c.status).length;
    const read = all.filter(c => c.status === "Read").length;
    const replied = all.filter(c => c.status === "Replied").length;

    return { total, unread, read, replied };
}
