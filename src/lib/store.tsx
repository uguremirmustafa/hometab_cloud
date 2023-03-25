import { ModalProps } from '@src/components/molecules/modal/types';
import { UseSettingsResponse } from '@src/hooks/api-hooks/useSettings';
import { create } from 'zustand';

interface AppState {
  modal: ModalProps | null;
  setModal: (modal: ModalProps | null) => void;
  settings: UseSettingsResponse | undefined;
  setSettings: (settings: UseSettingsResponse) => void;
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
}

export const useApp = create<AppState>((set) => ({
  modal: null,
  setModal: (modal) => set((state) => ({ ...state, modal })),
  settings: undefined,
  setSettings: (settings) => set((state) => ({ ...state, settings })),
  loading: false,
  setLoading: (isLoading) => set((state) => ({ ...state, loading: isLoading })),
}));

export const useModal = () => {
  const modal = useApp((state) => state.modal);
  const setModal = useApp((state) => state.setModal);
  const closeModal = () => setModal(null);

  return { modal, setModal, closeModal };
};
