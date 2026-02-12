"use client";
import { animate } from "motion";
import { motion, SpringOptions, useMotionValue, useSpring } from "motion/react";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useEffect, useRef } from "react";

import Asterist from "/public/asterist.svg";

const defaultWidth = 24;
const hoverWidth = 48;

export const CursorContext = createContext<{
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>> | (() => void);
}>({ active: false, setActive: () => {} });

export const CursorContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [active, setActive] = useState(true);

  return (
    <CursorContext.Provider value={{ active, setActive }}>
      {children}
    </CursorContext.Provider>
  );
};

export const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGElement>(null);
  const over = useMotionValue(false);
  const width = useMotionValue(defaultWidth);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springConfig: SpringOptions = {
    damping: 25,
    stiffness: 300,
    mass: 0.2,
    velocity: 0.1,
  };
  const cursorXSpring = useSpring(x, springConfig);
  const cursorYSpring = useSpring(y, springConfig);
  const cursorWidthSpring = useSpring(width, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!over.get()) {
        x.set(e.clientX - width.get() / 2);
        y.set(e.clientY - width.get() / 2);
      }
    };
    const handleMouseOver = (e: MouseEvent) => {
      const classList = (e.target as HTMLElement).classList;
      // console.log(classList);
      if (
        cursorRef.current &&
        iconRef.current &&
        classList.contains("cursor-expand-hover")
      ) {
        width.set(hoverWidth);
        animate(iconRef.current, { scale: 8 }, { ...springConfig });
        animate(
          iconRef.current,
          { opacity: 0 },
          {
            delay: 0.35,
            duration: 0.2,
            ...springConfig,
          }
        );
        animate(cursorRef.current, { borderWidth: 2 }, { ...springConfig });
      } else if (iconRef.current && cursorRef.current) {
        animate(
          iconRef.current,
          { scale: 1 },
          {
            // delay: 0.1,
            duration: 0.45,
            ...springConfig,
          }
        );
        // animate(iconRef.current, { op }, { ...springConfig});
        animate(
          iconRef.current,
          { opacity: 1 },
          { duration: 0.1, ...springConfig }
        );
        animate(
          cursorRef.current,
          { borderWidth: 0 },
          { duration: 0.1, ...springConfig }
        );
        width.set(defaultWidth);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    // window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      // window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const { active } = useContext(CursorContext);
  const MotionAsterist = motion(Asterist);

  return (
    <motion.div
      className="fixed max-sm:hidden pointer-events-none rounded-full border-allorange mix-blend-difference bg-black z-50 overflow-hidden"
      ref={cursorRef}
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
        width: cursorWidthSpring,
        height: cursorWidthSpring,
        opacity: active ? 1 : 0,
      }}
    >
      <MotionAsterist
        ref={iconRef}
        className="fill-allorange"
        style={{
          width: cursorWidthSpring,
          height: cursorWidthSpring,
        }}
      />
      <motion.div
        className="absolute "
        style={{
          width: cursorWidthSpring,
          height: cursorWidthSpring,
        }}
      ></motion.div>
    </motion.div>
  );
};
