import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';

import { Formik } from "formik";
import { useFormState, useFormDispatch } from "../../components/CreateChallengeFormContext";

import * as SMS from 'expo-sms';

const deepLink = 'exp://192.168.1.44:19000'


// Expo messages function
async function smsfunction(values) {
  const isAvailable = await SMS.isAvailableAsync();
  if (isAvailable) {
    const { result } = await SMS.sendSMSAsync(
      [],
      `Nick has invited you to his challenge, "${values.challengeName}" on his new app,  Click here: ${deepLink}`,
    );
  } else {
    console.log('no SMS on this device')
  }
}

export default ({ navigation }) => {
  const form = React.useRef();
  const dispatch = useFormDispatch();
  const { values: formValues, errors: formErrors } = useFormState("challenge");

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

  return (
    <Formik
      innerRef={form}
      initialValues={formValues}
      initialErrors={formErrors}
      enableReinitialize
    >
      {({ values, errors, handleChange }) => (
        <View style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                <Ionicons name="ios-arrow-round-back" size={35} color="black" />
                <View style={styles.SeparatorLine} />
            </TouchableOpacity>
            <Text style={styles.header}>Invite your friends via text!</Text>
          </View>
          <Button
            mode="contained"
            style={{ marginTop: '10%', height: 40, width: 200, justifyContent: 'center', backgroundColor: '#e80000'}}
            onPress={() => (smsfunction(values))}
          >
          Send Message
          </Button>
        </View>
      )}
    </Formik>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  input: {
    height: 50,
    width: 300,
    marginVertical: '5%',
    color: 'blue'
  },
  header: {
    fontSize: 30,
    marginTop: '5%',
    marginBottom: '20%'
  },
  icon: {
    marginRight: '6%',
    marginTop: '4%'
  }
});
