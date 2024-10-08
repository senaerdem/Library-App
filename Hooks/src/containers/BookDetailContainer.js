import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

const BookDetailContainer = ({ route }) => {
  const { book } = route.params;
  const { colors } = useTheme(); // Temadan renkleri alıyoruz

  return (
    <View style={styles.container}>
      {book.image && (
        <Image
          source={{ uri: book.image }}
          style={styles.bookImage} // Resmi göstermek için style ekliyoruz
        />
      )}
      <Text style={[styles.detailText, { color: colors.text }]}>Title: {book.title}</Text>
      <Text style={[styles.detailText, { color: colors.text }]}>Author: {book.author}</Text>
      <Text style={[styles.detailText, { color: colors.text }]}>Genre: {book.genre}</Text>
      <Text style={[styles.detailText, { color: colors.text }]}>Year: {book.year}</Text>
      <Text style={[styles.detailText, { color: colors.text }]}>Description: {book.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  bookImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default BookDetailContainer;
