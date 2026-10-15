import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: number;
  content: string;
};

const postsDirectory = path.join(process.cwd(), "content", "blog");

function parsePost(slug: string, source: string): BlogPost | null {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return null;

  const frontmatter = Object.fromEntries(
    match[1].split(/\r?\n/).flatMap((line) => {
      const field = line.match(/^([\w-]+):\s*(.*)$/);
      if (!field) return [];
      const value = field[2].replace(/^(?:"(.*)"|'(.*)')$/, (_, doubleQuoted, singleQuoted) => doubleQuoted ?? singleQuoted);
      return [[field[1], value]];
    }),
  );

  const { title, date, excerpt, category } = frontmatter;
  if (!title || !date || !excerpt || !category) return null;

  const content = match[2].trim();
  const estimatedReadTime = Math.max(1, Math.ceil(content.split(/\s+/).length / 180));
  const requestedReadTime = Number(frontmatter.readTime);

  return {
    slug,
    title,
    date,
    excerpt,
    category,
    readTime: Number.isFinite(requestedReadTime) && requestedReadTime > 0 ? requestedReadTime : estimatedReadTime,
    content,
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  "use cache";
  const files = await readdir(postsDirectory);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const slug = file.slice(0, -3);
        const source = await readFile(path.join(postsDirectory, file), "utf8");
        return parsePost(slug, source);
      }),
  );

  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}
