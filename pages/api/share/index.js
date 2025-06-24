import { getUserFromRequest } from "../../../lib/auth";
import { dbConnect } from "../../../lib/mongoose";
import File from "../../../models/File";
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const user = await getUserFromRequest(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  await dbConnect();
  const { fileId } = req.body;

  const file = await File.findOne({ _id: fileId, owner: user.email });
  if (!file) return res.status(404).json({ error: "File not found" });

  if (!file.shareToken) {
    file.shareToken = crypto.randomBytes(24).toString("hex");
    await file.save();
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/share/${file.shareToken}`;
  res.json({ url });
}
