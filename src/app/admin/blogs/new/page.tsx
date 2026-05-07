import type { Metadata } from "next";
import BlogForm from "@/components/admin/BlogForm";

export const metadata: Metadata = { title: "New Post" };

export default function NewBlogPage() {
  return (
    <div className="min-h-screen section-surface py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold section-title mb-8">New Post</h1>
        <div className="card">
          <BlogForm />
        </div>
      </div>
    </div>
  );
}
