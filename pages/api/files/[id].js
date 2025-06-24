import { getUserFromRequest } from "../../../lib/auth";
import { dbConnect } from "../../../lib/mongoose";
import File from "../../../models/File";
import s3 from "../../../lib/s3";

export default async function handler(req, res) {
  if (req.method !== "DELETE") return res.status(405).end();

  const user = await getUserFromRequest(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  await dbConnect();
  const file = await File.findOne({ _id: req.query.id, owner: user.email });
  if (!file) return res.status(404).json({ error: "File not found" });

  try {
    await s3.deleteObject({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: file.key,
    }).promise();

    await file.deleteOne();
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
}
