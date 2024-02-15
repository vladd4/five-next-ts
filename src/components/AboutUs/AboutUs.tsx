import styles from "./AboutUs.module.scss";

import Image from "next/image";

import Comp from "@/../public/one-man-using-pc 1.png";

import Button from "../ui/Buttons/Button";

export default function AboutUs() {
  return (
    <section className={styles.root}>
      <article className={styles.wrapper}>
        <div className={styles.text_block}>
          <Image alt="Login step" src={Comp} width={1123} height={750} />
          <div className={styles.text}>
            <h5>Хто ми?</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Button label="Дізнатись більше" buttonType="button" />
          </div>
        </div>
      </article>
      <div className={styles.line_div}></div>
    </section>
  );
}
