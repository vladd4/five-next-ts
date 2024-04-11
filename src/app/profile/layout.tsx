import "@/styles/globals.scss";

import React from "react";

import Header from "@/components/Header/Header";
import AlertItem from "@/components/Alert";
import InputAlert from "@/components/InputAlert/InputAlert";

export const metadata = {
  title: "FiVe | Профіль користувача",
  description: "FiVe | Профіль користувача",
};

type ProfileProps = {
  children: React.ReactNode;
};

export default function ProfileLayout({ children }: ProfileProps) {
  return (
    <>
      <Header />
      <AlertItem text="Successfuly added to saved search!" />
      <InputAlert />
      {children}
    </>
  );
}
