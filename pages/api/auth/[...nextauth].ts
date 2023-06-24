import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import UserService from "@/service/UserService";
import { RegisterType, Role, TUser } from "@/types/TUser";
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
        isNewUser: { label: "isNewUser", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        if (credentials.isNewUser == "no") {
          var TUser: TUser = {
            email: credentials.email,
            password: credentials.password,
            type: RegisterType.Self,
          };
          const user = await UserService.authByEmail(TUser);

          if (!user || !user?.data?.success) {
            throw new Error(user?.data?.message);
          }

          return {
            ...user?.data?.user,
            //@ts-ignore
            id: user?.data?.user.id.toString(),
            access_token: user?.data?.token,
          };
        }

        const user = await UserService.register({
          agreement: true,
          email: credentials.email,
          password: credentials.password,
          re_password: credentials.password,
          role: Role.User,
          type: RegisterType.Self,
        });

        if (!user || !user?.data?.success) {
          throw new Error(user?.data?.message);
        }

        return {
          ...user?.data?.user,
          //@ts-ignore
          id: user?.data?.user.id.toString(),
          access_token: user?.data?.token,
        };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      async profile(profile, tokens) {
        var user: TUser = {
          id: 0,
          email: profile?.email,
          role: Role.User,
          type: RegisterType.Facebook,
        };

        const response = await UserService.authByThirdParty(user);

        if (!response || !response?.data?.success) {
          throw new Error(response?.data?.message);
        }

        return {
          ...response?.data?.user,
          //@ts-ignore
          id: response?.data?.user.id.toString(),
          access_token: response?.data?.token,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      async profile(profile, tokens) {
        var user: TUser = {
          id: 0,
          email: profile?.email,
          role: Role.User,
          type: RegisterType.Google,
        };

        const response = await UserService.authByThirdParty(user);

        if (!response || !response?.data?.success) {
          throw new Error(response?.data?.message);
        }

        return {
          ...response?.data?.user,
          //@ts-ignore
          id: response?.data?.user.id.toString(),
          access_token: response?.data?.token,
        };
      },
    }),
  ],
  pages: {
    signIn: "/",
    error: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
    maxAge: 604800,
  },
  callbacks: {
    jwt({ user, token }) {
      if (user) {
        token.role = (user as any as TUser).role;
        token.access_token = (user as any).access_token;
      }
      return token;
    },
    session({ session, token }) {
      //@ts-ignore
      session.user.role = token.role;
      session.user.access_token = token.access_token as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
