
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer, NavigationScreenProp } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


// const { navigation } = this.props;

export class HomeScreen extends React.Component<{navigation: any}> {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() => navigate('Profile', {name: 'Jane'})}
      />
    );
  }
}
