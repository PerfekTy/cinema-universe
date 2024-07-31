"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const UserForm = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && !showForm) {
      event.preventDefault();
      setShowForm(true);
    }
  };

  return (
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
  );
};
