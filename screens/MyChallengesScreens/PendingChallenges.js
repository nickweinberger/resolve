import 'react-native-gesture-handler';

// React imports
import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableWithoutFeedback, TouchableOpacity, Icon } from 'react-native';

// Import navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons } from '@expo/vector-icons';


const PendingChallenges = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-round-back" size={35} color="black" />
          <View style={styles.SeparatorLine} />
      </TouchableOpacity>
        <Text style={styles.headerText}>
          Pending Challenges
        </Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8ff',
  },
  header: {
    height: '10%',
    backgroundColor: '#e80000',
    flexDirection: 'row'
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    fontSize: 25,
    paddingTop: '8%',
    paddingLeft: '13%'
  },
  icon: {
    paddingLeft: '20%',
    paddingTop: '8%'
  },
  card: {
    flex: 1,
    marginVertical: '10%',
    paddingHorizontal: '6%',
  },
  back: {
    paddingLeft: '3%',
    paddingTop: '7%'
  },
});

export default PendingChallenges;
