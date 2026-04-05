export async function connectDatabase() {
  const { SUPABASE_URL, SUPABASE_KEY } = process.env;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.warn("Supabase credentials are missing. API routes will return configuration errors until they are set.");
    return false;
  }

  console.log("Supabase configuration detected.");
  return true;
}
