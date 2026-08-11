import { createClient, SupabaseClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://wwadsfcnweumykohqpdt.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_3mpWyoiyzGEspJCTcbxa9Q_EutFKYZs";

let serverClient: SupabaseClient | null = null;

export function getSupabaseServerClient(): SupabaseClient {
  if (serverClient) {
    return serverClient;
  }

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.SUPABASE_URL?.trim() ||
    DEFAULT_SUPABASE_URL;

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.SUPABASE_ANON_KEY?.trim() ||
    DEFAULT_SUPABASE_ANON_KEY;

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
  } else {
    supabaseKey = DEFAULT_SUPABASE_ANON_KEY;
  }

  serverClient = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return serverClient;
}
