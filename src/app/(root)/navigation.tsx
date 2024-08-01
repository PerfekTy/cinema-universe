"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Twirl as Hamburger } from "hamburger-react";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { usePathname } from "next/navigation";
import { User } from "next-auth";

export const Navigation = ({ user }: { user: User | undefined }) => {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);

  console.log("user", user);

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

          {user ? (
            <Button className="bg-slate-200 font-bold uppercase tracking-wider text-black hover:bg-slate-300">
              Wyloguj się
            </Button>
          ) : (
            <Button
              asChild
              className="bg-slate-200 font-bold uppercase tracking-wider text-black hover:bg-slate-300"
            >
              <Link href="/auth">Zaloguj się</Link>
            </Button>
          )}
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
          {user ? (
            <Link
              onClick={() => setOpen(false)}
              href="/auth"
              className="w-full p-3 font-bold uppercase hover:bg-slate-100 hover:dark:bg-slate-800"
            >
              Wyloguj się
            </Link>
          ) : (
            <Link
              onClick={() => setOpen(false)}
              href="/auth"
              className="w-full p-3 font-bold uppercase hover:bg-slate-100 hover:dark:bg-slate-800"
            >
              Zaloguj się
            </Link>
          )}
        </motion.ul>
      )}
    </>
  );
};
