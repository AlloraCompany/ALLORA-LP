"use client";

import { SanityDocument } from "next-sanity";
import Image from "next/image";

import { useContext, useEffect, useState } from "react";
import { urlFor } from "@/utils/sanity-url";
import {
  motion,
  MotionValue,
  SpringOptions,
  useMotionValue,
  useSpring,
  Variants,
} from "motion/react";
import { CursorContext } from "@/components/cursor";

const scaleAnimation: Variants = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

function Modal({
  photos,
  modal,
  position,
}: {
  photos: string[];
  modal: { active: boolean; index: number };
  position: { left: MotionValue<number>; top: MotionValue<number> };
}) {
  const { active, index } = modal;
  const { left, top } = position;

  return (
    <motion.div
      variants={scaleAnimation}
      style={{ left, top }}
      initial="initial"
      animate={active ? "enter" : "closed"}
      className="h-80 w-64 hidden md:flex items-center  justify-center fixed overflow-hidden pointer-events-none"
    >
      <div
        style={{
          top: index * -100 + "%",
          // transition: "top .5s cubic-bezier(0, .63, 0.66, .82)",
        }}
        className="size-full absolute"
      >
        {photos.map((photo, _i) => (
          <div className="h-full [&>img]:h-auto" key={_i}>
            <Image
              key={_i}
              src={urlFor(photo).width(500).url()}
              width={256}
              height={0}
              alt="image"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function TeamGallery({ people }: { people: SanityDocument[] }) {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const [open, setOpen] = useState(-1);

  const over = useMotionValue(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springConfig: SpringOptions = {
    damping: 35,
    stiffness: 300,
    mass: 0.6,
    velocity: 0.08,
  };
  const left = useSpring(x, springConfig);
  const top = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!over.get()) {
        x.set(e.clientX);
        // x.set(Math.min(window.innerWidth, e.clientX + 150));
        y.set(e.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  const { setActive: setCursorActive } = useContext(CursorContext);

  // const [active, setActive] = useState(false);

  return (
    <div className="w-full flex justify-center overflow-hidden">
      <ul className="w-full border-t-2 border-white border-opacity-15 mix-blend-difference text-white lowercase">
        {people.map((p, _i) => {
          return (
            <li
              key={p._id}
              // style={{ borderColor: open == _i ? "#FFFFFF70" : "#FFFFFF15" }}
              className="border-y-2 mt-[-2px] border-white border-opacity-15 group min-[480px]:hover:!border-opacity-70 px-[2.5vw] xl:px-[1.5vw] py-3 transition-all cursor-hover"
              onMouseEnter={() => {
                setModal({ active: true, index: _i });
                setCursorActive(false);
              }}
              onMouseLeave={() => {
                setModal({ active: false, index: _i });
                setCursorActive(true);
              }}
            >
              <div
                style={{ opacity: open == _i ? "70%" : "25%" }}
                className="flex flex-wrap justify-between sm:justify-normal min-[480px]:group-hover:!opacity-70 opacity-25 relative"
              >
                <h1 className="max-w-[45%] min-[480px]:max-w-48 lg:max-w-64 w-full md:text-lg lg:text-xl truncate uppercase">
                  {p.first_name} {p.last_name}
                </h1>
                <span className="max-w-[45%] min-[480px]:max-w-48 lg:max-w-64 w-full text-right sm:text-left truncate md:text-lg">
                  {p.occupation}
                </span>
                <span className="hidden sm:block md:text-lg overflow-hidden transition-all">
                  {p.bio}
                </span>
                <div
                  style={{
                    height: open == _i ? "fit-content" : "0px",
                    paddingTop: open == _i ? "16px" : "0px",
                  }}
                  className="sm:hidden w-full flex flex-col gap-2 items-center overflow-hidden transition-[height] duration-300 flex-shrink"
                >
                  <div className="h-full [&>img]:h-auto" key={_i}>
                    <Image
                      key={_i}
                      src={urlFor(p.photo).width(500).url()}
                      width={256}
                      height={0}
                      alt="image"
                    />
                  </div>
                  <span>{p.bio}</span>
                </div>
                <button
                  className="absolute sm:hidden size-full inset-0"
                  onClick={() => setOpen(open == _i ? -1 : _i)}
                ></button>
              </div>
            </li>
          );
        })}
        <li className="w-full border-white border-opacity-15 h-0 border-t-2 mt-[-2px]"></li>
      </ul>
      <Modal
        photos={people.map((p) => p.photo)}
        modal={modal}
        position={{ left, top }}
      />
    </div>
  );
}
