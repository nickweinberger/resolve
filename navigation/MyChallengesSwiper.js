import 'react-native-gesture-handler';

import React, {Component} from 'react';
import { StyleSheet, View, Text, Image, ListItem, Button, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import { ActivityIndicator, TextInput, Divider } from 'react-native-paper';
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Body, Right, Row, List } from 'native-base';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// Alert import
import AwesomeAlert from 'react-native-awesome-alerts';

// Swiper and Pull refresh imports
import Swiper from 'react-native-swiper'
import PTRView from 'react-native-pull-to-refresh';

// Icon imports
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

// Import Async Storage for UID
import AsyncStorage from '@react-native-community/async-storage';

// Time manipulation import
import moment from 'moment';

// Require Axios
const axios = require('axios').default;


// Component for displaying challenges in the My Challenges tab of HomeTab
class MyChallengesSwiper extends Component {

  constructor(props) {
    super(props);
    this.state = {
        activeChallenges: [],
        challenges: null,
        segment: 0,
        loggedActivity: null,
        isLoading: true,
        reload: true,
        loggingActivity: false,
    };
  };

  handleLoggedActivity = text => {
    this.setState({ loggedActivity: text, loggingActivity: true });
  };

  componentDidMount() {

    // this.setState({ segment: 1})

    // // call above function
    // setSegment()

    // Get challenges function
    const getChallenges = async () => {
    // Get userID from AsyncStorage
      let userID = await AsyncStorage.getItem('userID')

      // Insert userID into get request URL
      const url = `https://t31amiwnaf.execute-api.us-east-1.amazonaws.com/dev/get-challenges?uid=${userID}`

      // Get request
      axios.get(url)
      .then((response) => {

          // create empty array
          let activeChallenges = []


          // Go through each challenge
          for (let i = 0; i < response.data.challenges.length; i++) {

              // formatted current date for moment
              var rightNow = new Date();
              var today = rightNow.toISOString().slice(0,10);

              // Formatted end date for moment
              var formattedEndDate = response.data.challenges[i].endDate.slice(0,10);


              // if enddate is before today
              if (moment(formattedEndDate).isSameOrAfter(today)) {

                // add to array of active challenges
                activeChallenges.push(response.data.challenges[i])

              }
          }

          // set state challenges = activeChallenges from response, loading to false
          if (activeChallenges.length > 0) {
            this.setState({ activeChallenges: activeChallenges})
          }

          // set state of loading to false regardless
          this.setState({ isLoading: false })


      }, (error) => {
        console.log("This is the error: " + error);
      });
    }

    // Call the above function to change state based on challenges in get Request
    getChallenges()

  }

