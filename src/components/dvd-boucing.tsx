"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export const DVDBouncing = () => {
  const speed = 2;

  // Tamanho do logo
  const dvdWidth = 300;
  const dvdHeight = 210;

  // Estado para armazenar a posição
  const [sizes, setSizes] = useState({ w: 0, h: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Referências para direção
  const dirX = useRef(1);
  const dirY = useRef(1);

  // Ref para armazenar o ID da animação
  const animationId = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSizes({
        w: 0.6 * dvdWidth,
        h: 0.6 * dvdHeight,
      });
    } else if (window.innerWidth < 1024) {
      setSizes({
        w: 0.8 * dvdWidth,
        h: 0.8 * dvdHeight,
      });
    } else if (window.innerWidth >= 1024) {
      setSizes({
        w: dvdWidth,
        h: dvdHeight,
      });
    }
  }, []);

  useEffect(() => {
    const animate = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (position.y + sizes.h >= screenHeight || position.y < 0) {
        dirY.current *= -1;
      }
      if (position.x + sizes.w + 1 >= screenWidth || position.x < 0) {
        dirX.current *= -1;
      }

      setPosition((prevPosition) => ({
        x: prevPosition.x + dirX.current * speed,
        y: prevPosition.y + dirY.current * speed,
      }));

      animationId.current = requestAnimationFrame(animate);
    };

    animationId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId.current as number);
    };
  }, [position]);

  return (
    <Image
      id="dvd"
      alt="RESULTS"
      src="RESULTS-FIUFIU.svg"
      width={sizes.w}
      height={sizes.h}
      style={{
        position: "absolute",
        left: position.x + "px",
        top: position.y + "px",
        zIndex: 999999,
      }}
    />
  );
};
