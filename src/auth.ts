import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "./db/drizzle";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.role = token.role as string;
                session.user.id = token.id as string;
            }
            return session;
        }
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await db.query.users.findFirst({
                        where: eq(users.email, email),
                    });

                    if (!user) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) return { id: user.id, name: user.name, email: user.email, role: user.role };
                }

                console.log("Invalid credentials");
                return null;
            },
        }),
    ],
});
