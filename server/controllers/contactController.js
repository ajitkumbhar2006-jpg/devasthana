import getSupabaseClient from "../config/supabase.js";

export async function getContacts(_req, res) {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from("contacts").select("*");

    if (error) {
      return res.status(500).json(error);
    }

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function postContact(req, res) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("contacts")
      .insert([
        {
          name,
          email,
          message,
          received_at: new Date().toISOString()
        }
      ])
      .select("*");

    if (error) {
      return res.status(500).json(error);
    }

    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
