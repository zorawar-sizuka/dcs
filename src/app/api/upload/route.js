import { isAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder") || "general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const ext = file.name.substring(file.name.lastIndexOf('.'));
    const safeName = file.name.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 15);
    const uniqueName = `${safeName}_${Date.now()}${ext}`;
    const filePath = `${folder}/${uniqueName}`;

    const { data, error } = await supabase.storage
      .from("dcs-uploads")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    // Get public URL for Simple Mode
    const { data: { publicUrl } } = supabase.storage
      .from("dcs-uploads")
      .getPublicUrl(filePath);

    return NextResponse.json({ url: publicUrl, name: uniqueName }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed: " + error.message }, { status: 500 });
  }
}

