import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";

// --- GET: Fetch all videos (Public) ---
export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Ensure we always return an array, even if empty
    return NextResponse.json(videos || []);
  } catch (error) {
    // This logs the error to your server console so you can see if Supabase is down
    console.error("VIDEO_GET_ERROR:", error);
    
    // Return a clean error object so the frontend doesn't crash during .json()
    return NextResponse.json(
      { error: "Failed to fetch videos", details: error.message },
      { status: 500 }
    );
  }
}

// --- POST: Create a video (Admin Only) ---
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
    console.error("VIDEO_CREATE_ERROR:", error);
    return NextResponse.json({ error: "Failed to create video" }, { status: 500 });
  }
}

// --- DELETE: Remove a video (Admin Only) ---
export async function DELETE(request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
    }

    await prisma.video.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Video deleted" });
  } catch (error) {
    console.error("VIDEO_DELETE_ERROR:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}