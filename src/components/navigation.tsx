"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Twirl as Hamburger } from "hamburger-react";
import { Button } from "./ui/button";
import { routes } from "@/lib/routes";

export const Navigation = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="gradient-background p-3 flex justify-between items-center lg:rounded-b-md md:justify-between md:p-4 text-sm md:mb-4"
      >
        <h1 className="text-white w-full md:mr-5 text-lg md:text-xl">
          Cinema Universe
        </h1>
        <motion.ul className="hidden md:flex gap-8 items-center text-white text-[16px]">
          {routes.map((rotue) => (
            <Link key={rotue.name} href={rotue.path} className="link-container">
              {rotue.name}
            </Link>
          ))}
          <Button
            asChild
            className="text-[#4FBBD6] font-bold uppercase tracking-wider hover:bg-slate-800 bg-black"
          >
            <Link href="/auth">Zaloguj się</Link>
          </Button>
        </motion.ul>
        <span className="md:hidden">
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            size={25}
            color="white"
          />
        </span>
      </motion.nav>
      {isOpen && (
        <motion.ul
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute w-full z-50 top-[73px] grid grid-cols-1 justify-center text-center shadow-md dark:shadow-slate-800 mb-4 divide-y"
        >
          {routes.map((rotue) => (
            <Link
              onClick={() => setOpen(false)}
              key={rotue.name}
              href={rotue.path}
              className="p-3 w-full hover:dark:bg-slate-800 hover:bg-slate-100 "
            >
              {rotue.name}
            </Link>
          ))}
          <Link
            onClick={() => setOpen(false)}
            href="/auth"
            className="p-3 w-full font-bold uppercase hover:dark:bg-slate-800 hover:bg-slate-100"
          >
            Zaloguj się
          </Link>
        </motion.ul>
      )}
    </>
  );
};
