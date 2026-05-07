"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const CATEGORIES = [
  "All",
  "Web Development",
  "JavaScript",
  "React",
  "Node.js",
  "Tutorial",
  "Other",
];

export default function BlogFilter({ currentCategory }: { currentCategory: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSelect(category: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/blogs?${params.toString()}`);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="flex flex-wrap justify-center gap-3 mb-12"
    >
      {CATEGORIES.map((category) => {
        const active = currentCategory === category;
        return (
          <button
            key={category}
            onClick={() => handleSelect(category)}
            aria-pressed={active}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              active
                ? "bg-linear-to-r from-primary to-secondary text-white shadow-lg"
                : "card text-gray-500 dark:text-gray-400 hover:shadow-md"
            }`}
          >
            {category}
          </button>
        );
      })}
    </motion.div>
  );
}
