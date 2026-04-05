import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

function passwordsMatch(inputPassword, configuredPassword) {
  if (!configuredPassword) {
    return false;
  }

  if (
    configuredPassword.startsWith("$2a$") ||
    configuredPassword.startsWith("$2b$") ||
    configuredPassword.startsWith("$2y$")
  ) {
    return bcrypt.compareSync(inputPassword, configuredPassword);
  }

  return inputPassword === configuredPassword;
}

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (!adminEmail || !adminPassword || !jwtSecret) {
    return res.status(500).json({ error: "Auth environment variables are not configured" });
  }

  if (email !== adminEmail || !passwordsMatch(password, adminPassword)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { role: "admin", email: adminEmail },
    jwtSecret,
    { expiresIn: "2h" }
  );

  return res.json({ token });
});

export default router;
