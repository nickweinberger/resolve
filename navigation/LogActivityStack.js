import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LogActivityHome from '../screens/LogActivityScreens/LogActivityHome'
import LogActivity from '../screens/LogActivityScreens/LogActivity'

const Stack = createStackNavigator();


const LogActivityStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="LogActivityHome" component={LogActivityHome} />
      <Stack.Screen name="LogActivity" component={LogActivity}/>
    </Stack.Navigator>
  )
};

export default LogActivityStack;
