import React, { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store, AppDispatch } from './src/store/store';
import RootNavigator from './src/navigation/RootNavigator';
import { initializeTheme } from './src/store/themeSlice';
import { lightTheme, darkTheme } from './src/utils/themeUtils';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from './src/store/hooks';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector((state) => state.theme);

  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <RootNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default AppWrapper;