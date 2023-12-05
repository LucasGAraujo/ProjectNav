import {View,Text,Button,StyleSheet,Image} from 'react-native';
const HomeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
         <View>
        
        <Image
          source={require('./logoteste.png')}
          style={styles.logo}
        />
      </View>
        <Text style={styles.title}>Escolha uma opção:</Text>
        <Button
          title="Registrar como Prestador"
          onPress={() => navigation.navigate('Prestador')}
          style={styles.button}
          color="#444" // Cor verde
        />
        <View style={styles.separator} /> 
        <Button
          title="   Registrar como Usuário   "
          onPress={() => navigation.navigate('Usuario')}
          style={styles.button}
          color="#444" // Cor azul
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
      backgroundColor: '#444', // Um tom de cinza escuro
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 24,
    },
  
    buttonText: {
      color: 'black', 
    },
    separator: {
      height: 16, 
    },  logo: {
      width: 100, 
      height: 100,
      resizeMode: 'contain', 
    },
  });
  export default HomeScreen;
