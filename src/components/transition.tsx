"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname } from "next/navigation";

import { useContext, useRef } from "react";

import Asterist from "/public/asterist.svg";

function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {});
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

const anim = (variants: Variants) => {
  return {
    initial: "initial",
    animate: "enter",
    exit: "exit",
    variants,
  };
};

const slide: Variants = {
  initial: {
    y: "0vh",
  },
  enter: {
    y: "100vh",
    transition: {
      delay: 0.2,
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    y: ["-100vh", "0vh"],
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const scaleRotate: Variants = {
  initial: {
    scale: 1,
    // translateX: "-50%",
    // translateY: "-50%",
  },
  enter: {
    scale: 0,
    rotate: ["135deg", "180deg"],
    // translateX: "-50%",
    // translateY: "-50%",
    transition: {
      duration: 0.5,
      ease: [0.75, 0, 0.25, 1],
    },
  },
  exit: {
    rotate: ["45deg", "90deg"],
    scale: 1,
    // translateX: "-50%",
    // translateY: "-50%",
    transition: {
      delay: 0.15,
      duration: 0.5,
      ease: [0.75, 0, 0.25, 1],
    },
  },
};

const PageTransitionEffect = ({ children }: { children: React.ReactNode }) => {
  // The `key` is tied to the url using the `usePathname` hook.
  const key = usePathname();

  const MotionAsterist = motion(Asterist);

  return (
    <AnimatePresence mode="wait">
      <div key={key}>
        <motion.div
          className="fixed w-screen h-screen z-40 left-0 top-0  flex justify-center items-center bg-allorange shadow-lg"
          {...anim(slide)}
        >
          <MotionAsterist
            // alt="asteristic"
            {...anim(scaleRotate)}
            className="top-1/2 fill-black left-1/2 z-40 w-60"
            // className="animate-spin-slow"
          />
        </motion.div>

        <FrozenRouter>{children}</FrozenRouter>
      </div>
    </AnimatePresence>
  );
};

export default PageTransitionEffect;
