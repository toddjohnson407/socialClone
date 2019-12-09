import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer, NavigationScreenProp } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


export class LoginRegister extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate, replace } = this.props.navigation;
    return (
      <Button
        title="Go Home"
        onPress={() => replace('Home')}
      />
    );
  }
}
