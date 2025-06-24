// pages/api/login.js
import { dbConnect } from "../../lib/mongoose";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import { signToken } from "../../lib/jwt";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = signToken({ id: user._id, email: user.email });
  res.status(200).json({ token });
}
