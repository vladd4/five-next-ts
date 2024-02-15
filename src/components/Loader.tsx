import Image from "next/image";

import Logo from "@/../public/logo.png";

export default function Loader() {
  return (
    <div className="loader">
      <Image alt="Loader" src={Logo} width={160} height={112} />
    </div>
  );
}
