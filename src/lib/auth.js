import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // Use bcryptjs for better compatibility with Vercel
import { cookies } from "next/headers";

// Production Security: Throw error if secret is missing in prod
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET && process.env.NODE_ENV === "production") {
  throw new Error("JWT_SECRET is missing in environment variables");
}
const FALLBACK_SECRET = "dcs-fallback-secret-2026";

export async function hashPassword(password) {
  // Use 12 rounds for production grade security
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password, hashedPassword) {
  if (!password || !hashedPassword) return false;
  return bcrypt.compare(password, hashedPassword);
}

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET || FALLBACK_SECRET, { 
    expiresIn: "7d",
    algorithm: "HS256" // Explicitly define algorithm
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET || FALLBACK_SECRET);
  } catch (err) {
    // Silent fail for security - don't leak reason for invalid token
    return null;
  }
}

export async function getAuthToken() {
  try {
    const cookieStore = await cookies();
    return cookieStore.get("admin_token")?.value || null;
  } catch {
    return null;
  }
}

export async function isAuthenticated() {
  const token = await getAuthToken();
  if (!token) return false;
  
  const decoded = verifyToken(token);
  // Ensure the decoded token has the required info
  return !!(decoded && decoded.id);
}