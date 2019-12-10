import React from 'react';
import { View } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';


import { Home } from './src/screens/Home';
import { LoginRegister } from './src/screens/LoginRegister';
import { AddItem } from './src/screens/AddItem';
import { ListItems } from './src/screens/ListItems';
import { SelectPhoto } from './src/screens/SelectPhoto';
import { SignUp } from './src/screens/SignUp';
import { Login } from './src/screens/Login';
import { Loading } from './src/screens/Loading';

import { AppLoading } from 'expo';
import { Container, Text, StyleProvider, Header, Left, Right, Body, Title, Icon } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import variables from './native-base-theme/variables/variables';

const TabNavigator = createMaterialBottomTabNavigator(
  {
    AddItem: { screen: AddItem, navigationOptions: {
      tabBarIcon: (({tintColor}) => (
        <View><Icon style={[{color: tintColor, fontSize: 26}]} name="add-circle"/></View>
      ))
    }},
    List: { screen: ListItems, navigationOptions: {
      tabBarIcon: (({tintColor}) => (
        <View><Icon style={[{color: tintColor, fontSize: 26}]} name="home"/></View>
      )),
    }},
  },
  {
    initialRouteName: 'List',
    shifting: false,
    labeled: false,
    activeColor: '#21f0d3',
    inactiveColor: 'grey',
    barStyle: { backgroundColor: 'white' }
  }
);

const MainNavigator = createStackNavigator(
  {
    Home: { screen: TabNavigator },
    LoginRegister: { screen: LoginRegister },
    SelectPhoto: { screen: SelectPhoto },
    Login,
    SignUp,
    Loading
  },
  {
    initialRouteName: 'Loading',
    defaultNavigationOptions: {
      header: null
    }
  }
)

const AppContainer = createAppContainer(MainNavigator);



export default class App extends React.Component { 

  constructor(props) {
    super(props);
    this.state = { isReady: false };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render () {
    if (!this.state.isReady) return <AppLoading/>
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header>
            <Left style={{flex:1}}/>
            <Body style={{flex:1}}>
              <Title>Social Clone</Title>
            </Body>
            <Right style={{flex:1}}/>
          </Header>
          <AppContainer/> 
        </Container>
      </StyleProvider>
    );
  }

};
