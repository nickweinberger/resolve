import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, Button, Image, TouchableOpacity} from 'react-native';
import { TextInput, Card } from "react-native-paper";

// Import Async Storage for Persistent Login
import AsyncStorage from '@react-native-community/async-storage';

import { CommonActions } from '@react-navigation/native';

// Require Axios
const axios = require('axios').default;

// Main
export default class PersistentLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
        phone: "",
        password: "",
        userID: "",
        loggedIn: false,
        error: "",
      };
    }

  handlePhone = text => {
    this.setState({ phone: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };

  render() {

    // Import navigation inside render
    const { navigation } = this.props;

    // Function to store login data in AsyncStorage
    const storeToken = async () => {
      try {
         await AsyncStorage.setItem("userData", JSON.stringify({"phone": this.state.phone, "password": this.state.password }));
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }

    // Function to store userID in AsyncStorage
    const storeUserID = async () => {
      try {
        console.log('stored UserID successfully')
        // console.log(this.state.userID)
        await AsyncStorage.setItem("userID", this.state.userID);

      } catch (error) {
        console.log("Something went wrong", error);
      }
    }

    // Login Function
    const login = async () => {
      if (this.state.phone.length === 10 && this.state.password.length > 0) {

        // Axios Request
        axios.post('https://t31amiwnaf.execute-api.us-east-1.amazonaws.com/dev/login', (JSON.stringify({"phone": this.state.phone, "password": this.state.password })))
        .then((response) => {
          console.log(response)
          if (response.data.message === "Sucessfully logged in") {

            // Call storeToken
            storeToken()

            // Set Logged In State to True
            this.setState({
              loggedIn: true
            });

            // Set state of User ID
            this.setState({
              userID: response.data.uid
            })

            // Store User ID
            storeUserID()


            // // Call conditional show error function
            // showError(response)

            // Navigate to Home Page Tab
            navigation.navigate('HomeTab')

          } else {

            // Set State of error to match Backend error message
            this.setState({
              error: response.data.message
            })

          }
        }, (error) => {
          console.log("This is the error: " + error);
        });
        console.log('correct input')
      } else if (this.state.phone.length !== 10) {
        this.setState({
          error: '10 digit phone numbers please!'
        })
      } else if (this.state.password.length < 1) {
        this.setState({
          error: 'Please enter your password!'
        })
      }
    }

    return (
      <ScrollView contentContainerStyle={{flexGrow: 10, backgroundColor: '#e80000'}}
        keyboardShouldPersistTaps='handled'
        bounces='false'
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Resolve</Text>
        </View>
        <View style={styles.contentContainer}>
         <Text style={styles.title}>Welcome to Resolve!</Text>
       </View>
         <View style={styles.center}>
           <TextInput
             style={styles.input}
             keyboardType='numeric'
             maxLength = {10}
             placeholder="Phone Number"
             theme={{
                 colors: {
                            placeholder: 'gray', text: 'black', primary: 'black',
                            underlineColor: 'red', background: '#003489'
                    }
              }}
             autoCapitalize="none"
             onChangeText={this.handlePhone}
          />
          <TextInput
             style={styles.input}
             maxLength = {15}
             placeholder="Password"
             theme={{
                 colors: {
                            placeholder: 'gray', text: 'black', primary: 'black',
                            underlineColor: 'red', background: '#003489'
                    }
              }}
             autoCapitalize="none"
             secureTextEntry={true}
             onChangeText={this.handlePassword}
          />
          <TouchableOpacity
              style={styles.button}
              onPress={() => login(this.state.phone, this.state.password, {navigation} )} >
              <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.error}>{this.state.error}</Text>
          <View style={styles.row}>
            <Text style={styles.createAccountText}>Don't Have an account yet?</Text>
            <TouchableOpacity
                style={styles.createAccountButton}
                onPress={() => navigation.navigate('CreateAccount')} >
                <Text style={styles.secondButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }


  // Check if user is already logged in
  async getToken() {

    // Import navigation
    const { navigation } = this.props;

    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);

      // If so, log in automatically
      if (data !== null) {
        axios.post('https://t31amiwnaf.execute-api.us-east-1.amazonaws.com/dev/login', (JSON.stringify({"phone": data.phone, "password": data.password })))
        .then((response) => {
          // console.log(response)
          if (response.data.message === "Sucessfully logged in") {

            // Set state of User ID
            this.setState({
              userID: response.data.uid
            })

            // Function to Store User ID
            const storeUserID = async () => {
              try {
                AsyncStorage.setItem("userID", this.state.userID);
              } catch (error) {
                console.log("Something went wrong", error);
              }
            }

            // Call function to store User ID
            storeUserID()

            navigation.navigate('HomeTab')
          }
        })
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  // When component mounts, try to automatically log in
  componentDidMount() {
   this.getToken();
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e80000',
    paddingTop: 30,
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: '5%'
  },
  center: {
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 30,
    padding: '2%',
    color: 'black',
    fontFamily: 'Thonburi-Bold',
  },
  header: {
      flexDirection: 'row',
      marginTop: 20
  },
  title: {
    fontSize: 35,
    color: 'white',
    fontFamily: 'Thonburi',
    paddingBottom: '7%'
  },
  textBox: {
    color: 'white',
    marginBottom: 260
  },
  input: {
    height: 50,
    width: 300,
    marginVertical: 20,
    marginTop: '1%',
    fontSize: 20,
    backgroundColor: 'white',
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.32,
    shadowRadius: 3.46,
  },
  button: {
    backgroundColor: 'white',
    marginTop: '3%',
    width: '50%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.32,
    shadowRadius: 3.46,
    elevation: 6,
  },
  buttonText: {
    fontSize: 21,
    color: 'black',
    fontWeight: '600'
  },
  row: {
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center'

  },
  skip: {
    marginTop: -10,
    marginBottom: -20
  },
  createAccountText: {
    marginTop: '3.4%',
    marginLeft: '14%'
  },
  createAccountButton: {
    backgroundColor: '#e80000',
    width: '50%',
    marginLeft: '2%',
    marginTop: '2%'
  },
  secondButtonText: {
    fontSize: 22
  },
  error: {
    marginBottom: 10,
    marginTop: '3%',
    fontSize: 17
  }

});
