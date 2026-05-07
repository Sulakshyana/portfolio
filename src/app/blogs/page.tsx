import { Suspense } from "react";
import type { Metadata } from "next";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import BlogFilter from "@/components/blogs/BlogFilter";
import BlogsList, { type SerializedBlog } from "@/components/blogs/BlogsList";
import BlogPagination from "@/components/blogs/BlogPagination";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts, tutorials, and insights about web development, React, Node.js, and modern JavaScript.",
};

const BLOGS_PER_PAGE = 6;

type SearchParams = Promise<{ category?: string; page?: string }>;

export default async function BlogsPage({ searchParams }: { searchParams: SearchParams }) {
  const { category, page: pageParam } = await searchParams;
  const currentCategory = category ?? "All";
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10));

  await connectDB();

  const query: Record<string, unknown> = { published: true };
  if (currentCategory !== "All") {
    query.category = currentCategory;
  }

  const [raw, total] = await Promise.all([
    Blog.find(query)
      .sort({ createdAt: -1 })
      .select("-content")
      .skip((currentPage - 1) * BLOGS_PER_PAGE)
      .limit(BLOGS_PER_PAGE)
      .lean(),
    Blog.countDocuments(query),
  ]);

  const blogs: SerializedBlog[] = JSON.parse(JSON.stringify(raw));
  const totalPages = Math.ceil(total / BLOGS_PER_PAGE);

  return (
    <div className="section-surface min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="section-title text-5xl font-bold mb-4">Blog</h1>
          <p className="section-text text-lg">
            Thoughts, tutorials, and insights about web development
          </p>
        </div>

        <Suspense>
          <BlogFilter currentCategory={currentCategory} />
        </Suspense>

        <BlogsList blogs={blogs} />

        <Suspense>
          <BlogPagination currentPage={currentPage} totalPages={totalPages} />
        </Suspense>
      </div>
    </div>
  );
}
