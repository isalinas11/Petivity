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
          <View> 
            <Image source={require('./facebook.png')} style={styles.logo}/>
          </View>
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
              <Image source={require('./google.png')} style={styles.logo}/>
              <Text style={styles.loginText}> Sign In </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  textInputWrapper: {
    width: '100%',
    marginBottom: 16
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
  container: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    width: width-32,
  },
  logo: {
    width: 48,
    height: 48
  },
  loginButton: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  loginButtonClickable: {
    borderColor: '#3cba54',
    borderWidth: 2,
    width: '100%',
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4
  }
});