import { pgTable, serial, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name"),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    role: text("role").default("user"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const pages = pgTable("pages", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    summary: text("summary").notNull(),
    content: text("content"), // New field for main page content
    imageUrls: text("image_urls").array(), // Use array of strings for multiple images
    status: text("status").default("Draft"), // 'Draft' | 'Published'
    featured: boolean("featured").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const settings = pgTable("settings", {
    key: text("key").primaryKey(),
    value: text("value"),
});
