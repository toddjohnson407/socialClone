
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer, NavigationScreenProp } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { db } from '../config';

let posts = db.collection('posts').doc('ZZPygl5y7IyJIgYDrh6p');

export class Home extends React.Component {
  static navigationOptions = {
    title: 'Home Screen',
  };
  
  render() {
    posts.get().then(doc => console.log(doc.data())).catch(err => console.log(err, 'ERROR'));
    const { navigate, replace } = this.props.navigation;
    return (
      <View>
        <Text>Home Screen</Text>
        <Button
          title="Add an Item"
          onPress={() => this.props.navigation.navigate('AddItem')}
        />
        <Button
          title="List of Items"
          color="green"
          onPress={() => this.props.navigation.navigate('List')}
        />
        <Button
          title="Select Photo"
          color="pink"
          onPress={() => this.props.navigation.navigate('SelectPhoto')}
        />
      </View>
    );
  }
}
