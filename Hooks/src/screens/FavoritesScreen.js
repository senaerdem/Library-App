import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { selectFavorites } from '../redux/slices/booksSlice';
import { useNavigation, useTheme } from '@react-navigation/native';

export default function FavoritesScreen() {
  const favorites = useSelector(selectFavorites); // Favori kitapları alıyoruz
  const navigation = useNavigation();
  const { colors } = useTheme(); // Temadan renkleri alıyoruz

  const handleBookPress = (book) => {
    navigation.navigate('Detail', { book });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleBookPress(item)} style={[styles.itemContainer, { backgroundColor: colors.card }]}>
      {/* Kitap resmi */}
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.bookImage} />
      )}

      <View style={styles.bookDetails}>
        {/* Kitap başlığı */}
        <Text style={[styles.bookTitle, { color: colors.text }]}>{item.title}</Text>
        {/* Yazar bilgisi */}
        <Text style={[styles.bookAuthor, { color: colors.text }]}>by {item.author}</Text>
        {/* Kitap yılı */}
        <Text style={[styles.bookYear, { color: colors.text }]}>Published: {item.year}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Favorite Books</Text>

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={[styles.noFavoritesText, { color: colors.text }]}>You have no favorite books.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  bookImage: {
    width: 60,
    height: 90,
    marginRight: 12,
    borderRadius: 4,
  },
  bookDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 14,
    marginTop: 4,
    color: '#888',
  },
  bookYear: {
    fontSize: 12,
    marginTop: 4,
    color: '#888',
  },
  noFavoritesText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});
