import "@/styles/globals.scss";
import { Montserrat } from "next/font/google";

import ReduxProvider from "@/redux/Provider";
import UserProvider from "@/hooks/sessionProvider";

import React from "react";

import Footer from "@/components/Footer/Footer";

const montserrat = Montserrat({ subsets: ["latin"], display: "fallback" });

export const metadata = {
  title: "FiVe | Find your vehicle",
  description: "FiVe | Find your vehicle",
};

type RootProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootProps) {
  return (
    <html lang="uk">
      <body className={montserrat.className}>
        <ReduxProvider>
          <UserProvider>
            {children}
            <Footer />
          </UserProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
