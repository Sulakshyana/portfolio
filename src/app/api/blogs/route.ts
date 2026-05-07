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
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: msg },
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
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: msg },
      { status: 400 }
    );
  }
}

// DELETE all blogs — requires ADMIN_SECRET header
export async function DELETE(request: NextRequest) {
  const secret = request.headers.get("x-admin-secret");
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    await Blog.deleteMany({});

    return NextResponse.json({
      success: true,
      message: "All blogs deleted",
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}
