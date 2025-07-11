import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch } from './store';

interface ThemeState {
  isDarkMode: boolean;
  isSystemTheme: boolean;
}

const initialState: ThemeState = {
  isDarkMode: false,
  isSystemTheme: true, // Default to following system theme
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      state.isSystemTheme = false; // User explicitly changed theme
      AsyncStorage.multiSet([
        ['theme', JSON.stringify(state.isDarkMode)],
        ['systemTheme', JSON.stringify(false)],
      ]);
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
      AsyncStorage.setItem('theme', JSON.stringify(action.payload));
    },
    setSystemTheme: (state, action: PayloadAction<boolean>) => {
      state.isSystemTheme = action.payload;
      AsyncStorage.setItem('systemTheme', JSON.stringify(action.payload));
    },
    toggleSystemTheme: (state) => {
      state.isSystemTheme = !state.isSystemTheme;
      AsyncStorage.setItem('systemTheme', JSON.stringify(state.isSystemTheme));
    },
  },
});

export const { toggleTheme, setTheme, setSystemTheme, toggleSystemTheme } = themeSlice.actions;

// Thunk to initialize theme from storage
export const initializeTheme = () => async (dispatch: AppDispatch) => {
  try {
    const [theme, systemTheme] = await AsyncStorage.multiGet(['theme', 'systemTheme']);
    
    if (systemTheme[1] !== null) {
      dispatch(setSystemTheme(JSON.parse(systemTheme[1])));
    }
    
    if (theme[1] !== null && systemTheme[1] === 'false') {
      dispatch(setTheme(JSON.parse(theme[1])));
    }
  } catch (error) {
    console.error('Failed to load theme preferences', error);
  }
};

export default themeSlice.reducer;