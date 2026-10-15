"use client";

import { motion } from "framer-motion";

type StrokeTextProps = {
  text: string;
  className?: string;
  strokeWidth?: number;
  duration?: number;
  delay?: number;
};

export function StrokeText({
  text,
  className = "",
  strokeWidth = 2,
  duration = 1.8,
  delay = 0.2,
}: StrokeTextProps) {
  return (
    <div className={`relative w-full max-w-4xl select-none leading-none ${className}`}>
      <svg
        viewBox="0 0 880 130"
        className="w-full h-auto overflow-visible"
        preserveAspectRatio="xMinYMid meet"
      >
        <motion.text
          x="0"
          y="100"
          className="font-hero text-[84px] font-bold tracking-tight text-ink"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{
            strokeDasharray: 900,
            strokeDashoffset: 900,
            fillOpacity: 0,
          }}
          animate={{
            strokeDashoffset: 0,
            fillOpacity: 1,
          }}
          transition={{
            strokeDashoffset: {
              duration: duration,
              delay: delay,
              ease: [0.16, 1, 0.3, 1],
            },
            fillOpacity: {
              duration: 0.8,
              delay: delay + duration * 0.4,
              ease: "easeOut",
            },
          }}
        >
          {text}
        </motion.text>
      </svg>
    </div>
  );
}
