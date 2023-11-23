import {View,Text,Button,StyleSheet} from 'react-native';
const HomeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Escolha uma opção:</Text>
        <Button
          title="Registrar como Prestador de Serviço"
          onPress={() => navigation.navigate('Prestador')}
          style={styles.button}
          color="#4CAF50" // Cor verde
        />
        <View style={styles.separator} /> 
        <Button
          title="Registrar como Usuário do Serviço"
          onPress={() => navigation.navigate('Register')}
          style={styles.button}
          color="#2196F3" // Cor azul
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
      backgroundColor: '#282c34', 
      
    },
    title: {
      fontSize: 24,
      marginBottom: 24,
      color: 'white', 
      
    },
    button: {
      marginTop: 16,
      backgroundColor: 'white', 
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 24,
    },
    buttonText: {
      color: 'black', 
    },
    separator: {
      height: 16, 
    },
  });
  export default HomeScreen;
