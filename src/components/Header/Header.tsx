"use client";

import styles from "./Header.module.scss";

import Image from "next/image";

import { useState } from "react";

import { useMilitaryPath } from "@/hooks/useMilitaryPath";

import Logo from "@/../public/logo.png";
import Message from "@/../public/message.png";
import User from "@/../public/user.png";

import UserPopup from "./UserPopup";
import Link from "next/link";
import { fetchCars } from "@/redux/slices/carsSlice";
import { useAppDispatch } from "@/hooks/redux-hook";

export default function Header() {
  const [showPopup, setShowPopup] = useState(false);

  const isMilitary = useMilitaryPath();

  const dispatch = useAppDispatch();

  const handleShowPopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <header
      className={`${styles.root} ${isMilitary ? styles.military_root : ""}`}
    >
      <article className={styles.wrapper}>
        <Link href="/search" onClick={() => dispatch(fetchCars(1))}>
          <Image
            alt="FiVe"
            src={Logo}
            className={styles.logo}
            width={160}
            height={112}
            priority
          />
        </Link>
        <div className={styles.icons_block}>
          <Link href="/saved">
            <Image alt="Message" src={Message} width={33} height={30} />
          </Link>
          <Image
            alt="User"
            src={User}
            width={33}
            height={33}
            onClick={handleShowPopup}
            id="userPopup"
          />
          <UserPopup showPopup={showPopup} setShowPopup={setShowPopup} />
        </div>
      </article>
    </header>
  );
}
