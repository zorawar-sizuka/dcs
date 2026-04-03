import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";

export async function PUT(request, { params }) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { title, category, image } = body;

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(category && { category }),
        ...(image && { image }),
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Project update error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({ where: { id } });

    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (project.image?.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", project.image);
      try { await unlink(filePath); } catch {}
    }

    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Project delete error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
