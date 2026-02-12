"use client";

import { Header } from "@/components/header";
import getPeople from "@/sanity/get-people";

import TeamGallery from "./team-gallery";
import { Cursor } from "@/components/cursor";
import Footer from "@/components/footer";
import { clover_grotesk } from "../fonts";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SanityDocument } from "next-sanity";
import Lenis from "lenis";
// import { PageTransition } from "@/components/transition";
// import Linkedin from "/public/linkedin.svg";

export default function Sobre() {
  // const people = await getPeople();

  const [people, setPeople] = useState<SanityDocument[]>([]);

  useEffect(() => {
    getPeople().then((data) => setPeople(data));

    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["end center", "end start"],
  });

  const sm = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const md = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <main className="bg-black text-white">
      <Cursor />
      <Header />
      <div className="pt-20"></div>
      <div
        ref={container}
        className="bg-black bg-cover w-full flex flex-col lg:flex-row justify-between relative gap-y-14 px-[2.5vw] xl:px-[1.5vw]"
      >
        <motion.div style={{ y: sm }} className="lg:w-11/12">
          <h1
            className={`text-2xl text-allorange font-semibold py-6 sm:py-12  text-[7vw] whitespace-nowrap uppercase leading-none ${clover_grotesk.className}`}
          >
            sobre nós
          </h1>
          <motion.p
            style={{ y: sm }}
            className={`text-2xl sm:text-[2.5vw] font-normal  mt-auto pb-0 py-6 sm:py-12 leading-none`}
          >
            esqueça fórmulas prontas. <br /> aqui, cada estratégia nasce de
            muita troca, criatividade e um olhar afiado para o que realmente
            gera impacto. nosso time é movido por inovação, desafios e a vontade
            constante de transformar negócios.
          </motion.p>
        </motion.div>
        <motion.div
          style={{ y: md }}
          className="lg:w-1/2 flex flex-col justify-center items-center relative"
        >
          <div className="flex py-[5vw] pl-[5vw] relative">
            <span
              className={`${clover_grotesk.className} text-allorange opacity-50 text-[6vw] font-black absolute right-[5vw] top-0`}
            >
              #01
            </span>
            <motion.p
              style={{
                fontSize: "max(22px, 1vw)",
              }}
              className={`z-[5] [&>b]:bg-allorange [&>b]:text-black [&>b]:font-black leading-tight lowercase font-normal ${clover_grotesk.className}`}
            >
              <b>impactar positivamente</b> os negócios de nossos parceiros é
              mais que uma promessa, <b>é nosso propósito</b>.
            </motion.p>
          </div>
          <h1
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-allorange uppercase opacity-50 font-black text-4xl ${clover_grotesk.className}`}
          >
            bandeiras
          </h1>
          <div className="flex py-[5vw] pl-[5vw] relative">
            <span
              className={`${clover_grotesk.className} text-allorange opacity-50 text-[6vw] font-black absolute right-[5vw] top-0`}
            >
              #02
            </span>
            <motion.p
              style={{
                fontSize: "max(22px, 1vw)",
              }}
              className={`z-[5] [&>b]:bg-allorange [&>b]:text-black [&>b]:font-black leading-tight lowercase font-normal ${clover_grotesk.className}`}
            >
              ir além das expectativas, verdadeiramente transformar desafios em{" "}
              <b>marcos mensuráveis</b>.
            </motion.p>
          </div>
        </motion.div>
      </div>
      {/* <p
        className={`text-4xl w-4/5 xl:3/4 font-normal p-6 pt-0 sm:p-12 mt-auto leading-none`}
      >
        acreditamos que grandes resultados vêm de grandes conexões — entre
        pessoas, marcas e ideias. é por isso que trabalhamos lado a lado com
        nossos clientes, entendendo suas necessidades e criando soluções sob
        medida.
      </p> */}
      <div className="relative bg-black">
        <h1
          className={`text-2xl font-semibold py-6 px-[2.5vw] xl:px-[1.5vw] sm:py-12 text-[5vw] leading-none w-full ${clover_grotesk.className}`}
        >
          conheça o time
        </h1>
        <TeamGallery people={people} />
      </div>
      <div className="w-full h-60"></div>
      <Footer />
    </main>
  );
}
