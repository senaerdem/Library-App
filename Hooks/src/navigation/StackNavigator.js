import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DrawerNavigator from './DrawerNavigator';
import EditBookScreen from '../screens/EditBookScreen';
import RateBookScreen from '../screens/RateBookScreen';
import AddCommentScreen from '../screens/AddCommentScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="EditBook" component={EditBookScreen} />
      <Stack.Screen name="RateBook" component={RateBookScreen} options={{ title: 'Rate Book' }} />
      <Stack.Screen name="AddComment" component={AddCommentScreen} options={{ title: 'Add Comment' }} />
    </Stack.Navigator>
  );
}
