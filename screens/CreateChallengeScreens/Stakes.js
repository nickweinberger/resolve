import * as React from "react";
import { useState } from "react";
import { View, StyleSheet, Text, ScrollView, KeyboardAvoidingView } from "react-native";
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
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
          <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: "center"}}
          keyboardShouldPersistTaps='handled'
          bounces='false'
          >
            <Text  style={styles.header}>When someone misses their goal:</Text>
            <View style={styles.row}>
              <Text style={styles.money}>$</Text>
              <TextInput
                mode='outlined'
                maxLength = {3}
                autoCapitalize="none"
                disabled={values.customPenalty}
                keyboardType='numeric'
                theme={{
                   colors: {
                              placeholder: 'gray', text: 'black', primary: 'black',
                              underlineColor: 'transparent', background: 'white'
                      }
                }}
                label="Financial Penalty"
                value={values.financialPenalty}
                onChangeText={handleChange("financialPenalty")}
                style={styles.financialInput}
              />
            </View>
            <Text style={styles.andor}>Or</Text>
            <TextInput
              mode='outlined'
              autoCapitalize="words"
              disabled={values.financialPenalty}
              maxLength = {30}
              theme={{
                 colors: {
                            placeholder: 'gray', text: 'black', primary: 'black',
                            underlineColor: 'transparent', background: 'white'
                    }
              }}
              label="Custom Penalty"
              value={values.customPenalty}
              onChangeText={handleChange("customPenalty")}
              style={styles.customInput}
            />
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => {
                navigation.navigate("Review");
              }}
            >
            Review
            </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center"
  },
  financialInput: {
    height: 50,
    width: 220,
    marginVertical: 20,
    fontSize: 20
  },
  customInput: {
    height: 50,
    width: 240,
    marginVertical: 20,
    fontSize: 20
  },
  money: {
    fontSize: 22,
    paddingTop: '11%',
    paddingRight: '2%',
    marginBottom: 0
  },
  andor: {
    fontSize: 22,
    marginVertical: '0%',
    fontWeight: 'bold'
  },
  header: {
    fontSize: 22,
    paddingTop: '9%',
    paddingRight: '2%',
    marginBottom: 0
  },
  row: {
    flexDirection: 'row'
  },
  button: {
    backgroundColor: '#e80000',
    marginTop: 40
  }

});
