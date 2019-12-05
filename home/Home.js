
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer, NavigationScreenProp } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


export class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home Screen',
  };
  render() {
    const { navigate, replace } = this.props.navigation;
    return (
      <Button
        title="Login - Register"
        onPress={() => replace('LoginRegister')}
      />
    );
  }
}
