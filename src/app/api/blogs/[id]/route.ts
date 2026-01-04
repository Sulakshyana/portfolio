// src/app/api/blogs/[id]/route.ts
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Blog, { IBlog } from "@/models/Blog";

interface Params {
  params: { id: string };
}

// GET single blog by ID
export async function GET(request: Request, { params }: Params) {
  try {
    await connectDB();

    const blog = await Blog.findById(params.id);

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    // Increment view count
    blog.views = (blog.views || 0) + 1;
    await blog.save();

    return NextResponse.json({ success: true, data: blog });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT update blog by ID
export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB();

    const body: Partial<IBlog> = await request.json();
    const blog = await Blog.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE blog by ID
export async function DELETE(request: Request, { params }: Params) {
  try {
    await connectDB();

    const blog = await Blog.findByIdAndDelete(params.id);

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
