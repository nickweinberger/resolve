import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
import { TextInput, Button, Card, Divider } from "react-native-paper";

import { Formik } from "formik";
import * as Contacts from 'expo-contacts';
import { useFormState, useFormDispatch } from "../../components/CreateChallengeFormContext";

import ContactsSearchBar from '../../components/ContactsSearchBar'
import GetContacts from '../../components/GetContacts'

export default ({ navigation }, props) => {
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

  // set Contacts = []
  const [contacts, setContacts] = useState([])

  const onChange = (addedContacts) => {
    setContacts(addedContacts)
    console.log(contacts)
  }

  console.log(props)

  if (props !== undefined) {

    console.log(props)

  // <GetContacts />
    return (
      <Formik
        innerRef={form}
        initialValues={formValues}
        initialErrors={formErrors}
        enableReinitialize
      >
        {({ values, errors, handleChange }) => (
          <View style={styles.container}>
            <View style={styles.centerText}>

              <Button
                mode="contained"
                style={styles.button}
                onPress={() => {
                  navigation.navigate("Stakes");
                }}
              >
              Next
              </Button>
              <TouchableOpacity onPress={addedContacts => onChange(addedContacts) }>
                <Text>Set</Text>
              </TouchableOpacity>
              <Text>    </Text>
              <TouchableOpacity onPress={() => handleChange('friends')('hah')}>
                <Text>Add to Card</Text>
              </TouchableOpacity>
              <Divider />
              <Card style={{ width: 200, height: 200, marginTop: 50 }}>
                <Text>{JSON.stringify(values, null, 2)}</Text>
              </Card>
            </View>
          </View>
        )}
      </Formik>
    );
  } else {

    return (null)
  }



};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '%',
    alignItems: 'center'
  },
  header: {
    fontSize: 29
  },
  input: {
    height: 50,
    width: 300,
    marginVertical: 20,
    color: 'blue'
  },
  button: {
    backgroundColor: '#e80000',
    marginTop: 40,
    marginBottom: 20
  },
  contactsView: {
    width: "100%",
    height: "60%",
    marginTop: '4%'
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
