import ProfilePage from "@/components/ProfilePage/ProfilePage";
import { checkSession } from "@/utils/chechSession";

import { redirect } from "next/navigation";

export default async function UserPage() {
  const session = await checkSession();

  if (!session) {
    redirect("/");
  }
  return <ProfilePage />;
}
