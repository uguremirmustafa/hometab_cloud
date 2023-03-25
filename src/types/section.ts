export const sections = ['todos', 'notes', 'bookmarks'] as const;
export type SectionType = typeof sections[number];

export const sectionStatuses = ['collapsed', 'uncollapsed', 'inactive'] as const;
export type SectionStatusType = typeof sectionStatuses[number];

export type Section = {
  id?: number;
  type: SectionType;
  status: SectionStatusType;
  title: string;
};
