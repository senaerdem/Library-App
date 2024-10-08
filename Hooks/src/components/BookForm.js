import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native'; // Temayı kullanıyoruz
import * as ImagePicker from 'expo-image-picker'; // Expo ImagePicker'ı içe aktarıyoruz

const BookForm = ({ onSubmit, buttonLabel }) => {
  const { colors } = useTheme(); // Temayı alıyoruz
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // Seçilen fotoğrafı saklıyoruz

  // Fotoğraf seçme işlemi
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Fotoğraf URI'sini saklıyoruz
    }
  };

  const handleSubmit = () => {
    const newBook = { title, author, genre, year, description, image }; // Fotoğrafı ekliyoruz
    onSubmit(newBook);
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter book title"
        placeholderTextColor={colors.text}
      />

      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
        value={author}
        onChangeText={setAuthor}
        placeholder="Enter author name"
        placeholderTextColor={colors.text}
      />

      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
        value={genre}
        onChangeText={setGenre}
        placeholder="Enter genre"
        placeholderTextColor={colors.text}
      />

      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
        value={year}
        onChangeText={setYear}
        placeholder="Enter year"
        placeholderTextColor={colors.text}
      />

      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        placeholderTextColor={colors.text}
      />

      {/* Fotoğraf seçme butonu */}
      <TouchableOpacity onPress={pickImage} style={[styles.imageButton, { backgroundColor: colors.primary }]}>
        <Text style={styles.imageButtonText}>Pick an image</Text>
      </TouchableOpacity>

      {/* Fotoğraf önizlemesi */}
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      <Button title={buttonLabel} onPress={handleSubmit} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  imageButton: {
    marginVertical: 16,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 16,
  },
});

export default BookForm;
