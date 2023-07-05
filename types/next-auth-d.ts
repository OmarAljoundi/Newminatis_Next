import NextAuth, { DefaultSession } from "next-auth";
import { TUserAddress } from "./TUserAddress";

declare module "next-auth" {
  interface Session {
    user: {
      /** Oauth access token */
      access_token: string;
      id: number;
      role: number;
      selectedAddress: number;
      userAddress: TUserAddress[];
    } & DefaultSession["user"];
  }
}
