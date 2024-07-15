"use client";

import { Button } from "@/components/ui/button";
import { CustomFormInput } from "@/components/ui/from-input";
import { Lock, Mail } from "lucide-react";
import React, { FormEvent } from "react";

const Login = () => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto space-y-5">
      <CustomFormInput
        label="Email"
        type="email"
        placeholder="example@mail.com"
        icon={<Mail size={20} />}
      />
      <CustomFormInput
        label="Password"
        type="password"
        placeholder="********"
        icon={<Lock size={20} />}
      />
      <Button type="submit" className="w-full">
        Zaloguj
      </Button>
    </form>
  );
};

export default Login;
