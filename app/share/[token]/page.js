// app/share/[token]/page.js
import { dbConnect } from "@/lib/mongoose";
import File from "@/models/File";
import s3 from "@/lib/s3";

export async function generateMetadata({ params }) {
  return {
    title: "Shared File",
  };
}

export default async function SharePage({ params }) {
  await dbConnect();
  const file = await File.findOne({ shareToken: params.token }).lean();

  if (!file) {
    return (
      <div style={{ padding: 40, maxWidth: 420 }}>
        <h2>File Not Found</h2>
        <p>The link is invalid or the file has been deleted.</p>
      </div>
    );
  }

  const url = s3.getSignedUrl("getObject", {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: file.key,
    Expires: 60,
    ResponseContentDisposition: `attachment; filename="${file.originalName}"`,
  });

  return (
    <div style={{ padding: 40, maxWidth: 420 }}>
      <h2>Shared File</h2>
      <div style={{ margin: "18px 0", fontSize: 18 }}>
        <b>{file.originalName}</b>
      </div>
      <a
        href={url}
        style={{
          background: "#006eff",
          color: "#fff",
          padding: "12px 32px",
          borderRadius: 6,
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: 16,
        }}
        download
      >
        Download
      </a>
    </div>
  );
}
