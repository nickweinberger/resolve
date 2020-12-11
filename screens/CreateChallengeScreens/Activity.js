import * as React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button, Card, Text } from "react-native-paper";

import { Formik } from "formik";
import { useFormState, useFormDispatch } from "../../components/CreateChallengeFormContext";

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
    <View style={styles.container}>
      <Text style={styles.header}>Suggested</Text>
      <TouchableOpacity style={styles.topButton} onPress={() => navigation.navigate('Name')}>
        <Text style={styles.text} >Workouts</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Name')}>
        <Text style={styles.text} >Meditation</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Name')}>
        <Text style={styles.text}>Cycling</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Name')}>
        <Text style={styles.text}>Running</Text>
      </TouchableOpacity>
      <Text style={styles.header2}>Or</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Name')}>
        <Text style={styles.text}>Custom</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    alignItems: 'center'
  },
  header: {
    fontSize: 30,
    paddingTop: '4%',
    marginBottom: '-5%'
  },
  header2: {
    fontSize: 30,
    paddingTop: '6%',
    marginBottom: '0%'
  },
  topButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e80000',
    width: '65%',
    height: '10%',
    marginTop: '10%%',
    borderRadius:6,
    shadowColor: "#e80000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e80000',
    width: '65%',
    height: '10%',
    marginTop: '7%',
    borderRadius:6,
    shadowColor: "#e80000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  text: {
    color: 'white',
    fontSize: 25
  }
});
