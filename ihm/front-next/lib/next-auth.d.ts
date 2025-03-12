import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      isEmailVerified: boolean;
    };
    tokens: {
      access: {
        token: string;
        expires: string;
      };
      refresh: {
        token: string;
        expires: string;
      };
    };
  }
}

import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      isEmailVerified: boolean;
    };
    tokens: {
      access: {
        token: string;
        expires: string;
      };
      refresh: {
        token: string;
        expires: string;
      };
    };
  }
}
