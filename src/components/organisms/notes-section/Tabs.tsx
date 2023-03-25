import { CloseIcon } from '@src/assets/icons';
import { Note } from '@src/types';
import classNames from 'classnames';

interface IProps {
  openNotes: Note[];
  closeNote: (note: Note, index: number) => void;
  selectNote: (note: Note) => void;
}

function Tabs(props: IProps) {
  const { openNotes, closeNote, selectNote } = props;

  return (
    <div className="flex grow-0 overflow-scroll scrollbar-xs">
      {openNotes?.map((note, i) => {
        const { name, isActive } = note;
        const id = note.id as number;
        return (
          <div
            key={id}
            className={classNames(
              'flex items-center gap-1 py-1 px-2 transition-colors last-of-type:shadow-sm dark:bg-dark1/30 group',
              isActive && 'dark:bg-pc-200/40 rounded-sm'
            )}
          >
            <span
              onClick={() => selectNote(note)}
              className="max-w-[150px] truncate cursor-pointer hover:text-clip"
            >
              {name}
            </span>
            <button
              onClick={() => closeNote(note, i)}
              className={classNames(
                isActive && 'visible',
                'invisible group-hover:visible transition-all'
              )}
            >
              <CloseIcon
                size={14}
                className="cursor-pointer dark:hover:fill-pc-500 transition-colors"
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Tabs;
