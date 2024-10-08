import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import TextInputField from '../components/TextInputField';
import ButtonComponent from '../components/ButtonComponent';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/slices/userSlice';
import { useNavigation, useTheme } from '@react-navigation/native';

export default function SignupScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { colors } = useTheme();

  // Kayıt olma işlemi
  const handleSignup = async () => {
    if (username && password) {
      try {
        // signup işlemini Redux'tan çağırıyoruz
        await dispatch(signup(username, password));
        Alert.alert('Signup Successful', 'You can now login with your credentials.');
        navigation.navigate('Login'); // Giriş ekranına yönlendiriyorum
      } catch (error) {
        Alert.alert('Signup Failed', error.message); // Hata mesajı
      }
    } else {
      Alert.alert('Signup Failed', 'Please fill in both fields.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.innerContainer, { backgroundColor: colors.card, shadowColor: colors.border }]}>
        <Text style={[styles.header, { color: colors.text }]}>Sign Up</Text>
        <TextInputField
          placeholder="Username"
          placeholderTextColor={colors.text}
          value={username}
          onChangeText={setUsername}
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        />
        <TextInputField
          placeholder="Password"
          placeholderTextColor={colors.text}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        />
        <ButtonComponent title="Sign Up" onPress={handleSignup} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.link, { color: colors.primary }]}>
            Already have an account? Sign in.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  innerContainer: {
    borderRadius: 15,
    padding: 20,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 5,
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    marginBottom: 24,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
    width: '100%',
  },
});
