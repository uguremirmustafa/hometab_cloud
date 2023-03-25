import { useClosedNotes } from '@src/hooks/api-hooks/useNotes';
import { notesTable } from '@src/lib/db';
import { useModal } from '@src/lib/store';
import { Note } from '@src/types';
import classNames from 'classnames';
import { format } from 'date-fns';
import { useState } from 'react';

interface IProps {
  openNotes: Note[];
}

function SearchNote(props: IProps) {
  const { openNotes } = props;
  const { closeModal } = useModal();
  const [searchKey, setSearchKey] = useState('');
  const notes = useClosedNotes(searchKey);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchKey(e.target.value);
  }

  function openNote(note: Note) {
    notesTable.bulkPut(openNotes.map((x) => ({ ...x, isActive: false })));
    notesTable.update(note.id as number, { isOpen: true, isActive: true });
    closeModal();
    setSearchKey('');
  }

  return (
    <div className={classNames('h-[500px] overflow-scroll flex flex-col gap-1')}>
      <input
        className="text-box m-2 text-base font-semibold"
        type="search"
        autoFocus
        value={searchKey}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      <table className="m-2 mt-0">
        <tbody>
          {notes.map((note) => {
            return (
              <tr
                tabIndex={0}
                key={note.id}
                className="paper flex justify-between cursor-pointer"
                onClick={() => openNote(note)}
              >
                <td className="grow-1">{note.name}</td>
                <td className="w-[150px]">{format(note.createdAt, 'dd MMM yyyy, hh:mm')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SearchNote;
