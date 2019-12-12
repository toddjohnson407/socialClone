
import React from 'react'
import { StyleSheet } from 'react-native';

import { auth } from '../config';
import clearNav from '../utils/clearNav';

import { View, Card, CardItem, Grid, Col, Row, Container, Header, Content, Button, Text, Footer, Left, Body, Title, Icon, Right, Spinner, Input, Label, Form, Item } from 'native-base';

export class Login extends React.Component {
  
  state = { email: '', password: '', errorMessage: null }
  
  handleLogin = () => {
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => clearNav('Loading').then(action => this.props.navigation.dispatch(action)))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  goToSignUp = () => this.props.navigation.navigate('SignUp');

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <Grid>
            <Row size={2}>
              <Body>
                <Text style={styles.header}>Login</Text>
                {this.state.errorMessage &&
                  <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                  </Text>}
              </Body>
            </Row>
            <Row size={2}>
              <Form style={styles.form}>
                <Item stackedLabel>
                  <Input
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}                    
                  />
                </Item>

                <Item stackedLabel>
                  <Input 
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                  />
                </Item>
              </Form>    
            </Row>
            <Row size={2}>
              <Body>
                <Button transparent onPress={this.goToSignUp}>
                  <Text style={styles.signup}>Don't have an account? Sign Up</Text>
                </Button>
              </Body>
            </Row>          
            <Row size={2}>
              <Body>
                <Button transparent onPress={this.handleLogin}>
                  <Icon name="ios-checkmark-circle" style={{fontSize: 34}}/>
                </Button>
              </Body>
            </Row>
          </Grid>

        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  signup: {
    color: 'blue'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 25
  },
  form: {
    width: 325
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
});
