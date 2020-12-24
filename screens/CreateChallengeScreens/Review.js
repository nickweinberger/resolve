import React, {useState} from "react";
import { View, StyleSheet, Text, Picker, DatePicker, ScrollView, TouchableOpacity, KeyboardAvoidingView, Modal } from "react-native";
import { TextInput, Button, Divider } from "react-native-paper";
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Body, Right, Row, List } from 'native-base';

import moment from 'moment';

// Import Async Storage for UID
import AsyncStorage from '@react-native-community/async-storage';

import { Formik } from "formik";
import { useFormState, useFormDispatch } from "../../components/CreateChallengeFormContext";

import DateTimePicker from '@react-native-community/datetimepicker';

export default ({ navigation }) => {
  const form = React.useRef();
  const dispatch = useFormDispatch();
const axios = require('axios').default;
  const { values: formValues, errors: formErrors } = useFormState("challenge");

   // Date Picker Logic
   const [date, setDate] = useState(new Date());
   const [mode, setMode] = useState('date');
   const [show, setShow] = useState(false);
 
   const onChange = (event, selectedDate) => {
     setDate(currentDate)
     const currentDate = selectedDate || date;
     setShow(Platform.OS === 'ios');
     setDate(currentDate);
     // console.log(currentDate)
   }; 

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      if (form.current) {
        const { values, errors } = form.current;
        dispatch({
          type: "UPDATE_FORM",
          payload: {
            id: "challenge",
            data: { values, errors }
          }
        });
      }
    });

    return unsubscribe;
  }, [navigation]);


  // Range render function
  const renderPenalty = (values) => {
    console.log(values)
    if (values.customPenalty) {
      console.log(values.customPenalty)
      return (
          <CardItem style={styles.item}>
            <Text>Custom Penalty: <Text style={styles.itemValue}>{values.customPenalty}</Text></Text>
          </CardItem>
      )
    }
  }

  // Create Challenge Function
async function createChallenge(values) {

  console.log(values)

  if (values) {
    console.log(JSON.stringify(values))
    axios.post('https://t31amiwnaf.execute-api.us-east-1.amazonaws.com/dev/create-challenge',
    JSON.stringify(values))
    .then((response) => {
      console.log(response);
      navigation.navigate("MyChallengesSwiper")
      alert(`"${values.challengeName}" created! Swipe up to refresh`)
    }, (error) => {
      console.log("This is the error: " + error);
    });
    console.log('correct input')
  } else {
    console.log('registration error')
  }
}

  return (
    <Formik
      innerRef={form}
      initialValues={formValues}
      initialErrors={formErrors}
      enableReinitialize
    >
      {({ values, errors, handleChange }) => (
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', backgroundColor: 'transparent', justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
          <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: "center"}}
            keyboardShouldPersistTaps='handled'
          >
          <Card style={styles.card}>
            <CardItem style={styles.item}>
              <Text>Name: <Text style={styles.itemValue}>{values.challengeName}</Text></Text>
            </CardItem>
            <Divider />
            <CardItem style={styles.item}>
              <Text>Group goal: <Text style={styles.itemValue}>{values.goal} {values.activity} per {values.timeMetric}</Text></Text>
            </CardItem>
            <Divider />
            <CardItem style={styles.item}>
              <Text>Duration: <Text style={styles.itemValue}>{values.weeks} Weeks</Text></Text>
            </CardItem>
            <Divider />
            <Divider />
            {(values.customPenalty || values.financialPenalty) &&
            <CardItem style={styles.item}>
              <Text>Stakes:<Text style={styles.itemValue}> {values.financialPenalty ? `$${values.financialPenalty}` : `${values.customPenalty}`}</Text>
              </Text>
            </CardItem>}
          </Card>
          <Text style={styles.title}>Select a Start Date:</Text>
          {Platform.OS === 'ios' && (
              <DateTimePicker
                minimumDate={new Date(2020, 7, 4)}
                maximumDate={new Date(2022, 11, 31)}
                style={styles.showDatePicker}
                testID="dateTimePicker"
                value={date}
                mode={mode}
                display="default"
                onChange={onChange}
              />
          )}
          <Button
            mode="contained"
            style={styles.button}
            onPress={( ) => {
              dispatch({
                type: "UPDATE_FORM",
                payload: {
                  id: "customer",
                  data: { values, errors }
                }
              });

              // Function to create new object with userID inside
              const insertUserID = async () => {

                try {
                  let userID = await AsyncStorage.getItem('userID')

                  console.log('this is my userID: ' + userID)

                  // Create New Object to be stringified in Post Request
                  let newValue = {
                      ...values
                  };

                  // Create usable date string
                  let dateString = date.toString()


                  // create endDate using # of weeks in form input
                  var endDate = moment(date, "DD-MM-YYYY").add(values.weeks, 'weeks');

                  // create endDate string
                  let endDateString = endDate.toString()


                  // Add user ID, startDate, endDate info to New Object
                  newValue.uid = userID;
                  newValue.startDate = date;
                  newValue.startDateString = dateString;
                  newValue.endDate = endDate
                  newValue.endDateString = endDateString


                  // Call create challenge with new object
                  createChallenge(newValue)
                } catch (error) {
                  console.log("Something went wrong", error);
                }
              }

              // Call above function
              insertUserID()
              }}
          >
          Create Challenge
          </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginTop: '4%',
  },
  topText: {
    fontSize: 20,
    paddingHorizontal: 20,
    paddingBottom: '20%',
  },
  card: {
    marginTop: '7%',
    marginHorizontal: '2%',
    height: '50%',
    width: '90%'
  },
  button: {
    marginTop: '12%', 
    backgroundColor: '#e80000',
    width: '60%',
    justifyContent: 'center',
    fontSize: 16,
    height: 40
  },
  leftInput: {
    height: 50,
    width: '30%',
    marginBottom: '5%',
    marginHorizontal: '4%',
    fontSize: 20,
  },
  rightInput: {
    height: 50,
    width: '50%',
    marginBottom: '5%',
    marginHorizontal: '4%',
    fontSize: 20,
  },
  input: {
    height: 50,
    width: '30%',
    marginVertical: '10%',
    marginHorizontal: '4%',
    fontSize: 20,
  },
  item: {
    width: '100%',
    height: '25%'
  },
  itemValue: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  showDatePicker: {
    marginTop: 1,
    width: '30%',
    marginTop: 10,
  },

});
