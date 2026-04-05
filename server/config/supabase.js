import { createClient } from "@supabase/supabase-js";

let client;

export function getSupabaseClient() {
  const { SUPABASE_URL, SUPABASE_KEY } = process.env;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Supabase is not configured. Set SUPABASE_URL and SUPABASE_KEY in server/.env.");
  }

  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
  }

  return client;
}

export default getSupabaseClient;
