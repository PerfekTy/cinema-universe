"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FaApple, FaInstagram } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookBoxFill } from "react-icons/ri";
import { BiLeftArrow } from "react-icons/bi";
import { signIn } from "next-auth/react";

export function UserAuthForm() {
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);
  const [showLoginForm, setShowLoginForm] = useState<boolean>(true);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && !showRegisterForm) {
      event.preventDefault();
      setShowRegisterForm(true);
    }

    if (event.key === "Enter" && !showLoginForm) {
      event.preventDefault();
      setShowLoginForm(false);
    }
  };

  const login = async (email: string, password: string) => {
    if (!showLoginForm) {
      await signIn("credentials", { email, password }, { callbackUrl: "/" });
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      await login(user.email, user.password);
      if (showRegisterForm) {
        const res = await axios.post("/api/register", user);
        if (res.status === 200) {
          await login(user.email, user.password);
        }
      }
    } catch (error: any) {
      console.error("Submission error:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <Button asChild variant="ghost" className="p-4">
        <Link
          href=".."
          className="absolute left-5 top-5 mx-auto flex w-fit items-center gap-2 rounded-md border lg:left-[51%] lg:right-1/2"
        >
          <BiLeftArrow size={20} />
          <p>Back</p>
        </Link>
      </Button>
      <div className="relative grid gap-6">
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            {showRegisterForm && (
              <>
                <div className="my-2 grid gap-1">
                  <Label className="mb-1" htmlFor="name">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Jane Doe"
                    type="text"
                    name="name"
                    autoCapitalize="none"
                    autoComplete="name"
                    autoCorrect="off"
                  />
                </div>
                <div className="my-2 grid gap-1">
                  <Label className="mb-1" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="********"
                    type="password"
                    name="password"
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                </div>
              </>
            )}
            <div className="my-2 grid gap-1">
              <Label className="mb-1" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                name="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                onKeyDown={handleKeyDown}
              />
            </div>
            {!showLoginForm && (
              <div className="my-2 grid gap-1">
                <Label className="mb-1" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="********"
                  type="password"
                  name="password"
                  autoCapitalize="none"
                  autoCorrect="off"
                />
              </div>
            )}
            {!showLoginForm && (
              <Button type="submit" className="bg-green-500">
                Zaloguj się
              </Button>
            )}
            {showRegisterForm && (
              <Button type="submit" className="bg-green-500">
                Zarejestruj się
              </Button>
            )}
          </div>
        </form>
        {!showRegisterForm && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setShowRegisterForm(true);
              setShowLoginForm(true);
            }}
            className={`${showRegisterForm ? "hidden" : "-mt-4"}`}
          >
            Zarejestruj się przez email
          </Button>
        )}
        {showLoginForm && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setShowLoginForm(false);
              setShowRegisterForm(false);
            }}
            className={`${showLoginForm ? "-mt-4" : "hidden"}`}
          >
            Zaloguj się przez email
          </Button>
        )}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Albo kontynuuj z
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            type="button"
            className="flex items-center gap-2 p-3"
          >
            <RiFacebookBoxFill size={24} color="#0866ff" />
            <p>Facebook</p>
          </Button>
          <Button
            variant="outline"
            type="button"
            className="flex items-center gap-2 p-3"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <FcGoogle size={24} />
            <p>Google</p>
          </Button>
          <Button
            variant="outline"
            type="button"
            className="flex items-center gap-2 p-3"
          >
            <FaApple size={24} />
            <p>Apple</p>
          </Button>
          <Button
            variant="outline"
            type="button"
            className="flex items-center gap-2 p-3"
          >
            <FaInstagram size={24} />
            <p>Instagram</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
