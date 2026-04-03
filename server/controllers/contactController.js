export function postContact(req, res) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  return res.status(201).json({
    message: "Contact message received successfully.",
    inquiry: {
      name,
      email,
      message,
      receivedAt: new Date().toISOString()
    }
  });
}
