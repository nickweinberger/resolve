import 'react-native-gesture-handler';

// React imports
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableWithoutFeedback, TouchableOpacity, Icon, FlatList } from 'react-native';
import { Divider } from 'react-native-paper';


// Import navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Icon Imports
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


// Import Async Storage for UID
import AsyncStorage from '@react-native-community/async-storage';


export default class MyProfileHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
        userID: null,
    };

  };


  render() {

    // Import navigation inside render
    const { navigation } = this.props;

    // Get userID from AsyncStorage
    const renderDisplayName = async () => {

      let data = await AsyncStorage.getItem('userID')
      // let myPhone = 'hahahah'
      // let myPhone = phone.phone
      // console.log(myPhone)

      return (
        <Text style={styles.headerText}>{data}</Text>
      )
    }


    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
              <Ionicons name="ios-arrow-round-back" size={35} color="black" />
              <View style={styles.SeparatorLine} />
          </TouchableOpacity>
          <Text style={styles.headerText}>My Profile</Text>
          <TouchableOpacity style={styles.close} onPress={() => navigation.navigate('HomeTab')}>
              <AntDesign name="close" size={24} color="black" />
              <View style={styles.SeparatorLine} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CompletedChallenges')}>
          <Text style={styles.item}>Completed Challenges</Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Logout')}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

    );
  };
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: '10%',
    backgroundColor: '#e80000',
    flexDirection: 'row'
  },
  headerText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 25,
    paddingTop: '8%',
    paddingLeft: '28%'
  },
  back: {
    paddingLeft: '3%',
    paddingTop: '7%'
  },
  close: {
    paddingLeft: '28%',
    paddingTop: '9%'
  },
  button: {
    height: '8%',
    justifyContent: 'center'
  },
  item: {
    fontSize: 22,
    paddingLeft: '5%'
  },
  logout: {
    color: '#32A5E8',
    fontSize: 22,
    paddingLeft: '5%'
  }

});
