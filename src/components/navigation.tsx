"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Twirl as Hamburger } from "hamburger-react";
import { Button } from "./ui/button";
import { routes } from "@/lib/routes";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="gradient-background flex items-center justify-between p-3 text-sm md:mb-4 md:justify-between md:p-4 lg:rounded-b-md"
      >
        <h1 className="w-full text-lg text-white md:mr-5 md:text-xl">
          Cinema Universe
        </h1>
        <motion.ul className="hidden items-center gap-8 text-white md:flex md:text-[16px] lg:text-lg">
          {routes.map((route) => (
            <Link
              key={route.name}
              href={route.path}
              className={`link-container ${
                pathname === route.path && "link-container-active"
              }`}
            >
              {route.name}
            </Link>
          ))}
          <Button
            asChild
            className="bg-black font-bold uppercase tracking-wider text-[#4FBBD6] hover:bg-slate-800"
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
          className="absolute top-[73px] z-50 mb-4 grid w-full grid-cols-1 justify-center divide-y text-center shadow-md dark:shadow-slate-800"
        >
          {routes.map((rotue) => (
            <Link
              onClick={() => setOpen(false)}
              key={rotue.name}
              href={rotue.path}
              className="w-full p-3 hover:bg-slate-100 hover:dark:bg-slate-800"
            >
              {rotue.name}
            </Link>
          ))}
          <Link
            onClick={() => setOpen(false)}
            href="/auth"
            className="w-full p-3 font-bold uppercase hover:bg-slate-100 hover:dark:bg-slate-800"
          >
            Zaloguj się
          </Link>
        </motion.ul>
      )}
    </>
  );
};
