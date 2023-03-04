import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      access_token?: string | null;
      refresh_token?: string | null;
      role?: string | null;
    } & DefaultSession["user"];
  }
}
