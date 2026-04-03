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
    const photo = await prisma.photo.findUnique({ where: { id } });

    if (!photo) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Delete file from public/uploads if it exists
    if (photo.url.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", photo.url);
      try { await unlink(filePath); } catch {}
    }

    await prisma.photo.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Photo delete error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
