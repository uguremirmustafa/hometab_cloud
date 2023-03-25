import { bookmarksTable } from '@src/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';

export const useBookmarks = () => {
  const data = useLiveQuery(
    async () => {
      const d = await bookmarksTable.toArray();
      return d;
    },
    [],
    []
  );
  return data;
};
