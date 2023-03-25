import React, { useState } from 'react';
import BookmarkSettings from './setting-sections/bookmarks';
import ThemeSettings from './setting-sections/theme-settings';
import TodosSettings from './setting-sections/todos';
import { SettingSection, settingSections } from './types';

interface IProps {
  activeTab: SettingSection;
}

function SettingsMenu(props: IProps) {
  const { activeTab } = props;
  const [activeMenu, setActiveMenu] = useState(activeTab);

  function changeActiveMenu(menuItem: SettingSection) {
    if (activeMenu !== menuItem) {
      setActiveMenu(menuItem);
    }
  }

  return (
    <div className="grid grid-cols-12 h-[calc(100vh_-_48px)]">
      <ul className="col-span-3 flex flex-col border-r">
        {settingSections.map((x) => (
          <li
            className={`
            h-10 flex items-center px-4 text-md font-bold hover:dark:bg-pc-400/50 hover:bg-pc-300/50 hover:dark:text-pc-50 hover:text-pc-800 cursor-pointer transition-colors 
            ${x === activeMenu ? 'dark:bg-pc-500/50 bg-pc-500/50' : ''}`}
            key={x}
            onClick={() => changeActiveMenu(x)}
          >
            {x}
          </li>
        ))}
      </ul>
      <div className="col-span-9 p-4">
        {activeMenu === 'theme' ? <ThemeSettings /> : null}
        {activeMenu === 'todos' ? <TodosSettings /> : null}
        {activeMenu === 'bookmarks' ? <BookmarkSettings /> : null}
      </div>
    </div>
  );
}

export default SettingsMenu;
