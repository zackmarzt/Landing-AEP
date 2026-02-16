
import { db } from "@/db/drizzle";
import { users, settings } from "@/db/schema";
import { hash } from "bcryptjs";

export async function checkIsSetup() {
    // Check if we have any users
    const existingUsers = await db.select().from(users).limit(1);
    if (existingUsers.length > 0) {
        return true;
    }

    // Also check for a specific setting flag just in case users were deleted but setup was done (though typically we need an admin)
    // For now, presence of any user is a good enough proxy for "is setup" in this simple context.
    return false;
}

export async function completeSetup(data: {
    siteName: string;
    adminName: string;
    adminEmail: string;
    adminPassword: string;
}) {
    if (await checkIsSetup()) {
        throw new Error("Setup already completed");
    }

    // 1. Save Site Name
    await db.insert(settings).values({
        key: "site_name",
        value: data.siteName,
    });

    // 2. Create Admin User
    const hashedPassword = await hash(data.adminPassword, 12);
    await db.insert(users).values({
        name: data.adminName,
        email: data.adminEmail,
        password: hashedPassword,
        role: "admin",
    });

    return { success: true };
}
