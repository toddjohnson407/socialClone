
import React from 'react'

import { StyleSheet } from 'react-native';

import { Container, Header, Content, Button, Text, Footer, Left, Body, Title, Icon, Right, Spinner } from 'native-base';

import { auth } from '../config';

import logout from '../utils/logout';
import clearNav from '../utils/clearNav';

export class Loading extends React.Component {

  componentDidMount() {
    auth.currentUser && clearNav('Home').then(action => this.props.navigation.dispatch(action))
    auth.onAuthStateChanged(user => clearNav(user ? 'Home' : 'SignUp').then(action => this.props.navigation.dispatch(action)));
  }

  render() {
    return (<Container style={styles.container}><Spinner/></Container>);
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  }
})