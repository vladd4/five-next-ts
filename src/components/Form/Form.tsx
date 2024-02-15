"use client";

import styles from "./Form.module.scss";

import { useForm, SubmitHandler } from "react-hook-form";

import Button from "../ui/Buttons/Button";

type FormValues = {
  fullName: string;
  email: string;
  userMessage: string;
};

export default function Form() {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {};
  return (
    <section className={styles.root}>
      <article className={styles.wrapper}>
        <h5>форма зв'язку</h5>
        <div className={styles.form_block}>
          <p>
            Якщо у вас виникли запитання, заповніть <b>форму</b> і ми
            обов’язково зв'яжемося з вами найближчим часом.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.first_row}>
              <div className={styles.name_input_div}>
                <input
                  required
                  autoComplete="off"
                  id="fullName"
                  placeholder=""
                  type="text"
                  {...register("fullName", { required: true })}
                />
                <label htmlFor="fullName">Ваше ім'я</label>
              </div>
              <div className={styles.mail_input_div}>
                <input
                  required
                  autoComplete="off"
                  id="email"
                  placeholder=""
                  type="text"
                  {...register("email", { required: true })}
                />
                <label htmlFor="email">Електронна пошта</label>
              </div>
            </div>
            <div className={styles.textarea_div}>
              <textarea
                required
                autoComplete="off"
                className={styles.texarea}
                placeholder=""
                id="userMessage"
                {...register("userMessage", { required: true })}
              />
              <label htmlFor="userMessage">Повідомлення</label>
            </div>
            <Button label="Відправити" buttonType="submit" />
          </form>
        </div>
      </article>
    </section>
  );
}
