import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert ,ScrollView,TouchableOpacity } from 'react-native';

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
      // Se já estiver selecionado, remova da seleção
      updatedSelection.splice(index, 1);
      updatedJobNames.splice(index, 1);
    } else {
      // Se não estiver selecionado, adicione à seleção
      updatedSelection.push(jobValue);
      updatedJobNames.push(jobLabel);
    }

    setSelectedJobs(updatedSelection);
    setSelectedJobNames(updatedJobNames);
  };

  const jobs = [
    { label: 'Trocar Pneu', value: 'Trocar Pneu' },
    { label: 'Especialista de eletrica', value: 'Especialista de eletrica' },
    { label: 'Busco sua gasolina', value: 'Busco sua gasolina' },
    { label: 'Chaveiro', value: 'Chaveiro' },
    { label: 'Mecanico faz tudo', value: 'Mecanico faz tudo' },
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
    <View style={styles.container}>
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
<ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ marginBottom: 10 }}>Selecione o tipo de trabalho:</Text>
      {jobs.map((job) => (
        <TouchableOpacity
          key={job.value}
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
          onPress={() => handleJobSelection(job.value, job.label)}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 5,
              borderWidth: 2,
              borderColor: 'black',
              marginRight: 10,
              backgroundColor: selectedJobs.includes(job.value) ? 'black' : 'transparent',
            }}
          />
          <Text>{job.label}</Text>
        </TouchableOpacity>
      ))}

      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>
        Trabalhos Selecionados: {selectedJobNames.join(', ')}
      </Text>
    </ScrollView>
      <Button title="Registrar" onPress={handleRegister} />
      <TouchableOpacity onPress={handleAlreadyHaveAccount = () => {
       navigation.navigate('Login'); 
      }}>
        <Text style={{ marginTop: 10, color: 'blue' }}>Já possuo login</Text>
      </TouchableOpacity>
    </View>
    
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default PrestadorScreen;
