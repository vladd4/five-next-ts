import ProfilePage from "@/components/ProfilePage/ProfilePage";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function UserPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  return <ProfilePage />;
}
