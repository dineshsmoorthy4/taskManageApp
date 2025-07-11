import React, { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store, AppDispatch } from './src/store/store';
import RootNavigator from './src/navigation/RootNavigator';
import { initializeTheme } from './src/store/themeSlice';
import { lightTheme, darkTheme } from './src/utils/themeUtils';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from './src/store/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { restoreAuth } from './src/store/authSlice';

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
    const loadPersistedData = async () => {
      try {
        // Load auth state
        const token = await AsyncStorage.getItem('token');
        const userString = await AsyncStorage.getItem('user');
        
        if (token && userString) {
          const user = JSON.parse(userString);
          store.dispatch(restoreAuth({ user, token }));
        }
      } catch (error) {
        console.error('Failed to load persisted data', error);
      }
    };
    loadPersistedData();
  }, []);

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