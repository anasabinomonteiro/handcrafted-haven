
import NextAuth from "next-auth"
import Google from "next-auth/providers/google";
import PostgresAdapter from '@auth/pg-adapter';
import { Pool } from '@neondatabase/serverless';
import { getUserRoleByEmail } from "./app/lib/data";
import { DefaultSession } from 'next-auth';

import type { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string; // Example: Add a custom 'role' field
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    role?: string;
  }
}
 
export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  return {
    adapter: PostgresAdapter(pool),
    providers: [Google({
      async profile(profile) {
        const dbUserList = await getUserRoleByEmail(profile.email);
        const dbUser = Array.isArray(dbUserList) ? dbUserList[0] : null;
        //console.log(dbUser);
        return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
      role: (dbUser) ? dbUser.role : "user", // Default to "user" if not found
    };

      },
    }),],
    callbacks: {
      async session({ session, user }) {
        session.user.id = user.id;
        session.user.role = user.role;
        return session;
      },
      authorized ({ auth }) {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    }
    }
  };
});