import getCases from "@/sanity/get-cases";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

import { clover_grotesk, gotham } from "@/app/fonts";
import { SanityDocument } from "next-sanity";
import Link from "next/link";
import ClientsGallery from "./clients";

interface CasesType {
  _id: string;
  title: string;
  clubber: string;
  slug: string;
  short_desc: string;
  cover_url: string;
}

const Card = ({ project, left }: { project: CasesType; left: boolean }) => {
  const { title, short_desc, clubber, cover_url, slug } = project;

  const caseRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: caseRef,
    offset: ["start end", "end start"],
  });

  const sm = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const md = useTransform(scrollYProgress, [0, 1], [0, -80]);
  // const lg = useTransform(scrollYProgress, [0, 1], [0, -175]);

  return (
    <motion.div
      ref={caseRef}
      className={`h-[70vh] min-h-fit sm:even:mr-auto sm:odd:ml-auto relative rounded-xl ${gotham.className}`}
    >
      <motion.h2
        style={{
          y: md,
        }}
        className={`text-xl w-fit sm:text-2xl ${
          clover_grotesk.className
        } uppercase font-bold text-allorange ${
          left ? "ml-auto mr-[3%]" : "mr-auto ml-[3%]"
        }`}
      >
        {clubber} - {title}
      </motion.h2>
      <Link
        href={`/results/${slug}`}
        className={`block max-w-[90vw] sm:max-w-screen-sm lg:max-w-screen-md overflow-hidden w-full cursor-expand-hover ${
          left ? "ml-auto mr-[3%]" : "mr-auto ml-[3%]"
        }`}
      >
        <motion.div
          style={{
            y: sm,
          }}
          whileHover={{
            opacity: 0.5,
          }}
          className="w-full aspect-[16/10] cursor-expand-hover relative"
        >
          <Image
            src={cover_url}
            className="pointer-events-none"
            fill
            objectFit="cover"
            alt={title}
          />
        </motion.div>
      </Link>
      <motion.p
        style={{
          y: md,
          fontSize: "max(18px, min(2.2vw, 32px))",
        }}
        className={`max-w-[90vw] sm:w-4/5 xl:w-3/5 mt-5 /sm:text-xl /lg:text-[1.7vw] !leading-none mix-blend-difference lowercase ${
          left ? "ml-auto mr-[10%]" : "mr-auto ml-[10%]"
        }`}
      >
        {short_desc}
      </motion.p>
    </motion.div>
  );
};

export function CasesSection() {
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

  const casesRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: casesRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const xR = useTransform(scrollYProgress, [0, 1], [200, -200]);

  return (
    <section ref={casesRef} className="min-h-svh relative /pt-20">
      <div
        style={{ height: "calc(100svh - 5rem)" }}
        className="w-full flex flex-col justify-between overflow-hidden sticky top-20"
      >
        <div>
          <motion.div
            style={{ x }}
            className="text-9xl flex gap-8 text-allorange relative -left-1/3 font-bold whitespace-nowrap opacity-20 "
          >
            {Array(15)
              .fill(0)
              .map((_, i) => (
                <p key={i} className="leading-none">
                  RESULTS
                </p>
              ))}
          </motion.div>
          <ClientsGallery />
        </div>

        <motion.div
          style={{ x: xR }}
          className="text-9xl flex gap-8 text-allorange relative -left-1/3  font-bold whitespace-nowrap opacity-20 "
        >
          {Array(15)
            .fill(0)
            .map((_, i) => (
              <p key={i} className="leading-none">
                RESULTS
              </p>
            ))}
        </motion.div>
      </div>
      <div className="-mt-[40vh] flex flex-col /overflow-x-clip">
        {cases.map((project, _i) => (
          <Card
            key={_i}
            project={project as unknown as CasesType}
            left={_i % 2 != 0}
          />
        ))}
      </div>
    </section>
  );
}
