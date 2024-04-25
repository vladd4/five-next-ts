"use client";

import styles from "./Welcome.module.scss";
import Image from "next/image";

import { signIn } from "next-auth/react";

import Google from "@/../public/google.png";
import Porsh from "@/../public/prosche.png";

export default function WelcomeBlock() {
  const handleLogin = async () => {
    try {
      const response = await signIn("google", {
        redirect: false,
        callbackUrl: "/search",
      });
      if (response && !response.status) {
        alert("Щось пішло не так! Спробуйте пізніше.");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      alert("Щось пішло не так! Спробуйте пізніше.");
    }
  };

  return (
    <section className={styles.root}>
      <article className={styles.wrapper}>
        <div className={styles.text_block}>
          <h1>
            find your own <b>vehicle</b>
          </h1>
          <p>
            Наш сервіс надає вам можливість зручного пошуку автомобілів на
            різних європейських веб-сайтах продажу автомобілів. Ми спростимо
            процес пошуку та порівняння доступних автомобілів, щоб ви могли
            знайти те, що вам потрібно.
          </p>
          <button onClick={handleLogin}>
            <Image alt="Google icon" width={40} height={40} src={Google} />
            Login via Google
          </button>
        </div>
      </article>
      <Image
        className={styles.car}
        alt="Main Image"
        src={Porsh}
        width={3500}
        height={900}
      />
      <div className={styles.line_div}></div>
    </section>
  );
}
