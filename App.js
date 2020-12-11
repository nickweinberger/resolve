import 'react-native-gesture-handler';
import React, {Component} from 'react';
import * as Linking from 'expo-linking'
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CreateChallengeFormProvider } from "./components/CreateChallengeFormContext";
import { CreateAccountFormProvider } from "./components/CreateAccountFormContext";
import { LogActivityFormProvider } from "./components/LogActivityFormContext";

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SplashScreen from './screens/SplashScreen';
import CreateAccount from './screens/CreateAccount';
import FirstOnboarding from './screens/Onboarding/FirstOnboarding'
import SecondOnboarding from './screens/Onboarding/SecondOnboarding'
import HomeTab from './navigation/HomeTab'
import LogActivityStack from './navigation/LogActivityStack'
import MyChallengesStack from './navigation/MyChallengesStack'
import LogActivityHome from './screens/LogActivityScreens/LogActivityHome'
import LogActivity from './screens/LogActivityScreens/LogActivity'
import MyProfileStack from './navigation/MyProfileStack'
import CreateChallengeTab2 from './navigation/CreateChallengeTab2'

const Stack = createStackNavigator();

// Main App component with Parent Navigator
export default class App extends Component {
  render() {
    return (
        // <SafeAreaProvider>
            <CreateAccountFormProvider>
              <CreateChallengeFormProvider>
                <NavigationContainer>
                  <Stack.Navigator screenOptions={{
                    headerShown: false
                  }}>
                    <Stack.Screen name="SplashScreen" component={SplashScreen}/>
                    <Stack.Screen name="CreateAccount" component={CreateAccount}/>
                    <Stack.Screen name="FirstOnboarding" component={FirstOnboarding} />
                    <Stack.Screen name="HomeTab" component={HomeTab} />
                    <Stack.Screen name="CreateChallengeTab2" component={CreateChallengeTab2} />
                    <Stack.Screen name="LogActivityStack" component={LogActivityStack} />
                    <Stack.Screen name="LogActivityHome" component={LogActivityHome} />
                    <Stack.Screen name="LogActivity" component={LogActivity} />
                    <Stack.Screen name="SecondOnboarding" component={SecondOnboarding} />
                    <Stack.Screen name="MyProfileStack" component={MyProfileStack}/>
                  </Stack.Navigator>
                </NavigationContainer>
              </CreateChallengeFormProvider>
            </CreateAccountFormProvider>
        // </SafeAreaProvider>
    )
  }
}
