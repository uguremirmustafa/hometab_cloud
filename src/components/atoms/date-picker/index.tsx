import { CalendarIcon } from '@src/assets/icons';
import classNames from 'classnames';
import format from 'date-fns/format';
import { ReactNode, useState } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

interface IProps
  extends Omit<ReactDatePickerProps, 'onChange' | 'dateFormat' | 'selected' | 'placeholderText'> {
  className?: string;
  dateFormat?: string;
  val: Date | null | undefined;
  setVal: (date: Date | null | undefined) => void;
  placeholder: ReactNode | string | undefined;
  showIcon?: boolean;
}

function Datepicker(props: IProps) {
  const { className, val, setVal, dateFormat, placeholder, showIcon, ...rest } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (date: Date | null, event: any) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
    if (date) {
      setVal(date);
    }
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
      <button
        className={classNames('rounded outline-none !cursor-pointer', className)}
        onClick={handleClick}
      >
        {val ? (
          <div className="flex items-center gap-1">
            {showIcon && <CalendarIcon size={16} />}
            {format(val, dateFormat ?? 'dd MMM yyyy')}
          </div>
        ) : (
          placeholder
        )}
      </button>
      {isOpen && (
        <div className="absolute left-0 top-6 z-50">
          <DatePicker
            {...rest}
            selected={val}
            onChange={handleChange}
            dayClassName={() => 'dark:bg-dark2 dark:hover:bg-dark1 bg-light1'}
            monthClassName={() => 'dark:bg-dark2 bg-light1'}
            calendarClassName="dark:bg-dark2"
            weekDayClassName={() => 'dark:bg-dark2'}
            showPopperArrow={false}
            fixedHeight={true}
            inline
            onClickOutside={(e) => {
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Datepicker;
