import * as React from "react";
import { View, StyleSheet, Text, Picker, DatePicker, ScrollView, KeyboardAvoidingView } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";

import { Formik } from "formik";
import * as Yup from 'yup'
import { useFormState, useFormDispatch } from "../../components/CreateChallengeFormContext";

import DropDownPicker from 'react-native-dropdown-picker';


// Goal Validation
const validationSchema = Yup.object().shape({
  upperBound: Yup.string()
    .label('upperBound')
    .required('Upper Bound must be >= Lower Bound'),
  myGoal: Yup.string()
    .label('myGoal')
      .required('Goal must be within the above range'),
})

export default ({ navigation }) => {
  const form = React.useRef();
  const dispatch = useFormDispatch();
  const { values: formValues, errors: formErrors } = useFormState("challenge");

  // // Upper/Lower bound logic
  // const renderUpperError = (values) => {
  //   if (parseInt(values.upperBound, 10) < (parseInt(values.lowerBound, 10))) {
  //      return <Text style={{ color: 'red' }}>Upper Bound must be >= Lower Bound</Text>
  //   }
  // }
  //
  // // MyGoal range logic
  // const renderBottomError = (values) => {
  //   if ((parseInt(values.myGoal, 10)) < (parseInt(values.lowerBound, 10)) || (parseInt(values.myGoal, 10)) > (parseInt(values.upperBound, 10))) {
  //      return <Text style={{ color: 'red', marginBottom: '-6%', marginTop: '2%' }}>Goal must be within above range</Text>
  //   }
  // }

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
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ values, errors, handleChange, touched }) => (
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
          <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: "center"}}
            keyboardShouldPersistTaps='handled'
            bounces='false'
          >
            <View style={styles.row}>
              <TextInput
                mode='outlined'
                maxLength = {3}
                keyboardType='numeric'
                theme={{
                   colors: {
                              placeholder: 'gray', text: 'black', primary: 'black',
                              underlineColor: 'transparent', background: 'white'
                      }
                }}
                label="Goal"
                value={values.goal}
                onChangeText={handleChange("goal")}
                style={styles.leftInput}
              />
              <TextInput
                mode='outlined'
                autoCapitalize="words"
                maxLength = {20}
                theme={{
                   colors: {
                              placeholder: 'gray', text: 'black', primary: 'black',
                              underlineColor: 'transparent', background: 'white'
                      }
                }}
                label="Metric"
                value={values.activity}
                onChangeText={handleChange("activity")}
                style={styles.rightInput}
              />
            </View>
            <Text style={styles.text}>e.g.: "5 Miles," "10 Minutes," or "3 Times"</Text>
            <View style={styles.firstRow}>
              <Text style={styles.firstRowText}>Per</Text>
              <DropDownPicker
                placeholder="Day or Week"
                placeholderStyle={{
                    fontSize: 15,
                    color: 'gray',
                    textAlign: 'center'
                }}
                items={[
                    {label: 'Day', value: 'Day'},
                    {label: 'Week', value: 'Week'},
                ]}
                defaultIndex={0}
                containerStyle={{height: 50, width: 200, marginBottom: '13%',
                  borderWidth: 1, borderRadius: 4, borderColor: 'transparent'}}
                dropDownStyle={{marginTop: 2, height: 90}}
                labelStyle={{
                    fontSize: 22,
                    fontWeight: '300',
                    textAlign: 'left',
                }}
                onChangeItem={(item) => handleChange('timeMetric')(item.value)}
                />
            </View>
            <View style={styles.secondRow}>
              <Text style={styles.secondRowText}>For</Text>
              <TextInput
                mode='outlined'
                keyboardType='numeric'
                maxLength = {2}
                theme={{
                   colors: {
                              placeholder: 'gray', text: 'black', primary: 'black',
                              underlineColor: 'transparent', background: 'white'
                      }
                }}
                label="#"
                placeholder='#'
                value={values.weeks}
                onChangeText={handleChange("weeks")}
                style={styles.input}
              />
              <Text style={styles.secondRowText}>Weeks</Text>
            </View>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => {
                navigation.navigate("Stakes");
              }}
            >
            Next
            </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  topText: {
    fontSize: 15,
    paddingHorizontal: 20,
    paddingTop: '6%',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#e80000',
    marginTop: '10%'
  },
  leftInput: {
    height: 50,
    width: '30%',
    marginBottom: '5%',
    marginHorizontal: '4%',
    fontSize: 24,
  },
  rightInput: {
    height: 50,
    width: '50%',
    marginBottom: '5%',
    marginHorizontal: '4%',
    fontSize: 24,
  },
  input: {
    height: 50,
    width: '30%',
    marginVertical: '10%',
    marginHorizontal: '4%',
    fontSize: 24,
  },
  input2: {
    height: 50,
    width: '30%',
    marginVertical: '10%',
    marginBottom: '0%',
    marginHorizontal: '4%',
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: '-2%',
    marginTop: '5%'
  },
  firstRow: {
    flexDirection: 'row',
    marginTop: '8%'
  },
  firstRowText: {
    marginTop: '4%',
    fontSize: 20,
    marginRight: '4%',
    fontWeight: 'bold'
  },
  secondRow: {
    flexDirection: 'row',
    marginTop: '5%',
    marginBottom: '1%',
  },
  secondRowText: {
    marginTop: '16%',
    fontSize: 20,
    marginRight: '2%',
    fontWeight: 'bold'
  },
  top: {
    flexDirection: 'row',
    paddingTop: 10,
    alignItems: 'center'
  },
  text: {
    fontSize: 19,
  }

});
