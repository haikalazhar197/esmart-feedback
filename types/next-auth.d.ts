import "next-auth/jwt";
import "next-auth";

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's role address. */
      role?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
    role?: string;
  }
}
