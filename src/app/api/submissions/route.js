import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";

// GET all submissions (admin only)
export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions = await prisma.submission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(submissions);
}

// POST new submission (public)
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, serviceType, message, source } = body;

    if (!name || !email || !serviceType || !source) {
      return NextResponse.json(
        { error: "Name, email, service type and source are required" },
        { status: 400 }
      );
    }

    const submission = await prisma.submission.create({
      data: {
        name,
        email,
        phone: phone || "",
        serviceType,
        message: message || "",
        source,
      },
    });

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit" },
      { status: 500 }
    );
  }
}

// DELETE multiple submissions (admin only)
export async function DELETE(request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { ids } = await request.json();

    if (ids && ids.length > 0) {
      await prisma.submission.deleteMany({
        where: { id: { in: ids } },
      });
    } else {
      await prisma.submission.deleteMany();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete" },
      { status: 500 }
    );
  }
}
