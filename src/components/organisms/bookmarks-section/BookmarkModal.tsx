import { LoadingIcon, SaveIcon } from '@src/assets/icons';
import { bookmarksTable } from '@src/lib/db';
import { sleep } from '@src/lib/helper-functions';
import { useModal } from '@src/lib/store';
import { Bookmark } from '@src/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface IProps {
  bookmark: Bookmark;
}

function BookmarkModal(props: IProps) {
  const { bookmark } = props;
  const { closeModal, modal } = useModal();
  const isAdding = modal?.id === 'add_bookmark';
  const [error, setError] = useState('');
  const {
    register,
    getValues,
    formState: { isDirty },
  } = useForm<Bookmark>({ defaultValues: bookmark });
  const [loading, setLoading] = useState(false);

  async function saveBookmark() {
    setLoading(true);
    await sleep(500);
    bookmarksTable
      .put(getValues(), bookmark?.id)
      .then(() => {
        closeModal();
      })
      .catch((err) => {
        console.log(err.message);
        setError('Something went wrong while saving the bookmark 😥');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="p-3 flex flex-col gap-3">
      <label>
        Name
        <input type="text" {...register('name')} className="text-box font-semibold w-full" />
      </label>
      <label>
        Tags
        <input type="text" {...register('tags')} className="text-box font-semibold w-full" />
      </label>
      <label>
        URL
        <input type="text" {...register('url')} className="text-box font-semibold w-full" />
      </label>
      {error && <span className="text-red-500 p-2 border border-red-500">{error}</span>}
      <div className="flex gap-3 items-center justify-end">
        <button className="btn-outlined flex gap-2" onClick={closeModal}>
          Close
        </button>
        <button className="btn flex gap-2" onClick={saveBookmark} disabled={!isDirty || loading}>
          {loading ? <LoadingIcon size={16} /> : <SaveIcon size={16} />} Save
        </button>
      </div>
    </div>
  );
}

export default BookmarkModal;
