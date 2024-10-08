import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser, saveProfileImage, logout } from '../redux/slices/userSlice';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch(); // Redux aksiyonlarını dispatch etmek için
  const navigation = useNavigation(); // Navigasyon işlemleri
  const { colors } = useTheme();
  const [profileImage, setProfileImage] = useState(loggedInUser?.profileImage || null);

  // Kullanıcının galeriden resim seçmesi için fonksiyon
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Sadece resimleri göster
      allowsEditing: true, // Kullanıcı resmi düzenleyebilir
      aspect: [4, 3], // Resim oranı
      quality: 1, // Yüksek kaliteli resim
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri; // Resmin URI'sini alıyoruz
      setProfileImage(imageUri); // Profil resmi state'ini güncelliyoruz
      dispatch(saveProfileImage(loggedInUser.username, imageUri)); // Redux'a profil resmini kaydediyoruz
    }
  };

  // Kullanıcının çıkış yapması için fonksiyon
  const handleLogout = async () => { 
    await AsyncStorage.removeItem('loggedInUser'); // AsyncStorage'dan kullanıcıyı siliyoruz
    dispatch(logout()); // Redux'ta logout aksiyonunu dispatch ediyoruz
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // Giriş ekranına yönlendiriyoruz
    });
  };

  // Tarihi okunabilir bir formata dönüştürme fonksiyonu
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Tarihi yerel formata çevirir
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Profile</Text>

      {/* Profil resmi gösterimi ve resim seçme */}
      <TouchableOpacity onPress={pickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={[styles.imagePlaceholder, { backgroundColor: colors.card }]}>
            <Text style={[styles.imagePlaceholderText, { color: colors.text }]}>Pick an Image</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Kullanıcı bilgileri */}
      {loggedInUser ? (
        <View style={styles.userInfo}>
          <Text style={[styles.userDetail, { color: colors.text }]}>Username: {loggedInUser.username}</Text>
          <Text style={[styles.userDetail, { color: colors.text }]}>
            Joined: {loggedInUser.registrationDate ? formatDate(loggedInUser.registrationDate) : 'N/A'}
          </Text>
        </View>
      ) : (
        <Text style={[styles.noInfoText, { color: colors.text }]}>No user information available.</Text>
      )}

      {/* Çıkış yapma butonu */}
      <TouchableOpacity style={[styles.logoutButton, { backgroundColor: colors.primary }]} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
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
    fontSize: 28,
    marginBottom: 24,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePlaceholderText: {
    fontSize: 16,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  userDetail: {
    fontSize: 18,
    marginBottom: 8,
  },
  logoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noInfoText: {
    fontSize: 16,
  },
});
