"use client";

import { useState } from "react";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookBoxFill } from "react-icons/ri";
import { BiLeftArrow } from "react-icons/bi";
import Link from "next/link";

export function UserAuthForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div>
      <Button asChild variant="ghost" className="p-4">
        <Link
          href=".."
          className="absolute left-[51%] right-1/2 top-5 mx-auto flex w-fit items-center gap-2 rounded-md border"
        >
          <BiLeftArrow size={20} />
          <p>Back</p>
        </Link>
      </Button>
      <div className={"relative grid gap-6"}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <Button disabled={isLoading}>Zaloguj się przez e-mail</Button>
          </div>
        </form>
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
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            className="flex gap-2 p-3"
          >
            <p>Kontynuuj przez Facebook</p>
            <RiFacebookBoxFill size={24} color="#0866ff" />
          </Button>
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            className="flex gap-2 p-3"
          >
            <p>Kontynuuj przez Google</p>
            <FcGoogle size={24} />
          </Button>
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            className="flex gap-2 p-3"
          >
            <p>Kontynuuj przez Apple</p>
            <FaApple size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
}
