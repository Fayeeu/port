"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollExpandProps {
  children: React.ReactNode;
  className?: string;
  minScale?: number;
  maxScale?: number;
}

export function ScrollExpand({
  children,
  className = "",
  minScale = 0.94,
  maxScale = 1,
}: ScrollExpandProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [minScale, maxScale]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.85, 0.95, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div
      ref={containerRef}
      style={{ scale, opacity, y }}
      className={cn("will-change-transform origin-center transition-shadow", className)}
    >
      {children}
    </motion.div>
  );
}
