import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import StackNavigator from './src/navigation/StackNavigator';
import { store } from './src/redux/store';
import { loadThemeFromStorage, selectTheme } from './src/redux/slices/themeSlice';
import { loadFavoritesFromStorage } from './src/redux/slices/booksSlice';
import { loadCommentsFromStorage } from './src/redux/slices/booksSlice';

function MainApp() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  useEffect(() => {
    dispatch(loadThemeFromStorage()); // Temayı AsyncStorage'dan yükleme
    dispatch(loadFavoritesFromStorage()); // Favorileri AsyncStorage'dan yükleme
    dispatch(loadCommentsFromStorage()); // Uygulama başlarken yorumları yüklüyoruz
  }, [dispatch]);

  const navigationTheme = theme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
