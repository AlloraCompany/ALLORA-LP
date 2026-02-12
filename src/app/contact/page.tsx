"use client";

import { clover_grotesk } from "../fonts";
import { Header } from "@/components/header";
import { Cursor } from "@/components/cursor";
import Link from "next/link";

import Mail from "/public/mail.svg";
import Whats from "/public/whatsapp.svg";
import Insta from "/public/insta.svg";
import Linkedin from "/public/linkedin.svg";
import { useEffect } from "react";
import Lenis from "lenis";
import ContactForm from "./form";

export default function Contact() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="bg-black text-white relative">
      <Cursor />
      <Header />

      <div
        style={{
          height: "calc(100svh - 5rem)",
        }}
        className="h-[] w-full mt-20 pt-2 sm:pt-5 flex flex-col"
      >
        <div className="flex flex-wrap items-center gap-[2vh]">
          <h1
            className={`text-3xl text-nowrap sm:text-[8vw] pl-[10vw] !leading-none font-black w-fit bg-allorange text-black ${clover_grotesk.className}`}
          >
            CONTACT US
          </h1>
          <p className="text-[5vw] min-[530px]:text-[3vw] md:text-[2vw] px-[2.5vw] xl:px-[1.5vw]">
            conexões geram resultados. <br />
            fale com a gente!
          </p>
        </div>
        <div className="mt-[5vw] flex flex-wrap-reverse max-md:gap-y-[2vh]">
          <ContactForm />
          <div className="px-[2.5vw] flex-1 xl:px-[1.5vw] h-fit gap-y-[2.5vw] items-start pl-[2.5vw] xl:pl-[1.5vw] my-auto justify-center relative flex flex-col">
            <div className="flex flex-col flex-wrap items-start justify-end h-full">
              <div className="items-end w-fit gap-4 h-fit relative">
                <Link
                  className="flex items-center gap-1 cursor-expand-hover group"
                  target="_blank"
                  href="https://wa.me/5511947726952?text=oi%20carlos%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20allora."
                >
                  <Whats className="w-[5vw] min-[530px]:w-[3.5vw] md:w-[2vw]  h-fit fill-allorange group-hover:fill-white transition-colors cursor-expand-hover" />
                  <h1
                    className={`text-[5vw]  min-[530px]:text-[3vw] md:text-[2vw] transition-colors !leading-none font-black text-allorange group-hover:text-white cursor-expand-hover ${clover_grotesk.className}`}
                  >
                    11 94772 6952
                  </h1>
                </Link>
              </div>
              <div className="mt-[5vh] max-md:mt-[2vh] items-center w-fit gap-4 relative">
                <Link
                  className="flex items-center gap-1 cursor-expand-hover group"
                  target="_blank"
                  href="mailto:carlos@alloracompany.com"
                >
                  <Mail className="w-[5vw] min-[530px]:w-[3.5vw] md:w-[2vw] h-fit fill-allorange group-hover:fill-white transition-colors cursor-expand-hover" />
                  <h1
                    className={`text-[5vw] min-[530px]:text-[3vw] md:text-[2vw] uppercase transition-colors !leading-none font-black text-allorange group-hover:text-white cursor-expand-hover ${clover_grotesk.className}`}
                  >
                    carlos@alloracompany.com
                  </h1>
                </Link>
              </div>
              <div className="mt-[5vh] max-md:mt-[2vh]">
                <ul
                  style={{
                    fontSize: "max(18px, 2vw)",
                  }}
                  className="flex gap-4"
                >
                  <li>
                    <Link
                      href="https://instagram.com/alloracompany"
                      target="_blank"
                      className="flex items-center gap-1 cursor-expand-hover group text-allorange hover:text-white transition-all"
                    >
                      <Insta className="fill-allorange pointer-events-none group-hover:fill-white w-5 sm:w-[2vw] h-fit" />
                      instagram
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://linkedin.com/company/alloracompany"
                      target="_blank"
                      className="flex items-center gap-1 cursor-expand-hover group text-allorange hover:text-white transition-all"
                    >
                      <Linkedin className="fill-allorange pointer-events-none group-hover:fill-white w-5 sm:w-[2vw] h-fit" />
                      linkedin
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          height: "calc(100svh - 8vw - 200px)",
        }}
        className=" sticky top-0 max-md:max-h-[60vh]"
      >
        <div className="bg-[url('/bg-v2.webp')]  pt-20 bg-cover bg-center h-full w-full flex justify-center items-center relative px-2">
          <Link
            href="https://maps.app.goo.gl/Buk8AYxXKCwUvdUJ9"
            target="_blank"
          >
            <h1
              style={{
                fontSize: "max(16px, 3vw)",
              }}
              className={`text-white font-bold leading-none cursor-expand-hover p-5 ${clover_grotesk.className}`}
            >
              AV. PRESIDENTE KENNEDY, 815 * SALAS 4 e 6 *<br />
              <span className="mt-5 block">CAMPINAS, SÃO JOSÉ</span>
            </h1>
          </Link>
        </div>
      </div>
    </main>
  );
}
