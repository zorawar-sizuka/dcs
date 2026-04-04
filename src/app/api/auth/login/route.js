import prisma from "@/lib/prisma";
import { hashPassword, signToken, verifyPassword } from "@/lib/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 1. Basic validation
    if (!username || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 2. Find Admin
    let admin = await prisma.admin.findUnique({ where: { username } });

    // 3. Auto-seed first admin (Only if DB is empty and credentials match)
    if (!admin) {
      const adminCount = await prisma.admin.count();
      if (adminCount === 0 && 
          username === process.env.INITIAL_ADMIN_USER && 
          password === process.env.INITIAL_ADMIN_PASS) {
        
        const hashed = await hashPassword(password);
        admin = await prisma.admin.create({
          data: { username, password: hashed },
        });
      } else {
        // Generic error to prevent username enumeration
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }
    }

    // 4. Verify Password
    const isValid = await verifyPassword(password, admin.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 5. Create Token & Set Cookie
    const token = signToken({ id: admin.id, username: admin.username });
    const cookieStore = await cookies();

    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Forces HTTPS on Vercel
      sameSite: "strict", // More secure than 'lax' for admin panels
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // Do not log the full error/password to console in production
    console.error("Auth Failure:", process.env.NODE_ENV === "development" ? error : "Internal Error");
    
    return NextResponse.json(
      { error: "Authentication failed" }, 
      { status: 500 }
    );
  }
}