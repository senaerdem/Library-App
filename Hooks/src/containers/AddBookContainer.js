import React from 'react';
import { useDispatch } from 'react-redux';
import { saveBook } from '../redux/slices/booksSlice';
import BookForm from '../components/BookForm';
import { useNavigation } from '@react-navigation/native';

// Container bileşeni veri işleme ile ilgilenir
const AddBookContainer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddBook = (book) => {
    dispatch(saveBook(book));
    navigation.goBack();
  };

  return (
    // Presenter bileşenini (BookForm) çağırarak UI'yi gösteririz
    <BookForm onSubmit={handleAddBook} buttonLabel="Add Book" />
  );
};

export default AddBookContainer;
