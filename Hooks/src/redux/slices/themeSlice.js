import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  theme: 'light', // Varsayılan olarak light mod
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const saveThemeToStorage = (theme) => async (dispatch) => {
  try {
    await AsyncStorage.setItem('theme', theme);
    dispatch(setTheme(theme));
  } catch (error) {
    console.error('Failed to save theme', error);
  }
};

export const loadThemeFromStorage = () => async (dispatch) => {
  try {
    const theme = await AsyncStorage.getItem('theme');
    if (theme) {
      dispatch(setTheme(theme));
    }
  } catch (error) {
    console.error('Failed to load theme', error);
  }
};

export const selectTheme = (state) => state.theme.theme;

export default themeSlice.reducer;
