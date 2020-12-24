import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { Container, Content, Card, CardItem, Body, Row, List } from 'native-base';


const ChallengeCard = ({ navigation }) => {
  return (
    <Container style={styles.container}>
      <Content>
        <Card>
          <CardItem>
            <Body style={styles.header}>
              <Text style={styles.headerText}>Meditation with the boiz</Text>
            </Body>
          </CardItem>
          <CardItem cardBody style={{height: 160, marginHorizontal: 30, width: null, flex: 1}}>
            <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQXceFsoRtPIPL5y99RXfISP-pvBb_22e26-Q&usqp=CAU'}} style={{height: '100%', width: null, flex: 1}}/>
          </CardItem>
          <Row style={styles.row}>
            <Body>
              <Text style={styles.rank}>1st Place!</Text>
            </Body>
            <List style={styles.list}>
              <Text>
                <Text style={styles.metrics}>6 mins / day</Text>
              </Text>
              <Text>
                <Text style={styles.metrics}>50% of days</Text>
              </Text>
            </List>
          </Row>
          <TouchableOpacity style={styles.logButton} onPress={() => alert("This will link to this specific challenge's logging")} >
            <Text style={{color:'red', fontSize: 15}}>Log Activity</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.leaderboardButton} onPress={() => alert("This will link to this specific challenge's leaderboard")}>
            <Text style={{color:'red',fontSize: 15}}>See leaderboard</Text>
          </TouchableOpacity>
        </Card>
      </Content>
    </Container>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8ff',
    height: '1000%',
    paddingBottom: 10
  },
  header: {
    paddingTop: '10%',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: -17,
    marginBottom: '5%'
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    fontSize: 25,
    paddingTop: '8%',
    textAlign: 'center'
  },
  card: {
    flex: 1,
    marginTop: '10%',
    marginHorizontal: '2%',
  },
  logButton: {
    backgroundColor: 'lightgray',
    width: '80%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '10%',
    marginTop: '6%',
    marginBottom: '6%',
    borderRadius: 3,
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
    backgroundColor: 'lightgray',
    width: '80%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '10%',
    marginTop: 5,
    marginBottom: '40%',
    borderRadius: 3,
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
    fontSize: 15,
    lineHeight: 25
  },
  row: {
    marginTop: '7%'
  }
});


export default ChallengeCard;
