# ByteSend

[![JavaScript](https://img.shields.io/badge/language-JavaScript-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Next.js](https://img.shields.io/badge/framework-Next.js-black?logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/database-MongoDB-green?logo=mongodb)](https://www.mongodb.com/)
[![Storage](https://img.shields.io/badge/cloud-AWS_S3-orange?logo=amazonaws)](https://aws.amazon.com/s3/)
[![Hosted on Vercel](https://img.shields.io/badge/hosted_on-Vercel-black?logo=vercel)](https://cloud-file-sharing.vercel.app/)
[![GitHub](https://img.shields.io/badge/source-GitHub-blue?logo=github)](https://github.com/jainDivyansh0211/cloud-file-sharing)

A blazing fast, elegant, and secure cloud file-sharing platform that enables users to upload, manage, and share files privately and efficiently.

Built using **Next.js App Router**, **NextAuth**, **AWS S3**, and **MongoDB**, **ByteSend** provides a seamless experience from login to file management. It is production-ready, extensible, and mobile-responsive with zero compromise on security.

---

## 📸 UI Snapshots

### 🏠 Landing Page  
![Landing Page](public/assets/screenshots/landing.png)

### 🔐 Login with Google OAuth  
![Login](public/assets/screenshots/auth.png)

### 📂 User Dashboard  
![Dashboard](public/assets/screenshots/dashboard.png)

---

## 🎯 What This Does

- 🔐 **Google OAuth Login**: One-click login with session management via NextAuth.js
- ☁️ **Secure File Uploads**: Files are uploaded directly to AWS S3 via pre-signed URLs
- 🧾 **JWT-Based API Auth**: Routes are protected using tokens verified by `jsonwebtoken`
- 📥 **Redirected Dashboard Access**: Automatically redirect authenticated users
- 🗃️ **MongoDB Integration**: Used for session storage and user metadata
- 🖌️ **Responsive UI**: Fully styled with Tailwind CSS + Google Geist fonts

---

## 🏃‍♂️ Get Started in 30 Seconds

### ✅ Requirements

- [Node.js v18+](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB
- [AWS S3 Bucket](https://aws.amazon.com/s3/) with appropriate IAM access
- [Vercel CLI (optional)](https://vercel.com/cli)

### ▶️ Setup & Run

```bash
# 1. Clone the repository
git clone https://github.com/jainDivyansh0211/cloud-file-sharing.git
cd cloud-file-sharing

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local and fill in the required secrets

# 4. Start the dev server
npm run dev
```

🔗 Visit [http://localhost:3000](http://localhost:3000)

---

## 🌍 Environment Variables

Ensure your `.env.local` contains the following:

```env
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

MONGODB_URI=your_mongodb_uri

AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_aws_region

JWT_SECRET=your_jwt_secret
```

---

## 🧩 Folder Breakdown

| Path            | Description |
|------------------|-------------|
| `/layout.js`     | Loads global styles and wraps app in Providers |
| `/page.js`       | Landing page with login/signup UI |
| `/providers.js`  | Sets up NextAuth session context |
| `/auth.js`       | Utility to fetch user from `req` using JWT |
| `/jwt.js`        | Sign & verify custom JWTs securely |
| `/mongoose.js`   | MongoDB connection helper |
| `/s3.js`         | AWS S3 client setup with v4 signature support |
| `/utils.js`      | Utility for tailwind class merging (`cn` function) |

---

## 🔐 Auth & Storage Architecture

- **Auth Provider**: Google OAuth via NextAuth.js
- **Token Handling**: Signed JWTs stored as cookies and extracted server-side
- **File Storage**: Uploaded securely to AWS S3 with signed URL logic
- **DB**: MongoDB (via Mongoose) to store user profiles, file metadata, etc.

---

## 🧠 Tech Highlights

- ⚡ **Next.js App Router**: Server-first rendering, improved routing
- 🔐 **NextAuth.js**: Auth flow with session & CSRF protection
- 📦 **AWS SDK v3**: For performant and secure S3 integration
- 💅 **Tailwind CSS + clsx + twMerge**: For clean, responsive UI development
- ⚙️ **Environment-based Secrets**: Full `.env` config for secure deployment

---

## 🌐 Live Demo

- 🚀 App: [cloud-file-sharing.vercel.app](https://cloud-file-sharing.vercel.app)
- 💻 Repo: [github.com/jainDivyansh0211/cloud-file-sharing](https://github.com/jainDivyansh0211/cloud-file-sharing)

---

## 👨‍💻 Built With ❤️ By **Divyansh Jain**  
B.Tech, IIT Kharagpur '27  
📧 div0211jain@gmail.com  
🔗 [GitHub](https://github.com/jainDivyansh0211) • [LinkedIn](https://linkedin.com/in/divyanshjain0211)
