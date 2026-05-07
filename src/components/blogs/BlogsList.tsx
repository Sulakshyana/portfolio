"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiClock, FiCalendar, FiTag } from "react-icons/fi";

export type SerializedBlog = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  author: string;
  tags: string[];
  category: string;
  coverImage: string;
  views: number;
  likes: number;
  readTime: number;
  createdAt: string;
  updatedAt: string;
};

export default function BlogsList({ blogs }: { blogs: SerializedBlog[] }) {
  if (blogs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20"
      >
        <div className="text-6xl mb-4" aria-hidden="true">📝</div>
        <h3 className="section-subtitle text-2xl font-semibold mb-2">No blogs yet</h3>
        <p className="section-text">Check back soon for new content!</p>
      </motion.div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog, index) => (
        <motion.div
          key={blog.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={`/blogs/${blog.slug}`}>
            <div className="card h-full hover:shadow-2xl cursor-pointer">
              <div className="mb-4">
                <span className="tech-badge text-xs">{blog.category}</span>
              </div>

              <h2 className="text-2xl font-bold section-subtitle mb-3 line-clamp-2 hover:text-primary transition-colors">
                {blog.title}
              </h2>

              <p className="section-text mb-4 line-clamp-3">{blog.description}</p>

              <div className="flex items-center justify-between text-sm section-text">
                <div className="flex items-center gap-2">
                  <FiClock aria-hidden="true" />
                  <span>{blog.readTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar aria-hidden="true" />
                  <time dateTime={blog.createdAt}>
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </time>
                </div>
              </div>

              {blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {blog.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs section-text flex items-center gap-1">
                      <FiTag size={12} aria-hidden="true" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
