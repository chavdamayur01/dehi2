import { createClient, SupabaseClient } from "@supabase/supabase-js";

let serverClient: SupabaseClient | null = null;

export function getSupabaseServerClient(): SupabaseClient {
  if (serverClient) {
    return serverClient;
  }

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.SUPABASE_URL?.trim();

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.SUPABASE_ANON_KEY?.trim();

  // Use service role key if provided with a real key, otherwise use anon key
  let supabaseKey = "";
  if (
    serviceRoleKey &&
    serviceRoleKey !== "YOUR_SERVICE_ROLE_KEY" &&
    serviceRoleKey !== "YOUR_ACTUAL_SERVICE_ROLE_KEY"
  ) {
    supabaseKey = serviceRoleKey;
  } else if (
    anonKey &&
    anonKey !== "YOUR_SUPABASE_ANON_KEY" &&
    anonKey !== "YOUR_ACTUAL_SUPABASE_ANON_KEY"
  ) {
    supabaseKey = anonKey;
  }

  if (
    !supabaseUrl ||
    supabaseUrl === "YOUR_SUPABASE_URL" ||
    supabaseUrl === "YOUR_ACTUAL_SUPABASE_URL"
  ) {
    throw new Error(
      "Supabase URL is not configured. Please set NEXT_PUBLIC_SUPABASE_URL in .env.local"
    );
  }

  if (!supabaseKey) {
    throw new Error(
      "Supabase Key is not configured. Please set NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
  }

  serverClient = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return serverClient;
}
