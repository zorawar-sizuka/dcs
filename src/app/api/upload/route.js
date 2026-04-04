import { isAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const BUCKET_NAME = process.env.NEXT_PUBLIC_STORAGE_BUCKET || "dcs_uploads";

// --- Dynamic Constraints ---
const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"]; // quicktime = .mov

const MAX_PHOTO_SIZE = 5 * 1024 * 1024;    // 5MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;   // 50MB (Adjust based on your Supabase tier)

export async function POST(request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder") || "general"; // 'photos' or 'videos'

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Invalid file" }, { status: 400 });
    }

    // --- 1. Dynamic Validation Logic ---
    const isVideo = file.type.startsWith("video/") || folder === "videos";
    const allowedTypes = isVideo ? VIDEO_TYPES : PHOTO_TYPES;
    const maxAllowedSize = isVideo ? MAX_VIDEO_SIZE : MAX_PHOTO_SIZE;

    // Security: Check Size
    if (file.size > maxAllowedSize) {
      const sizeMb = maxAllowedSize / (1024 * 1024);
      return NextResponse.json({ error: `File too large (Max ${sizeMb}MB)` }, { status: 400 });
    }

    // Security: Check Type
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: `Unsupported file format: ${file.type}` }, { status: 400 });
    }

    // --- 2. Process File ---
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop().toLowerCase();
    const cleanName = file.name.split(".")[0].replace(/[^a-zA-Z0-9]/g, "_").substring(0, 15);
    const fileName = `${cleanName}_${Date.now()}.${ext}`;
    const filePath = `${folder}/${fileName}`;

    // --- 3. Admin Upload (Bypassing RLS) ---
    const { data, error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
        cacheControl: "3600",
      });

    if (uploadError) {
      console.error("Supabase Storage Error:", uploadError.message);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return NextResponse.json({ 
      url: publicUrl, 
      name: fileName,
      path: filePath,
      type: isVideo ? 'video' : 'image' 
    }, { status: 201 });

  } catch (error) {
    console.error("Upload Route Crash:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}