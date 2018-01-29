import React, { Component } from 'react';
import { Text, View, StyleSheet, } from 'react-native';
import {StackNavigator,} from 'react-navigation';
import { Constants } from 'expo';
//import Login from './Login.js';
import StopClock from './StopClock.js';
import Main from './Main.js';
import First from './First.js';

const App = StackNavigator({ 
//  Login: {screen: Login},
  First: {screen: First},
  Main: {screen: Main},
  StopClock: {screen: StopClock},
}, {headerMode: 'none'});
export default App;
