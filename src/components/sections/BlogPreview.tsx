// src/components/sections/BlogPreview.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BlogPreview() {
  return (
    <section id="blogsPreview" className="py-20 section-surface">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="section-title text-center">Blog & Articles</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg section-text mb-8">
              📝 Blog section coming soon! This area will showcase technical
              articles, tutorials, and insights about web development.
            </p>
            <Link href="/blogs" className="btn-primary inline-block">
              View All Blogs
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
