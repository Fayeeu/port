import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownLeft, ArrowUpRight, BookOpen, Clock3 } from "lucide-react";
import { getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "บันทึก | FEYE",
  description: "เรื่องเล็กๆ จากโต๊ะทำงาน ไอเดีย และเบื้องหลังการทำเว็บของเฟย์",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Bangkok",
  }).format(new Date(`${value}T12:00:00+07:00`));
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="mx-auto w-full max-w-4xl py-10 sm:py-16">
      <header className="relative overflow-hidden border-b border-ink/12 pb-9 sm:pb-12">
        <div aria-hidden="true" className="pointer-events-none absolute -right-5 -top-12 size-40 rounded-full border border-[#b9917e]/20 sm:-right-2 sm:size-52" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-1 top-2 size-28 rounded-full border border-[#b9917e]/15 sm:right-8 sm:top-8 sm:size-36" />
        <p className="mb-4 inline-flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#946f63] sm:text-[11px]">
          <BookOpen className="size-3.5" strokeWidth={1.7} />
          Feye&apos;s notebook
        </p>
        <h1 className="max-w-2xl font-hero text-4xl font-bold leading-[1.2] tracking-tight text-ink sm:text-5xl md:text-6xl">
          Feye&apos;s Journal <br className="hidden sm:inline" />
          <span className="block text-[#9e7467]"> .</span>
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
          เรื่องราวสั้นๆ, ไอเดียต่างๆ, และบันทึกส่วนตัวที่อยากแบ่งปัน
        </p>
        <p className="mt-7 flex items-center gap-2 text-[11px] font-medium text-ink/55">
          <span className="size-1.5 rounded-full bg-[#bd8f82]" />
          {posts.length} บันทึก
        </p>
      </header>

      {posts.length ? (
        <div className="divide-y divide-ink/10">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-3 py-7 transition-colors sm:grid-cols-[118px_minmax(0,1fr)_36px] sm:gap-5 sm:py-8"
              >
                <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2 sm:pt-1">
                  <time dateTime={post.date} className="font-mono text-[11px] text-muted">
                    {formatDate(post.date)}
                  </time>
                  <span className="rounded-full border border-[#b9917e]/25 bg-[#eadccf]/70 px-2.5 py-1 text-[10px] font-medium text-[#805f54]">
                    {post.category}
                  </span>
                </div>

                <div>
                  <h2 className="font-hero text-xl font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-[#915f54] sm:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-muted sm:text-[15px]">
                    {post.excerpt}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-ink/55">
                    <Clock3 className="size-3" />
                    อ่าน {post.readTime} นาที
                  </span>
                </div>

                <span className="hidden size-8 items-center justify-center self-center rounded-full border border-ink/10 text-muted transition-all group-hover:translate-x-1 group-hover:border-[#b9917e]/45 group-hover:text-[#915f54] sm:flex">
                  <ArrowUpRight className="size-4" strokeWidth={1.7} />
                </span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="font-hero text-xl font-semibold text-ink">ยังไม่มีบันทึกในสมุดเล่มนี้</p>
          <p className="mt-2 text-sm text-muted">กลับมาแวะดูใหม่ได้อีกนะครับ</p>
        </div>
      )}

      <Link href="/#top" className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink/12 bg-card/60 px-4 py-2.5 text-xs font-medium text-ink/75 transition-colors hover:border-ink/25 hover:text-ink">
        <ArrowDownLeft className="size-3.5" />
        กลับไปหน้าแรก
      </Link>
    </section>
  );
}
