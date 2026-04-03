import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";

export async function DELETE(request, { params }) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const video = await prisma.video.findUnique({ where: { id } });

    if (!video) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Delete files from public/uploads if they exist
    for (const fileUrl of [video.thumbnail, video.videoUrl]) {
      if (fileUrl?.startsWith("/uploads/")) {
        const filePath = path.join(process.cwd(), "public", fileUrl);
        try { await unlink(filePath); } catch {}
      }
    }

    await prisma.video.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Video delete error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
