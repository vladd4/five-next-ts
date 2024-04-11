"use client";

import styles from "./Button.module.scss";

import React from "react";
import Image from "next/image";
import Arrow from "@/../public/up.png";

type ButtonProps = {
  label: string;
  buttonType: "submit" | "button";
  withoutArrow?: boolean;
  eventHandler?: () => void;
};

function Button({
  label,
  buttonType,
  withoutArrow,
  eventHandler,
}: ButtonProps) {
  return (
    <button
      type={buttonType}
      className={styles.main_button}
      onClick={eventHandler}
    >
      {withoutArrow ? null : (
        <Image
          className={styles.button_image}
          alt="Arrow Up"
          width={15}
          height={15}
          src={Arrow}
        />
      )}
      {label}
    </button>
  );
}

export default Button;
