"use client";

import styles from "./Slider.module.scss";

import Image from "next/image";

// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

// @ts-ignore
import ReactHtmlParser from "react-html-parser";

import Car from "@/../public/porsche-main-image.png";
import Tg from "@/../public/telegram-icon.png";

const slider_information = [
  {
    id: 1,
    title: "хочеш бачити <b>свіжі</b> пропозиції?",
    paragraph: "Тоді оформляй підписку та отримуй пропозиції в Телеграм.",
  },
  {
    id: 2,
    title: "хочеш бачити <b>свіжі</b> пропозиції?",
    paragraph: "Тоді оформляй підписку та отримуй пропозиції в Телеграм.",
  },
  {
    id: 3,
    title: "хочеш бачити <b>свіжі</b> пропозиції?",
    paragraph: "Тоді оформляй підписку та отримуй пропозиції в Телеграм.",
  },
];

export default function Slider() {
  return (
    <Splide
      options={{
        height: "100%",
        width: "100%",
        type: "loop",
        focus: "center",
        drag: true,
        perPage: 1,
        arrows: false,
        pagination: true,
      }}
      className={styles.root}
    >
      {slider_information.map((slide) => {
        return (
          <SplideSlide id="slide" key={slide.id}>
            <article className={styles.article}>
              <div className={styles.text_block}>
                <h3>{ReactHtmlParser(slide.title)}</h3>
                <p>
                  {slide.paragraph}
                  <Image alt="Telegram" src={Tg} width={128} height={70} />
                </p>
              </div>
              <Image alt="Porsche" src={Car} width={310} height={120} />
            </article>
          </SplideSlide>
        );
      })}
    </Splide>
  );
}
