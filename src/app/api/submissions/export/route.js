import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions = await prisma.submission.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Build CSV
  const headers = ["Name", "Email", "Phone", "Service Type", "Message", "Source", "Date"];
  const rows = submissions.map((s) => [
    `"${s.name}"`,
    `"${s.email}"`,
    `"${s.phone}"`,
    `"${s.serviceType}"`,
    `"${s.message.replace(/"/g, '""')}"`,
    `"${s.source}"`,
    `"${new Date(s.createdAt).toLocaleDateString()}"`,
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="dcs-submissions-${Date.now()}.csv"`,
    },
  });
}
