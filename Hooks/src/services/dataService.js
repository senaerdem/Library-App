import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKS_KEY = 'books';

// Kitapları AsyncStorage'a kaydetme
export const saveBooksToStorage = async (books) => {
  try {
    await AsyncStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  } catch (error) {
    console.error('Failed to save books to storage', error);
  }
};

// AsyncStorage'dan kitapları alma
export const fetchBooksFromStorage = async () => {
  try {
    const storedBooks = await AsyncStorage.getItem(BOOKS_KEY);
    return storedBooks ? JSON.parse(storedBooks) : [];
  } catch (error) {
    console.error('Failed to fetch books from storage', error);
    return [];
  }
};

// Tek bir kitabı ekleme
export const addBook = async (newBook) => {
  try {
    const books = await fetchBooksFromStorage(); // Mevcut kitapları getir
    books.push(newBook); // Yeni kitabı listeye ekle
    await saveBooksToStorage(books); // Güncellenmiş listeyi kaydet
  } catch (error) {
    console.error('Failed to add book', error);
  }
};

// Tek bir kitabı silme
export const deleteBook = async (index) => {
  try {
    const books = await fetchBooksFromStorage(); // Mevcut kitapları getir
    books.splice(index, 1); // İlgili kitabı listeden çıkar
    await saveBooksToStorage(books); // Güncellenmiş listeyi kaydet
  } catch (error) {
    console.error('Failed to delete book', error);
  }
};
