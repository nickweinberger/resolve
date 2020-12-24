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

import MyChallengesSwiper from '../components/MyChallengesSwiper'
import MyChallengesStack from './MyChallengesStack'
import MyProfileStack from './MyProfileStack'
import CreateChallengeTab2 from './CreateChallengeTab2'

const Tab = createBottomTabNavigator();


// Component for Bottom Tab on homescreen

const HomeTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#e80000',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="MyChallengesStack" component={MyChallengesStack} options={{
          tabBarLabel: 'My Challenges',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={30} />
          ),
        }} />
      <Tab.Screen name="CreateChallengeTab2" component={CreateChallengeTab2} options={{
          tabBarLabel: 'Create Challenge',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="plus" color={color} size={34} />
          ),
        }} />
        <Tab.Screen name="MyProfileStack" component={MyProfileStack} options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-settings" size={30} color={color} />
            ),
          }} />

    </Tab.Navigator>
  );
}

export default HomeTab;
