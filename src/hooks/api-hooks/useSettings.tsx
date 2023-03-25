import { ColorName } from '@src/components/organisms/settings-button/setting-sections/theme-settings/types';
import { settingsTable } from '@src/lib/db';
import { ColorSettingName, Setting } from '@src/types';
import { useLiveQuery } from 'dexie-react-hooks';

export interface UseSettingsResponse {
  colorSettings: Record<ColorSettingName, Setting<ColorName>>;
}

function useSettingsData(): UseSettingsResponse {
  const settingsData = useLiveQuery(async () => {
    const colorSettings = await settingsTable.where('type').equals('color').toArray();
    return { colorSettings };
  }, []);
  const allColorSettings = settingsData?.colorSettings ?? [];

  const colorsDict = Object.assign(
    {},
    ...allColorSettings.map((x) => ({ [x.name]: x }))
  ) as unknown as Record<ColorSettingName, Setting<ColorName>>;

  const res = { colorSettings: colorsDict };

  return res;
}

export default useSettingsData;
