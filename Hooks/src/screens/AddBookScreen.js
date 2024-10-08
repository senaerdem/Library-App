import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AddBookContainer from '../containers/AddBookContainer';
import { selectIsAdmin } from '../redux/slices/userSlice';

const AddBookScreen = () => {
  const navigation = useNavigation();
  const isAdmin = useSelector(selectIsAdmin); // Admin olup olmadığını kontrol ediyoruz
  const { colors } = useTheme(); // Temayı alıyoruz

  useEffect(() => {
    if (!isAdmin) {
      // Eğer admin değilse kullanıcıya uyarı verip geri yönlendiriyoruz
      Alert.alert('Unauthorized', 'Only admin users can add books.');
      navigation.goBack(); // Admin değilse geri dön
    }
  }, [isAdmin, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {isAdmin ? (
        <AddBookContainer /> // Eğer adminse, kitap ekleme formunu göster
      ) : (
        <Text style={[styles.unauthorizedText, { color: colors.text }]}>
          You are not authorized to add books.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  unauthorizedText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AddBookScreen;
