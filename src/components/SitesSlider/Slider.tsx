"use client";

import styles from "./Slider.module.scss";
import Image from "next/image";

// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

import Mobile from "@/../public/mobile.png";
import Pkw from "@/../public/rkt.png";
import Olx from "@/../public/olx.png";

const website_images = [
  { id: 1, image: Mobile },
  { id: 2, image: Pkw },
  { id: 3, image: Olx },
  { id: 4, image: Mobile },
  { id: 5, image: Pkw },
];

export default function Slider() {
  return (
    <Splide
      options={{
        height: 150,
        type: "loop",
        focus: "center",
        drag: true,
        perPage: 4,
        gap: "5%",
        autoplay: true,
        interval: 2500,
        pagination: true,
        arrows: false,
        breakpoints: {
          800: {
            perPage: 3,
          },
          600: {
            perPage: 2,
          },
        },
      }}
      className={styles.slider}
      id="logo-slider"
    >
      {website_images.map((website) => {
        return (
          <SplideSlide key={website.id} id="slides">
            <div className={styles.slide_div}>
              <Image
                alt={"Website" + website.id}
                src={website.image}
                width={237}
                height={70}
              />
            </div>
          </SplideSlide>
        );
      })}
    </Splide>
  );
}
