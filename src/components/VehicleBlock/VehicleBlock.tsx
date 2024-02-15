"use client";

import { useMilitaryPath } from "@/hooks/useMilitaryPath";
import SideBar from "../SideBar/SideBar";
import VehicleCards from "../VehicleCards/VehicleCards";
import styles from "./VehicleBlock.module.scss";

export default function VehicleBlock() {
  const isMilitary = useMilitaryPath();
  return (
    <section
      className={`${styles.root} ${isMilitary ? styles.military_root : ""}`}
    >
      <article className={styles.wrapper}>
        <SideBar />
        <VehicleCards />
      </article>
    </section>
  );
}
