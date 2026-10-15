"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageHeading } from "@/components/page-heading";
import { SpotlightCard } from "@/components/reactbits/spotlight-card";
import { ScrollExpand } from "@/components/reactbits/scroll-expand";
import { Copy, Check, ArrowUpRight } from "lucide-react";

function MailIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="3" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function InstagramIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function DiscordIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.8 6.2c-1.3-.6-2.7-1-4.2-1.2 0 0-.2.4-.4.8-1.6-.2-3.2-.2-4.8 0-.2-.4-.4-.8-.4-.8-1.5.2-2.9.6-4.2 1.2-2.7 4-3.4 8-3.1 11.8 1.8 1.3 3.5 2.1 5.2 2.6.4-.6.8-1.2 1.2-1.9-1.2-.4-1.8-1-2.3-1.6.2.1.4.3.6.4 3 1.4 6.2 1.4 9.2 0 .2-.1.4-.3.6-.4-.5.6-1.1 1.2-2.3 1.6.4.7.8 1.3 1.2 1.9 1.7-.5 3.4-1.3 5.2-2.6.4-4.4-.7-8.4-3.2-11.8z" />
      <circle cx="9.2" cy="12.2" r="1.1" fill="currentColor" />
      <circle cx="14.8" cy="12.2" r="1.1" fill="currentColor" />
    </svg>
  );
}

function GithubIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

type Channel = {
  id: string;
  label: string;
  desc: string;
  value: string;
  href?: string;
  type: "copy" | "link";
  icon: React.ComponentType<{ className?: string }>;
};

const channels: Channel[] = [
  {
    id: "email",
    label: "อีเมล",
    desc: "ช่องทางหลักสำหรับติดต่องานหรือคุยเรื่องโปรเจ็กต์",
    value: "",
    type: "copy",
    icon: MailIcon,
  },
  {
    id: "instagram",
    label: "Instagram",
    desc: "ดูสตอรี่ชีวิตประจำวันและภาพถ่ายเล่นๆ",
    value: "ไม่ให้หรอกอิอิอยากได้ทักมาเอา😘",
    href: "https://instagram.com",
    type: "link",
    icon: InstagramIcon,
  },
  {
    id: "discord",
    label: "Discord",
    desc: "แวะมาคุยเรื่องเกม แลกเปลี่ยนไอเดีย หรือชวนเล่นเกม",
    value: "faeyeeeeey",
    type: "copy",
    icon: DiscordIcon,
  },
  {
    id: "github",
    label: "GitHub",
    desc: "แวะดูโค้ดและโปรเจ็กต์ที่ทำไว้",
    value: "github.com/Fayeeu",
    href: "https://github.com/Fayeeu",
    type: "link",
    icon: GithubIcon,
  },
];

export function ContactSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="contact" className="scroll-mt-24 border-t border-ink/8 py-14 sm:py-20">
      <PageHeading
        eyebrow="ติดต่อ"
        title="ทักมาคุยกันได้เสมอนะ"
        description="ไม่ว่าจะมีโปรเจ็กต์ อยากปรึกษา แลกเปลี่ยนไอเดีย หรือแค่อยากทักทาย เลือกช่องทางที่สะดวกได้เลยย"
      />

      <ScrollExpand minScale={0.95} maxScale={1}>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {channels.map((channel, idx) => {
            const Icon = channel.icon;
            const isCopied = copiedId === channel.id;

            return (
              <motion.div
                key={channel.id}
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
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-ink/6 bg-paper text-ink/75 sm:size-10 sm:rounded-2xl">
                        <Icon className="size-3.5 sm:size-4" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-hero text-xs font-bold text-ink sm:text-sm">
                          {channel.label}
                        </h3>
                        <p className="line-clamp-2 text-[10px] leading-snug text-muted sm:text-[11px]">{channel.desc}</p>
                      </div>
                    </div>

                    <div className="mt-3 rounded-xl border border-ink/4 bg-paper/70 px-2.5 py-2 sm:mt-4 sm:rounded-2xl sm:px-4 sm:py-2.5">
                      <p className="truncate font-mono text-[10px] font-medium text-ink sm:text-xs">
                        {channel.value}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-end sm:mt-5">
                    {channel.type === "copy" ? (
                      <button
                        type="button"
                        onClick={() => handleCopy(channel.id, channel.value)}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[10px] font-semibold transition-colors sm:gap-1.5 sm:px-4 sm:py-2 sm:text-xs ${
                          isCopied
                            ? "bg-emerald-700 text-white"
                            : "bg-ink text-paper hover:opacity-90"
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="size-3" strokeWidth={2.5} />
                            <span>คัดลอกเรียบร้อย!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" strokeWidth={2} />
                            <span>กดคัดลอก</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <a
                        href={channel.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full bg-ink px-2.5 py-1.5 text-[10px] font-semibold text-paper transition-opacity hover:opacity-90 sm:px-4 sm:py-2 sm:text-xs"
                      >
                        <span>เปิดลิงก์</span>
                        <ArrowUpRight className="size-3" strokeWidth={2} />
                      </a>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 rounded-3xl border border-dashed border-ink/15 bg-paper/70 p-5 text-center">
          <p className="text-xs text-ink/75">
            ☕ แวะมาทักทายกันได้ตลอดนะ ตื่นแล้วเดี๋ยวมาตอบ :)
          </p>
        </div>
      </ScrollExpand>
    </section>
  );
}
