import "@/styles/globals.scss";

import React from "react";

import Header from "@/components/Header/Header";
import AlertItem from "@/components/Alert";

export const metadata = {
  title: "FiVe | Search Page",
  description: "FiVe | Search Page",
};

type SearchProps = {
  children: React.ReactNode;
};

export default function SearchLayout({ children }: SearchProps) {
  return (
    <>
      <Header />
      <AlertItem text="Successfuly added to saved search!" />
      {children}
    </>
  );
}
