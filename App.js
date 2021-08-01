
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from "@react-navigation/native"
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ChatScreen from './Screens/ChatScreen';
const Stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login screen" component={LoginScreen} />
        <Stack.Screen name="register screen" component={RegisterScreen} />
        <Stack.Screen name="chat screen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



