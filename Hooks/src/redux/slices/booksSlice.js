import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchBooksFromStorage, saveBooksToStorage } from '../../services/dataService';

const FAVORITES_KEY = 'favorites'; // Favorileri saklayacağımız key
const COMMENTS_KEY = 'comments'; // Yorumları AsyncStorage'da saklamak için key

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [], // Kitaplar için state ekliyoruz
    favorites: [], // Favori kitaplar için state ekliyoruz
    comments: {}, // Yorumlar için state ekliyoruz
  },
  reducers: {
    setBooks(state, action) {
      state.books = action.payload;
    },
    setFavorites(state, action) {
      state.favorites = action.payload; // Favorileri state'e set ediyoruz
    },
    addBookToState(state, action) {
      state.books.push(action.payload);
    },
    removeBookFromState(state, action) {
      state.books.splice(action.payload, 1);
      saveBooksToStorage(state.books);
    },
    updateBookInState(state, action) {
      const { updatedBook, index } = action.payload;
      state.books[index] = updatedBook;
    },
    addRatingToBook(state, action) {
      const { bookIndex, rating } = action.payload;
      if (!state.books[bookIndex].ratings) {
        state.books[bookIndex].ratings = [];
      }
      state.books[bookIndex].ratings.push(rating); // Kitaba yeni puan ekleniyor
    },
    addToFavorites(state, action) {
      state.favorites.push(action.payload);
      saveFavoritesToStorage(state.favorites); // Favorileri AsyncStorage'a kaydediyoruz
    },
    removeFromFavorites(state, action) {
      state.favorites = state.favorites.filter(book => book.title !== action.payload.title);
      saveFavoritesToStorage(state.favorites); // Güncellenmiş favorileri AsyncStorage'a kaydediyoruz
    },
    saveBook: (state, action) => {
      const newBook = action.payload;
      state.books.push(newBook); // Yeni kitap state'e ekleniyor
      saveBooksToStorage(state.books); // AsyncStorage'a kitabı kaydediyoruz
    },
    setComments(state, action) {
      state.comments = action.payload;
    },
    addComment(state, action) {
      const { bookId, comment } = action.payload;
      if (!state.comments[bookId]) {
        state.comments[bookId] = [];
      }
      state.comments[bookId].push(comment);
      console.log('Kitap Yorumları:', state.comments[bookId]);
      saveCommentsToStorage(state.comments); // AsyncStorage'a yorumu kaydediyoruz
    },
  },
});

export const {
  setBooks,
  addBookToState,
  removeBookFromState,
  updateBookInState,
  addToFavorites,
  removeFromFavorites,
  saveBook,
  setFavorites,
  addRatingToBook,
  setComments, 
  addComment,
} = booksSlice.actions;

export const removeBook = (index) => async (dispatch, getState) => {
  const { books } = getState().books;
  
  // Silinmek istenen kitabı filtreliyoruz
  const updatedBooks = books.filter((_, i) => i !== index);

  await saveBooksToStorage(updatedBooks); // Güncellenmiş kitap listesini AsyncStorage'a kaydet
  dispatch(removeBookFromState(index)); // Redux state'inden de kitabı siliyoruz
};

// AsyncStorage'dan favorileri almak için fonksiyon
export const loadFavoritesFromStorage = () => async (dispatch) => {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
    if (favorites) {
      dispatch(setFavorites(JSON.parse(favorites)));
    }
  } catch (error) {
    console.error('Failed to load favorites', error);
  }
};

// AsyncStorage'a favorileri kaydetmek için fonksiyon
export const saveFavoritesToStorage = async (favorites) => {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save favorites', error);
  }
};

export const fetchBooks = () => async (dispatch) => {
  const books = await fetchBooksFromStorage();
  dispatch(setBooks(books));
};

// Puanı kitaplara kaydetme fonksiyonu
export const rateBook = (bookIndex, rating) => async (dispatch, getState) => {
  dispatch(addRatingToBook({ bookIndex, rating })); // Redux'a ekle

  const { books } = getState().books; // Güncel kitap listesini al
  await saveBooksToStorage(books); // Kitapları AsyncStorage'a kaydet
};

export const addNewComment = (bookId, comment) => (dispatch, getState) => {
  dispatch(addComment({ bookId, comment }));
  const { comments } = getState().books;
  saveCommentsToStorage(comments); // Yorumları AsyncStorage'a kaydediyoruz
};

// AsyncStorage'a yorumları kaydetme fonksiyonu
const saveCommentsToStorage = async (comments) => {
  try {
    await AsyncStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
  } catch (error) {
    console.error('Failed to save comments to storage', error);
  }
};

// AsyncStorage'dan yorumları alma fonksiyonu
export const loadCommentsFromStorage = () => async (dispatch) => {
  try {
    const storedComments = await AsyncStorage.getItem(COMMENTS_KEY);
    if (storedComments) {
      console.log('Yüklenen Yorumlar:', JSON.parse(storedComments)); // Yorumları konsolda göster
      dispatch(setComments(JSON.parse(storedComments)));
    }
  } catch (error) {
    console.error('Failed to load comments from storage', error);
  }
};

// Kitap için yorumları almak için selector
export const selectCommentsForBook = (state, bookId) => state.books.comments[bookId] || [];

// Favorileri state'ten almak için selector
export const selectFavorites = (state) => state.books.favorites;

// Kitapları state'ten almak için selector
export const selectBooks = (state) => state.books.books;

export default booksSlice.reducer;
