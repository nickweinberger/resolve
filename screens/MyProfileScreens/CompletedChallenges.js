import 'react-native-gesture-handler';

// React imports
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableWithoutFeedback, TouchableOpacity, Icon, FlatList, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Left, Body, Right, Row, List } from 'native-base';
import { ActivityIndicator, TextInput, Divider } from 'react-native-paper';


// Import navigation
import { Ionicons } from '@expo/vector-icons';

// Time manipulation import
import moment from 'moment';

// Import Async Storage for UID
import AsyncStorage from '@react-native-community/async-storage';

// Require Axios
const axios = require('axios').default;



class CompletedChallenges extends Component {

  constructor(props) {
    super(props);
    this.state = {
        challenges: null,
        completedChallenges: null,
        isLoading: true
    };

  };

  componentDidMount() {

    // Get challenges function
    const getChallenges = async () => {
    // Get userID from AsyncStorage
      let userID = await AsyncStorage.getItem('userID')

      // Insert userID into get request URL
      const url = `https://t31amiwnaf.execute-api.us-east-1.amazonaws.com/dev/get-challenges?uid=${userID}`

      // Get request
      axios.get(url)
      .then((response) => {

        if (response.data.challenges) {

          // set state challenges = challenges from response, loading to false
          this.setState({ challenges: response.data.challenges, isLoading: false })

          // console.log(this.state.challenges)

          // create empty array
          let completedChallenges = []

          // Go through each challenge
          for (let i = 0; i < this.state.challenges.length; i++) {

              // formatted current date for moment
              var rightNow = new Date();
              var today = rightNow.toISOString().slice(0,10);

              // Formatted end date for moment
              var formattedEndDate = this.state.challenges[i].endDate.slice(0,10);

              // console.log(formattedEndDate)

              // if enddate is before today
              if (moment(formattedEndDate).isBefore(today)) {

                completedChallenges.push(this.state.challenges[i])
                // console.log(this.state.challenges[i])

              }

          }

          // set state of completedChallenges
          if (completedChallenges.length > 0) {
            this.setState({ completedChallenges: completedChallenges})
          }
        }

      }, (error) => {
        console.log("This is the error: " + error);
      });
    }

    // Call the above function to change state based on challenges in get Request
    getChallenges()

  }


  render() {


    // Import navigation inside render
    const { navigation } = this.props;

    if (this.state.completedChallenges !== null) {
        return (
          <ScrollView style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                  <Ionicons name="ios-arrow-round-back" size={35} color="black" />
                  <View style={styles.SeparatorLine} />
              </TouchableOpacity>
              <Text style={styles.headerText}>
                Completed Challenges
              </Text>
            </View>
            {this.state.completedChallenges.map((challenge, e) => (
            <View style={styles.cardContainer} key={challenge.Partition_ID}>
              <Card style={styles.card}>
                <CardItem>
                  <Body style={styles.cardHeader}>
                    <Text style={styles.cardHeaderText}>{challenge.challengeName}</Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Body style={styles.cardHeader}>
                    <Text style={styles.metrics}></Text>
                    <Text style={styles.metrics}>{challenge.goal} {challenge.activity} / {challenge.timeMetric} </Text>
                    <Text style={styles.metrics}>for {challenge.weeks} weeks</Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text style={styles.metrics}>Ended: {challenge.endDateString.slice(0,10)}</Text>
                  </Body>
                </CardItem>

              </Card>
            </View>
              ))
            }
          </ScrollView>
        );
      } else if (this.state.isLoading === true) {

          // while loading
          return (
            <Container style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                  <Ionicons name="ios-arrow-round-back" size={35} color="black" />
                  <View style={styles.SeparatorLine} />
              </TouchableOpacity>
              <Text style={styles.headerText}>
                Completed Challenges
              </Text>
            </View>
              <View style={styles.centerText}>
                <ActivityIndicator animating={true} color='#e80000' />
              </View>
            </Container>
          )
        } else {

          // if no Challenges
          return (
            <Container style={styles.container}>
              <View style={styles.header}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={35} color="black" />
                    <View style={styles.SeparatorLine} />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                  Completed Challenges
                </Text>
              </View>
              <View style={styles.centerText}>
                <Text>You have not completed any challenges so far</Text>
              </View>
            </Container>
          )
        }
    };
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8ff',

  },
  cardContainer: {
    justifyContent: 'center',
    marginVertical: '3%'
  },
  card: {
     height: 150,
     alignSelf: 'center',
     width: '90%',
     borderWidth: 0,
  },
  header: {
    height: 70,
    width: "100%",
    backgroundColor: '#e80000',
    flexDirection: 'row'
  },
  headerText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 25,
    paddingTop: '8%',
    paddingLeft: '11%'
  },
  icon: {
    paddingLeft: '3%',
    paddingTop: '8%'
  },
  item: {
    fontSize: 30
  },
  back: {
    paddingLeft: '3%',
    paddingTop: '7%'
  },
  close: {
    paddingLeft: '28%',
    paddingTop: '9%'
  },
  centerText: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  cardHeaderText: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    fontSize: 20,
    textAlign: 'center'
  },


});

export default CompletedChallenges;
