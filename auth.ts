import { db } from "@/db/db";
import { User, users } from "@/db/schema";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin(
            "Please provive both email and password.",
          );
        }

        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
        });

        if (!user) {
          throw new Error("Invalid email or password.");
        }

        const isPasswordMatch = await compare(password, user.password);

        if (!isPasswordMatch) {
          throw new Error("Password did not matched.");
        }
        const userData: Omit<
          User,
          "createdAt" | "updatedAt" | "password" | "providerId"
        > & {
          id: string | undefined;
        } = {
          id: (user.id as string) || "",
          name: user.name,
          email: user.email,
          role: user.role,
        };

        return userData;
      },
    }),
  ],

  pages: {
    signIn: "/auth",
  },
});
