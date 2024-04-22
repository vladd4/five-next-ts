import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import axios from "axios";

type User = {
  id: number;
  email: string;
  name: string;
  phone: string | null;
  telegram: string | null;
  avatar: string | null;
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET as string,
  session: {
    strategy: "jwt",
    maxAge: 7200,
  },
  jwt: {
    maxAge: 7200,
  },
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) {
        throw new Error("No Profile");
      } else {
        const { data } = await axios.get<User>(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/user/${user.email}`
        );
        console.log(data);
        if (!data) {
          console.log(user);

          const params = {
            email: user?.email,
            name: user?.name,
            avatar: user?.image,
          };
          await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/user/add`,
            params
          );
          console.log("new user added");
        } else {
          console.log("user already exists");
        }
      }
      return true;
    },
  },
};
