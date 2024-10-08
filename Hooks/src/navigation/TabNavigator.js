import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DetailScreen from '../screens/DetailScreen';
import AddBookScreen from '../screens/AddBookScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../redux/slices/userSlice';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { colors } = useTheme(); // Temadan renkleri alıyoruz
  const isAdmin = useSelector(selectIsAdmin); // Kullanıcının admin olup olmadığını kontrol ediyoruz

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          } else if (route.name === 'Detail') {
            iconName = focused ? 'book' : 'book';
          } else if (route.name === 'AddBook') {
            iconName = focused ? 'plus' : 'plus';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-o';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary, // Aktif olan ikonun rengi
        tabBarInactiveTintColor: colors.text, // İnaktif olan ikonun rengi
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Detail" component={DetailScreen} />
      
      {/* Eğer admin değilse Favorites sekmesini gösteriyoruz */}
      {!isAdmin && (
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
      )}

      {/* Eğer admin ise AddBook sekmesini gösteriyoruz */}
      {isAdmin && (
        <Tab.Screen name="AddBook" component={AddBookScreen} />
      )}
    </Tab.Navigator>
  );
}
