import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** Oauth access token */
      access_token: string;
      role: number;
    } & DefaultSession["user"];
  }
}
