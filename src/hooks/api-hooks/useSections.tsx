import { sectionsTable } from '@src/lib/db';
import { Section, SectionType } from '@src/types';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';

export type UseSectionsResponse = {
  sections: Record<SectionType, Section> | undefined;
  setSections: React.Dispatch<React.SetStateAction<Record<SectionType, Section> | undefined>>;
};

function useSections(): UseSectionsResponse {
  const [sections, setSections] = useState<UseSectionsResponse['sections']>();
  const sectionsData = useLiveQuery(async () => {
    const res = await sectionsTable.toArray();
    const dict = Object.assign({}, ...res.map((x) => ({ [x.type]: x }))) as unknown as Record<
      SectionType,
      Section
    >;
    setSections(dict);
    return dict;
  }, []);

  return { sections, setSections };
}

export default useSections;
