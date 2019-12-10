import React from 'react';
import { View } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { Home } from './src/screens/Home';
import { AddItem } from './src/screens/AddItem';
import { ListItems } from './src/screens/ListItems';
import { SelectPhoto } from './src/screens/SelectPhoto';
import { SignUp } from './src/screens/SignUp';
import { Login } from './src/screens/Login';
import { Loading } from './src/screens/Loading';
import { ProfileModal } from './src/screens/Profile';

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

const ModalNavigator = createStackNavigator(
  { Profile: { screen: ProfileModal } },
  { mode: 'modal', gesturesEnabled: false }
);

const MainNavigator = createStackNavigator(
  {
    Home: { screen: TabNavigator },
    SelectPhoto: { screen: SelectPhoto },
    Profile: ModalNavigator,
    Login,
    SignUp,
    Loading
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

  openProfile = () => NavigationService.navigate('Profile', { isVisible: true });
  
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
            <Right style={{flex:1}}>
              <Button transparent onPress={this.openProfile}>
                <Icon name='person'/>
              </Button>
            </Right>
          </Header>
          <AppContainer ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef) }/> 
        </Container>
      </StyleProvider>
    );
  }
  
};

// rgba(33,240,211,1)
// openProfile = () => this.setState({ showModal: true });
// {/* {this.state.showModal && <ProfileModal isVisible={ this.state.showModal }/>} */}