  render() {

    // Function to get challenges without reloading app
    const getChallenges = async () => {

    // Get userID from AsyncStorage
      let userID = await AsyncStorage.getItem('userID')

      // Insert userID into get request URL
      const url = `https://t31amiwnaf.execute-api.us-east-1.amazonaws.com/dev/get-challenges?uid=${userID}`

      // Get request
      axios.get(url)
      .then((response) => {

          // create empty array
          let activeChallenges = []


          // Go through each challenge
          for (let i = 0; i < response.data.challenges.length; i++) {

              // formatted current date for moment
              var rightNow = new Date();
              var today = rightNow.toISOString().slice(0,10);

              // Formatted end date for moment
              var formattedEndDate = response.data.challenges[i].endDate.slice(0,10);


              // if enddate is before today
              if (moment(formattedEndDate).isSameOrAfter(today)) {

                // add to array of active challenges
                activeChallenges.push(response.data.challenges[i])

              }
          }

          // set state challenges = activeChallenges from response, loading to false
          if (activeChallenges.length > 0) {
            this.setState({ activeChallenges: activeChallenges})
          }

          // set state of loading to false regardless
          this.setState({ isLoading: false })

      }, (error) => {
        console.log("This is the error: " + error);
      });
    }

    // Function to log progress within the challenge
    const logProgress = async (values, challenge) => {

    // Get userID from AsyncStorage
      let userID = await AsyncStorage.getItem('userID')

      // Insert userID into get request URL
      const url = `https://t31amiwnaf.execute-api.us-east-1.amazonaws.com/dev/log-progress`

      console.log(JSON.stringify(values))

      // Get request
      axios.post(url, JSON.stringify(values))
      .then((response) => {
        console.log(response)

        // Alert success
        alert(`Successfully logged ${this.state.loggedActivity} ${challenge.activity}`)

      }, (error) => {

        console.log("This is the error: " + error);
      });
    }


    // Import navigation inside render
    const { navigation } = this.props;

    // Render regular swiper if loading is over and challenges exist
    if (this.state.isLoading === false && this.state.activeChallenges.length > 0) {

      // Custom Penalty logic
      const renderCustomPenalty = (challenge) => {
        if (challenge.customPenalty) {
          return (<Text style={styles.cardHeaderText}>Custom Penalty: {challenge.customPenalty}</Text>)
        }
      }

      // Workaround for custom back button syntax below
      const backButton = '<'

      // Range render function
      const renderRange = (challenge) => {
        if (challenge.upperBound === challenge.lowerBound) {
          return (<Text style={styles.metric}>{challenge.upperBound}</Text>)
        } else {
          return (<Text style={styles.metric}>{challenge.lowerBound} - {challenge.upperBound}</Text>)
        }
      }

      // conditional button rendering
      const renderButton = (challenge) => {

        // if not logging return, disabled gray button
        if (this.state.loggingActivity === false) {
          return (
            <TouchableOpacity style={styles.disabledLogButton} disabled={true}>
              <Text style={styles.disabledButtonText}>Log</Text>
            </TouchableOpacity>
          )
        } else {

          // if logging, return red, functional button
          return (

            <TouchableOpacity style={styles.logButton}
            onPress={() => {

              const createObject = async () => {

                try {

                // create challenge object
                let userID = await AsyncStorage.getItem('userID')

                // formatted current date for moment
                var rightNow = new Date();
                var today = rightNow.toISOString().slice(0,10);

                // Format start date for moment
                var formattedStartDate = challenge.startDate.slice(0,10);

                // Formatted end date for moment
                var formattedEndDate = challenge.endDate.slice(0,10);

                // console.log(challenge.startDateString)
                // console.log(today)

                console.log(challenge.timeMetric)
                // function to set state of segment according to time-metric of challenge

                // // if by Day
                // if (challenge.timeMetric === 'Day') {
                //
                //   console.log('metric = day')
                //
                //   // get Days difference between now and start date
                //   const daysDiff = (moment(today).diff(formattedStartDate, 'days'))
                //
                //   const days = daysDiff + 1
                //
                //   console.log(daysDiff)
                //   console.log(days)
                //
                //
                //   // set state of segment
                //   this.setState({ segment: days })
                //   // set state of loggingActivity to false to change button
                //   this.setState({ loggingActivity: false })
                // }
                //
                // // if by Week
                // if (challenge.timeMetric === 'Week') {
                //
                //   // get Days difference between now and start date
                //   const days = (moment(today).diff(formattedStartDate, 'days'))
                //
                //   // divide days by 7
                //   const weeksDecimal = days / 7
                //
                //   // get first digit
                //   const weeksFirstDigit = weeksDecimal.toString()[0]
                //
                //   // add 1 to first digit (e.g.: if 10 days in, that's the 2nd week of challenge so
                //   // 10/7 = 1.42 => 1 + 1 = 2... => 2nd week )
                //   const weeks = parseInt(weeksFirstDigit) + 1
                //
                //   console.log('weeks ' + weeks)
                //
                //   // set state of segment
                //   this.setState({ segment: weeks })
                //   // set state of loggingActivity to false to change button
                //   this.setState({ loggingActivity: false })
                // }

                this.setState({ segment: 2 })

                // create object to be passed as body of post request
                let values = {
                  uid: userID,
                  challenge_id: challenge.Partition_ID,
                  segment_number: this.state.segment,
                  progress: this.state.loggedActivity
                }

                console.log(values)

                // Log progress with values object
                logProgress(values, challenge)

                } catch (error) {
                  console.log("Something went wrong", error);
                }
              }

              // // Call above function
              createObject()

              }}>
              <Text style={styles.buttonText}>Log</Text>
          </TouchableOpacity>
          )
        }
      }

      // Logic for stringifying date
      const renderDates = (challenge) => {

        //create today variable in format
        var rightNow = new Date();
        var today = rightNow.toISOString().slice(0,10);

        // Format start date
        var formattedStartDate = challenge.startDate.slice(0,10);
        // console.log(formattedStartDate)

        // if startdate is after today, return startdate
        if (moment(formattedStartDate).isSameOrAfter(today)) {

          return (
            <Text style={styles.startDate} >
              Starting: {challenge.startDateString.substring(0, 3)}.{challenge.startDateString.substring(3, 7)}. {challenge.startDateString.substring(8, 10)}
            </Text>
          )
        } else {

          return (
            <View>
              <Text style={styles.date} >
                Starting: {challenge.startDateString.substring(0, 3)}.{challenge.startDateString.substring(3, 7)}. {challenge.startDateString.substring(8, 10)}
              </Text>
              <Text style={styles.date}>
                Ending: {challenge.endDateString.substring(0, 3)}.{challenge.endDateString.substring(3, 7)}. {challenge.endDateString.substring(8, 10)}
              </Text>
            </View>
          )
        }
      }

      // Logic for displaying either log and leaderboard buttons or an add friends button
      // based on whether the challenge has begun or not
      const renderButtonScheme = (challenge) => {

        //create today variable in format
        var rightNow = new Date();
        var today = rightNow.toISOString().slice(0,10);

        // Format start date
        var formattedStartDate = challenge.startDate.slice(0,10);
        // console.log(formattedStartDate)

        // if challenge has started, return log button, leaderboard button
        if (moment(formattedStartDate).isSameOrBefore(today)) {

          return (

            <View style={styles.center}>
              <TouchableOpacity style={styles.leaderboardButton2} onPress={() => navigation.navigate('AddFriendsInChallenge', { challenge: challenge })}>
                  <Text style={styles.buttonText}>Add Friends</Text>
              </TouchableOpacity>
              <View style={styles.logRow}>
                <TextInput
                  style={styles.logInput}
                  keyboardType='numeric'
                  maxLength = {10}
                  placeholder={`Log ${challenge.activity}`}
                  theme={{
                      colors: {
                                 placeholder: 'gray', text: 'black', primary: 'red',
                                 underlineColor: 'red', background: 'white'
                         }
                  }}
                  placeholderTextColor="black"
                  autoCapitalize="none"
                  onChangeText={this.handleLoggedActivity}
                />
                {renderButton(challenge)}
              </View>
              <TouchableOpacity style={styles.leaderboardButton} onPress={() => navigation.navigate('Leaderboard', { challenge: challenge, segment: this.state.segment })}>
                  <Text style={styles.buttonText}>Leaderboard</Text>
              </TouchableOpacity>
            </View>
          )

        // else if the challenge has not started, render addFriends button
        } else {

          return (

            <View style={styles.center}>
              <TouchableOpacity style={styles.leaderboardButton2} onPress={() => navigation.navigate('AddFriendsInChallenge', { challenge: challenge })}>
                  <Text style={styles.buttonText}>Add Friends</Text>
              </TouchableOpacity>
              <View style={styles.logRow}>
                <TextInput
                  style={styles.logInput}
                  keyboardType='numeric'
                  maxLength = {10}
                  placeholder={`Log ${challenge.activity}`}
                  theme={{
                      colors: {
                                 placeholder: 'gray', text: 'black', primary: 'red',
                                 underlineColor: 'red', background: 'white'
                         }
                  }}
                  placeholderTextColor="black"
                  autoCapitalize="none"
                  onChangeText={this.handleLoggedActivity}
                />
                {renderButton(challenge)}
              </View>
              <TouchableOpacity style={styles.leaderboardButton} onPress={() => navigation.navigate('Leaderboard', { challenge: challenge, segment: this.state.segment })}>
                  <Text style={styles.buttonText}>Leaderboard</Text>
              </TouchableOpacity>
            </View>

          )
        }


      }

      return (
          <Container style={styles.container}>
              <View style={styles.header}>
                <TouchableOpacity style={styles.pending} onPress={() => navigation.navigate('PendingChallenges')}>
                    <FontAwesome name="dot-circle-o" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                  My Challenges
                </Text>
              </View>
                <PTRView onRefresh={() => getChallenges()} offset={120} >
                <ScrollView style={styles.contentContainerStyle}>
                  <Swiper style={styles.wrapper} buttonWrapperStyle={styles.buttonWrapper}
                  nextButton=<Text style={styles.nextButton}>></Text>
                  prevButton=<Text style={styles.nextButton}>{backButton}</Text>
                  activeDotColor="red"
                  paginationStyle={{ bottom: 180 }}
                  showsButtons={true}  >
                    {this.state.activeChallenges.map((challenge, e) => (
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
                            <Divider />
                            <Text style={styles.metrics}>for {challenge.weeks} weeks</Text>
                          </Body>
                        </CardItem>
                        <CardItem>
                          <Body style={styles.cardHeader}>
                            {renderDates(challenge)}
                            <Text style={styles.cardHeaderText}>if you miss: ${challenge.financialPenalty}</Text>
                            {renderCustomPenalty(challenge)}
                          </Body>
                        </CardItem>
                        {renderButtonScheme(challenge)}
                      </Card>
                    </View>
                    ))
                  }
                  </Swiper>
                </ScrollView>
                </PTRView>
          </Container>
        );
    } else if (this.state.isLoading === true) {

      // while loading
      return (
        <Container style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.pending} onPress={() => navigation.navigate('PendingChallenges')}>
                <FontAwesome name="dot-circle-o" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerText}>
              My Challenges
            </Text>
          </View>
          <View style={styles.centerAnimation}>
            <ActivityIndicator animating={true} color='#e80000' />
          </View>
        </Container>
      )
    } else {

      // if no Challenges
      return (
        <Container style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.pending} onPress={() => navigation.navigate('PendingChallenges')}>
                <FontAwesome name="dot-circle-o" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerText}>
              My Challenges
            </Text>
          </View>
          <PTRView onRefresh={() => getChallenges()} offset={100} >
            <View style={styles.centerText}>
              <Text style={styles.centerTextText}>To create a challenge, click <Text style={{fontSize: 30, color: 'red'}}> + </Text> below!</Text>
            </View>
          </PTRView>
        </Container>
      )
    }

}


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8ff',
  },
  contentContainerStyle: {
    marginBottom: -200
  },
  cardContainer: {
    alignItems: 'center',
    flex: .8,
    marginTop: 10
  },
  header: {
     height: '10%',
     backgroundColor: '#e80000',
     flexDirection: 'row'
   },
   headerText: {
     color: 'black',
     fontWeight: 'bold',
     fontFamily: 'Helvetica',
     fontSize: 25,
     paddingTop: '8%',
     paddingLeft: '20%'
   },
   icon: {
     paddingLeft: '20%',
     paddingTop: '7%'
   },
   pending: {
     paddingTop: '7%',
     marginLeft: '3%'
   },
  cardHeader: {
    paddingTop: '0%',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: -17,
    marginBottom: '5%'
  },
  cardHeaderText: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    fontSize: 29,
    paddingTop: '8%',
    textAlign: 'center'
  },
  card: {
     flex: 1,
     marginBottom: '10%',
     marginTop: '4%',
     borderWidth: 0,
     marginHorizontal: '10%',
     width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  logInput: {
    alignSelf: 'center',
    marginRight: 10,
    width: 100,
    height: 42,
  },
  logRow: {
    flexDirection: 'row',
    height: 42,
    marginBottom: '2%'
  },
  logButton: {
    backgroundColor: '#e80000',
    width: '25%',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '6%',
    marginBottom: '6%',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3.46,
    elevation: 4,
  },
  leaderboardButton: {
    backgroundColor: '#e80000',
    width: 200,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '35%',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3.46,
    elevation: 4,
  },
  leaderboardButton2: {
    backgroundColor: '#e80000',
    width: 200,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3.46,
    elevation: 4,
  },
  rank: {
    fontSize: 29,
    color: 'orange'
  },
  list: {
    marginRight: '20%',
  },
  metrics: {
    fontSize: 17,
    lineHeight: 25
  },
  row: {
    marginTop: '7%'
  },
  buttonWrapper: {
    backgroundColor: 'transparent',
    color: 'red',
    flexDirection: 'row',
    position: 'absolute',
    flex: 1,
    paddingHorizontal: 10
  },
  centerText: {
    alignItems: 'center',
    marginTop: '70%',
    flex: 1,
    justifyContent: 'center'
  },
  centerAnimation: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  centerTextText: {
    fontSize: 22,
    textAlign: 'center',
    alignSelf: 'center'
  },
  date: {
    fontSize: 20
  },
  startDate: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  refreshChallenges: {
    paddingBottom: '-20%',
    paddingRight: '90%',
    paddingTop: '2%',
    paddingLeft: '2%',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '-24%' ,
    flex: 1
  },
  nextButton: {
  color: 'red',
  marginRight: 1,
  fontSize: 30,
  paddingBottom: 120,
  },
  disabledLogButton: {
    backgroundColor: 'lightgray',
    width: '25%',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '6%',
    marginBottom: '6%',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3.46,
    elevation: 4,
  },

});


export default MyChallengesSwiper;
