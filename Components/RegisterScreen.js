import React, { useState, useEffect } from 'react';

import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, provider } from '../src/services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [cPassword, setCPassword] = React.useState('');
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('A permissão para acessar a biblioteca de mídia é necessária!');
      }
    })();
  }, []);

  const escolherFoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFoto(result.uri);
    }
  };
  
  const handleRegister = () => {
    if (password !== cPassword) {
      Alert.alert('A senha e a confirmação de senha não coincidem');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('principaluser');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Registro</Text>
      <TouchableOpacity onPress={escolherFoto}>
        {foto ? (
          <Image source={{ uri: foto }} style={styles.foto} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Adicionar Foto</Text>
          </View>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        secureTextEntry
        value={cPassword}
        onChangeText={setCPassword}
      />
      <Button title="Registrar" onPress={handleRegister}
        color="#a32c28" />

      <TouchableOpacity onPress={() => navigation.navigate('NAVSOS')}>
        <Text style={{ marginTop: 10, color: '#a32c28' }}>Já possuo login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: "black", // Light background color
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: 'white', // Darker text color
  },
  foto: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 16,
  },
  placeholder: {
    width: 130,
    height: 130,
    borderRadius: 100,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: '#555',
  },
  input: {
    backgroundColor:"white",
    height: 40,
    width: '80%',
    borderColor: '#bdc3c7', // Border color
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  orText: {
    marginVertical: 16,
    fontSize: 16,
   color: '#a32c28',
  },
  socialButton: {
    backgroundColor: '#a32c28', // Darker background color
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 12,
  },
  socialButtonText: {
    color: 'black', // White text color
  },
});

export default RegisterScreen;
