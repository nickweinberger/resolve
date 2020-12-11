import React, {useState} from "react";
import { View, StyleSheet, Text, Picker, DatePicker, ScrollView, TouchableOpacity, KeyboardAvoidingView, Modal } from "react-native";
import { TextInput, Button, Divider } from "react-native-paper";
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Body, Right, Row, List } from 'native-base';

import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { Formik } from "formik";
import { useFormState, useFormDispatch } from "../../components/CreateChallengeFormContext";

import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';




export default (values) => {

  let thisChallengeValues = values.route.params.values

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <CardItem style={styles.item}>
          <Text>Name: <Text style={styles.itemValue}>{thisChallengeValues.challengeName}</Text></Text>
        </CardItem>
        <Divider />
        <CardItem style={styles.item}>
          <Text>Friends:<Text style={styles.itemValue}></Text></Text>
        </CardItem>
        <Divider />
        <CardItem style={styles.item}>
          <Text>Group Goal: <Text style={styles.itemValue}>{thisChallengeValues.lowerBound} - {thisChallengeValues.upperBound} {thisChallengeValues.activity} per {values.timeMetric}</Text></Text>
        </CardItem>
        <Divider />
        <CardItem style={styles.item}>
          <Text>Duration: <Text style={styles.itemValue}>{thisChallengeValues.weeks} weeks</Text></Text>
        </CardItem>
        <Divider />
        <CardItem style={styles.item}>
          <Text>My Goal: <Text style={styles.itemValue}>{thisChallengeValues.myGoal} {thisChallengeValues.activity} per {values.timeMetric}</Text></Text>
        </CardItem>
        <Divider />
        <CardItem style={styles.item}>
          <Text>When you miss: <Text style={styles.itemValue}>${thisChallengeValues.financialPenalty}</Text></Text>
        </CardItem>
        <Divider />
        <CardItem style={styles.item}>
          <Text>When you miss: <Text style={styles.itemValue}>${thisChallengeValues.financialPenalty}</Text></Text>
        </CardItem>
      </Card>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => {
            navigation.navigate("MyChallengesSwiper");
          }}
        >
        Join Challenge
        </Button>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  topText: {
    fontSize: 20,
    paddingHorizontal: 20,
    paddingBottom: '20%',
  },
  card: {
    marginTop: '2%',
    marginHorizontal: '2%',
    width: '90%'
  },
  button: {
    backgroundColor: '#e80000',
    marginTop: 40
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
    height: '10%'
  },
  itemValue: {
    fontWeight: 'bold',
    fontSize: 20,
  },

});
