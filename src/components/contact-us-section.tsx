import { clover_grotesk } from "@/app/fonts";
import {
  motion,
  SpringOptions,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function ContactSection() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const md = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const xCursor = useMotionValue(0);
  const yCursor = useMotionValue(0);

  const xButton = useTransform(xCursor, [0, 600], [-20, 20]);
  const yButton = useTransform(yCursor, [0, 600], [-20, 20]);

  const springConfig: SpringOptions = {
    damping: 25,
    stiffness: 300,
    mass: 0.2,
    velocity: 0.1,
  };
  const buttonXSpring = useSpring(xButton, springConfig);
  const buttonYSpring = useSpring(yButton, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      xCursor.set(e.clientX);
      yCursor.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const MotionLink = motion(Link);

  return (
    <div
      ref={container}
      className="h-[70vh] relative px-[2.5vw] lg:px-[1.5vw] flex flex-col justify-center items-start overflow-hidden"
    >
      <motion.p
        style={{
          fontSize: "max(26px, 2.9vw)",
          y: md,
        }}
        className={`max-w-[80%] xl:max-w-[60%] uppercase font-semibold z-[5] mix-blend-difference leading-none ${clover_grotesk.className}`}
      >
        estamos aqui para ser a agência que muda a história do seu negócio.
      </motion.p>
      <MotionLink
        style={{
          x: buttonXSpring,
          y: buttonYSpring,
          // marginTop: md,
        }}
        href="/contact"
        className="text-white text-4xl mt-[10vh] py-5 px-8 border cursor-expand-hover border-allorange rounded-[99%] hover:text-allorange hover:border-white"
      >
        contact us
      </MotionLink>

      <div className="md:h-3/4 max-md:w-4/5 /md:w-2/5 aspect-[9/7] absolute -top-5  md:top-[8vh] right-4">
        <Image
          src="/ideas.jpeg"
          fill
          objectFit="cover"
          className="opacity-25"
          alt=""
        />
      </div>
    </div>
  );
}
