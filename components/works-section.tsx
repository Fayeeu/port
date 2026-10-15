"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Laptop, Palette, Sparkles } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { SpotlightCard } from "@/components/reactbits/spotlight-card";
import { ScrollExpand } from "@/components/reactbits/scroll-expand";
import zyzenimg from "@/public/image.png";
import Image, { type StaticImageData } from "next/image";

type Project = {
  id: string;
  title: string;
  year: string;
  category: string;
  caption: string;
  tags: string[];
  image: StaticImageData; // เพิ่ม: image property สำหรับเก็บ StaticImageData
  href?: string;
};

const projects: Project[] = [
  {
    id: "zyzen",
    title: "Zyzen Hub - roblox script",
    year: "2026",
    category: "สคริปต์ Roblox",
    caption:
      "โปรเจ็กต์สคริปต์ที่ทำให้ผู้ใช้ได้โดนแบนอิอิ",
    tags: [ "Lua", "Roblox", "Script"],
    image: zyzenimg,
    href: "https://discord.gg/QRk67mZ2nt",
  },
];

export function WorksSection() {
  return (
    <section id="works" className="scroll-mt-24 border-t border-ink/8 py-14 sm:py-20">
      <PageHeading
        eyebrow="ผลงานของเรา"
        title="ผลงานต่างๆที่เราเคยทำ"
        description="รวมโปรเจ็กต์และงานที่เคยทำมา ทั้งเว็บแอปพลิเคชัน, สคริปต์, และโปรเจ็กต์อื่นๆ"
      />

      <ScrollExpand minScale={0.95} maxScale={1}>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6">
          {projects.map((project, idx) => {
            // const Icon = project.icon;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <SpotlightCard
                  spotlightColor="rgba(242, 225, 206, 0.6)"
                  className="group flex h-full flex-col justify-between border-ink/8 bg-card p-3 sm:p-5 md:p-6"
                >
                  <div>
                    {/* Top Bar: Category & Year */}
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-1.5 text-[10px] font-medium text-ink/60 sm:mb-4 sm:text-[11px]">
                      <span className="rounded-full bg-paper px-2 py-0.5 text-ink/80 border border-ink/6 sm:px-2.5">
                        {project.category}
                      </span>
                      <span className="font-mono text-ink/40">{project.year}</span>
                    </div>

                    {/* Cozy Visual Preview Box */}
<div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-xl border border-ink/6 bg-paper sm:mb-5 sm:rounded-2xl">
  <Image
    src={project.image}
    alt={project.title}
    fill
    sizes="(min-width: 1024px) 33vw, 50vw"
    className="object-cover"
  />
</div>

                    {/* Title & Description */}
                    <h3 className="line-clamp-2 font-hero text-sm font-bold leading-snug tracking-tight text-ink group-hover:text-black sm:text-lg">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-3 text-[10px] leading-relaxed text-muted sm:mt-2 sm:text-xs">
                      {project.caption}
                    </p>
                  </div>

                  {/* Tags & Action Link */}
                  <div className="mt-3 flex flex-col items-start justify-between gap-2 border-t border-ink/6 pt-3 sm:mt-6 sm:flex-row sm:items-center sm:pt-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-paper/80 px-1.5 py-0.5 text-[10px] font-medium text-ink/70 sm:px-2"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.href || "#"}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink sm:text-xs"
                    >
                      <span>ดูรายละเอียด</span>
                      <ArrowUpRight className="size-3" strokeWidth={2} />
                    </a>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </ScrollExpand>
    </section>
  );
}
