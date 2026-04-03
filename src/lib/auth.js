import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "dcs-strata-admin-secret-key-2026";

export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_token")?.value || null;
}

export async function isAuthenticated() {
  const token = await getAuthToken();
  if (!token) return false;
  const decoded = verifyToken(token);
  return !!decoded;
}
