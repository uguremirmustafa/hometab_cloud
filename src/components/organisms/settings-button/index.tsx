import { SettingsIcon } from '@src/assets/icons';
import { useModal } from '@src/lib/store';
import SettingsMenu from './SettingsMenu';

function SettingsButton() {
  const { setModal } = useModal();

  function openSettings() {
    setModal({
      id: 'settings',
      title: 'Settings',
      content: <SettingsMenu activeTab="theme" />,
      maxWidth: 'max-w-lg',
      type: 'sidebar',
    });
  }

  return (
    <button
      onClick={openSettings}
      className="text-white p-0 hover:scale-105 hover:rotate-90 transition-all duration-300"
    >
      <SettingsIcon />
    </button>
  );
}

export default SettingsButton;
