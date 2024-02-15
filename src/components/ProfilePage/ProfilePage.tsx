"use client";

import styles from "./ProfilePage.module.scss";

import { useEffect } from "react";

import { fetchUser } from "@/redux/slices/userSlice";
import { fetchSaved } from "@/redux/slices/savedSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";

import { useSession } from "next-auth/react";

import ProfileInfo from "../ProfileInfo/ProfileInfo";
import ProfileSide from "../ProfileSide/ProfileSide";
import SavedSearch from "../SavedSearch/SavedSearch";
import ProfileSkeleton from "../ProfileSkeleton";

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.user);
  const { saved } = useAppSelector((state) => state.saved);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    if (user !== null) {
      dispatch(fetchSaved(user.id));
    } else {
      if (session) {
        dispatch(fetchUser(session?.user?.email as string));
      }
    }
  }, [session]);
  return (
    <section className={styles.root}>
      {user && <ProfileSide user={user} />}
      <article className={styles.dynamic_block}>
        {user ? <ProfileInfo user={user} /> : <ProfileSkeleton />}
        <SavedSearch saved={saved} />
      </article>
    </section>
  );
}
