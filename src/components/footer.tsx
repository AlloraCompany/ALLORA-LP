"use client";

import Link from "next/link";
import React from "react";
import Insta from "/public/insta.svg";
import Linkedin from "/public/linkedin.svg";
import { AsteristCanvas } from "./asterist3d";
import { clover_grotesk } from "@/app/fonts";

export default function Footer() {
  return (
    <footer
      className="relative h-[80svh] text-white"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 h-[80svh] w-full">
        <div className="h-full pt-16 px-[2.5vw] lg:px-[1.5vw] m-auto flex flex-col justify-between">
          <div className="w-full flex flex-wrap gap-y-5 justify-between">
            <ul className="flex gap-4 text-lg">
              <li>
                <Link
                  href="https://instagram.com/alloracompany"
                  target="_blank"
                  className="flex items-center gap-1 cursor-expand-hover group hover:text-allorange transition-all"
                >
                  <Insta
                    className="fill-white pointer-events-none group-hover:fill-allorange"
                    width={24}
                    height={24}
                  />
                  instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://linkedin.com/company/alloracompany"
                  target="_blank"
                  className="flex items-center gap-1 cursor-expand-hover group hover:text-allorange transition-all"
                >
                  <Linkedin
                    className="fill-white pointer-events-none group-hover:fill-allorange"
                    width={24}
                    height={24}
                  />
                  linkedin
                </Link>
              </li>
            </ul>
            <span className="sm:text-lg mt-auto">
              AV. PRESIDENTE KENNEDY, 815 * SALAS 4 e 6 * CAMPINAS, SÃO JOSÉ
            </span>
          </div>
          {/* <Asterist3d /> */}
          <div className="w-fit">
            <p className="text-4xl  md:text-7xl font-semibold">
              DESCUBRA O SEU <br className="hidden sm:block" />
              MELHOR DESEMPENHO
            </p>
            <svg
              viewBox="0 0 100 14"
              // preserveAspectRatio="xMidYMid meet"
              className={`w-full  cursor-pointer cursor-expand-hover  bg-underline bg-size-auto-190 pb-2  bg-y-0 hover:bg-y-100 hover:text-background transition-all`}
            >
              <text
                x="0"
                y="12"
                textLength={100}
                // fill="#f60"
                className={`leading-none w-full cursor-pointer cursor-expand-hover font-bold text-allorange fill-allorange hover:fill-background transition-all ${clover_grotesk.className}`}
              >
                CONTACT US
              </text>
            </svg>
            {/* <p
              className={`text-[10rem] w-fit leading-none font-bold cursor-pointer cursor-expand-hover text-allorange bg-underline bg-size-auto-190 bg-y-0 hover:bg-y-100 hover:text-background transition-all`}
            >
              CONTATO
            </p> */}
          </div>
          <div className="absolute top-0 left-0 w-full h-full -z-10 blur-sm opacity-25">
            <AsteristCanvas />
          </div>
        </div>
      </div>
    </footer>
  );
}
