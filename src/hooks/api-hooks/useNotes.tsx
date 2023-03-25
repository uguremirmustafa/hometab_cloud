import { notesTable } from '@src/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';

export function useNotes() {
  const notesData = useLiveQuery(async () => {
    const res = await notesTable.filter((x) => !x.isDeleted).toArray();

    return res;
  }, []);

  return notesData;
}
export function useOpenNotes() {
  const notesData = useLiveQuery(
    async () => {
      const res = await notesTable
        .reverse()
        .filter((x) => x.isOpen && !x.isDeleted)
        .sortBy('createdAt');

      return res;
    },
    [],
    []
  );

  return notesData;
}
export function useClosedNotes(query?: string) {
  const notesData = useLiveQuery(
    async () => {
      const res = await notesTable
        .reverse()
        .filter(
          (x) =>
            !x.isDeleted &&
            !x.isOpen &&
            (query ? x.name.toLowerCase().includes(query.toLowerCase()) : true)
        )
        .sortBy('createdAt');

      return res;
    },
    [query],
    []
  );

  return notesData;
}
