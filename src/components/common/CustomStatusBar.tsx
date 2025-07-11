import React from 'react';
import { StatusBar as RNStatusBar } from 'react-native';
import { useAppSelector } from '../../store/hooks';
import { useTheme } from 'react-native-paper';

const CustomStatusBar = () => {
  const theme = useTheme();

  return (
    <RNStatusBar
      barStyle={theme.dark ? 'light-content' : 'dark-content'}
      backgroundColor={theme.colors.background}
      translucent={false}
    />
  );
};

export default CustomStatusBar;