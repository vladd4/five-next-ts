"use client";

import styles from "./Header.module.scss";

import Image from "next/image";

import { useState } from "react";

import { useMilitaryPath } from "@/hooks/useMilitaryPath";

import Logo from "@/../public/logo.png";
import Message from "@/../public/message.png";
import User from "@/../public/user.png";

import UserPopup from "./UserPopup";

export default function Header() {
  const [showPopup, setShowPopup] = useState(false);

  const isMilitary = useMilitaryPath();

  const handleShowPopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <header
      className={`${styles.root} ${isMilitary ? styles.military_root : ""}`}
    >
      <article className={styles.wrapper}>
        <Image
          alt="FiVe"
          src={Logo}
          className={styles.logo}
          width={160}
          height={112}
          priority
        />
        <div className={styles.icons_block}>
          <Image alt="Message" src={Message} width={33} height={30} />
          <Image
            alt="User"
            src={User}
            width={33}
            height={33}
            onClick={handleShowPopup}
          />
          <UserPopup showPopup={showPopup} />
        </div>
      </article>
    </header>
  );
}
