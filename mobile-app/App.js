import React, { Component } from 'react';
import { Text, View, StyleSheet, StackNavigator, } from 'react-native';
import { Constants } from 'expo';
import Login from './Login.js';
import StopClock from './StopClock.js';
//const BasicApp = StackNavigator({
//  Main: {screen: Main},
//  Login: {screen: Login},
//});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StopClock/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fcfcfc',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
