import { isAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import prisma from "@/lib/prisma";

// Vercel serverless timeout (free tier = 10s max, Pro = 60s)
export const maxDuration = 60;

const BUCKET_NAME = process.env.NEXT_PUBLIC_STORAGE_BUCKET || "dcs_uploads";

// --- Dynamic Constraints ---
const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

const MAX_PHOTO_SIZE = 5 * 1024 * 1024;    // 5MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;   // 50MB

export async function POST(request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder") || "general";
    
    // Optional: create DB record in same request (saves a round-trip)
    const createRecord = formData.get("createRecord") === "true";
    const recordData = formData.get("recordData");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Invalid file" }, { status: 400 });
    }

    // --- 1. Dynamic Validation ---
    const isVideo = file.type.startsWith("video/") || folder === "videos";
    const allowedTypes = isVideo ? VIDEO_TYPES : PHOTO_TYPES;
    const maxAllowedSize = isVideo ? MAX_VIDEO_SIZE : MAX_PHOTO_SIZE;

    if (file.size > maxAllowedSize) {
      const sizeMb = maxAllowedSize / (1024 * 1024);
      return NextResponse.json({ error: `File too large (Max ${sizeMb}MB)` }, { status: 400 });
    }

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: `Unsupported file format: ${file.type}` }, { status: 400 });
    }

    // --- 2. Build file path ---
    const ext = file.name.split(".").pop().toLowerCase();
    const cleanName = file.name.split(".")[0].replace(/[^a-zA-Z0-9]/g, "_").substring(0, 15);
    const fileName = `${cleanName}_${Date.now()}.${ext}`;
    const filePath = `${folder}/${fileName}`;

    // --- 3. Stream upload (avoid full buffer in memory for large files) ---
    // For files under 4MB, use arrayBuffer (faster for small files)
    // For larger files, use the stream-based approach
    let uploadPayload;
    if (file.size < 4 * 1024 * 1024) {
      uploadPayload = Buffer.from(await file.arrayBuffer());
    } else {
      // Use Uint8Array from stream for large files to reduce memory pressure
      const chunks = [];
      const reader = file.stream().getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }
      uploadPayload = Buffer.concat(chunks);
    }

    const { data, error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(filePath, uploadPayload, {
        contentType: file.type,
        upsert: false,
        cacheControl: "3600",
        duplex: "half",
      });

    if (uploadError) {
      console.error("Supabase Storage Error:", uploadError.message);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    // --- 4. Optionally create DB record in the same request ---
    let dbRecord = null;
    if (createRecord && recordData) {
      try {
        const parsed = JSON.parse(recordData);
        const { model, fields } = parsed;

        // Inject the uploaded URL into the fields
        const dataWithUrl = { ...fields };
        
        // Auto-map URL based on model type
        if (model === "photo") {
          dataWithUrl.url = publicUrl;
          dbRecord = await prisma.photo.create({ data: dataWithUrl });
        } else if (model === "project") {
          dataWithUrl.image = publicUrl;
          dbRecord = await prisma.project.create({ data: dataWithUrl });
        } else if (model === "blog") {
          dataWithUrl.image = publicUrl;
          dbRecord = await prisma.blog.create({ data: dataWithUrl });
        }
      } catch (parseErr) {
        console.error("Record creation error:", parseErr);
        // Upload succeeded, just return the URL even if DB save failed
      }
    }

    return NextResponse.json({ 
      url: publicUrl, 
      name: fileName,
      path: filePath,
      type: isVideo ? "video" : "image",
      record: dbRecord,
    }, { status: 201 });

  } catch (error) {
    console.error("Upload Route Crash:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}