import 'react-native-gesture-handler';

// React imports
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableWithoutFeedback, TouchableOpacity, Icon } from 'react-native';

// Expo Contacts for test
import * as Contacts from 'expo-contacts';


// Import navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();


const LogActivityHome = () => {

  // const isFocused = useIsFocused();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Log Activity
        </Text>
      </View>
      <View>
        <Button color='black' title='log one!!'/>
      </View>
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
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    fontSize: 25,
    paddingTop: '10%',
    paddingLeft: '34%'
  },
});

export default LogActivityHome;
