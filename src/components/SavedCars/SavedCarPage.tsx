"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import styles from "./SavedCar.module.scss";

import { FC, useEffect } from "react";
import { fetchSavedCars } from "@/redux/slices/savedSlice";
import VehicleCard from "../VehicleCards/VehicleCard";

const SavedCarPage: FC = () => {
  const dispatch = useAppDispatch();

  const { savedCars } = useAppSelector((state) => state.saved);
  const userSlice = useAppSelector((state) => state.user);

  const notify = () => {
    new Notification("Find your vehicle!", {
      body: "Новий автомобіль до вашого збереженого пошуку",
      icon: "https://upload.wikimedia.org/wikipedia/commons/9/91/VW_Passat_B8_Limousine_2.0_TDI_Highline.JPG",
    });
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      if ("Notification" in window) {
        if (Notification.permission === "granted") {
        } else {
          Notification.requestPermission().then((res) => {
            if (res === "granted") {
            } else if (res === "denied") {
              console.log("Notifications denied!");
            } else {
              console.log("Notifications access not provided!");
            }
          });
        }
      } else {
        console.log("Notifications not supported!");
      }
    }
  }, [typeof document]);

  useEffect(() => {
    if (userSlice && userSlice.user) {
      dispatch(fetchSavedCars(userSlice.user.id));
    }

    const interval = setInterval(() => {
      if (userSlice && userSlice.user) {
        dispatch(fetchSavedCars(userSlice.user.id));
        // notify();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch, userSlice]);

  return (
    <section className={styles.root}>
      <article className={styles.wrapper}>
        {savedCars && savedCars.length > 0
          ? savedCars.map((car) => {
              const carName = `${car.brand} ${car.model}`;
              return (
                <VehicleCard
                  key={car.car_id}
                  carImage={car.photo_url}
                  carTitle={carName}
                  website={car.site_photo_url}
                  carPrice={car.price}
                  carFuel={car.fuel}
                  carYear={car.year}
                  carMil={car.mileage}
                  carGear={car.gearbox}
                  carUrl={car.link}
                  isMilitary={false}
                />
              );
            })
          : null}
      </article>
    </section>
  );
};

export default SavedCarPage;
