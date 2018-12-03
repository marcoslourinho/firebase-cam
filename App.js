import React, { Component } from 'react'; //import padrão do React
import { StyleSheet, TouchableOpacity, View, ToastAndroid} from 'react-native'; //import dos componentes do RN que utilizaremos
import firebase from 'react-native-firebase'; // import para acessar os recursos lib do react-native-firebase
import { RNCamera } from "react-native-camera"; // import para acessar a lib que acessa a camera do smartphone
import Icon from 'react-native-vector-icons/Ionicons'; // import de icones estilizados para botão de captura

export default class CameraView extends Component {

 render() { //método render para renderizar na tela nossos componentes
  return( // sempre possui um return por padrão
    <View style={{flex:1}}> 
         <RNCamera 
          ref={ref => {this.camera = ref}} // iniciamos o elemento this.camera como referencia
          flashMode={RNCamera.Constants.FlashMode.on} //setamos o atributo flashMode para ativar o flash da camera na hora da captura
          style={styles.view} >
          <TouchableOpacity onPress={this.takePicture}>
            <Icon style={styles.capture} name="ios-camera"/> 
          </TouchableOpacity> 
      </RNCamera>
    </View> );
  }

  takePicture = async () => { //metodo de captura utilizando async/await para trabalhar com promisses de forma menos verbosa
      const storageRef = firebase.storage().ref((new Date().toString())) //criamos uma referencia do firebasestorage definindo nome do arquivo com timestamp
      const data = await this.camera.takePictureAsync({quality:0.5}); //acionamos o método takePictureAsync do RNC passando atributos da foto
      const callback = await storageRef.put(data.uri); //capturamos a callback após utilizar o metodo put que envia o arquivo de fato
      callback.state = "success" ? ToastAndroid.show("Sua última foto foi sincronizada!", 5000) : ToastAndroid.show("Opa, ocorreu um erro!", 5000);
      //verificamos o sucesso da requisicao e retornamos um toast para o usuário
   }

}

const styles = StyleSheet.create({ //stylesheet
  view: {
    flex: 1, //para utilizar o flex-layout do react native
    justifyContent: 'flex-end', //justificar os componentes no fim da tela
    alignItems: 'center' //alinhar os componentes no centro
  },
  capture: {
    color: 'white', // definir a cor do botão de captura
    fontSize: 80 // definir o tamanho do botão de captura
  }
});