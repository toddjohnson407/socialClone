import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from './home/Home';
import { LoginRegisterScreen } from './login-register/LoginRegister';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    LoginRegister: { screen: LoginRegisterScreen }
  },
  {
    initialRouteName: 'Home'
  }
)

const App = createAppContainer(MainNavigator);

export default App;
