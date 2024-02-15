import styles from "./SavedSearch.module.scss";

import Image from "next/image";

import { deleteSaved } from "@/redux/slices/savedSlice";
import { useAppDispatch } from "@/hooks/redux-hook";

import Delete from "@/../public/delete.png";

type SavedCar = {
  savedCar: {
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
  };
};

export default function SavedCar({ savedCar }: SavedCar) {
  const dispatch = useAppDispatch();
  const handleDelete = (carId: number) => {
    dispatch(deleteSaved(carId));
  };
  return (
    <div className={styles.values}>
      <Image
        width={18}
        height={18}
        alt="Delete icon"
        src={Delete}
        onClick={() => {
          handleDelete(savedCar.id);
        }}
      />
      <p>{savedCar.brand}</p>
      <p>{savedCar.model}</p>
      <p>{savedCar.gearbox}</p>
      <p>{savedCar.state}</p>
      <p>{savedCar.fuel}</p>
      <p>{savedCar.type}</p>
      <div>
        <p>{savedCar.min_year} - </p>
        <p> {savedCar.max_year}</p>
      </div>
      <div>
        <p>{savedCar.min_price} - </p>
        <p> {savedCar.max_price}$</p>
      </div>
      <p>{savedCar.telegram === 1 ? "Yes" : "No"}</p>
    </div>
  );
}
