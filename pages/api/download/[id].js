import { getUserFromRequest } from "../../../lib/auth";
import { dbConnect } from "../../../lib/mongoose";
import File from "../../../models/File";
import s3 from "../../../lib/s3";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Get user from request
    const user = await getUserFromRequest(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Connect to database
    await dbConnect();

    // Get file ID from query parameters
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "File ID is required" });
    }

    // Find the file in database
    const file = await File.findOne({ 
      _id: id, 
      owner: user.email 
    });

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // Generate signed URL for S3
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: file.key,
      Expires: 3600, // 1 hour expiration (increased from 60 seconds)
      ResponseContentDisposition: `attachment; filename="${file.originalName}"`,
      ResponseContentType: file.contentType || 'application/octet-stream'
    };

    try {
      const url = await s3.getSignedUrlPromise('getObject', params);
      
      // Instead of redirecting, you can either:
      // Option 1: Redirect to the signed URL
      res.redirect(url);
      
      // Option 2: Return the URL as JSON (uncomment if you prefer this)
      // res.status(200).json({ downloadUrl: url });
      
    } catch (s3Error) {
      console.error('S3 Error:', s3Error);
      return res.status(500).json({ error: "Failed to generate download link" });
    }

  } catch (error) {
    console.error('Download API Error:', error);
    return res.status(500).json({ error: "Internal server error" });
  }
}