import ColorSelector from '@src/components/molecules/color-selector';
import { useSettings } from '@src/components/wrappers/settings-wrapper/SettingsWrapper';
import { settingsTable } from '@src/lib/db';
import { Setting } from '@src/types';
import { ColorName, colors } from './types';

function ThemeSettings() {
  const settings = useSettings();
  const colorSettings = settings.colorSettings;
  const pcColorSetting = colorSettings?.pc as Setting<ColorName>;
  const fcColorSetting = colorSettings?.todo_col_1_clr as Setting<ColorName>;
  const scColorSetting = colorSettings?.todo_col_2_clr as Setting<ColorName>;
  const tcColorSetting = colorSettings?.todo_col_3_clr as Setting<ColorName>;

  function setPrimaryColor(color: ColorName) {
    settingsTable.update(pcColorSetting.id as number, { value: color });
  }
  function setFirstColumnColor(color: ColorName) {
    settingsTable.update(fcColorSetting.id as number, { value: color });
  }
  function setSecondColumnColor(color: ColorName) {
    settingsTable.update(scColorSetting.id as number, { value: color });
  }
  function setThirdColumnColor(color: ColorName) {
    settingsTable.update(tcColorSetting.id as number, { value: color });
  }

  return (
    <div>
      <ColorSelector
        label="accent color"
        colors={colors}
        selectedColor={pcColorSetting.value}
        setSelectedColor={setPrimaryColor}
      />
      <ColorSelector
        label="not-started column"
        colors={colors}
        selectedColor={fcColorSetting.value}
        setSelectedColor={setFirstColumnColor}
      />
      <ColorSelector
        label="in-progress column"
        colors={colors}
        selectedColor={scColorSetting.value}
        setSelectedColor={setSecondColumnColor}
      />
      <ColorSelector
        label="done column"
        colors={colors}
        selectedColor={tcColorSetting.value}
        setSelectedColor={setThirdColumnColor}
      />
    </div>
  );
}

export default ThemeSettings;
