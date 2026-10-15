"use client";

import { motion } from "framer-motion";

export function SideRays() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Top-Right Angled Warm Sunbeam Ray 1 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -top-32 -right-24 h-[600px] w-[500px] -rotate-45 rounded-full bg-gradient-to-b from-[#fbf4ea]/80 via-[#ebd5be]/40 to-transparent blur-3xl"
      />

      {/* Top-Left Soft Ambient Ray 2 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.8, delay: 0.3, ease: "easeOut" }}
        className="absolute top-1/4 -left-36 h-[500px] w-[450px] rotate-12 rounded-full bg-gradient-to-r from-[#ebd5be]/50 via-[#f5e7d8]/30 to-transparent blur-3xl"
      />

      {/* Center Subtle Warm Ray Beam */}
      <div className="absolute top-0 right-1/4 h-[800px] w-[300px] -rotate-12 bg-gradient-to-b from-white/20 via-[#ebd5be]/25 to-transparent blur-2xl" />
    </div>
  );
}
