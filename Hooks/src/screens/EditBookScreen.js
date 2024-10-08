import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateBook } from '../redux/slices/booksSlice';
import BookForm from '../components/BookForm';
import { useNavigation } from '@react-navigation/native';

export default function EditBookScreen({ route }) {
  const { book, index } = route.params; // Kitap ve index bilgilerini alıyoruz
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleEditBook = (updatedBook) => {
    dispatch(updateBook({ updatedBook, index }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* BookForm bileşenine kitap bilgilerini gönderiyoruz */}
      <BookForm
        onSubmit={handleEditBook}
        buttonLabel="Update Book"
        initialValues={book} // Kitap bilgileri TextInput'lara dolu gelecek
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
});
