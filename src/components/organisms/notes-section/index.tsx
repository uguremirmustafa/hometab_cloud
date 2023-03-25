import { AddIcon, DeleteIcon, OpenFolderIcon, SaveIcon, SearchIcon } from '@src/assets/icons';
import { useOpenNotes } from '@src/hooks/api-hooks/useNotes';
import useCtrlS from '@src/hooks/useCtrlS';
import { notesTable } from '@src/lib/db';
import { sleep } from '@src/lib/helper-functions';
import { useApp, useModal } from '@src/lib/store';
import { Note } from '@src/types';
import classNames from 'classnames';
import { useEffect } from 'react';
import ContentEditable from 'react-contenteditable';
import { useForm } from 'react-hook-form';
import DeleteNote from './DeleteNote';
import SearchNote from './SearchNote';
import Tabs from './Tabs';

function NotesSection() {
  const { setLoading, loading } = useApp();
  const { setModal } = useModal();
  const notes = useOpenNotes();

  const { watch, setValue, reset } = useForm<Note>({
    defaultValues: {
      id: 0,
      name: 'Untitled',
      content: '',
      isOpen: true,
      isActive: true,
    },
  });

  if (!notes) return null;

  const active = notes.find((x) => x.isActive);

  useEffect(() => {
    if (notes.length) {
      reset(active);
    }
  }, [active?.id]);

  const isChanged = active
    ? active?.content !== watch('content') || active?.name !== watch('name')
    : false;

  function saveNote() {
    setLoading(true);
    notesTable
      .update(watch('id') as number, {
        name: watch('name'),
        content: watch('content'),
        updatedAt: new Date(),
      })
      .finally(async () => {
        await sleep(1000);
        setLoading(false);
      });
  }

  function closeNote(note: Note, index: number) {
    const isActive = note.isActive;
    const isOpen = note.isOpen;
    if (!isOpen) {
      return;
    }
    if (!isActive) {
      notesTable.update(note.id as number, { isOpen: false });
      return;
    }
    if (notes.length > 1) {
      const nextActiveNote = { ...notes.filter((x) => x.id !== note.id)[0], isActive: true };
      const newNotes: Note[] = [nextActiveNote, { ...note, isActive: false, isOpen: false }];
      notesTable.bulkPut(newNotes);
      return;
    }
    if (notes.length === 1) {
      notesTable.update(note.id as number, { isOpen: false, isActive: false });
      return;
    }
  }
  function activateNote(note: Note) {
    const newNoes = notes.map((x) =>
      x.id === note.id ? { ...x, isActive: true } : { ...x, isActive: false }
    );
    notesTable.bulkPut(newNoes);
  }

  function addNewNote() {
    const note: Note = {
      createdAt: new Date(),
      isActive: true,
      isOpen: true,
      name: 'Untitled',
      content: '',
    };
    notesTable.bulkPut(notes.map((x) => ({ ...x, isActive: false })));
    notesTable.add(note);
  }

  function searchNote() {
    setModal({
      id: 'open_new_note',
      title: 'Open a note',
      content: <SearchNote openNotes={notes} />,
    });
  }

  function deleteNote(note: Note) {
    setModal({
      id: `${note.id}_delete_modal`,
      title: 'Confirm delete',
      content: <DeleteNote note={note} openNotes={notes} />,
      maxWidth: 'max-w-md',
      className: 'top-20',
    });
  }

  useCtrlS(() => {
    if (active) {
      saveNote();
    }
  });

  return (
    <div className="mb-4">
      <div className="flex justify-between gap-2 mb-2">
        <Tabs openNotes={notes} closeNote={closeNote} selectNote={activateNote} />
        <div className="flex gap-2">
          <button className="icon-btn" onClick={addNewNote}>
            <AddIcon size={18} />
          </button>
          <button className="icon-btn" onClick={searchNote}>
            <OpenFolderIcon size={18} />
          </button>
          {active && (
            <button
              className={classNames('icon-btn', isChanged && 'animate-bounce')}
              onClick={saveNote}
            >
              <SaveIcon size={18} className={classNames(isChanged && 'dark:!fill-pc-800')} />
            </button>
          )}
          {active && (
            <button
              className="icon-btn"
              onClick={() => {
                if (active) {
                  deleteNote(active);
                }
              }}
            >
              <DeleteIcon size={18} />
            </button>
          )}
        </div>
      </div>
      {notes.length && watch('id') !== 0 ? (
        <div>
          <ContentEditable
            html={watch('name') ?? ''}
            onChange={(e) => setValue('name', e.target.value)}
            spellCheck={false}
            className={classNames(
              'text-lg font-bold outline-none px-4 py-2 dark:bg-pc-300/50 dark:text-pc-50 cursor-text rounded-t'
            )}
            placeholder="File name"
            onBlur={saveNote}
            // onMouseLeave={saveNote}
          />
          <ContentEditable
            html={watch('content') ?? ''}
            onChange={(e) => setValue('content', e.target.value)}
            spellCheck={false}
            className={classNames(
              'text-base outline-none min-h-[300px] max-h-[450px] p-4 dark:bg-pc-200/50 dark:text-pc-50 font-semibold overflow-scroll scrollbar-lg cursor-text rounded-b'
            )}
            placeholder="I need to jot down here otherwise it will puff away..."
            onBlur={saveNote}
            // onMouseLeave={saveNote}
          />
        </div>
      ) : (
        <div className="dark:bg-pc-200/50 dark:text-pc-50 p-4 min-h-[300px] max-h-[550px] w-full rounded">
          <button onClick={searchNote}>open up a new note</button>
        </div>
      )}
      {/* active
      <pre>{JSON.stringify(active, null, 2)}</pre>
      form
      <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
    </div>
  );
}

export default NotesSection;
