import SavedCarPage from "@/components/SavedCars/SavedCarPage";
import { checkSession } from "@/utils/chechSession";
import { redirect } from "next/navigation";

export default async function SavedPage() {
  const session = await checkSession();

  if (!session) {
    redirect("/");
  }

  return <SavedCarPage />;
}
