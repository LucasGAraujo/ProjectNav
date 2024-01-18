import React from 'react';
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

  const handleGoogleRegister = () => {
    console.log('Registrado com Google:', nome);
  };

  const handleAppleRegister = () => {
    console.log('Registrado com Apple:', nome);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
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

      <Text style={styles.orText}>OU</Text>

      <TouchableOpacity style={styles.socialButton} onPress={handleGoogleRegister}>
        <Icon name="google" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.socialButtonText}>Registrar com Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton} onPress={handleAppleRegister}>
        <Icon name="apple" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.socialButtonText}>Registrar com Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LoginUser')}>
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
