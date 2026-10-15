import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/markdown-content";
import { getBlogPost, getBlogPosts } from "@/lib/blog";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  if (posts.length === 0) {
    return [{ slug: "placeholder" }];
  }
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "ไม่พบบันทึก | FEYE" };

  return {
    title: `${post.title} | FEYE`,
    description: post.excerpt,
  };
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Bangkok",
  }).format(new Date(`${value}T12:00:00+07:00`));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl py-8 sm:py-14">
      <Link href="/blog" className="group inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-ink">
        <span className="flex size-8 items-center justify-center rounded-full border border-ink/10 transition-colors group-hover:border-ink/25">
          <ArrowLeft className="size-3.5" />
        </span>
        กลับไปหน้าบันทึก
      </Link>

      <header className="mt-10 border-b border-ink/12 pb-8 sm:mt-14 sm:pb-10">
        <p className="mb-4 text-[11px] font-semibold tracking-[0.16em] text-[#946f63]">{post.category}</p>
        <h1 className="font-hero text-3xl font-bold leading-[1.3] tracking-tight text-ink sm:text-4xl md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
          {post.excerpt}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-ink/55">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true" className="size-1 rounded-full bg-[#bd8f82]" />
          <span className="inline-flex items-center gap-1.5"><Clock3 className="size-3" />อ่าน {post.readTime} นาที</span>
        </div>
      </header>

      <div className="mx-auto max-w-[42rem] py-5 sm:py-8">
        <MarkdownContent source={post.content} />
      </div>

      <footer className="mx-auto mt-10 max-w-[42rem] border-t border-ink/10 pt-6">
        <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-card/60 px-4 py-2.5 text-xs font-medium text-ink/75 transition-colors hover:border-ink/25 hover:text-ink">
          <ArrowLeft className="size-3.5" />
          อ่านบันทึกอื่น
        </Link>
      </footer>
    </article>
  );
}
