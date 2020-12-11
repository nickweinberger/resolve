import React, {useState} from "react";
import { View, StyleSheet, Text, Picker, DatePicker, ScrollView, TouchableOpacity, KeyboardAvoidingView, Modal } from "react-native";
import { TextInput, Button, Divider } from "react-native-paper";
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Body, Right, Row, List } from 'native-base';


import { Formik } from "formik";
import { useFormState, useFormDispatch } from "../../components/CreateChallengeFormContext";

import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';




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


  // Range render function
  const renderPenalty = (values) => {
    if (values.customPenalty) {
      console.log(values.customPenalty)
      return (
          <CardItem style={styles.item}>
            <Text>Custom Penalty: <Text style={styles.itemValue}>{values.customPenalty}</Text></Text>
          </CardItem>
      )
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
              <Text>Group Goal: <Text style={styles.itemValue}>{values.lowerBound} - {values.upperBound} {values.activity} per {values.timeMetric}</Text></Text>
            </CardItem>
            <Divider />
            <CardItem style={styles.item}>
              <Text>Duration: <Text style={styles.itemValue}>{values.weeks} weeks</Text></Text>
            </CardItem>
            <Divider />
            <CardItem style={styles.item}>
              <Text>My Goal: <Text style={styles.itemValue}>{values.myGoal} {values.activity} per {values.timeMetric}</Text></Text>
            </CardItem>
            <Divider />
            <CardItem style={styles.item}>
              <Text>When you miss: <Text style={styles.itemValue}>${values.financialPenalty}</Text></Text>
            </CardItem>
            <Divider />
            {renderPenalty(values)}
          </Card>

            <Button
              mode="contained"
              style={styles.button}
              onPress={() => {
                navigation.navigate("DateAndSubmit");
              }}
            >
            Finalize
            </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  topText: {
    fontSize: 20,
    paddingHorizontal: 20,
    paddingBottom: '20%',
  },
  card: {
    marginTop: '7%',
    marginHorizontal: '2%',
    marginBottom: 40,
    width: '90%'
  },
  button: {
    backgroundColor: '#e80000',
    marginTop: 0
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
    height: '14%'
  },
  itemValue: {
    fontWeight: 'bold',
    fontSize: 20,
  },

});
