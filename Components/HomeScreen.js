import React, { useState } from 'react';
import { Image, View, Text, Button, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from "../src/services/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // State para controlar a visibilidade do modal

  const handleLogin = (isPrestador) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (isPrestador) {
          navigation.navigate('principalPrestador'); 
        } else {
          navigation.navigate('principaluser'); 
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  }

  return (
    <ImageBackground source={require('./imagebackground.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View>
          <Image source={require('./logoteste.png')} style={styles.logo} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="E-mail"
            value={email}
            onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword} />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleLogin(true)}>
            <Text style={styles.buttonText}>Login como Prestador</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleLogin(false)}>
            <Text style={styles.buttonText}>Login como Usuário</Text>
          </TouchableOpacity>
          
        </View>
        {/* Botão para abrir o modal */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={{ marginTop: 10, color: 'white' }}>Criar uma conta</Text>
        </TouchableOpacity>
        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Você é um prestador ou um usuário?</Text>
              <TouchableOpacity
                style={{ ...styles.buttons, backgroundColor: "#a32c28" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate('Prestador'); 
                }}
              >
                <Text style={styles.buttonText}>Prestador</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.buttons, backgroundColor: "#a32c28" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate('Usuario'); 
                }}
              >
                <Text style={styles.buttonText}>Usuário</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adicione um pouco de transparência ao fundo
  },
  buttonContainer: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 21,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#a32c28',
    width: '42%', // Divida o espaço disponível igualmente entre os botões
    alignItems: 'center',
  },
  buttons: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#a32c28',
    width: '42%', // Divida o espaço disponível igualmente entre os botões
    alignItems: 'center',
    
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  inputContainer: {
    width: '100%', // Faça os campos de entrada ocuparem toda a largura disponível
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  logo: {
    width: 400,
    height: 150,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 2,
  },
  // Estilos para o modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    height:190,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    justifyContent:"space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default HomeScreen;
