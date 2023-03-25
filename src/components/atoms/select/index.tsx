import React from 'react';
import Select, { Props, GroupBase } from 'react-select';
import classNames from 'classnames';

interface IProps<Option, IsMulti, Group> extends Props {
  label?: string;
  id: string;
}

function SelectBox<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: IProps<Option, IsMulti, Group>) {
  const { label, id, ...rest } = props;
  return (
    <div className="mb-2">
      {label && (
        <label className="pb-2" htmlFor={id}>
          {label}
        </label>
      )}
      <Select
        {...rest}
        id={id}
        classNames={{
          control: ({ isFocused }) =>
            classNames(
              isFocused && 'dark:border-pc-300',
              isFocused && 'dark:shadow-[0_0_0_1px] dark:shadow-pc-300',
              isFocused && 'dark:hover:border-pc-500',
              'dark:bg-pc-300/40 dark:text-pc-800 bg-slate-200 border'
            ),
          dropdownIndicator: () => classNames('dark:fill-pc-400 dark:text-pc-400'),
          input: () => classNames('dark:text-white'),
          option: ({ isSelected, isFocused, isDisabled }) =>
            classNames(
              'dark:bg-pc-300/50 dark:text-pc-800',
              isSelected && 'dark:bg-pc-400/75',
              !isSelected && isFocused && 'dark:bg-pc-400/50',
              !isDisabled && isSelected && 'dark:active:bg-pc-600',
              !isDisabled && !isSelected && 'dark:active:bg-pc-500'
            ),
          group: () => classNames('p-0'),
          singleValue: () => classNames('dark:text-white font-semibold'),
        }}
      />
    </div>
  );
}

export default SelectBox;
