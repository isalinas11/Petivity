import React, {
   Component
} from 'react';
import {
   StyleSheet,
   Text,
   View, 
   TextInput,
   Image,
   TouchableOpacity,
   TouchableHighlight,
   Alert,
   AppState
} from 'react-native';
import {StackNavigator, NavigationActions} from 'react-navigation';
import Button from './Button.js';
import Modal from 'react-native-modal';
import {
   Stopwatch,
   Timer
} from 'react-native-stopwatch-timer';
import Expo from 'expo';

export default class StopClock extends Component {
   //adapted from michaeljstevens react native stopwatch
   constructor(props, context) {
      super(props,context);
      this.state = {
         visibleModal: null,
         timerStart: false,
         stopwatchStart: false,
         totalDuration: 360000,
         text: '',
         timerReset: false,
         stopwatchReset: false,
         appState: AppState.currentState
      }
      this.toggleTimer = this.toggleTimer.bind(this);
      this.resetTimer = this.resetTimer.bind(this);
      this.toggleStopwatch = this.toggleStopwatch.bind(this);
      this.resetStopwatch = this.resetStopwatch.bind(this);
   }
   
   componentDidMount() {
      AppState.addEventListener('change', this._handleAppStateChange);   
   }
   
   componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
       this.setState({appState: nextAppState}); 
    } else {
      this.toggleStopwatch();     
//       this.resetStopwatch();
      this.setState({appState: nextAppState});
      }
    }
  
   toggleTimer() {
      this.setState({
         timerStart: !this.state.timerStart,
         timerReset: false,
      });
   }
   resetTimer() {
      this.setState({
         timerStart: false,
         timerReset: true,
      });
   }

   toggleStopwatch() {
      this.setState({
         stopwatchStart: !this.state.stopwatchStart,
         stopwatchReset: false,
      });
      var view = this;
      if(this.state.stopwatchStart === true){
         this.setState({
            visibleModal: 4,
         });
         var current = this.currentTime;
         console.log(this.currentTime);
         var parts = current.split(":");
         console.log(parts);
         if (parts) {
            var hours = parseInt(parts[0]),
                minutes = parseInt(parts[1]),
                seconds = parseInt(parts[2]);
         this.setState({text: 'You\'ve stopped the clock! You\'ve been blocking for '+ hours +' hours ' + minutes+' minutes '+seconds+' seconds. Good job!'})
         this.resetStopwatch();
         }
      }
   }
//      if(this.state.stopwatchStart === true && this.currentTime <= this.state.totalDuration){
//         console.log(this.currentTime);
//         Alert.alert(
//           'Stopped Blocking',
//           'You\'ve stopped the clock! You\'ve been blocking for only'+ this.currentTime +" hours/mins/seconds/ms.",
//           [
//   //         {text: 'Cancel', onPress: () => console.log('Cancel')},
//             {text: 'Done'},
//           ],
//           { cancelable: false }
//         );
//         this.resetStopwatch();
//      }

   resetStopwatch() {
      this.setState({
         stopwatchStart: false,
         stopwatchReset: true
      });
   }
   getFormattedTime(time) {
      this.currentTime = time;
   };

 _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style = {{color: 'white', fontSize: 18}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Image style = {styles.image} source={require('./popup.jpg')}>
      <Text style = {styles.modalText}>{this.state.text}</Text>
      {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
      </Image>
    </View>
  );
render(){
    const { goBack } = this.props.navigation;
   return(
      <Image source={require('./blockscreen.png')} style={styles.backgroundImage}>
      <TouchableHighlight
          onPress={() => goBack()}
          style={styles.back}>
          <Text
            style={styles.backText}> &larr; </Text>
        </TouchableHighlight>
      <Stopwatch start = {this.state.stopwatchStart}
         reset = {this.state.stopwatchReset}
         options = {options}
         getTime = {this.getFormattedTime.bind(this)}
         style = {styles.bottom}/>
      <TouchableOpacity onPress = {this.toggleStopwatch.bind(this)}>
         <Text style = {{fontSize: 40, textAlign: 'center', marginTop: 15,
           justifyContent: 'center', backgroundColor: '#924d2e', color: 'white',
           marginLeft: 30, marginRight: 30}}> {!this.state.stopwatchStart ? "Start" : "Stop"} </Text> 
      </TouchableOpacity>
<Modal 
          isVisible={this.state.visibleModal === 4}
          backdropOpacity={0.1}
          animationIn={'zoomInDown'}
          animationOut={'zoomOutUp'}
          animationInTiming={1500}
          animationOutTiming={1500}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}
        >
          {this._renderModalContent()}
        </Modal>
      </Image>
);
}
}
//const handleTimerComplete=()=> alert('custom completion function');
const options= {
   container:{
      backgroundColor: '#ab9c7b',
//      padding: 5,
      borderRadius: 20,
      marginTop: '116.5%',
      marginLeft: 30,
      marginRight: 30,
   },
   text: {
      textAlign: 'center',
      color: 'white',
      fontSize: 36,
   },
};

const styles = StyleSheet.create({
   backText:{
      color: 'white',
      fontSize: 42,
      textAlign: 'center',
   },
   back:{
      borderColor:'#857449',
      borderWidth: '5%',
      backgroundColor: '#ab9c7b',
      alignItems: 'left',
      width: '20%',
      height: '10%',
      margin: '5%',
   },
   image:{
      width: 333,
      height: 242,
   },
  backgroundImage: {
    width: '100%',
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
   button: {
    backgroundColor: '#924d2e',
    padding: 8,
    marginTop: '10.5%',
    marginLeft: '6%',
    marginRight: '6%',
    marginBottom: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'transparent',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
modalText:{
   backgroundColor: 'transparent',
   padding: 16,
   fontSize: 26,
   color: 'white',
   textAlign: 'center',
}, 
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});