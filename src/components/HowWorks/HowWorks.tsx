import styles from "./HowWorks.module.scss";

import Image from "next/image";

import Comp from "@/../public/one-man-using-pc 1.png";

import Button from "../ui/Buttons/Button";

import { work_steps } from "@/static_store/working_steps";

export default function HowWorks() {
  return (
    <section className={styles.root}>
      <article className={styles.wrapper}>
        <h5>як це працює</h5>
        <div className={styles.steps_block}>
          {work_steps.map((step) => {
            return (
              <div key={step.id} className={styles.step_div}>
                <p>{step.title}</p>
                <div
                  className={`${styles.circle} ${
                    step.id === 1 ? styles.active_circle : ""
                  }`}
                ></div>
              </div>
            );
          })}
          <div className={styles.line}></div>
        </div>
        <div className={styles.text_block}>
          <div className={styles.text}>
            <h5>Логін</h5>
            <p>
              Відкрийте головну сторінку сайту та використовуйте свої облікові
              дані, щоб увійти в систему та отримати повний доступ до особистого
              кабінету.
            </p>
            <Button label="Дізнатись більше" buttonType="button" />
          </div>
          <Image alt="Login step" src={Comp} width={1123} height={750} />
        </div>
      </article>
    </section>
  );
}
