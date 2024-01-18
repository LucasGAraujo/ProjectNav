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
        color="#a32c28"
      />
      <View style={styles.separator} />
      <Button
        title="Registrar como Usuário"
        onPress={() => navigation.navigate('Usuario')}
        style={styles.button}
        color="#a32c28"
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
    backgroundColor: '#000000', 
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    color: '#FFFFFF', 
  },
  button: {
    marginTop: 16,
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
    width: 200,
    height: 200,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 2, 
    borderColor: 'white', 
  },
});

export default HomeScreen;
