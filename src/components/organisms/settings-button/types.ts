export const settingSections = ['theme', 'todos', 'notes', 'bookmarks'] as const;
export type SettingSection = typeof settingSections[number];
