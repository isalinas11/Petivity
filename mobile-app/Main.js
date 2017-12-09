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
   AppState, 
   NavigatorIOS,
   PanResponder,
   Animated,
   Dimensions
} from 'react-native';
import {StackNavigator, NavigationActions} from 'react-navigation';
import Button from './Button.js';
import Modal from 'react-native-modal';
import Expo from 'expo';

export default class Main extends Component {
   constructor(props){
    super(props);
//    this.springValue = new Animated.Value(0.3);
    this.state = {
        showDraggable   : true,//Step 1
        heart: false,
        dropZoneValues  : null,
        pan     : new Animated.ValueXY(),   //Step 1
    };

    this.panResponder = PanResponder.create({    //Step 2
        onStartShouldSetPanResponder : () => true,
        onPanResponderMove           : Animated.event([null,{ //Step 3
            dx : this.state.pan.x,
            dy : this.state.pan.y
        }]),
        onPanResponderRelease        : (e, gesture) => {
           if(this.isDropZone(gesture)){ //Step 1
                this.setState({
                    showDraggable : false, //Step 3
                    heart: true,
                });
             }else{
               Animated.spring(            //Step 1
            this.state.pan,         //Step 2
            {toValue:{x:0,y:0}}     //Step 3
        ).start();
            }  
        } //Step 4
    });
}
   setDropZoneValues(event){      //Step 1
    this.setState({
        dropZoneValues : event.nativeEvent.layout
    });
}
   isDropZone(gesture){     //Step 2
    var dz = this.state.dropZoneValues;
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
}
   reset(){
     {this.setState({
                    showDraggable : true, //Step 3
                    heart: false,
                  });
      Animated.spring(            //Step 1
            this.state.pan,         //Step 2
            {toValue:{x:0,y:0}}     //Step 3
        ).start();   
     }
  }
  render() {
    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;
    return (
       <View style={styles.container}>
        <Image source={require('./home.jpg')} style={styles.backgroundImage}>
       <TouchableHighlight
          onPress={() => goBack()} style={styles.back}>
             <Text
            style={styles.backText}> &larr; </Text>
        </TouchableHighlight>
       <View>
               {this.renderHeart()}
        <TouchableOpacity onLayout={this.setDropZoneValues.bind(this)}
          onPress={() => {this.reset(); 
navigate("StopClock", {screen: "StopClock"});                         
}} style={styles.button} >
        </TouchableOpacity> 
      </View>
      {this.renderDraggable()}
      </Image> 
      </View>
    );
  }
  
   renderDraggable(){
      if(this.state.showDraggable){ 
        return (
            <View>
                <Animated.View {...this.panResponder.panHandlers} style={[this.state.pan.getLayout()]}>
                  <Image source={require('./mango.png')} style = {styles.moveImg}>
                  </Image>
                </Animated.View>
            </View>
        );
      }
   }

renderHeart(){
      if(this.state.heart){ 
        return (
            <View>
                <Animated.Image style={{position: 'absolute', width: 50, height: 50,
      marginLeft: 200, marginTop: 210}} source={require('./heart.png')}/>
             </View>
        );
      }
   }
}
const styles = StyleSheet.create({
    backText:{
      color: 'white',
      fontSize: 42,
      textAlign: 'center',
   },
   heart:{},
   moveImg:{
      marginTop: '10%',
      marginLeft: '20%',
      width: 100,
      height: 120,
   },
   button: {
    backgroundColor: 'transparent',
    marginLeft: "15%",
//    marginRight: "15%",
    width: '47%',
    height: '20.5%',
    marginTop: 250,
//    alignItems: 'left',
    borderRadius: 600,
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
   backgroundImage: {
    width: '100%',
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
//    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fcfcfc',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
})