import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";

// GET all projects (public)
export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(projects);
}

// POST new project (admin only)
export async function POST(request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, category, image } = body;

    if (!title || !category || !image) {
      return NextResponse.json(
        { error: "Title, category and image are required" },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: { title, category, image },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Project create error:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
