
import React from 'react'

import { StyleSheet } from 'react-native';

import { Container, Header, Content, Button, Text, Footer, Left, Body, Title, Icon, Right, Spinner } from 'native-base';

import { auth } from '../config';

export class Loading extends React.Component {

  componentDidMount() {
    auth.onAuthStateChanged(user => this.props.navigation.navigate(user ? 'Home' : 'SignUp'))
  }

  render() {
    return (
      <Container style={styles.container}><Spinner/></Container>
    );
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