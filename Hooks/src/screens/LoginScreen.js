import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import TextInputField from '../components/TextInputField';
import ButtonComponent from '../components/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectLoggedInUser } from '../redux/slices/userSlice';
import { useNavigation, useTheme } from '@react-navigation/native';

export default function LoginScreen() {
  const [username, setUsername] = useState(''); // kullanıcı adı için state
  const [password, setPassword] = useState(''); // kullanıcı şifre için state
  const dispatch = useDispatch(); // Redux action'ları dispatch etmek için
  const navigation = useNavigation(); // Navigasyon işlevlerini kullanmak için
  const loggedInUser = useSelector(selectLoggedInUser);
  const { colors } = useTheme();

  // `loggedInUser` state'ini izlemek için bir `useEffect` ekledim
  useEffect(() => {
    if (loggedInUser) {
      // Eğer giriş başarılıysa `Drawer` ekranına yönlendir
      console.log('User logged in:', loggedInUser);
      navigation.navigate('Drawer');
    }
  }, [loggedInUser, navigation]); // `loggedInUser` değiştiğinde tetiklenecek

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.'); // Boş giriş kontrolü
      return;
    }

    try {
      await dispatch(login(username, password)); // Redux'a login action'ı dispatch edilir
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid username or password.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.innerContainer, { backgroundColor: colors.card, shadowColor: colors.border }]}>
        <Text style={[styles.header, { color: colors.text }]}>Login</Text>
        {/* Kullanıcı adı için giriş alanı */}
        <TextInputField
          placeholder="Username"
          placeholderTextColor={colors.text}
          value={username}
          onChangeText={setUsername}
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        />
        {/* Şifre için giriş alanı */}
        <TextInputField
          placeholder="Password"
          placeholderTextColor={colors.text}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        />
        {/* Giriş butonu */}
        <ButtonComponent title="Login" onPress={handleLogin} />
        {/* Kayıt olma linki */}
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={[styles.link, { color: colors.primary }]}>
            Don't have an account? Sign up.
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
