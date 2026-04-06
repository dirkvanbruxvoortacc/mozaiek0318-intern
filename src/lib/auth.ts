import type { NextAuthOptions } from "next-auth";

const PCO_AUTHORIZATION_URL =
  "https://api.planningcenteronline.com/oauth/authorize";
const PCO_TOKEN_URL = "https://api.planningcenteronline.com/oauth/token";
const PCO_USERINFO_URL = "https://api.planningcenteronline.com/people/v2/me";

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "planningcenter",
      name: "Planning Center",
      type: "oauth",
      authorization: {
        url: PCO_AUTHORIZATION_URL,
        params: {
          scope: "people services",
          response_type: "code",
        },
      },
      token: PCO_TOKEN_URL,
      userinfo: {
        url: PCO_USERINFO_URL,
        async request({ tokens }) {
          const res = await fetch(PCO_USERINFO_URL, {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
            },
          });
          const data = await res.json();
          return data.data;
        },
      },
      clientId: process.env.PCO_CLIENT_ID!,
      clientSecret: process.env.PCO_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          name: `${profile.attributes.first_name} ${profile.attributes.last_name}`,
          email: profile.attributes.primary_email ?? null,
          image: profile.attributes.avatar ?? null,
          firstName: profile.attributes.first_name,
          lastName: profile.attributes.last_name,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        token.pcoId = (profile as { id?: string })?.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.pcoId = token.pcoId as string;
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  session: {
    strategy: "jwt",
  },
};
