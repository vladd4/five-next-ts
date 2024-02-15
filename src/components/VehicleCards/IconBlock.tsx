import styles from "./VehicleCard.module.scss";

import Image, { StaticImageData } from "next/image";

type IconBlockProps = {
  imageAlt: string;
  imageSrc: StaticImageData;
  value: string;
  additionalString?: string;
};

export default function IconBlock({
  imageAlt,
  imageSrc,
  value,
  additionalString,
}: IconBlockProps) {
  return (
    <div className={styles.icon_div}>
      <Image alt={imageAlt} src={imageSrc} width={23} height={16} />
      <p>
        {value} {additionalString}
      </p>
    </div>
  );
}
