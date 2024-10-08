import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// Sadece UI'yi yöneten Presenter bileşeni
const BookDetail = ({ book }) => {
  return (
    <View>
      <Text style={styles.header}>Book Details</Text>
      {book ? (
        <View>
          <Text>Title: {book.title}</Text>
          <Text>Author: {book.author}</Text>
          <Text>Genre: {book.genre}</Text>
          <Text>Year: {book.year}</Text>
          <Text>Description: {book.description}</Text>
          {book.image && <Image source={{ uri: book.image }} style={styles.image} />}
        </View>
      ) : (
        <Text>No details available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginTop: 16,
    alignSelf: 'center',
  },
});

export default BookDetail;
