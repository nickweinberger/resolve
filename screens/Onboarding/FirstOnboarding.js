import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const FirstOnboarding = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resolve</Text>
        <View style={styles.skipButton}>
          <Button color='black' title='Skip' onPress={() => navigation.navigate('HomeTab')} />
        </View>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text}>Your journey begins now</Text>
        <View style={styles.nextButton}>
          <Button color='white' title='Next' onPress={() => navigation.navigate('SecondOnboarding')} />
        </View>
        <View>
          <Text style={styles.progress}>1/2</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e80000',
    paddingTop: 30,
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 110
  },
  headerTitle: {
    fontSize: 30,
    padding: '2%',
    paddingTop: '0%',
    color: 'black',
    fontFamily: 'Thonburi-Bold',
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  title: {
    fontSize: 35,
    color: 'white',
    fontFamily: 'Thonburi',
  },
  textBox: {
    color: 'white',
    marginBottom: 260,
    marginTop: '55%',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
  skipButton: {
    marginLeft: '58%',
    marginTop: '0%',
  },
  nextButton: {
    marginTop: '60%'
  },
  progress: {
    fontSize: 15
  }

});


export default FirstOnboarding;
