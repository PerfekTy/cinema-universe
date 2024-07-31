"use client";

import { useState } from "react";
import Link from "next/link";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookBoxFill } from "react-icons/ri";
import { BiLeftArrow } from "react-icons/bi";
import { register } from "../../action/user";

export function UserAuthForm() {
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && !showForm) {
      event.preventDefault();
      setShowForm(true);
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
        <form action={register}>
          <div className="grid gap-2">
            {showForm && (
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
            {showForm ? <Button type="submit">Zaloguj się</Button> : null}
          </div>
        </form>
        {!showForm && (
          <Button
            type="button"
            onClick={() => setShowForm(true)}
            className={`${showForm ? "hidden" : "-mt-5"}`}
          >
            Zaloguj się przez e-mail
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
        <div className="flex flex-col gap-2">
          <Button variant="outline" type="button" className="flex gap-2 p-3">
            <p>Kontynuuj przez Facebook</p>
            <RiFacebookBoxFill size={24} color="#0866ff" />
          </Button>
          <Button variant="outline" type="button" className="flex gap-2 p-3">
            <p>Kontynuuj przez Google</p>
            <FcGoogle size={24} />
          </Button>
          <Button variant="outline" type="button" className="flex gap-2 p-3">
            <p>Kontynuuj przez Apple</p>
            <FaApple size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
}
