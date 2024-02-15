"use client";

import styles from "./ProfileInfo.module.scss";

import { useState } from "react";

import { fetchUser, updateUser } from "@/redux/slices/userSlice";
import { useAppDispatch } from "@/hooks/redux-hook";

type ProfileProps = {
  user: {
    id: number;
    name: string;
    phone: string | null;
    email: string;
    telegram: string | null;
    avatar: string | null;
  };
};

type UpdateUser = {
  userId: number;
  name: string;
  phone?: string;
  email: string;
  telegram?: string;
};

export default function ProfileInfo({ user }: ProfileProps) {
  const dispatch = useAppDispatch();

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [telegram, setTelegram] = useState(user.telegram);

  const handleUpdate = async () => {
    const params: UpdateUser = {
      userId: user.id,
      name,
      email,
    };
    if (phone) {
      params.phone = phone;
    }
    if (telegram) {
      params.telegram = telegram;
    }
    await dispatch(updateUser(params));
    dispatch(fetchUser(user.email));
  };

  const handleResetUpdate = () => {
    dispatch(fetchUser(user.email));
  };
  return (
    <section className={styles.root}>
      <article className={styles.wrapper}>
        <div className={styles.form_block}>
          <div className={styles.form_info}>
            <h1>Інформація</h1>
            <div className={styles.info_input}>
              <label className={styles.input_label}>First name</label>
              <input
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.info_input}>
              <label className={styles.input_label}>Phone</label>
              <input
                placeholder="Phone"
                name="phone"
                value={phone ? phone : ""}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className={styles.info_input}>
              <label className={styles.input_label}>Email</label>
              <input
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.form_social}>
            <h1>Соц. мережі</h1>
            <div className={styles.info_input}>
              <label className={styles.input_label}>Telegram</label>
              <input
                placeholder="Telegram"
                value={telegram ? telegram : ""}
                onChange={(e) => setTelegram(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.button_block}>
          <button onClick={handleUpdate} className={styles.save_button}>
            Зберегти
          </button>
          <button onClick={handleResetUpdate} className={styles.cancel_button}>
            Скасувати
          </button>
        </div>
      </article>
    </section>
  );
}
