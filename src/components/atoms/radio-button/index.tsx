import React from 'react';

export interface RadionButtonProps {
  label?: string;
  value: string | number;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

function RadioButton(props: RadionButtonProps) {
  const { label, value, id, onChange, checked } = props;
  return (
    <div className="flex items-center mb-4">
      <input
        className="w-3 h-3 rounded-sm appearance-none cursor-pointer
         border border-gray-300 bg-gray-200 ring-pc-400 ring-offset-2 ring-2
         checked:ring-2 checked:bg-pc-400 checked:ring-offset-2 checked:border-pc-400
         focus:ring-pc-400 focus:ring-offset-2"
        id={id}
        name={id}
        type="radio"
        value={value}
        onChange={onChange}
        checked={checked}
      />
      {label && (
        <label htmlFor={id} className="ml-3 text-md cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
}

export default RadioButton;
