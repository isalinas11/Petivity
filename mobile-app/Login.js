import React, {Component} from 'react';
//import {Text} from 'react-native';
import Expo from 'expo';
//import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Container from './Container.js';
import Button from './Button.js';
import Label from './Label.js';

//import Button from 'react-native-button'

const {width, height} = Dimensions.get('window');
export default class Login extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Image source={require('./logo.png')} style={styles.mainLogo}/>
          <View style={styles.textInputWrapper}>
            <Text style={styles.inputLabel}> Username </Text>
            <TextInput
              autoCorrect={false}
              autoFocus={true}
              placeholder={"Username"}
              placeholderTextColor={"#A5A5A5"}
              style={styles.textInput}/>
          </View>
          <View style={styles.textInputWrapper}>
            <Text style={styles.inputLabel}> Password </Text>
            <TextInput
              secureTextEntry={true}
              autoCorrect={false}
              placeholder={"Password"}
              placeholderTextColor={"#A5A5A5"}
              style={styles.textInput}/>
          </View>
          <TouchableOpacity style={styles.loginButtonClickable}>
            <View style={styles.loginButton}>
              <Image source={require('./google.png')} style={styles.signInLogo}/>
              <Text style={styles.loginText}> Sign In </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    width: width,
    backgroundColor: 'rgb(96, 195, 250)'
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 2,
    color: 'white'
  },
  loginButton: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  loginButtonClickable: {
    borderColor: 'white',
    backgroundColor: 'rgb(185, 220, 240)',
    borderWidth: 2,
    borderRadius: 10,
    paddingTop: 8,
    marginTop: 10,
    width: '50%',
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 4
  },
  mainLogo: {
    width: '60%',
    height: 75,
    marginBottom: 10
  },
  scroll: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  signInLogo: {
    width: 48,
    height: 48
  },
  textInput: {
    height: 34,
    fontSize: 20,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#4e4e4e",
  },
  textInputWrapper: {
    width: '80%',
    marginBottom: 10
  }
});