import styles from "./ProfileSide.module.scss";

import Image from "next/image";
import Link from "next/link";

import Profile from "@/../public/profile.png";

type ProfileProps = {
  user: {
    name: string;
    phone: string | null;
    email: string;
    telegram: string | null;
    avatar: string | null;
  };
};

export default function ProfileSide({ user }: ProfileProps) {
  return (
    <aside className={styles.root}>
      <article className={styles.wrapper}>
        <Image
          width={300}
          height={300}
          src={user?.avatar ? user?.avatar : Profile}
          alt="Profile user"
        />

        <h2>{user ? user.name : "Loading..."}</h2>
        <p>{user ? user.email : "Loading..."}</p>

        <Link href="/search">Повернутись на головну</Link>
      </article>
    </aside>
  );
}
