"use client";

import { motion } from "framer-motion";
import { PageHeading } from "@/components/page-heading";
import { SpotlightCard } from "@/components/reactbits/spotlight-card";
import {
  User,
  Heart,
  Utensils,
  MapPin,
  Calendar,
  Gamepad2,
  Coffee,
  Music,
  Palette,
  Laptop,
  Sparkles,
} from "lucide-react";

const profileDetails = [
  { label: "ชื่อเล่น", value: "เฟย์ (Feye)", icon: User },
  { label: "สถานะ", value: "?💕", icon: Heart },
  { label: "ของกินโปรด", value: "ชาเขียว / ราเมง", icon: Utensils },
  { label: "ที่อยู่ตอนนี้", value: "กรุงเทพฯ, ประเทศไทย", icon: MapPin },
  { label: "วันเกิด", value: "3/3/2009", icon: Calendar },
  { label: "เกมโปรด", value: "Valo, Roblox, Freefire", icon: Gamepad2 },
];

const passions = [
  { label: "ชงชาเขียวเอง", icon: Coffee },
  { label: "เล่นเกมสบายๆ", icon: Gamepad2 },
  { label: "นอนดูซีรีส์", icon: Palette },
  { label: "ฟังเพลง", icon: Music },
  { label: "เขียนโค้ดเพลินๆ", icon: Laptop },
  { label: "หาของอร่อยกิน", icon: Utensils },
];

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-ink/8 py-14 sm:py-20">
      <PageHeading
        eyebrow="เรื่องส่วนตัว"
        title="ใครคือเฟย์กันนะ?"
        description="เรื่องราวสั้นๆเกี่ยวกับตัวเรา, งานอดิเรก, และสิ่งที่ชอบทำ"
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left: Short Story & Hobbies */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <SpotlightCard
            spotlightColor="rgba(242, 225, 206, 0.6)"
            className="flex h-full flex-col justify-between border-ink/8 bg-card p-6 sm:p-8"
          >
            <div>
              <div className="mb-4 flex items-center justify-between border-b border-ink/6 pb-3">
                <h3 className="font-hero text-sm font-bold text-ink">
                  About Me
                </h3>
                <span className="text-xs text-muted">My little note</span>
              </div>

              <div className="space-y-3.5 text-[15px] leading-relaxed text-ink/85">
                <p>
                  หวัดดี~ เรา <span className="font-bold text-ink">เฟย์</span> เองงเป็นคนเฟรนลี่(มั้ง) ค่อนข้างขี้เหงาเลยแหละทักมาคุยกันได้นะ:)
                </p>
                <p className="text-muted">
ตอนนี้ก็17ขวบแล้ว(เร็วจัง😭) เรียนอยู่ที่IEP(Intensive English Program)ค่ะ ไม่บอกหรอกที่ไหนอิอิ ส่วนเป้าหมายเข้าม.เกษตรให้ได้เลยย
                </p>
                <p className="text-muted">
                  เวลาว่างมักจะหมดไปกับการนอน เล่นเกม ฟังเพลง และกิน ส่วนเรื่องการเขียนโค้ดก็เป็นสิ่งที่เราชอบทำมากๆเลยแหละ ถึงจะไม่เก่งมากแต่ก็สนุกดีนะ
                </p>
              </div>

              {/* Passions */}
              <div className="mt-8 border-t border-ink/6 pt-5">
                <p className="mb-3 text-xs font-semibold text-ink/70">
                  สิ่งที่ชอบเป็นพิเศษ
                </p>
                <div className="flex flex-wrap gap-2">
                  {passions.map(({ label, icon: Icon }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink/6 bg-paper px-3 py-1.5 text-xs font-medium text-ink/80 transition-colors hover:border-ink/20"
                    >
                      <Icon className="size-3.5 text-ink/60" strokeWidth={1.75} />
                      <span>{label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-paper/70 p-4 border border-ink/5">
              <div className="flex items-center gap-2 text-xs font-medium text-ink/75">
                <Sparkles className="size-3.5 text-amber-700" />
                <span>&ldquo;ความสุข ในทุกวัน คือการได้กินของอร่อยและได้ทำสิ่งที่ชอบและอยู่กับคนที่รัก🫪&rdquo;</span>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Right: Personal Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <SpotlightCard
            spotlightColor="rgba(242, 225, 206, 0.6)"
            className="flex h-full flex-col justify-between border-ink/8 bg-card p-3 sm:p-5 md:p-7"
          >
            <div>
              <div className="mb-4 flex items-center justify-between border-b border-ink/6 pb-3">
                <h3 className="font-hero text-sm font-bold text-ink">
                  ข้อมูลส่วนตัว (Profile)
                </h3>
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <dl className="grid grid-cols-2 gap-2 sm:gap-3">
                {profileDetails.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="min-w-0 rounded-2xl border border-ink/4 bg-paper/70 p-2.5 transition-colors hover:bg-paper sm:p-3"
                  >
                    <dt className="flex items-center gap-1 text-[10px] font-medium text-ink/50 sm:gap-1.5 sm:text-[11px]">
                      <Icon className="size-3 shrink-0 text-ink/50 sm:size-3.5" strokeWidth={1.75} />
                      <span>{label}</span>
                    </dt>
                    <dd className="mt-1 break-words text-xs font-semibold leading-snug text-ink sm:pl-5 sm:text-sm">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-4 rounded-2xl bg-ink p-3 text-paper sm:mt-6 sm:p-4">
              <p className="text-[10px] font-medium text-paper/70 sm:text-[11px]">สถานะตอนนี้</p>
              <p className="mt-0.5 text-[11px] font-semibold leading-relaxed sm:text-xs">
                ง่วง
              </p>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
