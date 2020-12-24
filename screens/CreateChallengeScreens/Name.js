import * as React from "react";
import { View, StyleSheet, Text, Picker } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";

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
    <Formik
      innerRef={form}
      initialValues={formValues}
      initialErrors={formErrors}
      enableReinitialize
    >
      {({ values, errors, handleChange }) => (
        <View style={styles.container}>
        <Text style={styles.text}>Personalize Your Challenge!
        </Text>
          <TextInput
            mode='outlined'
            maxLength = {35}
            autoCapitalize="words"
            theme={{
               colors: {
                          placeholder: 'gray', text: 'black', primary: 'black',
                          underlineColor: 'transparent', background: 'white'
                  }
            }}
            label="Challenge Name"
            value={values.challengeName || ''}
            onChangeText={handleChange("challengeName")}
            style={styles.input}
          />
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => {
              navigation.navigate("Goal");
            }}
          >
          Next
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
    marginVertical: 20,
    marginTop: '5%',
    fontSize: 20
  },
  text: {
    marginTop: '10%',
    fontSize: 24
  },
  button: {
    backgroundColor: '#e80000',
    marginTop: 40
  }
});
