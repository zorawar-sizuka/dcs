import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";

// GET all photos (public)
export async function GET() {
  try {
    const photos = await prisma.photo.findMany({
      orderBy: { createdAt: "desc" },
    });
    
    // Safety check: if for some reason photos is null
    return NextResponse.json(photos || []); 
  } catch (error) {
    // CRITICAL: Look at your terminal/console where the dev server is running
    console.error("DATABASE_ERROR:", error); 
    
    return NextResponse.json(
      { error: "Failed to fetch", details: error.message }, 
      { status: 500 }
    );
  }
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

// DELETE photo (admin only)
export async function DELETE(request) {
   const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.photo.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
