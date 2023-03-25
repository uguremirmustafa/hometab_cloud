export const settingTypes = ['color'] as const;
export type SettingType = typeof settingTypes[number];

export const colorsSettings = ['todo_col_1_clr', 'todo_col_2_clr', 'todo_col_3_clr', 'pc'] as const;
export type ColorSettingName = typeof colorsSettings[number];

export const settingNames = [...colorsSettings];
export type SettingName = typeof settingNames[number];

export interface Setting<T = string> {
  id?: number;
  name: SettingName;
  description?: string;
  value: T;
  type: SettingType;
}
