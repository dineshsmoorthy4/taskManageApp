import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from '../store/hooks';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import CustomStatusBar from '../components/common/CustomStatusBar';
import { useTheme } from 'react-native-paper';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const theme = useTheme();

  return (
    <>
      <CustomStatusBar />
      <NavigationContainer theme={{
        dark: theme.dark,
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.surface,
          text: theme.colors.onSurface,
          border: theme.colors.outline,
          notification: theme.colors.error,
        },
        fonts: {
          regular: {
            fontFamily: '',
            fontWeight: 'bold'
          },
          medium: {
            fontFamily: '',
            fontWeight: 'bold'
          },
          bold: {
            fontFamily: '',
            fontWeight: 'bold'
          },
          heavy: {
            fontFamily: '',
            fontWeight: 'bold'
          }
        }
      }}>
        <Stack.Navigator screenOptions={{ 
          headerShown: false,
          cardStyle: { backgroundColor: theme.colors.background }
        }}>
          {isAuthenticated ? (
            <Stack.Screen name="Main" component={MainNavigator} />
          ) : (
            <Stack.Screen name="Auth" component={AuthNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootNavigator;