import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
console.log(process.env.GOOGLE_ID, process.env.GOOGLE_SECRET );
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: "903963025111-f5spbihd4lug2gsc3748fn049kt3phgc.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  pages: {
    signIn: "/auth",
  },
});
