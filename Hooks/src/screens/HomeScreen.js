import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, removeBook, selectBooks, addToFavorites, removeFromFavorites, selectFavorites } from '../redux/slices/booksSlice';
import { useNavigation, useTheme } from '@react-navigation/native';
import { selectIsAdmin } from '../redux/slices/userSlice';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen() {
  const books = useSelector(selectBooks); // Kitapları Redux'tan alıyor
  const favorites = useSelector(selectFavorites); // Kitapları Redux'tan alıyor
  const dispatch = useDispatch(); // Redux aksiyonlarını dispatch etmek için
  const navigation = useNavigation(); // Navigasyon işlevlerini kullanmak için
  const { colors } = useTheme(); // Temayı alıyor
  const isAdmin = useSelector(selectIsAdmin); // Kullanıcının admin olup olmadığını kontrol ediyor
  const [searchTerm, setSearchTerm] = useState(''); // Arama terimi
  const [filteredBooks, setFilteredBooks] = useState(books); // Filtrelenmiş kitaplar

  // Uygulama açıldığında kitapları yüklemek için
  useEffect(() => {
    dispatch(fetchBooks()); // Burada kitapları fetch ediyorum
  }, [dispatch]);

  // Arama terimi değiştikçe kitapları filtrelemek için
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredBooks(books); // Arama yoksa tüm kitapları gösterir
    } else {
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) // Arama terimi ile kitap başlıklarını filtreler
      );
      setFilteredBooks(filtered); // Filtrelenmiş kitapları ayarlar
    }
  }, [searchTerm, books]);

  // Kitaba tıklandığında detay ekranına yönlendiriyorum
  const handleBookPress = (book) => {
    navigation.navigate('Detail', { book });
  };

  // Yorum eklemek için AddComment ekranına yönlendiriyorum
  const handleAddComment = (bookId) => {
    navigation.navigate('AddComment', { bookId });
  };

  // Kitabı silmek için admin olup olmadığını kontrol ediyorum
  const handleDeleteBook = (index) => {
    if (isAdmin) {
      dispatch(removeBook(index)); // kitap silindi
    }
  };
  // Kitabı düzenlemek için admin olup olmadığını kontrol ediyoruz
  const handleEditBook = (book, index) => {
    if (isAdmin) {
      navigation.navigate('EditBook', { book, index });
    }
  };

  // Favorilere ekleme/çıkarma işlemi
  const toggleFavorite = (book) => {
    const isFavorite = favorites.some(favBook => favBook.title === book.title);
    if (isFavorite) {
      dispatch(removeFromFavorites(book)); // favorilerden çıkardı
    } else {
      dispatch(addToFavorites(book)); // favorilere ekledi
    }
  };

  // Puan verme ekranına yönlendirmek için
  const handleRateBook = (book, index) => {
    // RateBookScreen'e kitap ve bookIndex'i gönderiyoruz
    navigation.navigate('RateBook', { book, bookIndex: index });
  };
   
  // FlatList içinde her bir kitabı render etmek için kullanılan fonksiyon
  const renderItem = ({ item, index }) => {
    const isFavorite = favorites.some(favBook => favBook.title === item.title);
  
    // Puan ortalamasını hesaplıyor
    const averageRating = item.ratings && item.ratings.length > 0
      ? (item.ratings.reduce((sum, rating) => sum + rating, 0) / item.ratings.length).toFixed(1)
      : 'No ratings'; // puan yoksa gösterilecek mesaj
  
    return (
      <View style={[styles.itemContainer, { backgroundColor: colors.card }]}>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.bookImage} />
        )}
        <View style={styles.bookDetails}>
          <TouchableOpacity onPress={() => handleBookPress(item)} style={styles.bookButton}>
            <Text style={[styles.bookTitle, { color: colors.text }]}>{item.title}</Text>
            <Text style={[styles.bookAuthor, { color: colors.text }]}>by {item.author}</Text>
          </TouchableOpacity>
  
          <View style={styles.actionButtons}>
            {!isAdmin && (
              <>
                {/* Favori ekleme/çıkarma ikonu */}
                <TouchableOpacity onPress={() => toggleFavorite(item)}>
                  <Icon
                    name={isFavorite ? 'heart' : 'heart-o'}
                    size={24}
                    color={isFavorite ? 'red' : colors.text}
                  />
                </TouchableOpacity>
  
                {/* Puan verme ikonu */}
                <TouchableOpacity onPress={() => handleRateBook(item, index)}>
                  <Icon
                    name="star-o"
                    size={24}
                    color={colors.text}
                    style={{ marginLeft: 10 }}
                  />
                </TouchableOpacity>

                {/* Yorum Ekle */}
                <TouchableOpacity onPress={() => handleAddComment(item.id)}>
                  <Icon
                    name="comment-o"
                    size={24}
                    color={colors.text}
                    style={{ marginLeft: 10 }}
                  />
                </TouchableOpacity>
              </>
            )}
  
            {isAdmin && (
              <>
              {/* Kitap düzenleme butonu */}
                <TouchableOpacity style={styles.editButton} onPress={() => handleEditBook(item, index)}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                {/* Kitap silme butonu */}
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteBook(index)}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
  
          {/* Puanı gösteriyor */}
          <Text style={[styles.ratingText, { color: colors.text }]}>
            Rating: {averageRating}
          </Text>
        </View>
      </View>
    );
  };
  


  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        style={[styles.searchInput, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
        placeholder="Search books..."
        placeholderTextColor={colors.text}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredBooks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
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
  bookButton: {
    flex: 1,
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
  ratingText: {
    fontSize: 14,
    marginTop: 4,
    color: '#888',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#f0ad4e',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  ratingText: {
    fontSize: 14,
    marginTop: 4,
    color: '#888',
  }
});
