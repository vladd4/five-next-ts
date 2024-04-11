"use client";

import styles from "./ProfileInfo.module.scss";

import { useState } from "react";

import { useAppDispatch } from "@/hooks/redux-hook";
import Image from "next/image";

import PlusIcon from "@/../public/plus.png";
import EditIcon from "@/../public/edit.png";

import {
  setEditValue,
  setIsEdit,
  setIsTelegram,
  setShowInputAlert,
} from "@/redux/slices/alertSlice";

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

export default function ProfileInfo({ user }: ProfileProps) {
  const dispatch = useAppDispatch();

  const [name] = useState(user.name);
  const [phone] = useState(user.phone);
  const [email] = useState(user.email);
  const [telegram] = useState(user.telegram);

  const handleShowAlert = (isTelegram: boolean) => {
    if (isTelegram) {
      dispatch(setIsTelegram(true));
    } else {
      dispatch(setIsTelegram(false));
    }
    dispatch(setShowInputAlert(true));
  };

  const handleShowEdit = (value: "name" | "phone" | "telegram") => {
    dispatch(setIsEdit(true));
    dispatch(setEditValue(value));
    dispatch(setIsTelegram(false));
    dispatch(setShowInputAlert(true));
  };

  return (
    <section className={styles.root}>
      <article className={styles.wrapper}>
        <div className={styles.form_block}>
          <div className={styles.form_info}>
            <h1>Інформація</h1>
            <div className={styles.info_input}>
              <div className={styles.edit_div}>
                <label className={styles.input_label}>First name</label>
                <Image
                  src={EditIcon}
                  alt="Edit"
                  width={12}
                  height={12}
                  onClick={() => handleShowEdit("name")}
                />
              </div>

              <input placeholder="Name" name="name" value={name} readOnly />
            </div>

            <div className={styles.info_input}>
              <label className={styles.input_label}>Email</label>
              <input placeholder="Email" name="email" readOnly value={email} />
            </div>
          </div>
          <div className={styles.form_social}>
            <h1>Соц. мережі</h1>

            {user && user.phone ? (
              <div className={styles.info_input}>
                <div className={styles.edit_div}>
                  <label className={styles.input_label}>Phone</label>
                  <Image
                    src={EditIcon}
                    alt="Edit"
                    width={12}
                    height={12}
                    onClick={() => handleShowEdit("phone")}
                  />
                </div>

                <input
                  placeholder="Phone"
                  name="phone"
                  readOnly
                  value={phone ? phone : ""}
                />
              </div>
            ) : (
              <div
                className={styles.info_input_add}
                onClick={() => handleShowAlert(false)}
              >
                <Image width={20} height={20} alt="Plus" src={PlusIcon} />
                <p>Додати телефон</p>{" "}
              </div>
            )}
            {user && user.telegram ? (
              <div className={styles.info_input}>
                <div className={styles.edit_div}>
                  <label className={styles.input_label}>Telegram</label>
                  <Image
                    src={EditIcon}
                    alt="Edit"
                    width={12}
                    height={12}
                    onClick={() => handleShowEdit("telegram")}
                  />
                </div>
                <input
                  placeholder="Telegram"
                  readOnly
                  value={telegram ? telegram : ""}
                />
              </div>
            ) : (
              <div
                className={styles.info_input_add}
                onClick={() => handleShowAlert(true)}
              >
                <Image width={20} height={20} alt="Plus" src={PlusIcon} />
                <p>Додати telegram</p>{" "}
              </div>
            )}
          </div>
        </div>
      </article>
    </section>
  );
}
