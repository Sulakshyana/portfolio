import { notFound } from "next/navigation";
import type { Metadata } from "next";
import connectDB from "@/lib/mongodb";

export const dynamic = "force-dynamic";
import Blog from "@/models/Blog";
import BlogForm, { type BlogFormData } from "@/components/admin/BlogForm";

export const metadata: Metadata = { title: "Edit Post" };

type Params = Promise<{ id: string }>;

export default async function EditBlogPage({ params }: { params: Params }) {
  const { id } = await params;

  await connectDB();
  const raw = await Blog.findById(id).lean();

  if (!raw) notFound();

  const blog = JSON.parse(JSON.stringify(raw)) as BlogFormData & {
    tags: string[] | string;
    createdAt: string;
    updatedAt: string;
  };

  const initialData: BlogFormData = {
    _id: blog._id as unknown as string,
    title: blog.title,
    slug: blog.slug,
    description: blog.description,
    content: blog.content,
    category: blog.category,
    tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : (blog.tags ?? ""),
    coverImage: blog.coverImage ?? "",
    readTime: blog.readTime ?? 5,
    published: blog.published ?? false,
  };

  return (
    <div className="min-h-screen section-surface py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold section-title mb-8">Edit Post</h1>
        <div className="card">
          <BlogForm initialData={initialData} />
        </div>
      </div>
    </div>
  );
}
