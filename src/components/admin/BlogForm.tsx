"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CATEGORIES = ["Web Development", "JavaScript", "React", "Node.js", "Tutorial", "Other"] as const;

export type BlogFormData = {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  tags: string;
  coverImage: string;
  readTime: number;
  published: boolean;
};

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function BlogForm({ initialData }: { initialData?: Partial<BlogFormData> }) {
  const router = useRouter();
  const isEdit = Boolean(initialData?._id);

  const [form, setForm] = useState<BlogFormData>({
    _id: initialData?._id ?? undefined,
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    description: initialData?.description ?? "",
    content: initialData?.content ?? "",
    category: initialData?.category ?? "Web Development",
    tags: initialData?.tags ?? "",
    coverImage: initialData?.coverImage ?? "",
    readTime: initialData?.readTime ?? 5,
    published: initialData?.published ?? false,
  });

  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(field: keyof BlogFormData, value: string | number | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleTitleChange(title: string) {
    setForm((prev) => ({
      ...prev,
      title,
      // Auto-derive slug on create; leave it alone on edit
      slug: isEdit ? prev.slug : toSlug(title),
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      const url = isEdit ? `/api/blogs/${form._id}` : "/api/blogs";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json() as { success: boolean; error?: string };

      if (data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error ?? "Failed to save blog post.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const inputCls = "form-input w-full";
  const labelCls = "block text-sm font-medium section-subtitle mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className={labelCls}>Title *</label>
        <input
          id="title"
          type="text"
          value={form.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
          maxLength={200}
          className={inputCls}
          placeholder="Post title"
        />
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="slug" className={labelCls}>Slug *</label>
        <input
          id="slug"
          type="text"
          value={form.slug}
          onChange={(e) => set("slug", e.target.value)}
          required
          readOnly={isEdit}
          className={`${inputCls} ${isEdit ? "opacity-60 cursor-not-allowed" : ""}`}
          placeholder="url-friendly-slug"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className={labelCls}>Description *</label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          required
          maxLength={500}
          rows={3}
          className={inputCls}
          placeholder="Brief description shown in blog list (max 500 chars)"
        />
        <p className="text-xs section-text mt-1">{form.description.length}/500</p>
      </div>

      {/* Category + Tags row */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className={labelCls}>Category *</label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            className={inputCls}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="tags" className={labelCls}>Tags</label>
          <input
            id="tags"
            type="text"
            value={form.tags}
            onChange={(e) => set("tags", e.target.value)}
            className={inputCls}
            placeholder="react, typescript, api (comma-separated)"
          />
        </div>
      </div>

      {/* Cover image + Read time row */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="coverImage" className={labelCls}>Cover Image URL</label>
          <input
            id="coverImage"
            type="url"
            value={form.coverImage}
            onChange={(e) => set("coverImage", e.target.value)}
            className={inputCls}
            placeholder="https://..."
          />
        </div>

        <div>
          <label htmlFor="readTime" className={labelCls}>Read Time (minutes)</label>
          <input
            id="readTime"
            type="number"
            min={1}
            max={60}
            value={form.readTime}
            onChange={(e) => set("readTime", Number(e.target.value))}
            className={inputCls}
          />
        </div>
      </div>

      {/* Published toggle */}
      <div className="flex items-center gap-3">
        <input
          id="published"
          type="checkbox"
          checked={form.published}
          onChange={(e) => set("published", e.target.checked)}
          className="w-4 h-4 accent-primary"
        />
        <label htmlFor="published" className="text-sm font-medium section-subtitle cursor-pointer">
          Published (visible to visitors)
        </label>
      </div>

      {/* Content */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="content" className={labelCls}>Content * (Markdown)</label>
          <button
            type="button"
            onClick={() => setPreview((p) => !p)}
            className="text-xs px-3 py-1 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          >
            {preview ? "Edit" : "Preview"}
          </button>
        </div>

        {preview ? (
          <div className="prose prose-sm dark:prose-invert max-w-none card min-h-[300px] overflow-auto">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{form.content}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            id="content"
            value={form.content}
            onChange={(e) => set("content", e.target.value)}
            required
            rows={18}
            className={`${inputCls} font-mono text-sm`}
            placeholder="Write your post in Markdown…"
          />
        )}
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-500">{error}</p>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? "Saving…" : isEdit ? "Update Post" : "Publish Post"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 section-text hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
