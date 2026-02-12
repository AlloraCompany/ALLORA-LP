"use client";

import { DVDBouncing } from "@/components/dvd-boucing";
import { clover_grotesk } from "../fonts";
import { motion } from "motion/react";
// import { HoverExpandCursorContainer } from "@/components/cursor";

export default function Wait() {
  return (
    <>
      <main
        className={`bg-[url('/bg-v2.webp')] text-white relative bg-cover w-screen h-svh flex flex-col ${clover_grotesk.className}`}
      >
        <div className="flex flex-wrap items-center max-lg:flex-col-reverse justify-between mt-12 lg:px-20 max-lg:px-10 w-full">
          <p className={"text-lg max-xl:m-auto font-semibold"}>
            VOCÊ ESTÁ À PROCURA DO QUE ESTAMOS FAZENDO.
            <br className="hidden max-md:block" />
            <b className={`text-allorange font-bold md:ml-6`}>
              E NÃO É SÓ ESSE SITE.
            </b>
          </p>
          <img
            src="logo.svg"
            className="w-1/4 max-xl:m-auto max-w-sm min-w-96"
          />
        </div>
        <DVDBouncing />

        <a
          href="https://wa.me/5511947726952?text=oi%20carlos%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20allora."
          target="_blank"
          className={`cursor-expand-hover absolute bottom-1/4 group hover:cursor-pointer grid grid-cols-6 md:flex justify-center 2xl:justify-between items-center line-clamp-1 whitespace-nowrap w-full overflow-hidden`}
        >
          <div className="flex justify-center col-span-5 items-center h-fit">
            <p
              className={`text-4xl md:text-home_clamp font-black group-hover:underline cursor-expand-hover`}
            >
              CONTACT US
            </p>
          </div>
          <img
            src="asterist.svg"
            alt="asteristic"
            className="w-[15vw] max-w-[100px] group-hover:animate-spin-slow"
          />
          <div className="hidden md:flex justify-center items-center h-fit">
            <p
              className={`text-home_clamp font-black group-hover:underline cursor-expand-hover`}
            >
              CONTACT US
            </p>
          </div>
          <img
            src="asterist.svg"
            alt="asteristic"
            className="w-[15vw] max-w-[100px] group-hover:animate-spin-slow"
          />
          <div className="flex justify-center col-span-5 items-center h-fit">
            <p
              className={`text-4xl md:text-home_clamp font-black group-hover:underline cursor-expand-hover`}
            >
              CONTACT US
            </p>
          </div>
        </a>

        <p
          className={
            "absolute text-sm sm:text-lg font-semibold bottom-12 right-20 max-lg:left-10 max-lg:px10"
          }
        >
          AV. PRESIDENTE KENNEDY, 815 * SALAS 4 e 6 * CAMPINAS, SÃO JOSÉ
        </p>
      </main>
      <motion.div
        className="fixed top-0 left-0 bg-allorange flex justify-center items-center w-screen h-svh z-[999999]"
        animate={{
          top: "-100%",
          transition: {
            delay: 1.2,
          },
        }}
      >
        <motion.div
          className="bg-black flex justify-center items-center  w-screen h-svh"
          initial={{
            scale: 1,
            // transition: {
            //   duration: 0.7,
            //   // times: [0, 2.5, 5],
            // },
          }}
          animate={{
            scale: [10, 1],
            transition: {
              duration: 0.7,
              // times: [0, 2.5, 5],
            },
          }}
        >
          <motion.img
            src="asterist.svg"
            alt="asteristic"
            className="bg-black  scale-[10]"
            animate={{
              scale: [10, 0.5],
              transition: {
                delay: 0.1,
                duration: 0.7,
              },
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
