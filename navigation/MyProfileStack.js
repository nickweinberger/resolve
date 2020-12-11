import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Icon imports
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import MyProfileHome from '../screens/MyProfileScreens/MyProfileHome'
import CompletedChallenges from '../screens/MyProfileScreens/CompletedChallenges'
import Logout from '../screens/MyProfileScreens/Logout'


const Stack = createStackNavigator();

// Component for the stack of screens controlling My Profile, Settings, Completed Challenges, etc.
const MyProfileStack = () => {
  return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="MyProfileHome" component={MyProfileHome} />
        <Stack.Screen name="CompletedChallenges" component={CompletedChallenges} />
        <Stack.Screen name="Logout" component={Logout} />
      </Stack.Navigator>
  );
}

export default MyProfileStack;
