import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    throw new Error("Method Not Allowed.");
  }

  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Fill all the fields." },
        { status: 400 },
      );
    }

    const existingUser = await db.query.users.findFirst({
      where: eq(email, users.email),
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 409 },
      );
    }

    const hashedPassword = await hash(password, 12);

    await db.insert(users).values({ name, email, password: hashedPassword });

    return NextResponse.json(
      { message: "User created successfully." },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Could not add the user.", error: error.message },
      { status: 500 },
    );
  }
}
