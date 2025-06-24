import { getToken } from "next-auth/jwt";

export async function getUserFromRequest(req) {
  // Use NEXTAUTH_SECRET from your .env
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  return token; // Will contain token.email, token.name, etc.
}
