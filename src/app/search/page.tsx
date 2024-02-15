import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import SearchPage from "@/components/SearchPage/SearchPage";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  return <SearchPage />;
}
