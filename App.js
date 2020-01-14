import React from 'react';
import { View } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { AddItem } from './src/screens/AddItem';
import { ListItems } from './src/screens/ListItems';
import { SelectPhoto } from './src/screens/SelectPhoto';
import { SignUp } from './src/screens/SignUp';
import { Login } from './src/screens/Login';
import { Loading } from './src/screens/Loading';
import { Profile } from './src/screens/Profile';
import { OtherProfile } from './src/screens/OtherProfile';
import { Settings } from './src/screens/Settings';


import { AppLoading } from 'expo';
import { Container, Text, StyleProvider, Header, Left, Right, Body, Title, Icon, Button } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import variables from './native-base-theme/variables/variables';

import NavigationService from './NavigationService.js';



const TabNavigator = createMaterialBottomTabNavigator(
  {
    List: { screen: ListItems, navigationOptions: {
      tabBarIcon: (({tintColor}) => (
        <View><Icon style={[{color: tintColor, fontSize: 26}]} name="home"/></View>
      )),
    }},
    AddItem: { screen: AddItem, navigationOptions: {
      tabBarIcon: (({tintColor}) => (
        <View><Icon style={[{color: tintColor, fontSize: 26}]} name="add-circle"/></View>
      ))
    }},
    Profile: { screen: Profile, navigationOptions: {
      tabBarIcon: (({tintColor}) => (
        <View><Icon style={[{color: tintColor, fontSize: 26}]} name="person"/></View>
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

// const ModalNavigator = createStackNavigator(
//   { Profile: { screen: ProfileModal } },
//   { mode: 'modal', gesturesEnabled: false }
// );

const MainNavigator = createStackNavigator(
  {
    Home: { screen: TabNavigator },
    SelectPhoto: { screen: SelectPhoto },
    Login,
    SignUp,
    Loading,
    Settings,
    OtherProfile
  },
  {
    headerMode: 'none',
    initialRouteName: 'Loading',
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppContainer = createAppContainer(MainNavigator);


export default class App extends React.Component { 

  state = { isReady: false };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }
  
  openSettings = () => NavigationService.navigate('Settings');

  render () {
    if (!this.state.isReady) return <AppLoading/>
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header>
            <Left style={{flex:1}}/>
            <Body style={{flex:1, alignItems: 'center'}}>
              <Title>ShitGram</Title>
            </Body>
            <Right style={{flex:1}}>
              <Button transparent onPress={this.openSettings}>
                <Icon name='settings'/>
              </Button>
            </Right>
          </Header>
          <AppContainer ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef) }/> 
        </Container>
      </StyleProvider>
    );
  }
  
};



// Expo packages removed from package.json

// deps
// "@expo/vector-icons": "^10.0.0",
// "expo": "^35.0.0",
// "expo-asset": "~7.0.0",
// "expo-constants": "~7.0.0",
// "expo-file-system": "~7.0.0",
// "expo-font": "~7.0.0",
// "expo-image-picker": "~7.0.0",
// "expo-permissions": "~7.0.0",

// scripts
// "web": "expo start --web",

// devdeps
// "babel-preset-expo": "^7.1.0"


