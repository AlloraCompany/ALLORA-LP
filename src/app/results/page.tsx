"use client";

import { Cursor } from "@/components/cursor";
import { Header } from "@/components/header";
import getCases from "@/sanity/get-cases";
import CasesGallery from "./cases-gallery";
import { clover_grotesk } from "../fonts";
import Bandeirola from "/public/bandeirola.svg";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Lenis from "lenis";
import { SanityDocument } from "next-sanity";

interface CasesType {
  _id: string;
  title: string;
  clubber: string;
  slug: string;
  short_desc: string;
  cover_url: string;
}

export default function Cases() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const [cases, setCases] = useState<CasesType[]>([]);

  useEffect(() => {
    getCases({ latest: true }).then((data) =>
      setCases(
        data.map((c: SanityDocument) => ({
          _id: c._id,
          title: c.title,
          clubber: c.clubber,
          slug: c.slug,
          cover_url: c.cover_url,
          short_desc: c.short_desc,
        }))
      )
    );
  }, []);

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["end 40%", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], ["-90%", "-50%"]);

  const MotionBandeirola = motion(Bandeirola);

  return (
    <main className="bg-black pt-20">
      <Cursor />
      <Header />
      <div
        ref={container}
        className="py-[5vw] px-[2.5vw] xl:px-[1.5vw]  relative max-md:pb-[20vw] overflow-hidden"
      >
        <h1
          className={`text-3xl sm:text-[4vw] leading-none text-allorange uppercase font-black ${clover_grotesk.className}`}
        >
          Criamos conexões, geramos impacto e entregamos resultados reais.
        </h1>
        <p
          className={`text-2xl sm:text-[2.5vw] leading-none mt-10 lowercase max-w-lg xl:max-w-2xl sm:max-w-2xl`}
        >
          Cada projeto é único, cada estratégia é feita sob medida. <br /> Nosso
          compromisso é transformar desafios em crescimento.
        </p>
        <MotionBandeirola
          style={{
            scale,
            y,
            x: "-110%",
          }}
          className="absolute inset-full w-[15vw] md:w-[10vw]"
        />
      </div>
      <CasesGallery cases={cases} />
      {/* <Footer /> */}
    </main>
  );
}
