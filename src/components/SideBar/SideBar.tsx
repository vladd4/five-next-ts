"use client";

import styles from "./SideBar.module.scss";

import Image from "next/image";

import { useEffect, useState } from "react";

import { useMilitaryPath } from "@/hooks/useMilitaryPath";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import {
  fetchBrands,
  fetchFuel,
  fetchGear,
  fetchModels,
  fetchState,
  fetchType,
  setShowFilters,
} from "../../redux/slices/filtersSlice";
import { addToSaved } from "@/redux/slices/savedSlice";
import { setShowAlert } from "@/redux/slices/alertSlice";
import { fetchCars, fetchFilterCars } from "../../redux/slices/carsSlice";

import Search from "@/../public/search.png";
import Sub from "@/../public/sub_icon.png";

import SelectInput from "./SelectInput";
import SelectAccordion from "./SelectAccordion";

type Filters = {
  brand?: string;
  model?: string;
  gearbox?: string;
  state?: string;
  year?: {
    from: string;
    to: string;
  };
  fuel?: string;
  type?: string;
  price?: {
    from: string;
    to: string;
  };
  power?: {
    from: string;
    to: string;
  };
};

type SavedItem = {
  client_id: number;
  brand_id?: number;
  model_id?: number;
  min_price?: string;
  max_price?: string;
  fuel_id?: number;
  type_id?: number;
  min_year?: string;
  max_year?: string;
  gearbox_id?: number;
  state_id?: number;
  telegram: boolean;
};

