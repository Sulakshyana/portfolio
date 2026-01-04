// src/models/Blog.ts
import { ME } from "@/config/constant";
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  tags: string[];
  category:
    | "Web Development"
    | "JavaScript"
    | "React"
    | "Node.js"
    | "Tutorial"
    | "Other";
  coverImage: string;
  published: boolean;
  views: number;
  likes: number;
  readTime: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
    },
    author: {
      type: String,
      default: ME.name,
    },
    tags: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      required: true,
      enum: [
        "Web Development",
        "JavaScript",
        "React",
        "Node.js",
        "Tutorial",
        "Other",
      ],
    },
    coverImage: {
      type: String,
      default: "/images/blog-default.jpg",
    },
    published: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    readTime: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

// Create slug from title before saving
BlogSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }
  next();
});

// Calculate read time based on content length
BlogSchema.pre("save", function (next) {
  const wordsPerMinute = 200;
  const wordCount = this.content.split(/\s+/).length;
  this.readTime = Math.ceil(wordCount / wordsPerMinute);
  next();
});

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
