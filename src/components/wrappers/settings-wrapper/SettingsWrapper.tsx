import useSettingsData, { UseSettingsResponse } from '@src/hooks/api-hooks/useSettings';
import React, { createContext, ReactNode, useContext, useMemo, useEffect } from 'react';

interface InitialValues {
  settings?: UseSettingsResponse;
  loading: boolean;
}
const initialValues: InitialValues = {
  settings: undefined,
  loading: true,
};

const SettingsContext = createContext(initialValues);

interface IProps {
  children: ReactNode;
}

export function SettingsContextProvider(props: IProps): JSX.Element {
  const { children } = props;

  const settings = useSettingsData();

  const contextValue = useMemo(
    () => ({
      settings,
      loading: !settings,
    }),
    [settings]
  );

  return (
    <SettingsContext.Provider value={contextValue}>
      {!settings ? <>loading</> : children}
    </SettingsContext.Provider>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      'useSettingsContext must be used in a component within a SettingsContextProvider.'
    );
  }
  return context.settings as UseSettingsResponse;
};

function SettingsWrapper(props: IProps) {
  const { children } = props;
  const settings = useSettings();

  useEffect(() => {
    if (window && !!settings) {
      const document = window.document.documentElement;
      document.dataset['pc'] = settings?.colorSettings?.pc?.value ?? '';
    }
  }, [settings?.colorSettings?.pc?.value]);

  useEffect(() => {
    if (window && !!settings) {
      const document = window.document.documentElement;
      document.dataset['fc'] = settings?.colorSettings?.todo_col_1_clr?.value ?? '';
    }
  }, [settings?.colorSettings?.todo_col_1_clr?.value]);

  useEffect(() => {
    if (window && !!settings) {
      const document = window.document.documentElement;
      document.dataset['sc'] = settings?.colorSettings?.todo_col_2_clr?.value ?? '';
    }
  }, [settings?.colorSettings?.todo_col_2_clr?.value]);

  useEffect(() => {
    if (window && !!settings) {
      const document = window.document.documentElement;
      document.dataset['tc'] = settings?.colorSettings?.todo_col_3_clr?.value ?? '';
    }
  }, [settings?.colorSettings?.todo_col_3_clr?.value]);

  return <div>{children}</div>;
}

export default SettingsWrapper;