type MultiState = {
  from: string;
  to: string;
};
export default function SideBar() {
  const isMilitary = useMilitaryPath();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const [brand, setBrand] = useState("brand");
  const [fuel, setFuel] = useState("fuel");
  const [type, setType] = useState("type");
  const [model, setModel] = useState("model");
  const [gearbox, setGear] = useState("gear");
  const [state, setState] = useState("state");
  const [year, setYear] = useState({
    from: "",
    to: "",
  });
  const [price, setPrice] = useState({
    from: "",
    to: "",
  });
  const [power, setPower] = useState({
    from: "",
    to: "",
  });
  const handleChange = (
    setChanged: React.Dispatch<React.SetStateAction<MultiState>>,
    input: keyof MultiState,
    value: string
  ) => {
    setChanged((prevValue) => ({
      ...prevValue,
      [input]: value,
    }));
  };
  const brandOptions = useAppSelector((state) => state.filters.brands);
  const modelOptions = useAppSelector((state) => state.filters.models);
  const fuelOptions = useAppSelector((state) => state.filters.fuel);
  const typeOptions = useAppSelector((state) => state.filters.type);
  const gearOptions = useAppSelector((state) => state.filters.gear);
  const stateOptions = useAppSelector((state) => state.filters.state);

  const showFilters = useAppSelector((state) => state.filters.showFilters);

  const filterCars = () => {
    const filters: Filters = {};
    if (brand !== "brand") {
      filters.brand = brand;
    }
    if (model !== "model") {
      filters.model = model;
    }
    if (gearbox !== "gear") {
      filters.gearbox = gearbox;
    }
    if (fuel !== "fuel") {
      filters.fuel = fuel;
    }
    if (type !== "type") {
      filters.type = type;
    }
    if (state !== "state") {
      filters.state = state;
    }
    if (year.from !== "" && year.to !== "") {
      filters.year = {
        from: year.from,
        to: year.to,
      };
    }
    if (price.from !== "" && price.to !== "") {
      filters.price = {
        from: price.from,
        to: price.to,
      };
    }
    if (power.from !== "" && power.to !== "") {
      filters.power = {
        from: power.from,
        to: power.to,
      };
    }
    dispatch(fetchFilterCars(filters));
    dispatch(setShowFilters(false));
  };
  const [isPowerOpen, setPowerOpen] = useState(false);
  const [isYearOpen, setYearOpen] = useState(false);
  const [isPriceOpen, setPriceOpen] = useState(false);

  const togglerAccordion = (
    setStateOpen: (state: boolean) => void,
    stateOpen: boolean
  ) => {
    setStateOpen(!stateOpen);
  };
  const clearFilter = () => {
    dispatch(setShowFilters(false));
    dispatch(fetchCars(1));
    setBrand("brand");
    setFuel("fuel");
    setType("type");
    setModel("model");
    setGear("gear");
    setState("state");
    setPrice({
      from: "",
      to: "",
    });
    setYear({
      from: "",
      to: "",
    });
    setPower({
      from: "",
      to: "",
    });
  };
  const addToFavourites = () => {
    const selectedBrand = brandOptions.find((option) => option.value === brand);
    const selectedModel = modelOptions.find((option) => option.value === model);
    const selectedFuel = fuelOptions.find((option) => option.value === fuel);
    const selectedType = typeOptions.find((option) => option.value === type);
    const selectedGear = gearOptions.find((option) => option.value === gearbox);
    const selectedState = stateOptions.find((option) => option.value === state);

    if (user) {
      const params: SavedItem = {
        client_id: user?.id,
        telegram: Boolean(1),
      };

      if (year) {
        params.min_year = year.from;
        params.max_year = year.to;
      }
      if (price) {
        params.min_price = price.from;
        params.max_price = price.to;
      }
      if (selectedBrand) {
        params.brand_id = selectedBrand.id;
      }
      if (selectedModel) {
        params.model_id = selectedModel.id;
      }
      if (selectedFuel) {
        params.fuel_id = selectedFuel.id;
      }
      if (selectedType) {
        params.type_id = selectedType.id;
      }
      if (selectedGear) {
        params.gearbox_id = selectedGear.id;
      }
      if (selectedState) {
        params.state_id = selectedState.id;
      }
      dispatch(addToSaved(params));
      dispatch(setShowAlert(true));
      dispatch(setShowFilters(false));
    }
  };
  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchGear());
    dispatch(fetchFuel());
    dispatch(fetchState());
    dispatch(fetchType());
  }, []);
  return (
    <aside
      className={`${styles.root} ${isMilitary ? styles.military_root : ""} ${
        showFilters ? styles.show_filters : ""
      }`}
    >
      <article className={styles.wrapper}>
        {!isMilitary ? (
          <div className={styles.accordions}>
            <SelectInput
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
                dispatch(fetchModels(e.target.value));
              }}
              options={brandOptions}
              defaultValue="brand"
              label="Марка"
            />
            <SelectInput
              value={model}
              onChange={(e) => setModel(e.target.value)}
              options={modelOptions}
              defaultValue="model"
              label="Модель"
              selectedBrand={brand}
            />
            <SelectInput
              value={gearbox}
              onChange={(e) => setGear(e.target.value)}
              options={gearOptions}
              defaultValue="gear"
              label="Коробка передач"
            />
            <SelectInput
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
              options={fuelOptions}
              defaultValue="fuel"
              label="Паливо"
            />
            <SelectInput
              value={type}
              onChange={(e) => setType(e.target.value)}
              options={typeOptions}
              defaultValue="type"
              label="Тип кузову"
            />
            <SelectInput
              value={state}
              onChange={(e) => setState(e.target.value)}
              options={stateOptions}
              defaultValue="state"
              label="Стан"
            />
            <SelectAccordion
              isOpen={isPowerOpen}
              onClick={() => togglerAccordion(setPowerOpen, isPowerOpen)}
              onChangeFrom={(e) =>
                handleChange(setPower, "from", e.target.value)
              }
              onChangeTo={(e) => handleChange(setPower, "to", e.target.value)}
              options={power}
              label="Потужність"
            />
            <SelectAccordion
              isOpen={isYearOpen}
              onClick={() => togglerAccordion(setYearOpen, isYearOpen)}
              onChangeFrom={(e) =>
                handleChange(setYear, "from", e.target.value)
              }
              onChangeTo={(e) => handleChange(setYear, "to", e.target.value)}
              options={year}
              label="Рік"
            />
            <SelectAccordion
              isOpen={isPriceOpen}
              onClick={() => togglerAccordion(setPriceOpen, isPriceOpen)}
              onChangeFrom={(e) =>
                handleChange(setPrice, "from", e.target.value)
              }
              onChangeTo={(e) => handleChange(setPrice, "to", e.target.value)}
              options={price}
              label="Ціна"
            />
          </div>
        ) : (
          <div className={styles.accordions}>
            <SelectInput
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
                dispatch(fetchModels(e.target.value));
              }}
              options={brandOptions}
              defaultValue="brand"
              label="Марка"
            />
            <SelectInput
              value={model}
              onChange={(e) => setModel(e.target.value)}
              options={modelOptions}
              defaultValue="model"
              label="Модель"
              selectedBrand={brand}
            />
            <SelectInput
              value={gearbox}
              onChange={(e) => setGear(e.target.value)}
              options={gearOptions}
              defaultValue="gear"
              label="Коробка передач"
            />
            <SelectInput
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
              options={fuelOptions}
              defaultValue="fuel"
              label="Паливо"
            />
            <SelectAccordion
              isOpen={isPriceOpen}
              onClick={() => togglerAccordion(setPriceOpen, isPriceOpen)}
              onChangeFrom={(e) =>
                handleChange(setPrice, "from", e.target.value)
              }
              onChangeTo={(e) => handleChange(setPrice, "to", e.target.value)}
              options={price}
              label="Ціна"
            />
          </div>
        )}

        <div className={styles.button_block_wrapper}>
          <p onClick={clearFilter}>Очистити пошук</p>
          <div className={styles.button_block}>
            <button className={styles.search_button} onClick={filterCars}>
              <Image alt="Search" src={Search} width={40} height={40} /> Пoшук
            </button>
            <button onClick={addToFavourites} className={styles.add_button}>
              <Image alt="Sub" src={Sub} width={18} height={23} />
            </button>
          </div>
        </div>
      </article>
    </aside>
  );
}
