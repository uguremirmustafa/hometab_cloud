import { AddIcon, DeleteIcon, EditIcon } from '@src/assets/icons';
import { bookmarksTable } from '@src/lib/db';
import { sleep } from '@src/lib/helper-functions';
import { useModal } from '@src/lib/store';
import { Bookmark } from '@src/types';
import { useState } from 'react';
import BookmarkModal from './BookmarkModal';
import ConfirmBookmarkDelete from './DeleteConfirmModal';

interface IProps {
  bookmarks: Bookmark[];
}
const emptyBookmark: Bookmark = { name: '', tags: '', url: '' };

function ManageBookmarks(props: IProps) {
  const { bookmarks } = props;
  const { setModal } = useModal();
  function handleEdit(bookmark: Bookmark) {
    setModal({
      id: 'edit_bookmark',
      className: 'max-w-xl translate-y-20',
      title: `Edit ${bookmark.name}`,
      content: <BookmarkModal bookmark={bookmark} />,
    });
  }
  function handleAdd() {
    setModal({
      id: 'add_bookmark',
      className: 'max-w-xl translate-y-20',
      title: 'Add new bookmark',
      content: <BookmarkModal bookmark={emptyBookmark} />,
    });
  }

  async function deleteBookmark(bookmark: Bookmark) {
    if (bookmark.id) {
      setModal({
        id: 'confirm',
        className: 'max-w-sm',
        title: 'Are you sure?',
        content: <ConfirmBookmarkDelete bookmark={bookmark} />,
      });
    }
  }

  const [copied, setCopied] = useState('');
  async function handleCopy(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(url);
    await sleep(1500);
    setCopied('');
  }
  return (
    <>
      <div className="overflow-x-auto w-full mx-auto my-4 table-wrp max-h-[400px] block">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs dark:bg-slate-700 dark:text-slate-200 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3">
                <button onClick={handleAdd}>
                  <AddIcon size={20} />
                </button>
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Url
              </th>
              <th scope="col" className="px-6 py-3">
                Tags
              </th>
            </tr>
          </thead>
          <tbody className="max-h-[400px] overflow-y-auto">
            {bookmarks.map((b) => {
              return (
                <tr
                  key={b.id}
                  className="border-b dark:bg-slate-700/70 dark:border-slate-400 align-middle"
                >
                  <td className="px-4 py-2 flex gap-2 items-center">
                    <button onClick={() => handleEdit(b)}>
                      <EditIcon size={20} />
                    </button>
                    <button onClick={() => deleteBookmark(b)}>
                      <DeleteIcon size={20} />
                    </button>
                  </td>
                  <td className="px-4 py-2">{b.name}</td>
                  <td className="px-4 py-2 max-w-[240px] truncate flex gap-2 items-center">
                    <button onClick={() => handleCopy(b.url)}>🔗</button>{' '}
                    <a href={b.url}>
                      {copied === b.url ? <span className="text-red-500">copied!</span> : b.url}
                    </a>
                  </td>
                  <td className="px-4 py-2">{b.tags}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ManageBookmarks;
