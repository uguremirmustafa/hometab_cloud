import Collapsible from '@src/components/atoms/collapsible';
import { useBookmarks } from '@src/hooks/api-hooks/useBookmarks';
import useCtrlF from '@src/hooks/useCtrlF';
import classNames from 'classnames';
import { useCallback, useRef } from 'react';
import Select, { components } from 'react-select';
import ManageBookmarks from './ManageBookmarks';

interface IProps {
  isCollapsed: boolean;
  toggle: () => void;
}

function BookmarksSection(props: IProps) {
  const { toggle, isCollapsed } = props;
  const bookmarks = useBookmarks();
  const ref = useRef<any>(null);
  useCtrlF(() => {
    ref.current.focus();
  });

  const customFilter = useCallback((candidate: any, input: any) => {
    if (input) {
      // return true for each option that matches your filter
      const text = input.trim().toLowerCase();
      if (text.split('-')[0] === 'id') {
        return candidate.data.id.toString().includes(text.split('-')[1]);
      }
      if (text.split('-')[0] === 'url') {
        return candidate.data.url.toLowerCase().includes(text.split('-')[1]);
      }
      return (
        candidate.data.tags.toLowerCase().includes(text) ||
        candidate.data.id.toString().includes(text) ||
        candidate.data.url.toLowerCase().includes(text) ||
        candidate.data.name.toLowerCase().includes(text)
      );
    }
    return true; // if not search, then all match
  }, []);

  const handleSelect = useCallback((opt: any) => {
    if (opt && opt.url) {
      window.open(opt.url);
    }
  }, []);
  return (
    <div>
      <div className="w-[800px] mx-auto mb-8">
        <Select
          ref={ref}
          options={bookmarks}
          openMenuOnFocus
          filterOption={customFilter}
          components={{ Option }}
          placeholder="Search bookmarks...(ctrl+f)"
          getOptionLabel={(x) => x.name}
          getOptionValue={(x) => x.id as unknown as string}
          classNames={{
            singleValue: () => classNames('!text-white font-semibold '),
            placeholder: () => 'text-red-400',
            input: () => '!text-white font-semibold',
            valueContainer: () => '!rounded',
            menuList: () => 'bg-slate-700 rounded-lg p-2 !shadow',
            menu: () => '!bg-slate-700 rounded-lg overflow-hidden !shadow',
            option: ({ isFocused, isSelected }) =>
              classNames(
                isFocused && '!bg-slate-900/50',
                isSelected && '!bg-slate-900/60',
                'rounded my-2 hover:cursor-pointer'
              ),
            control: ({ isFocused }) =>
              classNames(
                '!rounded-lg overflow-hidden !text-xl h-20 p-4 !bg-slate-700',
                isFocused
                  ? '!border-4 !border-slate-500 !shadow-lg-slate-800'
                  : '!border-4 !border-slate-600 !shadow-sm-slate-800'
              ),
            indicatorSeparator: () => 'hidden',
            dropdownIndicator: () => '!hidden',
            noOptionsMessage: () => '!text-white font-semibold',
          }}
          onChange={handleSelect}
          maxMenuHeight={600}
        />
      </div>
      <Collapsible
        collapsed={isCollapsed}
        title="Bookmarks"
        toggle={toggle}
        className="w-[1200px] mx-auto"
      >
        <ManageBookmarks bookmarks={bookmarks} />
      </Collapsible>
    </div>
  );
}

export default BookmarksSection;

const Option = (props: any) => {
  const { children, data, ...rest } = props;

  const tags = data.tags;
  const url = data.url;
  return (
    <components.Option
      {...rest}
      // eslint-disable-next-line react/no-children-prop
      children={
        <div className="flex flex-col gap-2">
          <span className="text-white text-lg font-bold">{children}</span>
          <span className="text-sm text-slate-200 truncate">{tags}</span>
          <span className="text-xs text-slate-400 truncate italic underline">{url}</span>
        </div>
      }
    />
  );
};
