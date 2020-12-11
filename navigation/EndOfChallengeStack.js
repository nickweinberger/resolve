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

import Stakes from '../screens/CreateChallengeScreens/Stakes'
import DateAndSubmit from '../screens/CreateChallengeScreens/DateAndSubmit'
import Messaging from '../screens/CreateChallengeScreens/Messaging'
import Review from '../screens/CreateChallengeScreens/Review'
import PendingPage from '../screens/CreateChallengeScreens/PendingPage'

const Stack = createStackNavigator();


// Component for the stack of screens at the end of challenge creation flow
const EndOfChallengeStack = () => {
  return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Review" component={Review}/>
        <Stack.Screen name="DateAndSubmit" component={DateAndSubmit}/>
        <Stack.Screen name="Messaging" component={Messaging}/>
        <Stack.Screen name="PendingPage" component={PendingPage}/>
      </Stack.Navigator>
  );
}

export default EndOfChallengeStack;
