import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";

// GET all blogs (public)
export async function GET() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(blogs);
}

// POST new blog (admin only)
export async function POST(request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, excerpt, content, image, category, bgColor, accent, author } = body;

    if (!title || !excerpt || !content || !image || !category) {
      return NextResponse.json(
        { error: "Title, excerpt, content, image and category are required" },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        excerpt,
        content,
        image,
        category,
        bgColor: bgColor || "bg-[#E8F5E9]",
        accent: accent || "text-green-700",
        author: author || "DCS Editorial",
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Blog create error:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
