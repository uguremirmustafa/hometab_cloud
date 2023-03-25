import { DeleteIcon } from '@src/assets/icons';
import { bookmarksTable } from '@src/lib/db';
import { useModal } from '@src/lib/store';
import { Bookmark } from '@src/types';

interface IProps {
  bookmark: Bookmark;
}

function ConfirmBookmarkDelete(props: IProps) {
  const { bookmark } = props;
  const { closeModal } = useModal();
  function deleteBookmark() {
    bookmarksTable.delete(bookmark.id as number).then(() => {
      closeModal();
    });
  }
  return (
    <div className="p-3">
      <p className="text-lg">Are you sure to delete this bookmark?</p>
      <p>{bookmark.name}</p>
      <p>{bookmark.tags}</p>
      <p>{bookmark.url}</p>
      <div className="flex gap-3 items-center justify-end">
        <button className="btn-outlined flex gap-2" onClick={closeModal}>
          Cancel
        </button>
        <button className="btn flex gap-2" onClick={deleteBookmark}>
          <DeleteIcon size={16} /> Delete
        </button>
      </div>
    </div>
  );
}

export default ConfirmBookmarkDelete;
