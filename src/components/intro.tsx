import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import ResultsClub from "./results-club";

export default function Intro() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "15vh"]);
  const yR = useTransform(scrollYProgress, [0, 1], ["0vh", "-15vh"]);

  return (
    <div ref={container} className="h-svh overflow-hidden relative">
      <motion.div
        style={{ y }}
        className="bg-[url('/bg-v2.webp')] pt-20 bg-cover h-full w-full flex items-start relative px-2"
      >
        {/* <div
          className={`text-md sm:text-4xl p-2 ${gotham.className} font-medium w-1/3`}
        >
          estamos aqui para ser a agência que muda a história do seu negócio.
        </div> */}
        <motion.div style={{ y: yR }}>
          <ResultsClub className="max-w-[90vw] h-[90svh] sm:mt-0 -mt-20" />
          <h1 className="sr-only">allora results club</h1>
        </motion.div>
      </motion.div>
    </div>
  );
}
