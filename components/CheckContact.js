import React, { useEffect, Component } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { TextInput, Button, Card, ActivityIndicator, Divider } from "react-native-paper";


// Require Axios
const axios = require('axios').default;

// Require expo contacts
import * as Contacts from 'expo-contacts';


// Function to extract contacts from contacts app on Phone
export async function checkContact(phone, challenge) {

    console.log(phone)

    // Put phone number into array for Post request
    let phoneArray = [phone]

      // Put phone number array into Object for Post Request
      let phoneNumberForCheck = {
        phone_numbers: phoneArray
      }

    // set URL
    var url = `https://t31amiwnaf.execute-api.us-east-1.amazonaws.com/dev/get-users`

    // axios post with url and request body variable "actualPhoneNumbersForPost"
    await axios.post(url, JSON.stringify(phoneNumberForCheck))
    .then((response) => {

       console.log(response)

       // if successful, push returned contacts to empty array returnedUsers
       if (response.data.message === "successfully retrieved users") {


         if (response.data.users.length > 0) {

           // set user = to returned user
           let user = response.data.users[0]
           console.log(user)

           // Create object for user to add into challenge
           let userObject = {
             uid: user.Partition_ID,
             challenge_id: challenge.Partition_ID
           }

           return userObject
           console.log(userObject)

           // // set url
           // let url = 'https://t31amiwnaf.execute-api.us-east-1.amazonaws.com/dev/add-user-to-challenge'
           //
           // // axios post
           // axios.post(url, JSON.stringify(userObject))
           // .then((response) => {
           //
           //   console.log(response)
           //
           // }

         } else {

           let error = "Sorry, there are no users with that phone number yet"
           // console.log(error)
           return error;
         }

      }

    }, (error) => {
      console.log("This is the error: " + error);
    })

}
