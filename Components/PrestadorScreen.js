import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { auth } from "../src/services/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const PrestadorScreen = () => {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedJobNames, setSelectedJobNames] = useState([]);

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

      <Button title="Registrar" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Já possuo login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#3498db',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  jobButton: {
    backgroundColor: '#3498db',
    padding: 12,
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
  },
  loginLink: {
    marginTop: 10,
    color: '#3498db',
    fontSize: 16,
  },
});

export default PrestadorScreen;
