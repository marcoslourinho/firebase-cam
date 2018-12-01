import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, ToastAndroid} from 'react-native';
import firebase from 'react-native-firebase';
import { RNCamera } from "react-native-camera";
import Icon from 'react-native-vector-icons/Ionicons';

export default class CameraView extends Component {

 render() {
  return(
    <View style={{flex:1}}>
         <RNCamera
          ref={ref => {this.camera = ref}}
          flashMode={RNCamera.Constants.FlashMode.on}
          style={styles.view}>
          <TouchableOpacity onPress={this.takePicture}>
            <Icon style={styles.capture} name="ios-camera"/>     
          </TouchableOpacity>
      </RNCamera>
    </View> );
  }

  takePicture = async () => {
      const storageRef = firebase.storage().ref((new Date().toString()))
      const data = await this.camera.takePictureAsync({quality:0.5});
      const callback = await storageRef.put(data.uri);
      callback.state = "success" ? ToastAndroid.show("Sua ultima foto foi sincronizada!", 5000) : ToastAndroid.show("Opa, Ocorreu um erro!", 5000);
   }

}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    color: 'white',
    fontSize: 80
  }
});