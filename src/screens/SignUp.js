
import React from 'react';
import { StyleSheet } from 'react-native';

import { auth } from '../config';

import { View, Card, CardItem, Grid, Col, Row, Container, Header, Content, Button, Text, Footer, Left, Body, Title, Icon, Right, Spinner, Input, Label, Form, Item } from 'native-base';


export class SignUp extends React.Component {

  state = { email: '', password: '', errorMessage: null }

  handleSignUp = () => {
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <Grid>
            <Row size={1}>
              <Body>


                <Text>Create an Account</Text>
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
                <Button transparent onPress={this.handleSignUp}>
                  <Icon name="ios-checkmark-circle" style={{fontSize: 40}}/>
                </Button>
              </Body>
            </Row>
            {/* <Row size={0}></Row> */}

          </Grid>

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
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