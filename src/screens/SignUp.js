
import React from 'react';
import { StyleSheet } from 'react-native';

import { auth } from '../config';

import { View, Card, CardItem, Grid, Col, Row, Container, Header, Content, Button, Text, Footer, Left, Body, Title, Icon, Right, Spinner, Input, Label, Form, Item } from 'native-base';


export class SignUp extends React.Component {

  state = { email: '', password: '', username: '', username: '', errorMessage: null }

  handleSignUp = () => {
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {

        let user = auth.currentUser;
        user.updateProfile({ displayName: this.state.username }).then(res => this.props.navigation.navigate('Main')).catch(err => console.log(err))
      }).catch(error => this.setState({ errorMessage: error.message }))
  }

  goToLogin = () => this.props.navigation.navigate('Login');

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <Grid>
            <Row size={2}>
              <Body>
                <Text style={styles.header}>Create an Account</Text>
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
                    placeholder="Username"
                    autoCapitalize="none"
                    onChangeText={username => this.setState({ username })}
                    value={this.state.username}                    
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
            <Row size={1}>
              <Body>
                <Button transparent onPress={this.goToLogin}>
                  <Text style={styles.signup}>Already have an account? Login</Text>
                </Button>
              </Body>
            </Row>          
            <Row size={2}>
              <Body>
                <Button transparent onPress={this.handleSignUp}>
                  <Icon name="ios-checkmark-circle" style={{fontSize: 34}}/>
                </Button>
              </Body>
            </Row>
          </Grid>

        </Content>
      </Container>
    );
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
    // backgroundColor: 'pink',
    width: 325
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})