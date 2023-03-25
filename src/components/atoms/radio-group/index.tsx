import React from 'react';
import RadioButton, { RadionButtonProps } from '../radio-button';

interface IProps<T> {
  label: string;
  options: Omit<RadionButtonProps, 'onChange' | 'checked'>[];
  setValue: (val: T) => void;
  value: T;
}

function RadioGroup<T>(props: IProps<T>) {
  const { label, options, setValue, value } = props;
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value as T);
  }

  return (
    <fieldset>
      <legend className="mb-2">{label}</legend>
      <div className="pl-1">
        {options.map((opt) => (
          <RadioButton
            key={opt.id}
            id={opt.id}
            label={opt.label}
            value={opt.value}
            onChange={onChange}
            checked={value === opt.value}
          />
        ))}
      </div>
    </fieldset>
  );
}

export default RadioGroup;
