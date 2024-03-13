import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { auth } from "../src/services/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const PrestadorScreen = () => {
  const navigation = useNavigation();
  const [foto, setFoto] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedJobNames, setSelectedJobNames] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('A permissão para acessar a biblioteca de mídia é necessária!');
      }
    })();
  }, []);

  
  const handleJobSelection = (jobValue, jobLabel) => {
    const updatedSelection = [...selectedJobs];
    const updatedJobNames = [...selectedJobNames];

    const index = updatedSelection.indexOf(jobValue);

    if (index !== -1) {
      updatedSelection.splice(index, 1);
      updatedJobNames.splice(index, 1);
    } else {
      updatedSelection.push(jobValue);
      updatedJobNames.push(jobLabel);
    }

    setSelectedJobs(updatedSelection);
    setSelectedJobNames(updatedJobNames);
  };

  const jobs = [
    { label: 'Trocar Pneu', value: 'Trocar Pneu' },
    { label: 'Busco sua gasolina', value: 'Busco sua gasolina' },
    { label: 'Chaveiro', value: 'Chaveiro' },
    { label: 'Mecânico faz tudo', value: 'Mecânico faz tudo' },
  ];

  const handleRegister = () => {
    if (password !== cPassword) {
      Alert.alert('A senha e a confirmação de senha não coincidem');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('principalPrestador');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Text style={styles.title}>Registro Prestador</Text>
      <TextInput
        style={styles.input}
        placeholder="Cpf"
        value={cpf}
        onChangeText={setCpf}
      />
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
      <Text style={styles.label}>Selecione o tipo de trabalho:</Text>
      {jobs.map((job) => (
        <TouchableOpacity
          key={job.value}
          style={styles.jobButton}
          onPress={() => handleJobSelection(job.value, job.label)}
        >
          <Text style={styles.jobButtonText}>{job.label}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.selectedJobsLabel}>Trabalhos Selecionados: {selectedJobNames.join(', ')}</Text>

      <Button title="Registrar" onPress={handleRegister} 
        color="#a32c28"/>
      <TouchableOpacity onPress={() => navigation.navigate('NAVSOS')}>
        <Text style={styles.loginLink}>Já possuo login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor:"black",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color:"white",
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#3498db',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor:'white',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color:"white",
  },
  jobButton: {
    backgroundColor: '#a32c28',
    padding: 2,
    borderRadius: 8,
    marginBottom: 10,
  },
  jobButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedJobsLabel: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
    color:"white",
  },
  loginLink: {
    marginTop: 10,
    color: '#a32c28',
    fontSize: 16,
  },
});

export default PrestadorScreen;
