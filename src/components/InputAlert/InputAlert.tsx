"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import Button from "../ui/Buttons/Button";
import styles from "./Alert.module.scss";

import { FC, useEffect, useState } from "react";
import { setIsTelegram, setShowInputAlert } from "@/redux/slices/alertSlice";
import { fetchUser, updateUser } from "@/redux/slices/userSlice";

type UpdateUser = {
  userId: number;
  name: string;
  phone?: string;
  telegram?: string;
};

const InputAlert: FC = () => {
  const dispatch = useAppDispatch();
  const alertSlice = useAppSelector((state) => state.alert);
  const { user } = useAppSelector((state) => state.user);

  const [name, setName] = useState(user ? user.name : "");
  const [phone, setPhone] = useState(user ? user.phone : "");
  const [telegram, setTelegram] = useState(user ? user.telegram : "");

  const handleClose = () => {
    dispatch(setShowInputAlert(false));
    if (user) {
      setName(user ? user.name : "");
      setPhone(user ? user.phone : "");
      setTelegram(user ? user.telegram : "");
    }
  };

  const handleUpdate = async () => {
    if (user) {
      const params: UpdateUser = {
        userId: user.id,
        name,
      };
      if (phone) {
        params.phone = phone;
      }
      if (telegram) {
        params.telegram = telegram;
      }
      await dispatch(updateUser(params));
      dispatch(fetchUser(user.email));
      handleClose();
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone);
      setTelegram(user.telegram);
    }
  }, [user]);

  return (
    <section
      className={`${styles.root} ${
        alertSlice.showInputAlert ? styles.show_alert : ""
      }`}
    >
      <article className={styles.wrapper}>
        {alertSlice.isEdit ? (
          <h5>
            Редагувати{" "}
            {alertSlice.editValue === "name"
              ? "ім'я"
              : alertSlice.editValue === "phone"
              ? "телефон"
              : "telegram"}
          </h5>
        ) : alertSlice.isTelegram ? (
          <h5>Додати telegram</h5>
        ) : (
          <h5>Додати телефон</h5>
        )}

        <form>
          <input
            type="text"
            placeholder={
              alertSlice.isTelegram ? "Введіть telegram" : "Введіть телефон"
            }
            value={
              alertSlice.isEdit
                ? alertSlice.editValue === "name"
                  ? name!
                  : alertSlice.editValue === "phone"
                  ? phone!
                  : alertSlice.editValue === "telegram"
                  ? telegram!
                  : alertSlice.isTelegram
                  ? telegram!
                  : phone!
                : alertSlice.isTelegram && !alertSlice.isEdit
                ? telegram!
                : phone!
            }
            onChange={
              alertSlice.isEdit
                ? alertSlice.editValue === "name"
                  ? (e) => setName(e.target.value)
                  : alertSlice.editValue === "phone"
                  ? (e) => setPhone(e.target.value)
                  : alertSlice.editValue === "telegram"
                  ? (e) => setTelegram(e.target.value)
                  : alertSlice.isTelegram
                  ? (e) => setTelegram(e.target.value)
                  : (e) => setPhone(e.target.value)
                : alertSlice.isTelegram && !alertSlice.isEdit
                ? (e) => setTelegram(e.target.value)
                : (e) => setPhone(e.target.value)
            }
          />
          <div>
            <Button
              buttonType="button"
              label="Скасувати"
              withoutArrow
              eventHandler={handleClose}
            />
            <Button
              buttonType="button"
              label="Зберегти"
              withoutArrow
              eventHandler={handleUpdate}
            />
          </div>
        </form>
      </article>
    </section>
  );
};

export default InputAlert;
