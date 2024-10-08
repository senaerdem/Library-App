import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    loggedInUser: null,
    isAdmin: false, // Admin kontrolü için bir state ekledim
  },
  reducers: {
    setUser(state, action) {
      state.userInfo = action.payload;
    },
    setLoggedInUser(state, action) {
      state.loggedInUser = action.payload;
    },
    setAdminStatus(state, action) {
      state.isAdmin = action.payload; // Kullanıcı admin mi değil mi bilgisi
    },
    logout(state) {
      state.loggedInUser = null;
      state.isAdmin = false; // Çıkış yapıldığında admin yetkisi sıfırlanır
    },
    // Yeni profil resmi ekle
    updateProfileImage(state, action) {
      if (state.loggedInUser) {
        state.loggedInUser.profileImage = action.payload;
      }
    },
  },
});

// Redux işlemleri
export const { setUser, setLoggedInUser, setAdminStatus, logout, updateProfileImage } = userSlice.actions;

// AsyncStorage'a profil resmini kaydet
export const saveProfileImage = (username, imageUri) => async (dispatch) => {
  try {
    const users = await AsyncStorage.getItem('users');
    const parsedUsers = users ? JSON.parse(users) : [];

    const updatedUsers = parsedUsers.map((user) =>
      user.username === username ? { ...user, profileImage: imageUri } : user
    );

    await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

    // Redux state'ine de kaydediyoruz
    dispatch(updateProfileImage(imageUri));
  } catch (error) {
    console.error('Failed to save profile image', error);
  }
};

// Giriş işlemi
export const login = (username, password) => async (dispatch) => {
  try {
    const users = await AsyncStorage.getItem('users');
    const parsedUsers = users ? JSON.parse(users) : [];

    // Admin kullanıcıyı kontrol ediyoruz
    if (username === 'Admin' && password === '123') {
      dispatch(setLoggedInUser({ username }));
      dispatch(setAdminStatus(true)); // Admin olarak işaretle
      console.log('Admin login successful');
    } else {
      // Normal kullanıcı kontrolü
      const user = parsedUsers.find(u => u.username === username && u.password === password);
      if (user) {
        //dispatch(setLoggedInUser({ username: user.username }));
        dispatch(setLoggedInUser(user));
        dispatch(setAdminStatus(false)); // Normal kullanıcı olarak işaretle
        console.log('User login successful');
      } else {
        throw new Error('Invalid username or password.');
      }
    }
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
};

// Kayıt işlemi
export const signup = (username, password) => async (dispatch) => {
  try {
    let users = await AsyncStorage.getItem('users');
    users = users ? JSON.parse(users) : []; // Eğer kullanıcılar yoksa boş array başlat

    // Kullanıcı adının zaten var olup olmadığını kontrol et
    const userExists = users.find((user) => user.username === username);
    if (userExists) {
      throw new Error('User already exists');
    }

    const registrationDate = new Date().toISOString(); // Kayıt tarihi

    // Yeni kullanıcıyı ekle
    users.push({ username, password, registrationDate });

    // Güncellenmiş kullanıcı dizisini AsyncStorage'a kaydet
    await AsyncStorage.setItem('users', JSON.stringify(users));

    // Başarılı kayıt işlemi
    dispatch(setUser({ username, password, registrationDate }));

    // Kayıt başarılıysa kullanıcıyı giriş yapmış gibi işaretle
    dispatch(setLoggedInUser({ username }));
  } catch (error) {
    console.error('Signup error:', error.message);
    throw error;
  }
};

export const selectLoggedInUser = (state) => state.user.loggedInUser;
export const selectIsAdmin = (state) => state.user.isAdmin;

export default userSlice.reducer;
