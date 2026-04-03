import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";

// GET all videos (public)
export async function GET() {
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(videos);
}

// POST new video (admin only)
export async function POST(request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, thumbnail, videoUrl } = body;

    if (!title || !videoUrl) {
      return NextResponse.json(
        { error: "Title and video URL are required" },
        { status: 400 }
      );
    }

    const video = await prisma.video.create({
      data: {
        title,
        thumbnail: thumbnail || "/images/thumbnail.avif",
        videoUrl,
      },
    });

    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error("Video create error:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
