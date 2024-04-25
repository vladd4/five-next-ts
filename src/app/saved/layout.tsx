import "@/styles/globals.scss";

import React from "react";

import Header from "@/components/Header/Header";

export const metadata = {
  title: "FiVe | Збережні автомобілі",
  description: "FiVe | Збережні автомобілі",
};

type ProfileProps = {
  children: React.ReactNode;
};

export default function ProfileLayout({ children }: ProfileProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
