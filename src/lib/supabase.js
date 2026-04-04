// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   console.warn("Supabase credentials missing. Studio uploads will fail on Production.");
// }

// export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");



import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// 1. PUBLIC CLIENT: For fetching data in components
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. ADMIN CLIENT: For Server-side Uploads (Bypasses RLS)
// This should NEVER be used in a frontend component.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});