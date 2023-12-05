import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './Components/RegisterScreen';
import HomeScreen from './Components/HomeScreen';
import PrestadorScreen from './Components/PrestadorScreen';
import PrincipalUsuario from './Components/PrincipalUsuario';
import PrincipalPrestador from './Components/PrincipalPrestador';
import LoginScreen from './Components/LoginScreen';
import LoginScreenUser from './Components/LoginScreenUser';




export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="NAVSOS" component={HomeScreen} />
        <Stack.Screen name="Usuario" component={RegisterScreen} />
        <Stack.Screen name="Prestador" component={PrestadorScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="LoginUser" component={LoginScreenUser} />
        <Stack.Screen
          name="principaluser"
          component={PrincipalUsuario}
          options={{ gestureEnabled: false }}
        /> 
         <Stack.Screen
          name="principalPrestador"
          component={PrincipalPrestador}
          options={{ gestureEnabled: false }}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

