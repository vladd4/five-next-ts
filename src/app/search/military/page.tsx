import SearchPage from "@/components/SearchPage/SearchPage";

import { checkSession } from "@/utils/chechSession";
import { redirect } from "next/navigation";

export default async function MilitaryPage() {
  const session = await checkSession();

  // if (!session) {
  //   redirect("/");
  // }
  return <SearchPage />;
}
