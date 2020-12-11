import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { TextInput, Card, Button} from "react-native-paper";

// Form imports
import { Formik } from "formik";
import * as Yup from 'yup'

// Import Async Storage for saving account data locally
import AsyncStorage from '@react-native-community/async-storage';

import { useFormState, useFormDispatch } from "../components/CreateAccountFormContext";


// Create Account Form Validation
const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .label('phoneNumber')
    .required('Please enter a 10 digit phone number')
    .min(10, 'Phone number must have at least 10 digits'),
  password: Yup.string()
    .label('Password')
    .required('Please enter a password')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must contain 8 Characters, One Letter, One Number"),
  confirmPassword: Yup.string()
    .label('Password')
    .required('Please confirm your password')
    .oneOf([Yup.ref("password"), null], "Passwords must match")
})

// Require Axios
const axios = require('axios').default;


// Function to store userID in AsyncStorage
const storeUserID = async (values) => {
  try {

    // save userID in async storage (userid = user-"phonenumber")
    await AsyncStorage.setItem("userID", `user-${values.phone}`);

  } catch (error) {
    console.log("Something went wrong", error);
  }
}


// Create Account Request Function
async function createAccount(values, {navigation}) {

  // if phone number is 10 digits
  if (values.phone.length === 10 && values.password.length > 0) {

    // axios post
    axios.post('https://t31amiwnaf.execute-api.us-east-1.amazonaws.com/dev/create-account',
    {"name":values.name, "phone":values.phone, "password":values.password})
    .then((response) => {
      console.log(response);
      // if successful
      if (response.data.account_created === true) {

        // Store user ID in async storage
        storeUserID(values)

        // navigate to onboarding
        navigation.navigate('FirstOnboarding')
      }
    }, (error) => {
      console.log("This is the error: " + error);
    });
    console.log('correct input')
  } else {
    console.log('registration error')
  }
}

export default ({ navigation }) => {
  const form = React.useRef();
  const dispatch = useFormDispatch();
  const { values: formValues, errors: formErrors } = useFormState("user");

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      if (form.current) {
        const { values, errors } = form.current;
        dispatch({
          type: "UPDATE_FORM",
          payload: {
            id: "user",
            data: { values, errors }
          }
        });
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Formik
      innerRef={form}
      initialValues={formValues}
      initialErrors={formErrors}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ values, errors, handleChange, isValid, touched, handleBlur }) => (

          <ScrollView style={styles.container}>
            <View style={styles.titleView}>
              <Text style={styles.createAccount}>Create Account</Text>
            </View>
            <View style={styles.center}>
              <TextInput
                mode='flat'
                maxLength = {35}
                autoCapitalize="words"
                theme={{
                   colors: {
                              placeholder: 'gray', text: 'black', primary: 'black',
                              underlineColor: 'transparent', background: 'white'
                      }
                }}
                label="Display Name"
                value={values.name}
                onChangeText={handleChange("name")}
                style={styles.input}
              />
              <TextInput
                mode='flat'
                maxLength = {10}
                onBlur={handleBlur('phone')}
                keyboardType='numeric'
                autoCapitalize="words"
                theme={{
                   colors: {
                              placeholder: 'gray', text: 'black', primary: 'black',
                              underlineColor: 'transparent', background: 'white'
                      }
                }}
                label="Phone Number"
                value={values.phone}
                onChangeText={handleChange("phone")}
                style={styles.input}
              />
              <Text style={styles.errors}>{touched.phone && errors.phone}</Text>
              <TextInput
                mode='flat'
                maxLength = {15}
                onBlur={handleBlur('password')}
                autoCapitalize="words"
                theme={{
                   colors: {
                              placeholder: 'gray', text: 'black', primary: 'black',
                              underlineColor: 'transparent', background: 'white'
                      }
                }}
                label="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                style={styles.input}
              />
              <Text style={styles.errors}>{touched.password && errors.password}</Text>
              <TextInput
                mode='flat'
                maxLength = {15}
                onBlur={handleBlur('confirmPassword')}

                autoCapitalize="words"
                theme={{
                   colors: {
                              placeholder: 'gray', text: 'black', primary: 'black',
                              underlineColor: 'transparent', background: 'white'
                      }
                }}
                label="Confirm Password"
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                style={styles.input}
              />
              <Text style={styles.errors}>{touched.confirmPassword && errors.confirmPassword}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => (createAccount(values, {navigation}))}
                disabled={!isValid}
              >
                <Text>Create Account</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e80000',
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 110
  },
  center: {
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 30,
    padding: '2%',
    paddingTop: '%',
    color: 'black',
    fontFamily: 'Thonburi-Bold',
  },
  header: {
      flexDirection: 'row'
  },
  titleView: {
    alignItems: 'center',
    marginBottom: '5%',
    marginTop: '7%',
  },
  title: {
    fontSize: 35,
    color: 'white',
    fontFamily: 'Thonburi',
  },
  createAccount: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  },
  input: {
    height: 50,
    width: 300,
    marginVertical: 20,
    marginTop: '1%',
    fontSize: 23,
    alignSelf: 'center'
  },
  button: {
    backgroundColor: '#c1e7f5',
    marginTop: '2%',
    width: '60%',
    height: '10%',
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
  errors: {
    color: 'black',
    marginTop: '-3%',
    marginBottom: '2%'
  },
  errorBottom: {
    marginTop: '5%'
  }

});
