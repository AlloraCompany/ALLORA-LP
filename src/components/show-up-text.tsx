import { motion } from "motion/react";
import { HTMLAttributes } from "react";

export const ShowUpText = ({
  children,
  // reverse = false,
  ...props
}: HTMLAttributes<HTMLDivElement> & { delay: number; reverse?: boolean }) => {
  const DURATION = 0.3;
  const STAGGER = 0.025;
  // TODO: REVERSE PARAM

  const getChars = (word: string) => {
    const chars = [] as JSX.Element[];
    word.split("").forEach((char, i) => {
      chars.push(
        <motion.span
          initial={{
            y: "-110%",
            rotate: "10deg",
          }}
          animate={{
            y: 0,
            rotate: "0deg",
          }}
          exit={{
            y: "-110%",
            rotate: "10deg",
            transition: {
              delay: STAGGER * i,
            },
          }}
          transition={{
            duration: DURATION,
            ease: "easeInOut",
            delay: props.delay + STAGGER * i,
          }}
          className="inline-block whitespace-pre-wrap"
          key={i}
        >
          {char}
        </motion.span>
      );
    });
    return chars;
  };

  return (
    <motion.p
      initial="initial"
      whileHover="hovered"
      className={`relative block overflow-hidden whitespace-nowrap w-fit ${props.className}`}
      style={{
        lineHeight: 0.75,
        ...props.style,
      }}
    >
      {getChars(children as string)}
      <span className="absolute opacity-0 pointer-events-none">{children}</span>
    </motion.p>
  );
};
