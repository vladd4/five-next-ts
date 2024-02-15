"use client";

type OptionType = {
  id: number;
  value: string;
};

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: OptionType[];
  defaultValue: string;
  label: string;
  selectedBrand?: string;
};

export default function SelectInput({
  value,
  onChange,
  options,
  defaultValue,
  label,
  selectedBrand,
}: InputProps) {
  return (
    <select value={value} onChange={onChange}>
      <option value={defaultValue} disabled>
        {label}
      </option>
      {defaultValue === "model" ? (
        selectedBrand !== "brand" ? (
          options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.value}
            </option>
          ))
        ) : (
          <option disabled value="nobrand">
            Спочатку оберіть марку
          </option>
        )
      ) : (
        options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.value}
          </option>
        ))
      )}
    </select>
  );
}
