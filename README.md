# ByteSend

[![JavaScript](https://img.shields.io/badge/language-JavaScript-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Next.js](https://img.shields.io/badge/framework-Next.js-black?logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/database-MongoDB-green?logo=mongodb)](https://www.mongodb.com/)
[![Hosted on Vercel](https://img.shields.io/badge/hosted_on-Vercel-black?logo=vercel)](https://cloud-file-sharing.vercel.app/)
[![GitHub](https://img.shields.io/badge/source-GitHub-blue?logo=github)](https://github.com/jainDivyansh0211/cloud-file-sharing)

A secure and elegant cloud file-sharing platform that enables users to upload, manage, and share files privately and efficiently.

Powered by **Next.js**, **Google OAuth**, **AWS S3**, and **MongoDB**, ByteSend provides a modern, smooth user experience with robust backend integrations and fast cloud storage.

---

## 🎯 What This Does

- **Login with Google**: Fast, secure authentication via NextAuth.js and OAuth.
- **Upload Files Securely**: Upload directly to AWS S3 with signed URLs.
- **JWT Protected API**: Secure your API routes and actions with token validation.
- **Auto Redirect to Dashboard**: Authenticated users are sent directly to their workspace.
- **MongoDB for Persistence**: Store session info, user metadata and file logs easily.
- **Beautiful UI**: Minimalistic and clean UI powered by Tailwind CSS and Geist fonts.

---

## 🏃‍♂️ Get Started in 30 Seconds

### ✅ What You Need

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB
- AWS credentials (IAM user with S3 access)
- [Vercel CLI](https://vercel.com/cli) or local dev setup

### ▶️ Fire It Up

```bash
# Clone the repository
git clone https://github.com/jainDivyansh0211/cloud-file-sharing.git
cd cloud-file-sharing

# Install dependencies
npm install

# Create a .env.local file and configure:
# NEXTAUTH_SECRET, NEXTAUTH_URL
# AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION
# MONGODB_URI, JWT_SECRET

# Run development server
npm run dev
