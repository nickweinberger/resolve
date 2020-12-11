import 'react-native-gesture-handler';

// React imports
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableWithoutFeedback, TouchableOpacity, Icon, ScrollView, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-paper';

// Import navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons } from '@expo/vector-icons';


// Require Axios
const axios = require('axios').default;

export default class AddFriendsInChallenge extends Component {

    constructor(props) {
      super(props);
      this.state = {
        phone: '',
        error: '',
        user: '',
      };
    }

    handlePhone = text => {
      this.setState({ phone: text });
    };

    async checkContact(phone, challenge) {

        // console.log(phone)

        // Put phone number into array for Post request
        let phoneArray = [phone]

          // Put phone number array into Object for Post Request
          let phoneNumberForCheck = {
            phone_numbers: phoneArray
          }

          // console.log(phoneNumberForCheck)

        // set URL
        var url = `https://t31amiwnaf.execute-api.us-east-1.amazonaws.com/dev/get-users`

        // axios post with url and request body variable "actualPhoneNumbersForPost"
        await axios.post(url, JSON.stringify(phoneNumberForCheck))
        .then((response) => {

           // console.log(response)

           // if successful, push returned contacts to empty array returnedUsers
           if (response.data.message === "successfully retrieved users") {

             if (response.data.users.length > 0) {

               // set user = to returned user
               let user = response.data.users[0]
               console.log(user)
               console.log(challenge)

               // Create object for user to add into challenge
               let userObject = {
                 uid: user.Partition_ID,
                 challenge_id: challenge.Partition_ID
               }

               this.setState({ error: 'null' })
               this.setState({ user: userObject.uid })

               // console.log(userObject)

               // set url
               let url = 'https://t31amiwnaf.execute-api.us-east-1.amazonaws.com/dev/add-user-to-challenge'

               // axios post
               axios.post(url, JSON.stringify(userObject))
               .then((response) => {

                 console.log(response);

                 alert(`You have successfully added your friend to ${challenge.challengeName}`)



               }, (error) => {
                 console.log("This is the error: " + error);
               });

             } else {

               let error = "Sorry, there are no users with that phone number yet"
               this.setState({ error: error})
             }

          }

        }, (error) => {
          console.log("This is the error: " + error);
        })

    }


    render() {

      // Import navigation inside render
      const { navigation } = this.props;

      const thisChallenge = this.props.route.params.challenge

      // check if this.state.error has anything, if so, render error
      const renderError = () => {

        if (this.state.error !== 'null') {

          return(

            <Text style={styles.error}>{this.state.error}</Text>
          )
        }
      }

      // check if this.state.error has anything, if so, render error
      // const renderUserAlert = () => {
      //
      //   if (this.state.user !== '') {
      //       alert("You have added " + this.state.user + " to your challenge")
      //   }
      // }

      return (
        <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: "center"}}
          keyboardShouldPersistTaps='handled'
          bounces='false'
        >
          <View style={styles.header}>
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
              <Ionicons name="ios-arrow-round-back" size={35} color="black" />
              <View style={styles.SeparatorLine} />
          </TouchableOpacity>
            <Text style={styles.headerText}>
              Add Friends
            </Text>
          </View>
          <View style={styles.centerText}>
            <Text>
              For the beta, please only add friends with existing accounts
            </Text>
            <TextInput
                mode='flat'
                keyboardType='numeric'
                maxLength = {10}
                autoCapitalize="words"
                theme={{
                   colors: {
                              placeholder: 'gray', text: 'black', primary: 'black',
                              underlineColor: 'transparent', background: 'white'
                   }
                }}
                label="Phone Number"
                onChangeText={this.handlePhone}
                style={styles.input}
            />
            <TouchableOpacity style={styles.leaderboardButton} onPress={() => this.checkContact(this.state.phone, thisChallenge)}>
                <Text style={styles.buttonText}>Add Friend</Text>
            </TouchableOpacity>
            {renderError()}

          </View>
        </ScrollView>
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
    flexDirection: 'row',
    width: '100%'
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    fontSize: 28,
    paddingTop: '8%',
    paddingLeft: '23%'
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
  centerText: {
    marginTop: '30%',
    alignItems: 'center',
    flex: 1
  },
  centerTextText: {
    fontSize: 22,
    alignSelf: 'center'
  },
  challengeName: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  input: {
  height: 60,
  width: 300,
  marginVertical: 20,
  color: 'blue',
  fontSize: 25
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  leaderboardButton: {
    backgroundColor: '#e80000',
    width: 200,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: '10%',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3.46,
    elevation: 4,
  },
  error: {
    color: 'red',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 17,
    marginHorizontal: '5%'
  }
});
