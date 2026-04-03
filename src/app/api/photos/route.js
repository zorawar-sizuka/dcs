import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";

// GET all photos (public)
export async function GET() {
  const photos = await prisma.photo.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(photos);
}

// POST new photo (admin only)
export async function POST(request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { url, alt, height } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const photo = await prisma.photo.create({
      data: {
        url,
        alt: alt || "DSC Project",
        height: height || "h-[300px] sm:h-[340px] lg:h-[380px]",
      },
    });

    return NextResponse.json(photo, { status: 201 });
  } catch (error) {
    console.error("Photo create error:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
