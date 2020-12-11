import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Activity from '../screens/CreateChallengeScreens/Activity'
import Name from '../screens/CreateChallengeScreens/Name'
import Goal from '../screens/CreateChallengeScreens/Goal'
import AddFriends from '../screens/CreateChallengeScreens/AddFriends'
import Stakes from '../screens/CreateChallengeScreens/Stakes'
import EndOfChallengeStack from './EndOfChallengeStack'
import Review from '../screens/CreateChallengeScreens/Review'

const Tab = createMaterialTopTabNavigator();

// Function for the top bar for the create challenge part of bottom tab on hometab

const CreateChallengeTab2 = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#e80000',
        inactiveTintColor: 'gray',
        swipeEnabled: false,
        indicatorStyle :{
             backgroundColor:'red',
             paddingHorizontal: '2%'
       },
        style: {
          height: '10%',
          paddingTop: '5%',
        },
      }}
    >
      <Tab.Screen name="Activity" component={Activity} options={{
          tabBarLabel: 'Type',
        }} />
      <Tab.Screen name="Name" component={Name} options={{
          tabBarLabel: 'Name',
        }} />
      <Tab.Screen name="Goal" component={Goal} options={{
          tabBarLabel: 'Goal',
        }} />
      <Tab.Screen name="Stakes" component={Stakes} options={{
          tabBarLabel: 'Stakes',
        }} />
      <Tab.Screen name="EndOfChallengeStack" component={EndOfChallengeStack} options={{
          tabBarLabel: 'Review',
        }} />
    </Tab.Navigator>
  )
};

export default CreateChallengeTab2;
