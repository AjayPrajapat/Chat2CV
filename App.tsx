import 'react-native-gesture-handler';
import React from 'react';
import { Provider as StoreProvider, useSelector } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigator from '@navigation/RootNavigator';
import { store, persistor, RootState } from '@store/store';
import { lightTheme, darkTheme } from '@utils/theme';
import i18n from '@i18n/index';

const ThemedApp = () => {
  const scheme = useColorScheme();
  const stateTheme = useSelector((state: RootState) => state.ui.theme);
  const effective = stateTheme === 'system' ? scheme : stateTheme;
  const paperTheme = effective === 'dark' ? darkTheme : lightTheme;
  const navigationTheme = effective === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navigationTheme}>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <SafeAreaProvider>
            <ThemedApp />
          </SafeAreaProvider>
        </I18nextProvider>
      </PersistGate>
    </StoreProvider>
  );
}
