"use client";

import styles from "./Button.module.scss";

import React from "react";
import Image from "next/image";
import Arrow from "@/../public/up.png";

type ButtonProps = {
  label: string;
  buttonType: "submit" | "button";
};

function Button({ label, buttonType }: ButtonProps) {
  const handleClick = () => {
    console.log("click");
  };

  return (
    <button
      type={buttonType}
      className={styles.main_button}
      onClick={handleClick}
    >
      <Image
        className={styles.button_image}
        alt="Arrow Up"
        width={15}
        height={15}
        src={Arrow}
      />
      {label}
    </button>
  );
}

export default Button;
