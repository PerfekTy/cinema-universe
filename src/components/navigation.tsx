"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Twirl as Hamburger } from "hamburger-react";
import { Button } from "./ui/button";

export const Navigation = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="gradient-background p-3 flex justify-between items-center md:rounded-b-md md:justify-between md:p-4 text-sm md:mb-4"
      >
        <h1 className="text-white w-full md:pr-5 text-lg md:text-2xl">
          Cinema Universe
        </h1>
        <motion.ul className="hidden md:flex gap-7 items-center text-white text-[16px]">
          <Link className="" href="">
            Repertuar
          </Link>
          <Link className="" href="">
            Wydarzenia
          </Link>
          <Link className="" href="">
            Promocje
          </Link>
          <Link className="" href="">
            Newsy
          </Link>
          <Button className="text-[#4FBBD6] font-bold uppercase tracking-wider hover:bg-slate-800 bg-black">
            Zaloguj się
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
          className="top-[73px] left-0 w-full flex flex-col items-center shadow-md dark:shadow-slate-800 mb-4"
        >
          <Link
            href=""
            className="p-3 w-full text-center hover:dark:bg-slate-800 hover:bg-slate-100"
          >
            Repertuar
          </Link>
          <Link
            href=""
            className="p-3 w-full text-center hover:dark:bg-slate-800 hover:bg-slate-100"
          >
            Wydarzenia{" "}
          </Link>
          <Link
            href=""
            className="p-3 w-full text-center hover:dark:bg-slate-800 hover:bg-slate-100"
          >
            Promocje
          </Link>
          <Link
            href=""
            className="p-3 w-full text-center hover:dark:bg-slate-800 hover:bg-slate-100"
          >
            Newsy
          </Link>
        </motion.ul>
      )}
    </>
  );
};
