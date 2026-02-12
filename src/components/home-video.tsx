import { useContext, useEffect, useRef, useState } from "react";
import { CursorContext } from "./cursor";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import SoundOn from "/public/sound-on.svg";
import SoundOff from "/public/sound-off.svg";

const video_h =
  "https://cdn.sanity.io/files/ynp6mei5/production/9405b9d36d0f5ec66ffc1543126c81a5a8389f03.mp4";
const video_v =
  "https://cdn.sanity.io/files/ynp6mei5/production/5397b7a8c607f77820355c50952cd903492cf783.mp4";

const poster_h =
  "https://cdn.sanity.io/images/ynp6mei5/production/e8e6e81bf823b07a8d967c88f15f2cf4aac71546-3360x1896.jpg";
const poster_v =
  "https://cdn.sanity.io/images/ynp6mei5/production/77f76d5bac714313a9b3ed12f5860118e71b2ffe-632x1146.webp";

export default function HomeVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef(null);

  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(true);

  const { scrollYProgress } = useScroll({
    target: videoContainerRef,
    offset: ["25% end", "start start"],
  });

  const width = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    ["15%", "30%", "100%"]
  );
  const ctop = useTransform(scrollYProgress, [0, 1], ["-12vh", "50vh"]);
  const cleft = useTransform(scrollYProgress, [0, 0.8], ["0%", "50%"]);
  const x = useTransform(scrollYProgress, [0, 0.8], ["0%", "50%"]);
  const mleft = useTransform(scrollYProgress, [0, 0.8], ["6%", "0%"]);

  useMotionValueEvent(width, "change", (latest) => {
    if (
      videoRef.current &&
      latest == "100%" &&
      videoRef.current.currentTime == 0
    ) {
      videoRef.current?.play();
      setPaused(false);
    }
  });

  const { setActive: setCursorActive } = useContext(CursorContext);

  const [orientation, setOrientation] = useState<OrientationType | null>(null);
  useEffect(() => {
    // Function to update the orientation state
    function updateOrientation() {
      setOrientation(window.screen.orientation.type);
    }
    // Initial update of the orientation state
    updateOrientation();
    // Add an event listener for orientation change
    window.addEventListener("orientationchange", updateOrientation);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, [orientation]);

  return (
    <div
      ref={videoContainerRef}
      className="bg-black bg-cover h-svh w-full flex flex-col sticky top-0"
    >
      <motion.div
        style={{
          translateY: "-50%",
          translateX: x,
          width,
          top: ctop,
          right: cleft,
          marginRight: mleft,
        }}
        // loading="lazy"
        className="min-w-28 sm:min-w-72 overflow-hidden max-h-full absolute"
      >
        <div
          onMouseEnter={() => setCursorActive(false)}
          onMouseLeave={() => setCursorActive(true)}
          className="relative flex justify-center items-center"
        >
          <video
            playsInline
            loop
            muted={muted}
            ref={videoRef}
            className="w-full max-h-full"
            poster={orientation?.includes("portrait") ? poster_v : poster_h}
            src={orientation?.includes("portrait") ? video_v : video_h}
            onClick={() => {
              if (videoRef.current?.paused) {
                videoRef.current.play();
                setPaused(false);
              } else {
                videoRef.current?.pause();
                setPaused(true);
              }
            }}
          />
          <button
            onClick={() => setMuted(!muted)}
            style={{ opacity: paused ? 0 : 1 }}
            className="absolute rounded-full p-1 right-[3%] top-1/2 -translate-y-1/2"
          >
            {!muted ? (
              <SoundOn className="w-8 h-fit" />
            ) : (
              <SoundOff className="w-8 h-fit" />
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
