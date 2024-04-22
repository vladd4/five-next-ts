"use client";

import styles from "./Edit.module.scss";

import { ChangeEvent, FC, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { setShowEditSaved } from "@/redux/slices/alertSlice";
import { fetchModels } from "@/redux/slices/filtersSlice";
import { updateSaved } from "@/redux/slices/savedSlice";

const EditAlert: FC = () => {
  const dispatch = useAppDispatch();

  const { editSaved } = useAppSelector((state) => state.saved);
  const { user } = useAppSelector((state) => state.user);
  const { showEditSaved } = useAppSelector((state) => state.alert);

  const brandOptions = useAppSelector((state) => state.filters.brands);
  const modelOptions = useAppSelector((state) => state.filters.models);
  const fuelOptions = useAppSelector((state) => state.filters.fuel);
  const typeOptions = useAppSelector((state) => state.filters.type);
  const gearOptions = useAppSelector((state) => state.filters.gear);
  const stateOptions = useAppSelector((state) => state.filters.state);

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [gear, setGear] = useState("");
  const [fuel, setFuel] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState({
    from: "",
    to: "",
  });
  const [price, setPrice] = useState({
    from: "",
    to: "",
  });

  const handleCancel = () => {
    dispatch(setShowEditSaved(false));
  };

  const labels = [
    {
      label: "Марка",
      options: brandOptions,
      value: brand,
      changeHandler: (e: ChangeEvent<HTMLSelectElement>) =>
        setBrand(e.target.value),
    },
    {
      label: "Модель",
      options: modelOptions,
      value: model,
      changeHandler: (e: ChangeEvent<HTMLSelectElement>) =>
        setModel(e.target.value),
    },
    {
      label: "Коробка",
      options: gearOptions,
      value: gear,
      changeHandler: (e: ChangeEvent<HTMLSelectElement>) =>
        setGear(e.target.value),
    },
    {
      label: "Стан",
      options: stateOptions,
      value: state,
      changeHandler: (e: ChangeEvent<HTMLSelectElement>) =>
        setState(e.target.value),
    },
    {
      label: "Паливо",
      options: fuelOptions,
      value: fuel,
      changeHandler: (e: ChangeEvent<HTMLSelectElement>) =>
        setFuel(e.target.value),
    },
    {
      label: "Тип кузову",
      options: typeOptions,
      value: type,
      changeHandler: (e: ChangeEvent<HTMLSelectElement>) =>
        setType(e.target.value),
    },
  ];

  const handleUpdate = () => {
    if (editSaved && user !== null) {
      const selectedBrand = brandOptions.find(
        (option) => option.value === brand
      );
      const selectedModel = modelOptions.find(
        (option) => option.value === model
      );
      const selectedFuel = fuelOptions.find((option) => option.value === fuel);
      const selectedType = typeOptions.find((option) => option.value === type);
      const selectedGear = gearOptions.find((option) => option.value === gear);
      const selectedState = stateOptions.find(
        (option) => option.value === state
      );
      const params = {
        brand_id: selectedBrand?.id,
        model_id: selectedModel?.id,
        type_id: selectedType?.id,
        fuel_id: selectedFuel?.id,
        gearbox_id: selectedGear?.id,
        state_id: selectedState?.id,
        max_price: price.to,
        min_price: price.from,
        max_year: year.to,
        min_year: year.from,
        userID: user.id,
      };
      dispatch(updateSaved({ savedID: editSaved.id, params }));
      dispatch(setShowEditSaved(false));
    }
  };

  useEffect(() => {
    if (editSaved) {
      setBrand(editSaved.brand!);
      setFuel(editSaved.fuel!);
      setModel(editSaved.model!);
      setGear(editSaved.gearbox!);
      setState(editSaved.state!);
      setType(editSaved.type!);

      setPrice({
        from: editSaved.min_price!,
        to: editSaved.max_price!,
      });
      setYear({
        from: editSaved.min_year!,
        to: editSaved.max_year!,
      });
      dispatch(fetchModels(editSaved.brand!));
    }
  }, [editSaved]);

  useEffect(() => {
    dispatch(fetchModels(brand));
  }, [brand, dispatch]);

  return (
    <section
      className={`${styles.root} ${showEditSaved ? styles.show_root : ""}`}
    >
      <article className={styles.wrapper}>
        <div className={styles.input_block}>
          {labels.map((label) => {
            return (
              <div className={styles.input_div} key={label.label}>
                <label>{label.label}</label>
                <select
                  onChange={(e) => label.changeHandler(e)}
                  value={label.value}
                >
                  {label.options.map((option) => {
                    return <option key={option.id}>{option.value}</option>;
                  })}
                </select>
              </div>
            );
          })}
          <div className={styles.input_div}>
            <label>Рік випуску</label>
            <div className={styles.price_input}>
              <input
                value={year.from}
                type="text"
                placeholder="Від"
                onChange={(e) =>
                  setYear((prev) => ({ ...prev, from: e.target.value }))
                }
              />
              <input
                value={year.to}
                type="text"
                placeholder="До"
                onChange={(e) =>
                  setYear((prev) => ({ ...prev, to: e.target.value }))
                }
              />
            </div>
          </div>
          <div className={styles.input_div}>
            <label>Ціна</label>
            <div className={styles.price_input}>
              <input
                value={price.from}
                type="text"
                placeholder="Від"
                onChange={(e) =>
                  setPrice((prev) => ({ ...prev, from: e.target.value }))
                }
              />
              <input
                value={price.to}
                type="text"
                placeholder="До"
                onChange={(e) =>
                  setPrice((prev) => ({ ...prev, to: e.target.value }))
                }
              />
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <button onClick={handleCancel}>Скасувати</button>
          <button onClick={handleUpdate}>Зберегти зміни</button>
        </div>
      </article>
    </section>
  );
};

export default EditAlert;
