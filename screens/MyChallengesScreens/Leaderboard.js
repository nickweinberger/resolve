import 'react-native-gesture-handler';

// React imports
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableWithoutFeedback,
         TouchableOpacity, Icon, ScrollView, FlatList } from 'react-native';
import { ActivityIndicator, TextInput, Divider } from 'react-native-paper';
import { Container, Header, Content, Card, CardItem, Thumbnail, Left, Body, Right, Row, List } from 'native-base';



// Import navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons } from '@expo/vector-icons';

// Require Axios
const axios = require('axios').default;

// Time manipulation import
import moment from 'moment';


export default class Leaderboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
        data: null,
        challenge: this.props.route.params.challenge,
        segment: null,
        financialSum: null,
        financialSumsArray: [],
        currentSegmentArray: [],
        uidArray: [],
        displayNameArray: [],
        isLoading: true,
        userArray: [],
    };
  };

  componentDidMount() {

    const getSegment = () => {

      // formatted current date for moment
      var rightNow = new Date();
      var today = rightNow.toISOString().slice(0,10);

      // Format start date for moment
      var formattedStartDate = this.state.challenge.startDate.slice(0,10);

      // Formatted end date for moment
      var formattedEndDate = this.state.challenge.endDate.slice(0,10);

      // console.log(challenge.startDateString)
      // console.log(today)

      console.log(this.state.challenge.timeMetric)
      // function to set state of segment according to time-metric of challenge

      // if by Day
      // if (this.state.challenge.timeMetric === 'Day') {
      //
      //   console.log('metric = day')
      //
      //   // get Days difference between now and start date
      //   const daysDiff = (moment(today).diff(formattedStartDate, 'days'))
      //
      //   const days = daysDiff + 1
      //
      //   // set state of segment
      //   this.setState({ segment: days })
      //
      // }
      //
      // // if by Week
      // if (this.state.challenge.timeMetric === 'Week') {
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
      // }

      this.setState({ segment: 2 })

    }

    // Call above function
    getSegment()

    // function to get the leaderboard array of objects, each which contains a user's info for leaderboard
    const getLeaderboard = () => {

      // set url
      const url = `https://t31amiwnaf.execute-api.us-east-1.amazonaws.com/dev/get-leaderboard?challenge_id=${this.state.challenge.Partition_ID}`

      // Get request
      axios.get(url)
      .then((response) => {
        // console.log(response)

        // if data returned
        if (response.data.leaderboard.length > 0) {

          // save data in variable
          const data = response.data.leaderboard

          // if there is data
          if (data) {

            console.log(data)
            console.log(this.state.segment)

            // empty array for financial sums of all objects
            let financialSumsArray = []
            // empty array for progress in current segment of all objects
            let currentSegmentArray = []
            // empty array for uid of all objects
            let uidArray = []
            // empty array for display name of all objects
            let displayNameArray = []

            console.log('goal: ' + this.state.challenge.goal)

            //For each object in array
            for (let i = 0; i < data.length; i++) {


              // Get object keys
              let keys = Object.keys(data[i])

              // slice keys to only segments, sort segments
              let segments = (keys.slice(0, (keys.length-2)).sort())

              // set variable = 0 to collect financial sum for each object
              let financialSum = 0

              // check if one of the segments in each object is equal to current segment
              const match = segments.find(element => element === `Segment-${this.state.segment}-Progress`)

              // if there's a match
              if (match !== undefined) {

                // push value of current segment to currentSegmentProgress
                currentSegmentArray.push(parseInt((data[i][`${match}`])))

              // if no match exists, push null to currentSegmentProgress
              } else {

                // push null to currentSegmentProgress
                currentSegmentArray.push(null)

              }

              // create array of uids
              uidArray.push(data[i]["Partition_ID"])

              // create array of displayNames
              displayNameArray.push(data[i]["Display_Name"])

              // For each segment
              for (let j = 0; j < segments.length; j++) {

                console.log("progress: " + data[i][segments[j]])


                // if segment value is less than goal
                if ((parseInt(data[i][segments[j]])) < this.state.challenge.goal) {

                    // add financial penalty to financial sum
                    financialSum = financialSum + (parseInt(this.state.challenge.financialPenalty))

                }

              }

              // push each financial sum to an array of all financial sums
              financialSumsArray.push(financialSum)

              console.log(financialSum)

            }

            // create array of the arrays I just created
            let leaderboardArray = [ uidArray, financialSumsArray, currentSegmentArray, displayNameArray]


            // console.log(leaderboardArray)

            // create empty array of arrays
            let arrayOfArrays = []

            // for as many UIDs as there are
            for (let j = 0; j < leaderboardArray[0].length; j++) {

              // create empty array inside empty array
              let array = []

              // for as many arrays there are in LBarray (3 --> uids, progress, sums)
              for (let i = 0; i < leaderboardArray.length; i++) {

                // push jth item of each array
                array.push(leaderboardArray[i][j])

              }

              // push array into array of arrays
              arrayOfArrays.push(array)

            }


            // Below: turn arrayOfArrays into arrayOfObjects

            // if arrayOfArrays exists
            if ((arrayOfArrays[0]) !== undefined) {

              // create empty array for the newly created objects
              let arrayOfObjects = []

              // for as many arrays there are in arrayOfArrays
              for (let i = 0; i < arrayOfArrays.length; i++ ) {

                // Define new object
                let object = {
                  uid: arrayOfArrays[i][0],
                  financialSum: arrayOfArrays[i][1],
                  currentProgress: arrayOfArrays[i][2],
                  displayName: arrayOfArrays[i][3]
                }

                // push new object into arrayOfObjects
                arrayOfObjects.push(object)
              }

              // set state of leaderboardArray
              this.setState({ userArray: arrayOfObjects, isLoading: false})

            }

          }
        }

      }, (error) => {
        console.log("This is the error: " + error);
      });
    }

    // call above function
    getLeaderboard()

  }

  render() {

    console.log(this.state.userArray)
    // console.log(this.state.userArray[0])

    // Sort array of users by financial sum for rendering
    function compare( a, b ) {
      if ( a.financialSum < b.financialSum ){
        return -1;
      }
      if ( a.financialSum > b.financialSum ){
        return 1;
      }
      return 0;
    }

    console.log(this.state.userArray.sort(compare))


    // Import navigation
    const { navigation } = this.props;

    // if data has been updated, return leaderboard
    if (this.state.isLoading === false && this.state.userArray.length > 0) {


      // financial sum render logic
      const renderFinancialSum = (item) => {

        // if sum is zero, return in green
        if (item.financialSum === 0) {

          return (
            <View style={styles.financialSum}>
              <Text style={styles.financialSumTextGreen}>{item.financialSum}</Text>
            </View>
          )

        // if sum is <zero, return in red with a "-"
        } else if (item.financialSum > 0) {

          return (
            <View style={styles.financialSum}>
              <Text style={styles.financialSumTextRed}>-{item.financialSum}</Text>
            </View>
          )
        }
      }

      // current progress render logic
      const renderCurrentProgress = (item) => {

        // if progress = null
        if (item.currentProgress === null && this.state.challenge !== undefined) {
          return (
            <View style={styles.currentProgress}>
              <Text style={styles.currentProgressText}>0</Text>
            </View>
          )
        } else {
          return (
            <View style={styles.currentProgress}>
              <Text style={styles.currentProgressText}>{item.currentProgress}</Text>
            </View>
          )
        }
      }

      // render time metric
      const renderTimeMetric = () => {

        // check metric, return accordingly
        if (this.state.challenge.timeMetric === 'Week') {
          return (
            <View style={styles.rowCP}>
              <Text style={styles.rowCPText}>This Week</Text>
            </View>
          )
        } else {
          return (
            <View style={styles.rowCP}>
              <Text style={styles.rowCPText}>Today</Text>
            </View>
          )
        }
      }

      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                <Ionicons name="ios-arrow-round-back" size={35} color="black" />
                <View style={styles.SeparatorLine} />
            </TouchableOpacity>
            <Text style={styles.headerText}>
              Leaderboard
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.rowName}>
              <Text style={styles.rowNameText}>Name</Text>
            </View>
            <View style={styles.rowFS}>
              <Text style={styles.rowFSText}>$</Text>
            </View>
            <View style={styles.rowCP}>
              {renderTimeMetric()}
            </View>
          </View>
          <View style={styles.FlatListContainer}>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 2,
              paddingTop: 10
            }}
          />
            <FlatList
              data={this.state.userArray}
              keyExtractor={item => item.uid}
              renderItem={({ item }) => (
                <View>
                  <View style={styles.item}>
                    <View style={styles.name}>
                      <Text style={styles.nameText}>{item.displayName}</Text>
                    </View>
                    {renderFinancialSum(item)}
                    {renderCurrentProgress(item)}
                  </View>
                  <Divider />
                </View>
              )}
            />
            </View>
        </View>
      );

      // else return loading indicator
      } else {

        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                  <Ionicons name="ios-arrow-round-back" size={35} color="black" />
                  <View style={styles.SeparatorLine} />
              </TouchableOpacity>
              <Text style={styles.headerText}>
                Leaderboard
              </Text>
            </View>
            <View style={styles.centerAnimation}>
              <ActivityIndicator animating={true} color='#e80000' />
            </View>
          </View>
        )
      }
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8ff',
    alignItems: 'center',
  },
  FlatListContainer: {
    width: 340
  },
  item: {
   borderWidth: 0,
   height: 60,
   flexDirection: 'row',
   paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
    marginTop: '10%',
    marginBottom: 0
  },
  rowName: {
    width: '55%',
    paddingRight: 30,
    alignItems: 'center'
  },
  rowFS: {
    width: 30,
    paddingRight: 0,
    alignItems: 'center',
  },
  rowCP: {
    width: 60,
    marginLeft: 10,
    alignItems: 'center'
  },
  rowNameText: {
    fontSize: 25,
    marginTop: '3%'
  },
  rowFSText: {
    fontSize: 30
  },
  rowCPText: {
    fontSize: 20,
    marginTop: '10%',
    marginLeft: 10
  },
  name: {
    width: '60%',
    alignItems: 'center'
  },
  nameText: {
    fontSize: 20
  },
  currentProgress: {
    width: '20%',
    alignItems: 'center'
  },
  currentProgressText: {
    fontSize: 25
  },
  financialSum: {
    width: '20%',
    alignItems: 'center'
  },
  financialSumTextGreen: {
    fontSize: 25,
    color: 'green'
  },
  financialSumTextRed: {
    fontSize: 25,
    color: 'red'
  },
  header: {
    height: 70,
    width: "100%",
    backgroundColor: '#e80000',
    flexDirection: 'row'
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    fontSize: 28,
    paddingTop: '8%',
    paddingLeft: '23%'
  },
  icon: {
    paddingLeft: '20%',
    paddingTop: '8%'
  },
  card: {
    flex: 1,
    marginVertical: '10%',
    paddingHorizontal: '6%',
  },
  back: {
    paddingLeft: '3%',
    paddingTop: '7%'
  },
  centerText: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  centerAnimation: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  centerTextText: {
    fontSize: 22,
    alignSelf: 'center'
  },
  challengeName: {
    fontSize: 30,
    fontWeight: 'bold'
  },
});
