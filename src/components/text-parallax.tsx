import { HTMLMotionProps, motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type SupportedEdgeUnit = "px" | "vw" | "vh" | "%";
type EdgeUnit = `${number}${SupportedEdgeUnit}`;
type NamedEdges = "start" | "end" | "center";
type EdgeString = NamedEdges | EdgeUnit | `${number}`;
type Edge = EdgeString | number;
type ProgressIntersection = [number, number];
type Intersection = `${Edge} ${Edge}`;
type ScrollOffset = Array<Edge | Intersection | ProgressIntersection>;

type ParallaxProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  offset?: ScrollOffset;
  xRange?: [number, number];
  yRange?: [number, number];
  containerProps?: HTMLMotionProps<"div">;
  className?: string;
  // clampInitial?: boolean;
  // clampFinal?: boolean;
  // horizontal?: boolean;
};

export const TextParallax = ({
  children,
  xRange = [0, 0],
  yRange = [0, 0],
  offset = ["center", "end start"],
  className,
  containerProps,
}: ParallaxProps) => {
  const text = useRef(null);
  const { scrollYProgress } = useScroll({
    target: text,
    offset: offset,
  });
  const x = useTransform(scrollYProgress, [0, 1], xRange);
  const y = useTransform(scrollYProgress, [0, 1], yRange);

  return (
    <motion.div
      {...containerProps}
      className={className}
      ref={text}
      style={{ y, x }}
    >
      {children}
    </motion.div>
  );
};
