import styles from "./VehicleCard.module.scss";

import IconBlock from "./IconBlock";

import { car_icons } from "@/static_store/vehicle_block_icons";

type VehicleCardProps = {
  carImage: string;
  carTitle: string;
  carMil: string;
  carYear: string;
  carFuel: string;
  carGear: string;
  carPrice: string;
  website: string;
  carUrl: string;
  isMilitary: boolean;
};

export default function VehicleCard(props: VehicleCardProps) {
  return (
    <a
      target="_black"
      rel="noreferrer"
      href={props.carUrl}
      className={`${styles.root} ${
        props.isMilitary ? styles.military_root : ""
      }`}
    >
      <article className={styles.wrapper}>
        <div className={styles.car_block}>
          <div
            style={{ backgroundImage: `url(${props.carImage})` }}
            className={styles.car_image}
          />
          <div className={styles.car_info}>
            <h3>{props.carTitle}</h3>
            <div className={styles.car_info_icons}>
              {car_icons.map((icon) => {
                return (
                  <IconBlock
                    key={icon.alt}
                    imageAlt={icon.alt}
                    imageSrc={icon.icon}
                    value={(props as any)[icon.propName]}
                    additionalString={icon.additionalString}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.website_info}>
          <p>Website:</p>
          <div
            style={{ backgroundImage: `url(${props.website})` }}
            className={styles.website_img}
          />
          <p>Price: {props.carPrice} $</p>
        </div>
      </article>
      <article className={styles.wrapper_mobile}>
        <div
          style={{ backgroundImage: `url(${props.carImage})` }}
          className={styles.car_image}
        />
        <div className={styles.car_block}>
          <div className={styles.car_info}>
            <h3>{props.carTitle}</h3>
            <div className={styles.car_info_icons}>
              {car_icons.map((icon) => {
                return (
                  <IconBlock
                    key={icon.alt}
                    imageAlt={icon.alt}
                    imageSrc={icon.icon}
                    value={(props as any)[icon.propName]}
                    additionalString={icon.additionalString}
                  />
                );
              })}
            </div>
          </div>
          <div className={styles.website_info}>
            <p>Website:</p>
            <div
              style={{ backgroundImage: `url(${props.website})` }}
              className={styles.website_img}
            />
            <p>Price: {props.carPrice} $</p>
          </div>
        </div>
      </article>
    </a>
  );
}
