"use server";

import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const register = async (formData: FormData) => {
  const newUser = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (!newUser.email || !newUser.password || !newUser.name) {
    throw new Error("Please fill out all fields");
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, newUser.email),
  });

  if (existingUser) throw new Error("User already exists");

  await db.insert(users).values(newUser);

  console.log("User registered", newUser);
  redirect("/");
};
