import { lightTheme, darkTheme } from '../utils/themeUtils';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleSystemTheme, toggleTheme } from '../store/themeSlice';

export const useAppTheme = () => {
  const { isDarkMode } = useAppSelector((state) => state.theme);
  return isDarkMode ? darkTheme : lightTheme;
};

export const useThemeToggle = () => {
  const dispatch = useAppDispatch();
  const { isDarkMode, isSystemTheme } = useAppSelector((state) => state.theme);
  
  return {
    isDarkMode,
    isSystemTheme,
    toggleTheme: () => dispatch(toggleTheme()),
    toggleSystemTheme: () => dispatch(toggleSystemTheme()),
  };
};