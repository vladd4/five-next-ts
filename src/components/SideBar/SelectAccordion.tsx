"use client";

import styles from "./SideBar.module.scss";

import Image from "next/image";

import Plus from "@/../public/plus.png";

type OptionType = {
  from: string;
  to: string;
};

type AccordionProps = {
  isOpen: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  onChangeFrom: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: OptionType;
  label: string;
};

export default function SelectAccordion({
  isOpen,
  onClick,
  onChangeFrom,
  onChangeTo,
  options,
  label,
}: AccordionProps) {
  return (
    <div className={styles.accordion}>
      <div className={styles.accordionItem}>
        <div className={styles.accordionHeader} onClick={onClick}>
          {label}
          <Image alt="Plus" src={Plus} width={17} height={18} />
        </div>
        {isOpen && (
          <div className={styles.accordionContent}>
            <input
              type="text"
              id="minPower"
              placeholder="Від"
              value={options.from}
              onChange={onChangeFrom}
            />
            <input
              type="text"
              id="maxPower"
              placeholder="До"
              value={options.to}
              onChange={onChangeTo}
            />
          </div>
        )}
      </div>
    </div>
  );
}
