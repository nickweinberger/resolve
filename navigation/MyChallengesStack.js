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

// Import screens
import MyChallengesSwiper from './MyChallengesSwiper'
import PendingChallenges from '../screens/MyChallengesScreens/PendingChallenges'
import Leaderboard from '../screens/MyChallengesScreens/Leaderboard'
import AddFriendsInChallenge from '../screens/MyChallengesScreens/AddFriendsInChallenge'

const Stack = createStackNavigator();


// Stack for screens in the My Challenges tab on hometab
const MyChallengesStack = () => {
  return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="MyChallengesSwiper" component={MyChallengesSwiper} />
        <Stack.Screen name="PendingChallenges" component={PendingChallenges}/>
        <Stack.Screen name="Leaderboard" component={Leaderboard}/>
        <Stack.Screen name="AddFriendsInChallenge" component={AddFriendsInChallenge}/>

      </Stack.Navigator>
  );
}

export default MyChallengesStack;
