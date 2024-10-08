import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import booksReducer from './slices/booksSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer, // Kitap listesini yöneten reducer
    theme: themeReducer, // Temaları yöneten reducer
    user: userReducer, // Kullanıcı bilgilerini yöneten reducer
  },
});
