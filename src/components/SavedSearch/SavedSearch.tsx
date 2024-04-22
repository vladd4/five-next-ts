import styles from "./SavedSearch.module.scss";

import SavedCar from "./SavedCar";
import SavedSkeleton from "../SavedSkeleton";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import Button from "../ui/Buttons/Button";
import { deleteSaved, resetSelected } from "@/redux/slices/savedSlice";
import { setShowConfirmAlert } from "@/redux/slices/alertSlice";

const headings = [
  "",
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

export default function SavedSearch() {
  const savedSlice = useAppSelector((state) => state.saved);
  const dispatch = useAppDispatch();

  return (
    <article className={styles.root}>
      <h1>Збережені пошуки</h1>
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {headings.map((heading) => (
                <th key={heading}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {savedSlice.saved && savedSlice.saved.length !== 0 ? (
              savedSlice.saved.map((save) => (
                <SavedCar key={save.id} save={save} />
              ))
            ) : savedSlice.status === "loading" ? (
              <tr>
                <td colSpan={headings.length}>
                  <SavedSkeleton />
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={headings.length}>
                  У вас поки немає збережених авто.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div
          className={`${styles.all_buttons} ${
            savedSlice.selectedSave && savedSlice.selectedSave.length >= 1
              ? styles.show_buttons
              : ""
          } `}
        >
          <Button
            label="Скасувати"
            buttonType="button"
            withoutArrow
            eventHandler={() => dispatch(resetSelected())}
          />
          <Button
            label="Видалити"
            buttonType="button"
            withoutArrow
            eventHandler={() => dispatch(setShowConfirmAlert(true))}
          />
        </div>
      </div>
    </article>
  );
}
