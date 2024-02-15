import AboutUs from "@/components/AboutUs/AboutUs";
import Form from "@/components/Form/Form";
import HowWorks from "@/components/HowWorks/HowWorks";
import Sites from "@/components/SitesSlider/Sites";
import WelcomeBlock from "@/components/WelcomeBlock/Welcome";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/search");
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
