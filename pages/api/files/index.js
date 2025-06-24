import { getUserFromRequest } from "../../../lib/auth";
import { dbConnect } from "../../../lib/mongoose";
import File from "../../../models/File";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const user = await getUserFromRequest(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  await dbConnect();
  const files = await File.find({ owner: user.email }).sort({ uploadedAt: -1 }).lean();

  res.status(200).json(files);
}
