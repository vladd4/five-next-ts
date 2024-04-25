"use client";

import styles from "./VehicleCards.module.scss";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { useMilitaryPath } from "@/hooks/useMilitaryPath";
import { fetchCars } from "../../redux/slices/carsSlice";

import VehicleCard from "./VehicleCard";
import CarSkeleton from "../CarSkeleton";

import Sort from "@/../public/Sort.png";
import { setShowFilters } from "@/redux/slices/filtersSlice";
import useClickOutside from "@/hooks/useClickOutside";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function VehicleCards() {
  const isMilitary = useMilitaryPath();
  const { cars, status, totalPage, currentPage } = useAppSelector(
    (state) => state.cars
  );
  const dispatch = useAppDispatch();

  const [showSort, setShowSort] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortRef = useRef(null);

  if (typeof document !== "undefined") {
    useClickOutside(
      sortRef,
      showSort,
      setShowSort,
      document?.getElementById("sort-img")
    );
  }

  const toggleSort = () => {
    if (showSort) {
      setShowSort(false);
    } else {
      setShowSort(true);
    }
  };

  useEffect(() => {
    if (searchParams.get("page")) {
      dispatch(fetchCars(Number(searchParams.get("page"))));
    } else {
      dispatch(fetchCars(1));
    }
  }, []);
  return (
    <section className={styles.root}>
      <article className={styles.wrapper}>
        <div className={styles.top_block}>
          <p>
            Показано {cars && cars.length} оголошень із {cars && cars.length}
          </p>
          <Image
            alt="Sort"
            src={Sort}
            width={60}
            height={60}
            onClick={toggleSort}
            id="sort-img"
          />
          <div
            ref={sortRef}
            className={`${styles.sort_block} ${
              showSort ? styles.show_sort : ""
            }`}
          >
            <p>Дата додавання</p>
            <p>Від дешевих до дорогих</p>
            <p>Від дорогих до дешевих</p>
            <p>Рік випуску, за зростанням</p>
            <p>Рік випуску, за спаданням</p>
            <p>Пробіг, за зростанням</p>
            <p>Пробіг, за спаданням</p>
          </div>
        </div>
        <div className={styles.vehicle_cards}>
          {status === "loading" ? (
            [...new Array(5)].map((_, index) => {
              return <CarSkeleton key={index} />;
            })
          ) : cars && cars.length > 1 ? (
            cars.map((car) => {
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
                  isMilitary={isMilitary}
                />
              );
            })
          ) : (
            <div className={styles.not_found}>Таких авто не знайдено!</div>
          )}
        </div>
        {totalPage && totalPage >= 1 ? (
          <div className={styles.pagination}>
            {Array.from({ length: totalPage }, (_, index) => (
              <div
                key={index}
                className={index + 1 === currentPage ? styles.active_page : ""}
                onClick={() => {
                  router.push(pathname + "?" + `page=${index + 1}`);
                  dispatch(fetchCars(index + 1));
                }}
              >
                {index + 1}
              </div>
            ))}
            <div
              onClick={() => {
                if (currentPage + 1 <= totalPage) {
                  router.push(pathname + "?" + `page=${currentPage + 1}`);
                  dispatch(fetchCars(currentPage + 1));
                }
              }}
              className={styles.more}
            >
              Далі
            </div>
          </div>
        ) : null}
        <button
          className={styles.filter_btn}
          onClick={() => dispatch(setShowFilters(true))}
        >
          Фільтрувати
        </button>
      </article>
    </section>
  );
}
