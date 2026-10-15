"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type BlurTextProps = {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  onAnimationComplete?: () => void;
};

export function BlurText({
  text,
  delay = 50,
  className = "",
  animateBy = "letters",
  direction = "bottom",
  onAnimationComplete,
}: BlurTextProps) {
  // Use Intl.Segmenter to preserve Thai tone marks and grapheme clusters
  let elements: string[] = [];
  if (animateBy === "words") {
    elements = text.split(" ");
  } else {
    try {
      if (typeof Intl !== "undefined" && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter("th", { granularity: "grapheme" });
        elements = Array.from(segmenter.segment(text), (s) => s.segment);
      } else {
        elements = Array.from(text);
      }
    } catch {
      elements = Array.from(text);
    }
  }

  const defaultFrom = {
    filter: "blur(12px)",
    opacity: 0,
    transform: direction === "top" ? "translate3d(0, -25px, 0)" : "translate3d(0, 25px, 0)",
  };

  const defaultTo = {
    filter: "blur(0px)",
    opacity: 1,
    transform: "translate3d(0, 0, 0)",
  };

  return (
    <span className={cn("inline-flex flex-wrap items-baseline", className)}>
      {elements.map((element, i) => (
        <motion.span
          key={i}
          initial={defaultFrom}
          animate={defaultTo}
          transition={{
            duration: 0.6,
            delay: (i * delay) / 1000,
            ease: [0.34, 1.56, 0.64, 1], // playful, gentle spring-like curve
          }}
          onAnimationComplete={i === elements.length - 1 ? onAnimationComplete : undefined}
          className="inline-block will-change-[transform,filter,opacity]"
        >
          {element === " " ? "\u00A0" : element}
        </motion.span>
      ))}
    </span>
  );
}
