import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Clock3 } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { ScrollExpand } from "@/components/reactbits/scroll-expand";
import { getBlogPosts } from "@/lib/blog";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Bangkok",
  }).format(new Date(`${value}T12:00:00+07:00`));
}

export async function BlogSection() {
  const posts = (await getBlogPosts()).slice(0, 4);

  return (
    <section id="journal" className="scroll-mt-24 border-t border-ink/8 py-14 sm:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <PageHeading
          eyebrow="บันทึกส่วนตัว"
          title="เรื่องที่อยากเล่า"
          description="ไอเดียต่างๆ, เรื่องราวสั้นๆ, และบันทึกส่วนตัวที่อยากแบ่งปัน"
          className="mb-0"
        />
        <Link
          href="/blog"
          className="mb-1 inline-flex items-center gap-2 rounded-full border border-ink/12 bg-card/70 px-4 py-2.5 text-xs font-semibold text-ink/75 transition-colors hover:border-[#b9917e]/50 hover:text-[#915f54] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#915f54]"
        >
          ดูทั้งหมด <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {posts.length ? (
        <ScrollExpand minScale={0.97} maxScale={1}>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative flex min-h-44 min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-ink/8 bg-card/85 p-3 transition-colors hover:border-[#b9917e]/40 hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#915f54] sm:min-h-48 sm:rounded-3xl sm:p-5 md:p-6"
              >
                <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full border border-[#b9917e]/15 transition-transform duration-500 group-hover:scale-110" />
                <div>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-1.5 sm:mb-5 sm:gap-3">
                    <span className="inline-flex min-w-0 items-center gap-1 rounded-full border border-[#b9917e]/20 bg-[#eadccf]/55 px-2 py-1 text-[10px] font-medium text-[#805f54] sm:gap-1.5 sm:px-2.5">
                      <BookOpen className="size-3 shrink-0" /> <span className="truncate">{post.category}</span>
                    </span>
                    <time dateTime={post.date} className="font-mono text-[10px] text-muted">
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <h3 className="line-clamp-2 font-hero text-sm font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-[#915f54] sm:text-lg md:text-xl">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-[10px] leading-relaxed text-muted sm:mt-2 sm:text-sm sm:leading-6">{post.excerpt}</p>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-1 border-t border-ink/6 pt-2 text-[10px] text-ink/55 sm:mt-5 sm:gap-2 sm:pt-3">
                  <span className="inline-flex items-center gap-1"><Clock3 className="size-3" /> อ่าน {post.readTime} นาที</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#915f54] opacity-80 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
                    อ่านบันทึก <ArrowUpRight className="size-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </ScrollExpand>
      ) : (
        <div className="rounded-3xl border border-dashed border-ink/15 bg-card/50 px-6 py-10 text-center">
          <p className="font-hero text-lg font-semibold text-ink">ยังไม่มีบันทึกในสมุดเล่มนี้</p>
          <p className="mt-2 text-sm text-muted">กลับมาแวะอ่านใหม่ได้อีกนะน้าา</p>
        </div>
      )}
    </section>
  );
}
