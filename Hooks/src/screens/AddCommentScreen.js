import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addNewComment } from '../redux/slices/booksSlice';
import { useNavigation, useTheme } from '@react-navigation/native';

export default function AddCommentScreen({ route }) {
  const { bookId } = route.params; // Kitap ID'sini alıyoruz
  const [comment, setComment] = useState(''); // Yorum için state oluşturuluyor
  const dispatch = useDispatch(); // Yorum için state oluşturuluyor
  const navigation = useNavigation();
  const { colors } = useTheme(); // Temayı alıyoruz

  // Yorum gönderme
  const handleSubmit = async () => {
    if (comment.trim() === '') {
      Alert.alert('Error', 'Comment cannot be empty.');
      return;
    }

    try {
      // Redux'a yeni yorumu dispatch ediyoruz
      await dispatch(addNewComment(bookId, { text: comment, date: new Date().toISOString() }));
      Alert.alert('Success', 'Comment added successfully.');
      navigation.navigate('Home'); // Yorum başarılı bir şekilde eklendikten sonra ana sayfaya yönlendir
    } catch (error) {
      Alert.alert('Error', 'Failed to add comment.'); // Yorum boşsa hata mesajı göster
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Yorum girmek için TextInput */}
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
        placeholder="Enter your comment"
        placeholderTextColor={colors.text}
        value={comment}
        onChangeText={setComment}
        multiline={true}
        numberOfLines={4}
      />
      {/* Yorum gönder butonu */}
      <TouchableOpacity onPress={handleSubmit} style={[styles.button, { backgroundColor: colors.primary }]}>
        <Text style={styles.buttonText}>Submit Comment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 120,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
