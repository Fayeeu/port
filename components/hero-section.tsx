"use client";

import { motion } from "framer-motion";
import { StrokeText } from "@/components/reactbits/stroke-text";
import { ShinyText } from "@/components/reactbits/shiny-text";
import { Sparkles, ArrowDown, Heart, MapPin, Coffee, Smile } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative grid gap-10 pb-14 pt-8 sm:gap-12 sm:pb-20 sm:pt-12 lg:min-h-[64vh] lg:grid-cols-[minmax(0,1.18fr)_minmax(19rem,0.82fr)] lg:items-center lg:gap-14 lg:py-16"
    >
      <div className="min-w-0 lg:py-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-4 flex items-center gap-2 sm:mb-6"
        >
          <span className="size-2 rounded-full bg-[#bd8f82]" />
          <ShinyText text="มองไรไอคนน่ารัก" className="text-xs font-medium text-muted" />
        </motion.div>

        <div className="space-y-4 sm:space-y-5">
          <h1 className="w-full">
            <StrokeText text="เฟย์เองคั๊บ;<" strokeWidth={2} duration={1.6} delay={0.2} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl text-[15px] leading-7 text-muted sm:text-lg sm:leading-8"
          >
ฮายยเราเฟย์เอง. ถ้าว่าเราเป็นใครเอาง่ายๆก็คือเดฟุคนนึงนั่นแหละ เราเริ่มเขียน โค้ดตั้งแต่ป.4(นานป๊ะล่ะอิอิ) จนตอนนี้ก็จะจบม.ปลายแล้วยังเขียนโค้ดอยู่เลย. เราเริ่มมาจากการเขียนสคริปต์ในroblox จนตอนนี้ก็ทำได้แทบทุกอย่างละ555
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3"
        >
          <a href="#works" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink sm:px-6">
            <span>มาดูผลงานของเรากันน</span>
            <ArrowDown className="size-4" strokeWidth={2} />
          </a>
          <a href="#about" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/10 bg-card/80 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink sm:px-6">
            <span>มาทำความรู้จักกัน!</span>
          </a>
          <a href="#contact" className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
            <span>ติดต่อ</span><span aria-hidden="true">↗</span>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.75 }}
        className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:gap-4"
      >
        <div className="flex min-w-0 items-center gap-2.5 rounded-2xl border border-ink/6 bg-card/80 p-3 transition-colors hover:bg-card sm:gap-3 sm:p-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-ink/8 bg-paper text-ink/70 sm:size-10"><Smile className="size-4" strokeWidth={1.75} /></div>
          <div className="min-w-0"><p className="text-[10px] font-medium text-ink/50">ชื่อ</p><p className="truncate text-xs font-semibold text-ink sm:text-sm">เฟย์ (Feye)</p></div>
        </div>
        <div className="flex min-w-0 items-center gap-2.5 rounded-2xl border border-ink/6 bg-card/80 p-3 transition-colors hover:bg-card sm:gap-3 sm:p-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-ink/8 bg-paper text-ink/70 sm:size-10"><MapPin className="size-4" strokeWidth={1.75} /></div>
          <div className="min-w-0"><p className="text-[10px] font-medium text-ink/50">ที่อยู่</p><p className="truncate text-xs font-semibold text-ink sm:text-sm">กรุงเทพฯ, ไทย</p></div>
        </div>
        <div className="flex min-w-0 items-center gap-2.5 rounded-2xl border border-ink/6 bg-card/80 p-3 transition-colors hover:bg-card sm:gap-3 sm:p-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-ink/8 bg-paper text-rose-600/80 sm:size-10"><Heart className="size-4 fill-rose-500/20" strokeWidth={1.75} /></div>
          <div className="min-w-0"><p className="text-[10px] font-medium text-ink/50">สถานะ</p><p className="truncate text-xs font-semibold text-ink sm:text-sm">อินเลิฟ💕</p></div>
        </div>
        <div className="flex min-w-0 items-center gap-2.5 rounded-2xl border border-ink/6 bg-card/80 p-3 transition-colors hover:bg-card sm:gap-3 sm:p-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-ink/8 bg-paper text-amber-700/80 sm:size-10"><Coffee className="size-4" strokeWidth={1.75} /></div>
          <div className="min-w-0"><p className="text-[10px] font-medium text-ink/50">ของโปรด</p><p className="truncate text-xs font-semibold text-ink sm:text-sm">ชาเขียว & เพลง</p></div>
        </div>
        <div className="col-span-2 flex items-center justify-between gap-3 rounded-2xl border border-[#b9917e]/20 bg-[#eadccf]/50 px-4 py-3 text-xs text-ink/70 sm:px-5 sm:py-4">
          <span className="font-medium">failure doesn't mean it's over</span>
          <Sparkles className="size-4 shrink-0 text-[#946f63]" />
        </div>
      </motion.div>
    </section>
  );
}
