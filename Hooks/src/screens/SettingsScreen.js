import React, { useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { saveThemeToStorage, loadThemeFromStorage, selectTheme } from '../redux/slices/themeSlice';

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const { colors } = useTheme(); // Global temadan renkleri alıyoruz
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    dispatch(loadThemeFromStorage());
  }, [dispatch]);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    dispatch(saveThemeToStorage(newTheme));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Enable Dark Mode</Text>
      <Switch value={isDarkMode} onValueChange={toggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
