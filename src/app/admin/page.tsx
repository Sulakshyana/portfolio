import type { Metadata } from "next";
import connectDB from "@/lib/mongodb";

export const dynamic = "force-dynamic";
import Blog from "@/models/Blog";
import AdminBlogList from "@/components/admin/AdminBlogList";

export const metadata: Metadata = { title: "Dashboard" };

export default async function AdminDashboard() {
  await connectDB();

  const raw = await Blog.find({})
    .sort({ createdAt: -1 })
    .select("title slug category published views createdAt")
    .lean();

  const blogs = JSON.parse(JSON.stringify(raw)) as {
    _id: string;
    title: string;
    slug: string;
    category: string;
    published: boolean;
    views: number;
    createdAt: string;
  }[];

  const published = blogs.filter((b) => b.published).length;
  const drafts = blogs.length - published;

  return (
    <div className="min-h-screen section-surface py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold section-title mb-1">Blog Dashboard</h1>
          <p className="section-text text-sm">
            {blogs.length} total &middot; {published} published &middot; {drafts} draft{drafts !== 1 ? "s" : ""}
          </p>
        </div>

        <AdminBlogList blogs={blogs} />
      </div>
    </div>
  );
}
