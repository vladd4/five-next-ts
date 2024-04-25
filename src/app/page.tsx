import AboutUs from "@/components/AboutUs/AboutUs";
import Form from "@/components/Form/Form";
import HowWorks from "@/components/HowWorks/HowWorks";
import Sites from "@/components/SitesSlider/Sites";
import WelcomeBlock from "@/components/WelcomeBlock/Welcome";

import { redirect } from "next/navigation";
import { checkSession } from "@/utils/chechSession";

export default async function Home() {
  const session = await checkSession();

  if (session) {
    redirect("/search");
  }

  return (
    <>
      <WelcomeBlock />
      <HowWorks />
      <AboutUs />
      <Sites />
      <Form />
    </>
  );
}
