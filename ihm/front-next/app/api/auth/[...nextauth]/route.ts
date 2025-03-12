import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialProvider from "next-auth/providers/credentials";
// const BackendUrl = process.env.BACKEND_URL;

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(process.env.BACKEND_URL + "/auth/refresh-tokens", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: token.tokens.refresh.token }),
  });

  const response = await res.json();
  return {
    ...token,
    tokens: response.tokens,
  };
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "exemple@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const { email, password } = credentials;

        const res = await fetch(process.env.BACKEND_URL + "/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (res.status === 401) {
          return null;
        }

        const user = await res.json();
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }

      if (
        new Date().getTime() < new Date(token.tokens.access.expires).getTime()
      ) {
        return token;
      }

      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.tokens = token.tokens;

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
