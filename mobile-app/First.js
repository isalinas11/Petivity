import React, {
   Component
} from 'react';
import {
   StyleSheet,
   Text,
   View, 
   ScrollView,
   TextInput,
   Image,
   TouchableOpacity,
   TouchableHighlight,
   Alert,
   AppState, 
   KeyboardAvoidingView,
   NavigatorIOS,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Button from './Button.js';
//import Modal from 'react-native-modal';
import Expo from 'expo';
import CodeInput from 'react-native-confirmation-code-input';

export default class First extends Component {
   constructor(props){
    super(props);
    this.state = {code: ''}
   }
  _onFulfill3 = (code) => {
    const isValid = (code === 'a1bdc')
    if(!isValid){
       this.refs.codeInputRef3.clear();
       Alert.alert(
    'Syncing',
   'Code mismatch!', [{text: 'Try Again'}],
    {cancelable: false})
    } else{ 
       this.setState({code});
       Alert.alert(
    'Syncing', 'Successful Connection!', [{text: 'OK', onPress: () => this.onButtonPress()}], {cancelable: false})
    }
  }
  render(){
   const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ScrollView style={styles.wrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}> Welcome to Petivity Mobile</Text>
          </View> 
           <View style={[styles.inputWrapper, {backgroundColor: '#6bcbca'}]}>
            <Text style={[styles.inputLabel]}>
              Input Mobile Code: 
            </Text>
            <CodeInput
              ref='codeInputRef3'
              secureTextEntry
              codeLength={5}
              borderType='circle'
              autoFocus={false}
              codeInputStyle={{ fontWeight: '800' }}
              onFulfill={this._onFulfill3}
            />
          </View>
            <TouchableOpacity onPress= {() => navigate("Main", {screen: "Main"})} style =  {styles.button}>
        <Text style={styles.inputLabel}> Skip Syncing </Text>
       </TouchableOpacity>
         <TouchableOpacity onPress= {() => this.onUnsync()} style =  {styles.button}>
        <Text style={styles.inputLabel}> Unsync </Text>
       </TouchableOpacity>
</ScrollView> 
      </KeyboardAvoidingView>
    )
  }
  onUnsync(){
      const { navigate } = this.props.navigation;
      this.refs.codeInputRef3.clear();
       Alert.alert(
    'Unsyncing',
   'Unsync successful', [{text: 'Done'}],
    {cancelable: false});
     navigate("Main", {screen: "Main"});
  }
   onButtonPress(){
      const { navigate } = this.props.navigation;
      navigate("Main", {screen: "Main"});
  }
}


const styles = StyleSheet.create({
    container: {
    flex: 1,
   backgroundColor: '#47c3ff',
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
   button: {
    backgroundColor: '#47c3ff',
    padding: 8,
    marginTop: '10.5%',
    marginLeft: '6%',
    marginRight: '6%',
//    marginBottom: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: '#6bcbca',
   borderWidth: 10,
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: '800',
    paddingVertical: 30,
    alignItems: 'center',
  },
  wrapper: {
    marginTop: 30
  },
  inputWrapper: {
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  inputLabel: {
    fontSize: 24,
    fontWeight: '800',
   color: '#fff',
      textAlign: 'center',
  },
});