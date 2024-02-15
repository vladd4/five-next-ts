import Slider from "./Slider";
import styles from "./Slider.module.scss";

export default function Sites() {
  return (
    <section className={styles.root}>
      <article className={styles.wrapper}>
        <h5>САЙТИ, ЯКІ ВИКОРИСТОВУються</h5>
        <Slider />
      </article>
    </section>
  );
}
