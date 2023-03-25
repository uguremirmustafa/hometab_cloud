import { ColorName } from '@src/components/organisms/settings-button/setting-sections/theme-settings/types';
import classNames from 'classnames';

interface IProps {
  label?: string;
  colors: readonly ColorName[];
  selectedColor: ColorName;
  setSelectedColor: (color: ColorName) => void;
}

function ColorSelector(props: IProps) {
  const { label, colors, selectedColor, setSelectedColor } = props;
  return (
    <div className="mb-3">
      {label && <label className="inline-block mb-1">{label}</label>}
      <div className="flex gap-4">
        {colors.map((c) => {
          return (
            <button
              onClick={() => setSelectedColor(c)}
              key={c}
              data-pc={c}
              className={classNames(
                'w-6 h-6 rounded bg-pc-400 hover:bg-pc-500',
                selectedColor === c && 'outline outline-offset-2 outline-pc-600'
              )}
            ></button>
          );
        })}
      </div>
    </div>
  );
}

export default ColorSelector;
