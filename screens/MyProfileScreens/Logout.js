import 'react-native-gesture-handler';

// React imports
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableWithoutFeedback, TouchableOpacity, Icon, FlatList } from 'react-native';

// Import navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

// Import Async Storage for Logout
import AsyncStorage from '@react-native-community/async-storage';

class CompletedChallenges extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    // Import navigation inside render
    const { navigation } = this.props;


    const logout = async () => {
      let userData1 = await AsyncStorage.getItem("userData");
      console.log("this is user data 1: " + userData1)
        try {
            await AsyncStorage.removeItem("userData");
            await AsyncStorage.removeItem("userID");
            navigation.navigate('SplashScreen')
            return true;
        }
        catch(exception) {
            return false;
        }

    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
              <Ionicons name="ios-arrow-round-back" size={35} color="black" />
              <View style={styles.SeparatorLine} />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            My Profile
          </Text>
          <TouchableOpacity style={styles.close} onPress={() => navigation.navigate('HomeTab')}>
              <AntDesign name="close" size={24} color="black" />
              <View style={styles.SeparatorLine} />
          </TouchableOpacity>
        </View>
        <View style={styles.center}>
          <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
              <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
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
    fontSize: 25,
    paddingTop: '8%',
    paddingLeft: '26%'
  },
  icon: {
    paddingLeft: '3%',
    paddingTop: '8%'
  },
  item: {
    fontSize: 30
  },
  back: {
    paddingLeft: '3%',
    paddingTop: '7%'
  },
  close: {
    paddingLeft: '28%',
    paddingTop: '9%'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoutButton: {
    backgroundColor: '#e80000',
    width: 200,
    height: 50,
    marginTop: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700'
  }

});

export default CompletedChallenges;
