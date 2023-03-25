import { notesTable } from '@src/lib/db';
import { useApp, useModal } from '@src/lib/store';
import { Note } from '@src/types';

interface IProps {
  note: Note;
  openNotes: Note[];
}
function DeleteNote(props: IProps) {
  const { note, openNotes } = props;
  const { closeModal } = useModal();
  const { setLoading } = useApp();
  function deleteNote() {
    const notesWithoutCurrentOne = openNotes.filter((x) => x.id !== note.id);
    setLoading(true);
    notesTable
      .update(note.id as number, { isDeleted: true, isOpen: false, isActive: false })
      .then(() => {
        if (notesWithoutCurrentOne.length) {
          notesTable.update(notesWithoutCurrentOne[0].id as number, { isActive: true });
        }
      })
      .finally(() => {
        setLoading(false);
        closeModal();
      });
  }
  return (
    <div className="p-4">
      <span>Dude are you sure you want to trash this note?</span>
      <div className="flex justify-end items-center gap-2">
        <button className="btn" onClick={closeModal}>
          no
        </button>
        <button className="btn" onClick={deleteNote}>
          yes
        </button>
      </div>
    </div>
  );
}

export default DeleteNote;
