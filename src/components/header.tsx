"use client";

import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  Transition,
} from "motion/react";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { ShowUpText } from "./show-up-text";
import { clover_grotesk } from "@/app/fonts";
import { usePathname } from "next/navigation";

import LogoIcon from "/public/logo-icon.svg";

const Hamburguer = ({
  active = "false",
  ...props
}: HTMLMotionProps<"button"> & {
  active: boolean | string;
}) => {
  const transition: Transition = { duration: 0.4, ease: [0.76, 0, 0.24, 1] };
  return (
    <motion.button {...props} className={`${props.className} p-2 group`}>
      <motion.div
        animate={{
          rotate: active == "true" ? ["0deg", "30deg"] : "0deg",
          y: active == "true" ? ["0px", "5px"] : "0px",
          transition: transition,
        }}
        className={`group-hover:bg-allorange pointer-events-none bg-white transition-all w-full h-1.5 origin-center`}
      />
      <motion.div
        animate={{
          rotate: active == "true" ? ["0deg", "-30deg"] : "0deg",
          y: active == "true" ? ["0px", "-5px"] : "0px",
          transition: transition,
        }}
        className={`group-hover:bg-allorange pointer-events-none bg-white transition-all w-full h-1.5 mt-1 origin-center`}
      />
    </motion.button>
  );
};

const transition: Transition = { duration: 0.8, ease: [0.76, 0, 0.24, 1] };

const Nav = () => {
  const pathname = usePathname();

  return (
    <motion.div
      className="w-screen text-9xl flex flex-col bg-allorange justify-center"
      initial={{
        height: "0svh",
      }}
      animate={{
        height: "100svh",
        transition,
      }}
      exit={{
        height: "0svh",
        transition,
      }}
    >
      <div className="h-1/3 flex flex-col justify-between  font-medium text-[15vw] sm:text-[12vw] items-center sm:py-40 -mt-20 sm:pl-10 sm:items-start sm:h-full">
        <Link
          href="/"
          className="cursor-expand-hover w-fit hover:font-bold transition-all duration-75"
        >
          <ShowUpText
            className={`${
              pathname == "/" ? "text-black font-bold" : "text-white"
            }`}
            delay={0.3}
          >
            home
          </ShowUpText>
        </Link>
        <Link
          href="/results"
          className="cursor-expand-hover w-fit hover:font-bold transition-all duration-75"
        >
          <ShowUpText
            className={`${
              pathname == "/results" ? "text-black font-bold" : "text-white"
            }`}
            delay={0.4}
          >
            results
          </ShowUpText>
        </Link>
        <Link
          href="/sobre"
          className="cursor-expand-hover w-fit hover:font-bold transition-all duration-75"
        >
          <ShowUpText
            className={`${
              pathname == "/sobre" ? "text-black font-bold" : "text-white"
            }`}
            delay={0.35}
          >
            sobre nós
          </ShowUpText>
        </Link>
        <Link
          href="/contact"
          className="cursor-expand-hover w-fit hover:font-bold transition-all duration-75"
        >
          <ShowUpText
            className={`${
              pathname == "/contact" ? "text-black font-bold" : "text-white"
            }`}
            delay={0.45}
          >
            contact us
          </ShowUpText>
        </Link>
      </div>
    </motion.div>
  );
};

export const Header = ({}: { children?: ReactNode }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <motion.div
        className={`fixed z-10 top-0 left-0 w-screen max-h-svh items-center border-b-2 border-white backdrop-blur-xl ${clover_grotesk.className}`}
      >
        <div className="flex w-full py-4 px-[2.5vw] xl:px-[1.5vw] items-center justify-between h-20">
          <Link href="/" className="flex gap-2 h-6 mr-auto">
            {/* <span className="h-fit leading-[0.7] text-white isolate">
              results club
            </span> */}
            <LogoIcon className="h-full w-8 !fill-white" />
          </Link>
          {/* <Link href="/sobre">sobre</Link> */}
          {/* <Link href="/">home</Link> */}
          <Hamburguer
            className="relative w-14 z-20 cursor-expand-hover cursor-pointer"
            active={isActive.toString()}
            onClick={() => setIsActive(!isActive)}
          />
        </div>
        <AnimatePresence mode="wait">
          {isActive ? <Nav /> : undefined}
        </AnimatePresence>
      </motion.div>
      <span className="h-[80px] w-full"></span>
    </>
  );
};
