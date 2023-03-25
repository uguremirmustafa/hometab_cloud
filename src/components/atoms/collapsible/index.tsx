import { ChevronDownIcon } from '@src/assets/icons';
import classNames from 'classnames';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  collapsed: boolean;
  title: string;
  className?: string;
  toggle: () => void;
}

function Collapsible(props: IProps) {
  const { children, collapsed, title, className, toggle } = props;
  return (
    <div className={classNames(className ?? '')}>
      <button
        onClick={toggle}
        className={classNames(
          'w-full flex justify-between items-center dark:bg-dark2/20 dark:hover:bg-dark2/30 dark:hover:shadow-sm py-2 px-4 '
        )}
      >
        <span className="font-semibold text-lg">{title}</span>
        <span
          className={classNames(
            'transition-transform duration-300',
            collapsed ? 'rotate-0' : 'rotate-180'
          )}
        >
          <ChevronDownIcon size={18} />
        </span>
      </button>
      <div
        className={classNames(
          'transition-all duration-100 origin-top mt-4',
          collapsed
            ? 'h-0 opacity-0 -z-10 invisible cursor-none pointer-events-none scale-y-0'
            : 'max-h-screen z-0 opacity-100 visible'
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default Collapsible;
