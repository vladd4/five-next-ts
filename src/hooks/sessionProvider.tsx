"use client";

import { SessionProvider } from "next-auth/react";

type SessionProps = {
  children: React.ReactNode;
};

export default function UserProvider({ children }: SessionProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
