"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function BlogPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function goTo(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/blogs?${params.toString()}`);
  }

  return (
    <nav
      aria-label="Blog pagination"
      className="flex items-center justify-center gap-2 mt-12"
    >
      <button
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
        className="p-2 rounded-lg card disabled:opacity-40 disabled:cursor-not-allowed section-subtitle transition-colors hover:text-primary"
      >
        <FiChevronLeft size={20} aria-hidden="true" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => goTo(page)}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
          className={`w-10 h-10 rounded-lg font-medium transition-all ${
            page === currentPage
              ? "bg-linear-to-r from-primary to-secondary text-white shadow-md"
              : "card section-text hover:text-primary"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
        className="p-2 rounded-lg card disabled:opacity-40 disabled:cursor-not-allowed section-subtitle transition-colors hover:text-primary"
      >
        <FiChevronRight size={20} aria-hidden="true" />
      </button>
    </nav>
  );
}
