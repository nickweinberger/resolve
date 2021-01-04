import 'react-native-gesture-handler';

// React imports
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { ActivityIndicator, Divider } from 'react-native-paper';

import moment from 'moment'
import { Ionicons } from '@expo/vector-icons';

// Require Axios
const axios = require('axios').default;

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

      // function to set state of segment according to time-metric of challenge

      // if by Day
      if (this.state.challenge.timeMetric === 'Day') {

        // get Days difference between now and start date
        const daysDiff = (moment(today).diff(formattedStartDate, 'days'))
      
        const days = daysDiff
      
        // set state of segment
        this.setState({ segment: days + 1})
      
      }
      
      // if by Week
      if (this.state.challenge.timeMetric === 'Week') {
      
        // get Days difference between now and start date
        const days = (moment(today).diff(formattedStartDate, 'days'))
      
        // divide days by 7
        const weeksDecimal = days / 7
      
        // get first digit
        const weeksFirstDigit = weeksDecimal.toString()[0]
      
        // add 1 to first digit (e.g.: if 10 days in, that's the 2nd week of challenge so
        // 10/7 = 1.42 => 1 + 1 = 2... => 2nd week )
        const weeks = parseInt(weeksFirstDigit)
      
        // set state of segment
        this.setState({ segment: weeks + 1})
      }

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

        // if data returned
        if (response.data.leaderboard.length > 0) {

          // save data in variable
          const data = response.data.leaderboard

          // if there is data
          if (data) {

            // empty array for financial sums of all objects
            let financialSumsArray = []
            // empty array for progress in current segment of all objects
            let currentSegmentArray = []
            // empty array for uid of all objects
            let uidArray = []
            // empty array for display name of all objects
            let displayNameArray = []
            // empty array for segment's missed of all objects
            let segmentsCompletedArray = []

            //For each object in array
            for (let i = 0; i < data.length; i++) {

              // Get object keys
              let keys = Object.keys(data[i])

              // slice keys to only segments, sort segments
              let segments = (keys.filter((key) => key.includes('Segment')))

              // set variable = 0 to collect segments completed for each object
              let segmentsCompleted = 0

              // check if one of the segments in each object is equal to current segment
              const match = segments.find(element => element === `Segment-${this.state.segment - 1}-Progress`)

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

                  // if segment value is more than goal
                  if ((parseInt(data[i][segments[j]])) >= this.state.challenge.goal) {

                    segmentsCompleted = segmentsCompleted + 1

                  }
              }

              // set total segments completed array
              segmentsCompletedArray.push(segmentsCompleted)

            }

            // set financial penalty according to how many segments / total have been completed
            for (let i = 0; i < segmentsCompletedArray.length; i++) {
              let difference = this.state.segment - segmentsCompletedArray[i]
              let penalty = parseInt(this.state.challenge.financialPenalty) * difference

              financialSumsArray.push(penalty)
            }


            // create array of the arrays I just created
            let leaderboardArray = [ uidArray, financialSumsArray, currentSegmentArray, displayNameArray, segmentsCompletedArray]

            // create empty array of arrays
            let arrayOfArrays = []

            // for as many UIDs as there are
            for (let j = 0; j < leaderboardArray[0].length; j++) {

              // create empty array inside empty array
              let array = []

              // for as many arrays there are in LB array (5 --> uids, progress, financial sums, displayname, segmentsCompleted )
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
                  displayName: arrayOfArrays[i][3],
                  segmentsCompleted: arrayOfArrays[i][4]
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
            <View style={{ width: '50%' }}>
              <Text style={styles.rowNameText}>Name</Text>
            </View>
            <View style={{ width: '18%' }}>
              <Text style={styles.rowFSText}>$</Text>
            </View>
            <View style={{ width: '18%' }}>
              <Text style={{ fontSize: 22 }}>
                {this.state.challenge.timeMetric === 'Day' ? 'Days hit' : 'Weeks hit'}
              </Text>
            </View>
            <View style={{ width: '20%' }}>
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
              data={this.state.userArray.sort((a, b) => a.segmentsCompleted < b.segmentsCompleted)}
              keyExtractor={item => item.uid}
              renderItem={({ item }) => (
                <View>
                  <View style={styles.item}>
                    <View style={styles.name}>
                      <Text style={styles.nameText}>{item.displayName}</Text>
                    </View>
                    {renderFinancialSum(item)}
                    <View style={{ width: '18%'}}>
                      <Text style={{fontSize: 20}}>{item.segmentsCompleted}</Text>
                    </View>
                    {renderCurrentProgress(item)}
                  </View>
                  <Divider />
                </View>
              )}
            />
            </View>
            <Text style={{ marginTop: 40, fontSize: 20 }}> 
            {this.state.segment} {this.state.challenge.timeMetric === "Day" ? "days" : "weeks"} into challenge
          </Text>
          <Text style={{ marginTop: 5, fontSize: 20 }}> 
            {this.state.challenge.goal} {this.state.challenge.activity} / {this.state.challenge.timeMetric}
          </Text>
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
    marginTop: '5%',
    width: '80%',
    flexDirection: 'row'
  },
  rowName: {
    width: '50%',
  },
  rowFS: {
    width: '20%',
  },
  rowCP: {
    width: '20%',
  },
  rowNameText: {
    fontSize: 22,
    marginTop: '3%'
  },
  rowFSText: {
    width: '20%',
    fontSize: 22,
    marginTop: 6
  },
  rowCPText: {
    fontSize: 22,
    width: 80,
    marginTop: '10%',
  },
  name: {
    width: '48%',
  },
  nameText: {
    fontSize: 20
  },
  currentProgress: {
    width: '18%',
  },
  currentProgressText: {
    fontSize: 20
  },
  financialSum: {
    width: '22%',
  },
  financialSumTextGreen: {
    fontSize: 20,
    color: 'green'
  },
  financialSumTextRed: {
    fontSize: 20,
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
