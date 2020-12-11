import React, { useEffect, Component } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { TextInput, Button, Card, ActivityIndicator, Divider } from "react-native-paper";


// Require Axios
const axios = require('axios').default;

// Require expo contacts
import * as Contacts from 'expo-contacts';



export default class GetContacts extends Component {

    constructor(props) {
    super(props);
    this.state = {
       allContacts: [],
       postContacts: [],
       matchContacts: [],
       addedContacts: [],
       isLoading: true,
     };
    }

    onAddContact = (item) => {
      this.setState({ addedContacts: this.state.addedContacts.concat(item) })
    }

   componentDidMount() {

     // Function to extract contacts from contacts app on Phone
     const getContacts = async () => {
       const permission = await Contacts.getPermissionsAsync();

       if (permission.status !== 'granted') {
         // Permission was denied...
         Contacts.requestPermissionsAsync()

         const data = await Contacts.getContactsAsync({
           fields: [Contacts.Fields.PhoneNumbers],
         })
         const contacts = data.data;

       } else {

         const data = await Contacts.getContactsAsync({
           fields: [Contacts.Fields.PhoneNumbers],
         })
         const contacts = data.data;
         // console.log(contacts)

         // only run if contacts exist
         if (contacts !== undefined && contacts !== null) {

           // Create empty array
           let contactsArray = []

           // Loop through array of arrays of phone number objects
           for (let i = 0; i < contacts.length; i++) {

               // Check that phone numbers exits
               if (contacts[i].phoneNumbers)

                 // Loop through arrays of phone number objects
                 for (let j = 0; j < contacts[i].phoneNumbers.length; j++) {

                   // console.log(contacts[i].firstName +  contacts[i].lastName)
                   // console.log(contacts[i].phoneNumbers.[j].digits)

                   // If there is a phone number
                   if (contacts.[i].phoneNumbers[j].digits) {

                       // If 12 digits beginning with '+1'
                       if (contacts.[i].phoneNumbers[j].digits.length === 12 && contacts.[i].phoneNumbers[j].digits[0] === '+'
                       && contacts.[i].phoneNumbers[j].digits[1] === '1') {

                           // if yes, drop the + and the 1 and push
                           contactsArray.push({"firstName":contacts[i].firstName, "lastName":contacts[i].lastName, "phone":contacts.[i].phoneNumbers[j].digits.substring(2)})



                       // if 11 digits beginning with +
                       } else if (contacts.[i].phoneNumbers[j].digits.length === 11 && contacts.[i].phoneNumbers[j].digits[0] === '+') {

                           // drop the + and push
                           contactsArray.push({"firstName":contacts[i].firstName, "lastName":contacts[i].lastName, "phone":contacts.[i].phoneNumbers[j].digits.substring(1)})

                       // If number is 11 digits and begins with a 1
                       } else if (contacts.[i].phoneNumbers[j].digits.length === 11 && contacts.[i].phoneNumbers[j].digits[0] === '1') {

                           // drop the 1 then push
                           contactsArray.push({"firstName":contacts[i].firstName, "lastName":contacts[i].lastName, "phone":contacts.[i].phoneNumbers[j].digits.substring(1)})

                       } else if (contacts.[i].phoneNumbers[j].digits.length === 10) {

                           // Push other phone numbers to array
                           // drop the 1 then push
                           contactsArray.push({"firstName":contacts[i].firstName, "lastName":contacts[i].lastName, "phone":contacts.[i].phoneNumbers[j].digits})

                     }
                  }

             }

          }

             if (contactsArray) {

               // Alphabetize all contacts in phone and set state of all contacts to alphabetized list
               function compare(a, b) {

                  // // Use toUpperCase() to ignore character casing
                  if (a.firstName !== undefined && b.firstName !== undefined) {
                    const contactA= a.firstName.toUpperCase();
                    const contactB= b.firstName.toUpperCase();

                    let comparison = 0;
                    if (contactA > contactB) {
                      comparison = 1;
                    } else if (contactA < contactB) {
                      comparison = -1;
                    }
                  return comparison;
                  }
               }

               const myContacts = contactsArray.sort(compare)

               // console.log(myContacts[0].firstName)
               this.setState({ allContacts: myContacts })



               // Create list of just phone numbers to pass to DB

               // Empty array
               let phoneNumbersForPost = []



               // Loop through contactsArray
               // console.log(contactsArray)
               for  (let i = 0; i < 70; i++) {

                 if (contactsArray[i]) {
                   // Push phone numbers
                   phoneNumbersForPost.push(contactsArray[i].phone)

                 }

               }

               // Create object for request body
               var actualPhoneNumbersForPost = {
                 phone_numbers: phoneNumbersForPost
               }

               // console.log(actualPhoneNumbersForPost)



               // set URL
               var url = `https://t31amiwnaf.execute-api.us-east-1.amazonaws.com/dev/get-users`

               // empty array for matched users
               let returnedUsers = []


               // axios post with url and request body variable "actualPhoneNumbersForPost"
               axios.post(url, JSON.stringify(actualPhoneNumbersForPost))
               .then((response) => {

                 // console.log(response)

                // if successful, push returned contacts to empty array returnedUsers
                if (response.data.message === "successfully retrieved users") {

                  // For as many users as there are
                  for (let i = 0; i < response.data.users.length; i++) {

                      // Push users into array returnedUsers
                      returnedUsers.push(response.data.users[i])
                    }

                    if (returnedUsers.length > 0) {

                      // set global state of loading, contacts for this request
                      this.setState({ matchContacts: returnedUsers, isLoading: false })

                    }

                  }

               }, (error) => {
                 console.log("This is the error: " + error);
               })

             }





               // // Set returnedUser arrays = [] to be smashes together after API call
               // let returnedUsers = []


               // console.log(phoneNumbers)
               // console.log(phoneNumbers[0].firstName)

            // }
             //
             //     // For loop, make API request for each number, if returned #, push that #
             //
             //
             //         // insert phone number array into url as query param
             //         // var url = `https://t31amiwnaf.execute-api.us-east-1.amazonaws.com/dev/get-users?`
             //         //
             //         // axios.get(url)
             //         // .then((response) => {
             //         //   // console.log(response.data);
             //         //   if (response.data.message === "successfully retrieved users" && response.data.users[0] !== undefined) {
             //         //
             //         //
             //         //      for (let i = 0; i < response.data.users.length; i++) {
             //         //
             //         //        // Push the users returned from axios request into array returnedUsers
             //         //        returnedUsers0.push(response.data.users[i])
             //         //      }
             //         //
             //         //
             //         //    // set global state of loading, contacts for this request
             //         //    this.setState({ isLoading0: false, contacts0: returnedUsers0 })
             //         //
             //         //   }
             //
             //
             //         // }, (error) => {
             //         //   console.log("This is the error: " + error);
             //         // })
             //  }
            }
          }
      }
      // Call the above function
      getContacts()


  }



