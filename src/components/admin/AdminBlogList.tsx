"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEdit2, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";

type BlogRow = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  views: number;
  createdAt: string;
};

export default function AdminBlogList({ blogs }: { blogs: BlogRow[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      const data = await res.json() as { success: boolean; error?: string };
      if (data.success) {
        router.refresh();
      } else {
        alert(data.error ?? "Failed to delete.");
      }
    } catch {
      alert("Something went wrong.");
    } finally {
      setDeleting(null);
    }
  }

  if (blogs.length === 0) {
    return (
      <div className="card text-center py-16">
        <p className="section-text text-lg mb-4">No blog posts yet.</p>
        <Link href="/admin/blogs/new" className="btn-primary">
          Write your first post
        </Link>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden p-0">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left px-6 py-4 section-subtitle font-semibold">Title</th>
            <th className="text-left px-4 py-4 section-subtitle font-semibold hidden md:table-cell">Category</th>
            <th className="text-left px-4 py-4 section-subtitle font-semibold hidden lg:table-cell">Date</th>
            <th className="text-center px-4 py-4 section-subtitle font-semibold hidden sm:table-cell">Views</th>
            <th className="text-center px-4 py-4 section-subtitle font-semibold">Status</th>
            <th className="text-right px-6 py-4 section-subtitle font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr
              key={blog._id}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="font-medium section-subtitle line-clamp-1 max-w-xs">
                  {blog.title}
                </div>
                <div className="text-xs section-text mt-0.5">/blogs/{blog.slug}</div>
              </td>
              <td className="px-4 py-4 hidden md:table-cell">
                <span className="tech-badge text-xs">{blog.category}</span>
              </td>
              <td className="px-4 py-4 section-text hidden lg:table-cell">
                {new Date(blog.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-4 text-center section-text hidden sm:table-cell">
                {blog.views}
              </td>
              <td className="px-4 py-4 text-center">
                {blog.published ? (
                  <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                    <FiEye size={12} aria-hidden="true" /> Live
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400 font-medium">
                    <FiEyeOff size={12} aria-hidden="true" /> Draft
                  </span>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/admin/blogs/${blog._id}/edit`}
                    aria-label={`Edit ${blog.title}`}
                    className="section-subtitle hover:text-primary transition-colors"
                  >
                    <FiEdit2 size={16} aria-hidden="true" />
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id, blog.title)}
                    disabled={deleting === blog._id}
                    aria-label={`Delete ${blog.title}`}
                    className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-40"
                  >
                    <FiTrash2 size={16} aria-hidden="true" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
