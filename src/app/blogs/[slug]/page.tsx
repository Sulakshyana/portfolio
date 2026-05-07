import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { FiArrowLeft, FiClock, FiCalendar, FiEye, FiTag } from "react-icons/fi";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import JsonLd from "@/components/JsonLd";
import { ME } from "@/config/constant";

type Params = Promise<{ slug: string }>;

async function getBlog(slug: string) {
  await connectDB();
  return Blog.findOneAndUpdate(
    { slug, published: true },
    { $inc: { views: 1 } },
    { new: true }
  ).lean();
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const blog = await Blog.findOne({ slug, published: true }).select("title description coverImage createdAt").lean();

  if (!blog) return { title: "Blog Not Found" };

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      publishedTime: blog.createdAt.toISOString(),
      authors: [ME.name],
      images: blog.coverImage ? [{ url: blog.coverImage, width: 1200, height: 630, alt: blog.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
    },
  };
}

export default async function BlogPage({ params }: { params: Params }) {
  const { slug } = await params;
  const raw = await getBlog(slug);

  if (!raw) notFound();

  const blog = JSON.parse(JSON.stringify(raw)) as {
    title: string;
    description: string;
    content: string;
    author: string;
    tags: string[];
    category: string;
    coverImage: string;
    views: number;
    readTime: number;
    createdAt: string;
    slug: string;
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    author: { "@type": "Person", name: blog.author, url: ME.seo.siteUrl },
    datePublished: blog.createdAt,
    image: blog.coverImage,
    url: `${ME.seo.siteUrl}/blogs/${blog.slug}`,
    publisher: {
      "@type": "Person",
      name: ME.name,
      url: ME.seo.siteUrl,
    },
  };

  return (
    <>
      <JsonLd data={articleSchema} />

      <article className="section-surface min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back link */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 section-text hover:text-primary transition-colors mb-8"
          >
            <FiArrowLeft aria-hidden="true" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="tech-badge text-xs">{blog.category}</span>
            </div>

            <h1 className="section-title text-4xl font-bold mb-4">{blog.title}</h1>
            <p className="section-text text-lg mb-6">{blog.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm section-text border-t border-b border-gray-200 dark:border-gray-700 py-4">
              <div className="flex items-center gap-2">
                <FiCalendar aria-hidden="true" />
                <time dateTime={blog.createdAt}>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <FiClock aria-hidden="true" />
                <span>{blog.readTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <FiEye aria-hidden="true" />
                <span>{blog.views} views</span>
              </div>
            </div>

            {blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {blog.tags.map((tag) => (
                  <span key={tag} className="text-xs section-text flex items-center gap-1">
                    <FiTag size={12} aria-hidden="true" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none section-text">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {blog.content}
            </ReactMarkdown>
          </div>

          {/* Footer nav */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 section-text hover:text-primary transition-colors"
            >
              <FiArrowLeft aria-hidden="true" />
              Back to all articles
            </Link>
          </footer>
        </div>
      </article>
    </>
  );
}
