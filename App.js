import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './Components/RegisterScreen';
import HomeScreen from './Components/HomeScreen';
import PrestadorScreen from './Components/PrestadorScreen';
import PrincipalUsuario from './Components/PrincipalUsuario';
import PrincipalPrestador from './Components/PrincipalPrestador';





export default function App() {
  const Stack = createStackNavigator();
  useEffect(() => {
    const backAction = () => {
    
      return false; 
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); 
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="NAVSOS" component={HomeScreen} />
        <Stack.Screen name="Usuario" component={RegisterScreen}  />
        <Stack.Screen name="Prestador" component={PrestadorScreen} />
        
        <Stack.Screen
          name="principaluser"
          component={PrincipalUsuario}
          options={{ 
            gestureEnabled: false, // Desativar gestos de navegação
            
          }}
        /> 
         <Stack.Screen
          name="principalPrestador"
          component={PrincipalPrestador}
          options={{ 
            gestureEnabled: false, // Desativar gestos de navegação
            headerShown: false // Ocultar o cabeçalho
          }}        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

