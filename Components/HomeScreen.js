import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('./logoteste.jpeg')} style={styles.logo} />
      </View>
      <Text style={styles.title}>Escolha uma opção:</Text>
      <Button
        title="Registrar como Prestador"
        onPress={() => navigation.navigate('Prestador')}
        style={styles.button}
        color="#6C63FF"
      />
      <View style={styles.separator} />
      <Button
        title="Registrar como Usuário"
        onPress={() => navigation.navigate('Usuario')}
        style={styles.button}
        color="#6C63FF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9F9F9', 
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    color: '#333', 
  },
  button: {
    marginTop: 16,
    backgroundColor: '#6C63FF', 
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: 'white', 
  },
  separator: {
    height: 16,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
});

export default HomeScreen;
