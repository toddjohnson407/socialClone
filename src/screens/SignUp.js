
import React from 'react';
import { StyleSheet } from 'react-native';

import { db, auth, storage, createTimestamp } from '../config';

import { Card, CardItem, Grid, Col, Row, Container, Header, Content, Button, Text, Footer, Left, Body, Title, Icon, Right, Spinner, Input, Label, Form, Item } from 'native-base';

let profiles = db.collection('profiles');

/** Formats user data for sending to the database */
let newProfile = (username, name, created, userId, bio = '', avatarRef = '', followers = [], following = []) => {
  let profile = { username, name, created, userId, followers, following, avatarRef, bio };
  return profile;
}
/** Create a new Profile document for the newly created user */
let createProfile = (newProfile) => {
  db.collection('profiles').doc().set(newProfile).then(res => console.log('Profile created'))
    .catch(err => console.log('Error creating a profile for the user:', err))
}

export class SignUp extends React.Component {

  state = { email: '', password: '', name: '', username: '', errorMessage: null }

  handleSignUp = () => {
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then((res) => {

      let profile = newProfile(this.state.username, this.state.name, createTimestamp(), res.user.uid);
      createProfile(profile);

    }).catch(error => this.setState({ errorMessage: error.message }))
  }

  goToLogin = () => this.props.navigation.replace('Login');

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <Grid>

            <Row size={1}>
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
                  <Input placeholder="Name" autoCapitalize="words" value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                    />
                </Item>

                <Item stackedLabel>
                  <Input placeholder="Email" autoCapitalize="none" value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    />
                </Item>

                <Item stackedLabel>
                  <Input
                    placeholder="Username" value={this.state.username} autoCapitalize="none"
                    onChangeText={username => this.setState({ username })}       
                    />
                </Item>

                <Item stackedLabel>
                  <Input secureTextEntry placeholder="Password" autoCapitalize="none" value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    />
                </Item>

              </Form>    
            </Row>

            <Row size={0}>
              <Body>
                <Button transparent onPress={this.goToLogin}>
                  <Text style={styles.signup}>Already have an account? Login</Text>
                </Button>
              </Body>
            </Row>          

            <Row size={1}>
              <Body>
                <Button transparent onPress={this.handleSignUp} style={{ height: 70 }}>
                  <Icon name="ios-checkmark-circle" style={{fontSize: 50}}/>
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
  signup: { color: 'blue' },
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
  header: { fontSize: 25 },
  form: { width: 325 },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
});
