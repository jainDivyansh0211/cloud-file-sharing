import { getUserFromRequest } from "../../lib/auth";
import s3 from "../../lib/s3";
import { dbConnect } from "../../lib/mongoose";
import File from "../../models/File";
import { IncomingForm } from "formidable";
import fs from "fs";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const user = await getUserFromRequest(req);
  if (!user || !user.email) return res.status(401).json({ error: "Unauthorized" });

  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "File upload error" });

    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!uploadedFile) return res.status(400).json({ error: "No file uploaded" });

    const filePath = uploadedFile.filepath || uploadedFile.path;
    if (!filePath) return res.status(400).json({ error: "File path not found" });

    const fileStream = fs.createReadStream(filePath);
    const key = `${user.email}/${Date.now()}_${uploadedFile.originalFilename || uploadedFile.name}`;

    const s3Params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: fileStream,
      ContentType: uploadedFile.mimetype || uploadedFile.type,
    };

    try {
      await s3.upload(s3Params).promise();
      await dbConnect();
      await File.create({
        key,
        originalName: uploadedFile.originalFilename || uploadedFile.name,
        owner: user.email,
      });
      res.status(201).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "S3 upload error" });
    }
  });
}
