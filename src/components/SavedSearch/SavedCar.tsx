import styles from "./SavedSearch.module.scss";

import Image from "next/image";

import {
  setEditSaved,
  setSelected,
  updateSavedTelegram,
} from "@/redux/slices/savedSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";

import Delete from "@/../public/delete-icon.png";
import Edit from "@/../public/Subtract.png";

import { useEffect, useState } from "react";
import {
  setDeletedId,
  setShowConfirmAlert,
  setShowEditSaved,
} from "@/redux/slices/alertSlice";

type SavedCar = {
  save: {
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
    min_price: string | null;
    max_price: string | null;
  };
};

export default function SavedCar({ save }: SavedCar) {
  const dispatch = useAppDispatch();

  const { selectedSave } = useAppSelector((state) => state.saved);
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = (id: number) => {
    setIsToggled(!isToggled);
    if (isToggled) {
      dispatch(updateSavedTelegram({ savedID: id, params: { telegram: 0 } }));
    } else {
      dispatch(updateSavedTelegram({ savedID: id, params: { telegram: 1 } }));
    }
  };
  const handleCheck = (id: number) => {
    dispatch(setSelected(id));
  };

  useEffect(() => {
    if (save) {
      setIsToggled(Boolean(save.telegram));
    }
  }, [save]);
  return (
    <tr
      key={save.id}
      className={`${selectedSave.includes(save.id) ? styles.selected : ""}`}
    >
      <td className={styles.telegram_2}>
        <div className={styles.controls}>
          <div
            className={styles.checkbox_input}
            onClick={() => handleCheck(save.id)}
          >
            <span
              className={selectedSave.includes(save.id) ? styles.ticked : ""}
            >
              &#x2713;
            </span>
          </div>
          <Image
            width={18}
            height={18}
            alt="Edit icon"
            src={Edit}
            className={styles.delete}
            onClick={() => {
              dispatch(setShowEditSaved(true));
              dispatch(setEditSaved(save));
            }}
          />
          <Image
            width={18}
            height={18}
            alt="Delete icon"
            src={Delete}
            className={styles.delete}
            onClick={() => {
              dispatch(setShowConfirmAlert(true));
              dispatch(setDeletedId(save.id));
            }}
          />
        </div>
      </td>

      <td>{save.brand}</td>
      <td>{save.model}</td>
      <td>{save.gearbox}</td>
      <td>{save.state}</td>
      <td>{save.fuel}</td>
      <td>{save.type}</td>
      <td>{save.min_year ? `${save.min_year} - ${save.max_year}` : ""}</td>
      <td>{save.max_price ? `${save.min_price}$ - ${save.max_price}$` : ""}</td>
      <td className={styles.telegram}>
        <div
          className={`${styles.checkbox_div} ${
            !isToggled ? styles.not_checked : ""
          }`}
          onClick={() => handleToggle(save.id)}
        >
          <div
            className={`${styles.circle} ${
              !isToggled ? styles.circle_off : ""
            }`}
          />
        </div>
      </td>
    </tr>
  );
}
