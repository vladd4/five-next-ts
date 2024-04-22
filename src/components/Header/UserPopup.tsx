"use client";

import styles from "./UserPopup.module.scss";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useRef } from "react";

import { fetchUser } from "@/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";

import { useMilitaryPath } from "@/hooks/useMilitaryPath";

import { signOut, useSession } from "next-auth/react";

import Profile from "@/../public/profile.png";
import useClickOutside from "@/hooks/useClickOutside";

type UserPopup = {
  showPopup: boolean;
  setShowPopup: (arg: boolean) => void;
};

export default function UserPopup({ showPopup, setShowPopup }: UserPopup) {
  const isMilitary = useMilitaryPath();
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const { user } = useAppSelector((state) => state.user);

  const popupRef = useRef(null);

  if (typeof document !== "undefined") {
    useClickOutside(
      popupRef,
      showPopup,
      setShowPopup,
      document?.getElementById("userPopup")
    );
  }

  useEffect(() => {
    if (session) {
      dispatch(fetchUser(session.user?.email as string));
    }
  }, [dispatch, session]);
  return (
    <article
      ref={popupRef}
      className={`${styles.root} ${showPopup ? styles.show_popup : ""} ${
        isMilitary ? styles.military_root : ""
      }`}
    >
      <article className={styles.wrapper}>
        {user && (
          <div className={styles.user_logo_block}>
            <Image
              alt="User"
              src={user.avatar ? user.avatar : Profile}
              width={300}
              height={300}
              className={styles.user_avatar}
            />
            <h3>{user.name}</h3>
          </div>
        )}
        <Link href="/search/military" className={styles.military_button}>
          Для військових
        </Link>

        <p>Збережені</p>
        <Link href="/profile">Налаштування</Link>
        <p className={styles.exit_button} onClick={() => signOut()}>
          Вийти
        </p>
      </article>
    </article>
  );
}
