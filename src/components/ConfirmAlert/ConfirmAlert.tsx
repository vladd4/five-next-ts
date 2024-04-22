"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import styles from "./Alert.module.scss";

import { FC } from "react";
import { setShowConfirmAlert } from "@/redux/slices/alertSlice";
import { deleteSaved, resetSelected } from "@/redux/slices/savedSlice";

const ConfirmAlert: FC = () => {
  const dispatch = useAppDispatch();
  const { showConfirmAlert, deletedId } = useAppSelector(
    (state) => state.alert
  );
  const savedSlice = useAppSelector((state) => state.saved);

  const handleClose = () => {
    dispatch(setShowConfirmAlert(false));
  };

  const handleDeleteSelected = () => {
    if (deletedId === null) {
      if (savedSlice.selectedSave && savedSlice.selectedSave.length >= 1) {
        savedSlice.selectedSave.forEach((item) => {
          dispatch(deleteSaved(item));
        });
        dispatch(resetSelected());
      }
    } else {
      dispatch(deleteSaved(deletedId));
    }
    handleClose();
  };

  return (
    <article
      className={`${styles.root} ${showConfirmAlert ? styles.show_root : ""}`}
    >
      <article className={styles.wrapper}>
        <h5>Ви точно бажаєте видалити?</h5>
        <div className={styles.btn_block}>
          <button onClick={handleClose}>Скасувати</button>
          <button onClick={handleDeleteSelected}>Видалити</button>
        </div>
      </article>
    </article>
  );
};

export default ConfirmAlert;
