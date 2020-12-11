import 'react-native-gesture-handler';

// React imports
import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableWithoutFeedback, TouchableOpacity, Icon, FlatList } from 'react-native';

// Import navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AntDesign } from '@expo/vector-icons';



const UserInfo = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('HomeTab')}>
            <AntDesign name="close" size={24} color="black" />
            <View style={styles.SeparatorLine} />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          User Information
        </Text>
      </View>
      <FlatList
        data={[
          {key: 'Settings'},
          {key: 'Completed Challenges'},
          {key: 'Onboarding'},
          {key: 'Logout'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
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
    paddingLeft: '20%'
  },
  icon: {
    paddingLeft: '3%',
    paddingTop: '8%'
  },
  item: {
    fontSize: 30
  }

});

export default UserInfo;
