import 'react-native-gesture-handler';

// React imports
import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableWithoutFeedback, TouchableOpacity, Icon } from 'react-native';

// Import navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const Tab = createBottomTabNavigator();

import { Ionicons } from '@expo/vector-icons';


const LogActivity = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
            <Ionicons name="ios-arrow-round-back" size={35} color="black" />
            <View style={styles.SeparatorLine} />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          Log Here
        </Text>
      </View>
      <Text>
        How much did you do??!!
      </Text>
    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: '11%',
    backgroundColor: '#ff5533',
    flexDirection: 'row'
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    fontSize: 25,
    paddingTop: '10%',
    paddingLeft: '34%'
  },
  icon: {
    paddingTop: '9%',
    paddingLeft: '3%'

  },
});

export default LogActivity;
