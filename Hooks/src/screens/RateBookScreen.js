import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { rateBook } from '../redux/slices/booksSlice';

export default function RateBookScreen({ route, navigation }) {
  const { book, bookIndex } = route.params; // book ve bookIndex'i alıyoruz
  const [rating, setRating] = useState(0); // puan state'i
  const dispatch = useDispatch(); // Redux aksiyonlarını dispatch etmek için

  // Kullanıcının yıldızlara tıklayarak puan vermesini sağlayan fonksiyon
  const handleRating = (newRating) => {
    setRating(newRating);
  };

  // Kullanıcı puanı submit edince çalışacak fonksiyon
  const handleSubmit = () => {
    if (rating > 0) {
      dispatch(rateBook(bookIndex, rating)); // Redux'a bookIndex ve rating gönderiyor
    }
    navigation.goBack(); // Puan verdikten sonra geri dön
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rate {book.title}</Text>
      {/* Yıldızlarla puanlama kısmı */}
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <Icon
              name={rating >= star ? 'star' : 'star-o'}
              size={32}
              color={rating >= star ? '#ffd700' : '#ccc'}
            />
          </TouchableOpacity>
        ))}
      </View>
      {/* Submit butonu */}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Submit Rating</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
