import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// You can add more providers (GitHub, Credentials, etc.) below if needed

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers if you want
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.id_token || account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.token = token.accessToken;
      return session;
    },
  },
  // (Optional) Customize NextAuth pages:
  // pages: {
  //   signIn: '/auth/signin', // Custom sign in page
  // },
});
