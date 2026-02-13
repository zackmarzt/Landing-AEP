import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { db } from "./drizzle";
import { users } from "./schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

async function main() {
    console.log("Seeding database...");

    const adminEmail = "admin@aep.com";
    const password = "admin"; // Change this in production!

    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, adminEmail),
    });

    if (!existingUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.insert(users).values({
            name: "Admin User",
            email: adminEmail,
            password: hashedPassword,
            role: "admin",
        });
        console.log(`Created admin user: ${adminEmail} / ${password}`);
    } else {
        console.log("Admin user already exists.");
    }

    console.log("Seeding complete.");
    process.exit(0);
}

main().catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
});
