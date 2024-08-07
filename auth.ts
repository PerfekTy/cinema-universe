import { db } from "@/db/db";
import { User, users } from "@/db/schema";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

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
          image: user.image,
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
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.name;
      }
      return token;
    },

    async signIn({ account }) {
      if (account?.provider === "google") {
        return true;
      }

      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
});
