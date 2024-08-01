import { NextRequest, NextResponse } from "next/server";
import { signIn } from "../../../../auth";

export const POST = async (req: NextRequest) => {
  if (req.method !== "POST") {
    throw new Error("Method Not Allowed.");
  }

  try {
    const { email, password } = await req.json();

    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });

    NextResponse.json({ message: "You're logged in." }, { status: 200 });
    return NextResponse.redirect(new URL("/", req.nextUrl));
  } catch (error: any) {
    return NextResponse.json(
      { message: "Could not authenticate.", error: error.message },
      { status: 500 },
    );
  }
};
