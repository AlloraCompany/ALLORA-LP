"use client";

import { clover_grotesk } from "./fonts";
import { Header } from "@/components/header";
import { useEffect } from "react";
import Footer from "@/components/footer";
import Lenis from "lenis";
import { CasesSection } from "@/components/cases-section";
import { Cursor } from "@/components/cursor";

import HomeVideo from "@/components/home-video";
import Intro from "@/components/intro";
import ContactSection from "@/components/contact-us-section";
// import ClientsGallery from "@/components/clients";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <main
        className={`text-white relative w-full ${clover_grotesk.className}`}
      >
        <Cursor />
        <Header />
        <Intro />
        <div className="h-[140svh]  relative">
          <HomeVideo />
        </div>

        <ContactSection />
        {/* SECTION: CASES */}
        {/* <ClientsGallery /> */}

        <CasesSection />
        {/* END SECTION: CASES */}
        {/* <ClientsGallery /> */}
        {/* <div className="bg-black bg-cover h-svh w-full flex flex-col relative">
          <div className="text-9xl p-12"></div>
        </div> */}
      </main>
      <Footer />

      {/* <motion.div
        className="fixed top-0 left-0 bg-allorange flex justify-center items-center w-screen h-svh z-[999999]"
        animate={{
          top: "-100%",
          transition: {
            delay: 0.9,
          },
        }}
      >
        <motion.div
          className="bg-black relative flex justify-center items-center w-screen h-svh"
          initial={{
            scale: [10, 1],
            transition: {
              duration: 0.7,
            },
          }}
          animate={{
            scale: [10, 1],
            transition: {
              duration: 0.7,
            },
          }}
        >
          <motion.img
            src="asterist.svg"
            alt="asteristic"
            className="scale-[15]"
            animate={{
              scale: [15, 1],
              transition: {
                delay: 0.1,
                duration: 0.7,
              },
            }}
          />
        </motion.div>
      </motion.div> */}
    </>
  );
}
