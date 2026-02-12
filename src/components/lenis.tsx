"use client";
import React, { PropsWithChildren } from "react";
import { ReactLenis } from "lenis/react";

const Lenis = ({ children }: PropsWithChildren) => {
  return <ReactLenis root>{children}</ReactLenis>;
};

export default Lenis;
