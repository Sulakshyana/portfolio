// src/app/api/blogs/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog, { IBlog } from "@/models/Blog";

// Define proper filter type for Mongoose query
type BlogFilter = {
  category?: IBlog["category"];
  published?: boolean;
};

// GET all blogs
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const published = searchParams.get("published");

    const query: BlogFilter = {};
    if (category) query.category = category as IBlog["category"];
    if (published !== null) query.published = published === "true";

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .select("-content"); // Exclude full content for list view

    return NextResponse.json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// POST create new blog
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body: Partial<IBlog> = await request.json();
    const blog = await Blog.create(body);

    return NextResponse.json(
      {
        success: true,
        data: blog,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 400 }
    );
  }
}

// DELETE all blogs
export async function DELETE() {
  try {
    await connectDB();
    await Blog.deleteMany({});

    return NextResponse.json({
      success: true,
      message: "All blogs deleted",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
