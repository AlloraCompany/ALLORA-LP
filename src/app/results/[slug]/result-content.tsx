"use client";

import {
  SanityAssetDocument,
  SanityDocument,
  SanityImageAssetDocument,
} from "next-sanity";
import { PortableText } from "@portabletext/react";
import urlBuilder from "@sanity/image-url";
import { getFileAsset } from "@sanity/asset-utils";
import Image from "next/image";
import { client } from "@/sanity/client";
import { clover_grotesk } from "@/app/fonts";
import {
  EasingDefinition,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

const ImageComponent = ({
  value,
  isInline,
}: {
  value: SanityImageAssetDocument;
  isInline: boolean;
}) => {
  // const { width, height } = getImageDimensions(value);
  return (
    <div className="w-full !max-w-full !px-0 my-[2vw] sm:my-[5vw] h-[80vw] sm:h-[55vw] overflow-hidden relative">
      <Image
        src={
          urlBuilder(client)
            .image(value)
            .fit("max")
            .auto("format")
            .url() as string
        }
        fill
        objectFit="contain"
        alt={value.alt || "result image"}
        loading="lazy"
        style={{
          display: isInline ? "inline-block" : "block",
          aspectRatio: 16 / 9,
        }}
      />
    </div>
  );
};

const VideoComponent = ({ value }: { value: SanityAssetDocument }) => {
  return (
    <video
      playsInline
      loop
      muted
      // ref={videoRef}
      autoPlay
      className="w-full !max-w-full !px-0 my-[2vw] sm:my-[5vw] h-[80vw] sm:h-[55vw] overflow-hidden relative"
      // poster="https://cdn.sanity.io/images/ynp6mei5/production/e8e6e81bf823b07a8d967c88f15f2cf4aac71546-3360x1896.jpg"
      src={
        getFileAsset(value, {
          projectId: client.config().projectId,
          dataset: client.config().dataset,
        }).url
      }
      // onClick={() => {
      //   if (videoRef.current?.paused) {
      //     videoRef.current.play();
      //     setPaused(false);
      //   } else {
      //     videoRef.current?.pause();
      //     setPaused(true);
      //   }
      // }}
    />
  );
};

export default function ResultContent({ result }: { result: SanityDocument }) {
  const cover_container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cover_container,
    offset: ["start start", "15% start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], ["88vw", "97vw"]);
  const sm = useTransform(scrollYProgress, [0, 1], ["0vh", "5vh"]);

  const textInitial = {
    opacity: 0,
  };

  const textInView = {
    opacity: 1,
    transition: {
      ease: "linear" as EasingDefinition,
      duration: 0.35,
    },
  };

  return (
    <div className="relative pb-[20vh]">
      <div
        ref={cover_container}
        className="flex flex-col items-center bg-allorange pt-20"
      >
        <div className="w-full min-h-[40svh] h-fit pb-[8vh] grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-x-20 gap-y-10 py-[5vw] px-[2.5vw] xl:px-[1.5vw]">
          <motion.div
            style={{ y: sm }}
            className="flex flex-col size-full justify-center gap-[1.5vw]"
          >
            <h1
              className={`${clover_grotesk.className} uppercase w-fit text-6xl font-black text-white`}
            >
              {result.clubber}
            </h1>
            <div className="w-fit flex flex-wrap gap-2">
              {(result.tags as string).split(",").map((tag, _i) => (
                <span className="border border-white px-1.5" key={tag + _i}>
                  {tag.trim()}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div style={{ y: sm }} className="flex flex-col size-full">
            <h2
              className={`${clover_grotesk.className} uppercase w-fit text-5xl font-black text-white`}
            >
              {result.title}
            </h2>
            <p className="text-2xl lowercase m-auto">{result.short_desc}</p>
          </motion.div>
        </div>
        <motion.div
          className="max-w-[95vw] xl:max-w-[97vw]  h-[80vw] sm:h-[55vw] mt-auto flex justify-end overflow-hidden relative rounded-t-xl"
          style={{
            width: scale,
          }}
        >
          <Image
            src={result.cover_url}
            fill
            objectFit="cover"
            alt={result.title}
            loading="lazy"
            style={{
              aspectRatio: 16 / 9,
            }}
          />
        </motion.div>
      </div>
      <div className="[&>*]:px-[5vw] [&>*]:md:max-w-[70vw] [&>*]:min-[1600px]:max-w-screen-xl mt-10 flex flex-col items-center bg-black">
        <PortableText
          value={result.body}
          components={{
            types: {
              image: ImageComponent,
              file: VideoComponent,
            },
            block: {
              h1: ({ children }) => (
                <motion.h1
                  initial={textInitial}
                  whileInView={textInView}
                  className={`${clover_grotesk.className} w-full text-left text-3xl py-[3vw] sm:text-5xl uppercase font-bold`}
                >
                  {children}
                </motion.h1>
              ),
              h2: ({ children }) => (
                <motion.h2
                  initial={textInitial}
                  whileInView={textInView}
                  className={`${clover_grotesk.className} w-full text-left text-2xl py-[2vw] sm:text-4xl uppercase font-semibold`}
                >
                  {children}
                </motion.h2>
              ),
              h3: ({ children }) => (
                <motion.h3
                  initial={textInitial}
                  whileInView={textInView}
                  className={`${clover_grotesk.className} w-full text-left text-xl py-[2vw] sm:text-3xl uppercase font-normal`}
                >
                  {children}
                </motion.h3>
              ),
              h4: ({ children }) => (
                <motion.h4
                  initial={textInitial}
                  whileInView={textInView}
                  className={`${clover_grotesk.className} w-full text-left text-lg py-[1vw] sm:text-2xl uppercase font-normal`}
                >
                  {children}
                </motion.h4>
              ),
              normal: ({ children }) => (
                <motion.p
                  initial={textInitial}
                  whileInView={textInView}
                  className="text-lg sm:text-2xl w-full text-left lowercase"
                >
                  {children}
                </motion.p>
              ),
            },
          }}
        />
      </div>
    </div>
  );
}
