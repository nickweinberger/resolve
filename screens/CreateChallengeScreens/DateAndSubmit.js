// import React, {useState}  from "react";
// import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
// import { useNavigation } from '@react-navigation/native';

// import { TextInput, Button } from "react-native-paper";
// import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Body, Right, Row, List } from 'native-base';

// import { Ionicons } from '@expo/vector-icons';

// // Import Async Storage for UID
// import AsyncStorage from '@react-native-community/async-storage';

// // Form imports
// import { Formik } from "formik";
// import { useFormState, useFormDispatch } from "../../components/CreateChallengeFormContext";

// // Time Picker imports
// import DateTimePicker from '@react-native-community/datetimepicker';

// // Time manipulation import
// import moment from 'moment';



// // Require Axios
// const axios = require('axios').default;

// // Create Account Request Function
// async function createChallenge(values) {

//   console.log(values)

//   // if (values) {
//   //   console.log(JSON.stringify(values))
//   //   axios.post('https://t31amiwnaf.execute-api.us-east-1.amazonaws.com/dev/create-challenge',
//   //   JSON.stringify(values))
//   //   .then((response) => {
//   //     console.log(response);

//   //   }, (error) => {
//   //     console.log("This is the error: " + error);
//   //   });
//   //   console.log('correct input')
//   // } else {
//   //   console.log('registration error')
//   // }
// }

// export default ({ navigation }) => {
//   const form = React.useRef();
//   const dispatch = useFormDispatch();
//   const { values: formValues, errors: formErrors } = useFormState("challenge");

//   React.useEffect(() => {
//     const unsubscribe = navigation.addListener("blur", () => {
//       if (form.current) {
//         const { values, errors } = form.current;
//         dispatch({
//           type: "UPDATE_FORM",
//           payload: {
//             id: "challenge",
//             data: { values, errors }
//           }
//         });
//       }
//     });

//     return unsubscribe;
//   }, [navigation]);

//   // Date Picker Logic
//   const [date, setDate] = useState(new Date());
//   const [mode, setMode] = useState('date');
//   const [show, setShow] = useState(false);

//   const onChange = (event, selectedDate) => {
//     setDate(currentDate)
//     const currentDate = selectedDate || date;
//     setShow(Platform.OS === 'ios');
//     setDate(currentDate);
//     // console.log(currentDate)
//   }; 

//   return (
//     <Formik
//       innerRef={form}
//       initialValues={formValues}
//       initialErrors={formErrors}
//       enableReinitialize
//     >
//       {({ values, errors }) => (
//         <View style={styles.container}>
//           <View style={styles.topRow}>
//             <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
//                 <Ionicons name="ios-arrow-round-back" size={40} color="black" />
//                 <View style={styles.SeparatorLine} />
//             </TouchableOpacity>
//             <Text style={styles.title}>Select a Start Date</Text>
//           </View>
//           <Text style={{ marginBottom: 10, marginTop: 10}}>We suggest leaving a few days to let everyone sign up!</Text>
//           {Platform.OS === 'ios' && (
//               <DateTimePicker
//                 minimumDate={new Date(2020, 7, 4)}
//                 maximumDate={new Date(2022, 11, 31)}
//                 style={styles.showDatePicker}
//                 testID="dateTimePicker"
//                 value={date}
//                 mode={mode}
//                 display="default"
//                 onChange={onChange}
//               />
//           )}
//           <Button
//             mode="contained"
//             style={{ marginTop: '10%', backgroundColor: '#e80000'}}
//             onPress={( ) => {
//               dispatch({
//                 type: "UPDATE_FORM",
//                 payload: {
//                   id: "customer",
//                   data: { values, errors }
//                 }
//               });

//               // Function to create new object with userID inside
//               const insertUserID = async () => {

//                 try {
//                   let userID = await AsyncStorage.getItem('userID')

//                   console.log('this is my userID: ' + userID)

//                   // Create New Object to be stringified in Post Request
//                   let newValue = {
//                       ...values
//                   };

//                   // Create usable date string
//                   let dateString = date.toString()


//                   // create endDate using # of weeks in form input
//                   var endDate = moment(date, "DD-MM-YYYY").add(values.weeks, 'weeks');

//                   // create endDate string
//                   let endDateString = endDate.toString()


//                   // Add user ID, startDate, endDate info to New Object
//                   newValue.uid = userID;
//                   newValue.startDate = date;
//                   newValue.startDateString = dateString;
//                   newValue.endDate = endDate
//                   newValue.endDateString = endDateString


//                   // Call create challenge with new object
//                   createChallenge(newValue)

//                   alert(`Challenge: ${values.challengeName} created! Swipe up to refresh`)


//                 } catch (error) {
//                   console.log("Something went wrong", error);
//                 }
//               }

//               // Call above function
//               insertUserID()

//               navigation.navigate("MyChallengesSwiper")

//               }}
//           >
//           Create Challenge
//           </Button>
//         </View>
//       )}
//     </Formik>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     marginTop: 10
//   },
//   topRow: {
//     flexDirection: 'row',
//   },
//   icon: {
//     marginLeft: '-20%',
//     marginRight: '13%',
//     marginTop: '2.5%'
//   },
//   card: {
//     marginTop: '2%',
//     marginHorizontal: '2%',
//     width: '80%'
//   },
//   title: {
//     fontSize: 30,
//     marginTop: '4%',
//     marginBottom: '0%'
//   },
//   button: {
//     backgroundColor: '#e80000',
//     marginTop: 40
//   },
//   header: {
//     paddingTop: '10%',
//     alignItems: 'center',
//     textAlign: 'center',
//     marginTop: -17,
//   },
//   headerText: {
//     color: 'black',
//     fontWeight: 'bold',
//     fontFamily: 'Helvetica',
//     fontSize: 25,
//     textAlign: 'center'
//   },
//   name: {
//     color: 'black',
//     fontFamily: 'Helvetica',
//     fontSize: 25,
//   },
//   showDatePicker: {
//     marginTop: 1,
//     width: '30%',
//     marginTop: 20,
//     marginBottom: '5%'
//   },

// });
