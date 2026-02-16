
import { db } from "@/db/drizzle";
import { users, pages, contactSubmissions, settings } from "@/db/schema";

async function reset() {
    console.log("🗑️ Clearing database...");

    await db.delete(contactSubmissions);
    await db.delete(pages);
    await db.delete(settings);
    await db.delete(users);

    console.log("✅ Database cleared. You can now run the setup again.");
    process.exit(0);
}

reset().catch(console.error);
