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
            "Please provide both email and password.",
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
          throw new Error("Password did not match.");
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

  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const { email, name, id, image } = user;
          const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email),
          });

          if (!existingUser) {
            await db.insert(users).values({
              email,
              name,
              role: "user",
              providerId: id,
              image,
            });
          }
        } catch (error) {
          throw new Error("Error while creating user.");
        }
      }

      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
});
