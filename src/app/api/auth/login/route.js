import prisma from "@/lib/prisma";
import { hashPassword, signToken, verifyPassword } from "@/lib/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Find or create admin on first login
    let admin = await prisma.admin.findUnique({ where: { username } });

    if (!admin) {
      // Auto-create first admin if no admins exist
      const count = await prisma.admin.count();
      if (count === 0 && username === "admin@myapp" && password === "dcs_@safe123") {
        const hashed = await hashPassword(password);
        admin = await prisma.admin.create({
          data: { username, password: hashed },
        });
      } else {
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 }
        );
      }
    }

    const isValid = await verifyPassword(password, admin.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = signToken({ id: admin.id, username: admin.username });

    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({ success: true, username: admin.username });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
