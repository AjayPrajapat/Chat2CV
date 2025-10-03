import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemePreference = 'light' | 'dark' | 'system';

type Language = 'en' | 'hi';

interface UIState {
  theme: ThemePreference;
  language: Language;
}

const initialState: UIState = {
  theme: 'system',
  language: 'en'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemePreference>) {
      state.theme = action.payload;
    },
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    }
  }
});

export const { setTheme, setLanguage } = uiSlice.actions;
export default uiSlice.reducer;
