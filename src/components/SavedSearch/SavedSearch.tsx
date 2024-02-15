import styles from "./SavedSearch.module.scss";

import SavedCar from "./SavedCar";
import SavedSkeleton from "../SavedSkeleton";

const headings = [
  "Марка",
  "Модель",
  "Коробка",
  "Стан",
  "Паливо",
  "Тип кузову",
  "Рік",
  "Ціна",
  "Telegram",
];

type SavedProps = {
  saved: {
    id: number;
    brand: string | null;
    model: string | null;
    gearbox: string | null;
    fuel: string | null;
    type: string | null;
    state: string | null;
    telegram: number;
    min_year: string | null;
    max_year: string | null;
    min_mileage: string | null;
    max_mileage: string | null;
    min_power: string | null;
    max_power: string | null;
    min_price: string | null;
    max_price: string | null;
  }[];
};

export default function SavedSearch({ saved }: SavedProps) {
  return (
    <article className={styles.root}>
      <article className={styles.wrapper}>
        <div className={styles.heading}>
          {headings.map((heading) => {
            return <h3 key={heading}>{heading}</h3>;
          })}
        </div>
        {saved && saved.length !== 0 ? (
          saved.map((save) => {
            return <SavedCar key={save.id} savedCar={save} />;
          })
        ) : (
          <SavedSkeleton />
        )}
      </article>
    </article>
  );
}
