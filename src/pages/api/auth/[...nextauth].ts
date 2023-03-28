import { apiClient } from "@/common/apiClient";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "CredentialsProvider",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials as { username: string; password: string };
        const result = await apiClient
          .post(`/auth/login`, {
            username,
            password,
          })
          .then((promise) => promise.data)
          .catch((error) => {
            throw new Error(error);
          });
        if (result) {
          apiClient.defaults.headers.common["Authorization"] = `Bearer ${result.access_token}`;
          return Promise.resolve(result);
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, isNewUser, profile, user }) {

      return { ...token, ...user };

    },
    async session({ session, token, user }) {
      console.log("user", {
        token, user, session
      })
      //@ts-ignore
      session.user.access_token = token.access_token;
      //@ts-ignore
      session.user.refresh_token = token.refresh_token;
      //@ts-ignore
      session.user.role = token.role;
      return session;
    },
  },
};

export default NextAuth(authOptions);
