"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface CasesType {
  _id: string;
  title: string;
  clubber: string;
  slug: string;
  short_desc: string;
  cover_url: string;
}

function CaseItem({ caseItem }: { caseItem: CasesType }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [1.1, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.5, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-5vh", "5vh"]);

  const MotionLink = motion(Link);

  return (
    <motion.div
      ref={container}
      className="h-[45vh] flex overflow-hidden group "
    >
      <MotionLink
        className="w-full h-[45vh] relative flex justify-center items-center cursor-expand-hover"
        href={`/results/${caseItem.slug}`}
        style={{ opacity }}
      >
        <motion.div
          style={{ scale: scale, y }}
          className="brightness-50 w-full absolute inset-0 -top-[5vh] h-[55vh] cursor-expand-hover"
        >
          <Image
            src={caseItem.cover_url}
            alt={caseItem.slug}
            fill
            objectFit="cover"
            className="cursor-expand-hover"
          />
        </motion.div>
        <div className="z-10 cursor-expand-hover">
          <h1 className="text-xl sm:text-3xl cursor-expand-hover text-white">
            {caseItem.clubber} - {caseItem.title}
          </h1>
          <span className="block h-1 w-0 group-hover:w-full transition-[width] cursor-expand-hover bg-white"></span>
        </div>
      </MotionLink>
    </motion.div>
  );
}

export default function CasesGallery({ cases }: { cases: CasesType[] }) {
  return (
    <div className="sticky top-0">
      <ul className="w-full h-fit flex flex-col">
        {cases.map((value, index) => (
          <li key={index}>
            <CaseItem caseItem={value} />
          </li>
        ))}
      </ul>
    </div>
  );
}