   render() {

    // Import navigation inside render
    const { navigation } = this.props;

    if (this.state.isLoading === true) {

      return (
       <View style={styles.container}>
         <Text style={styles.header}>Add your friends!</Text>
         <View style={styles.centerText}>
           <ActivityIndicator animating={true} color='#e80000' />
         </View>
       </View>

       )
    } else if (this.state.isLoading === false) {

        return (
           <View style={styles.container}>
             <Text style={styles.header}>Add your friends!</Text>
             <View style={styles.centerText}>
               <FlatList
                 maxToRenderPerBatch={10}
                 data={this.state.matchContacts}
                 renderItem={({ item }) =>
                  <TouchableOpacity onPress={() => {this.onAddContact(item)}}>
                    <Text style={styles.contactName}>{item.Display_Name}</Text>
                    <Text style={styles.contactPhone}>{item.Partition_ID.substr(5, 3)}-{item.Partition_ID.substr(8, 3)}-{item.Partition_ID.substr(11, 4)}</Text>
                  </TouchableOpacity>
                 }
                 keyExtractor={(item, index) => index.toString()}
               />
               // <Contacts contacts={this.state.matchContacts} />
               <TouchableOpacity onPress={() => console.log(this.state.addedContacts)}>
                 <Text style={styles.contactName}>log contacts</Text>

               </TouchableOpacity>
             </View>
           </View>
       )

     }

   }

}

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: "center",
   },
   header: {
     fontSize: 29
   },
   contact: {
     width: '100%',
     height: 55
   },
   contactPhone: {
     fontSize: 14
   },
   contactName: {
     fontSize: 24
   },
   centerText: {
     alignItems: 'center',
     flex: 1,
     height: '90%',
     textAlign: 'center',
     justifyContent: 'center',
     marginTop: 14,
     marginBottom: 30
   },
 });
