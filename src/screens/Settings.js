import React from 'react';
import { View } from 'react-native';

import { Text, Button, Form, Grid, Row, Body, Title, Header, Right, Left, Icon, Container, Content } from 'native-base';

import clearNav from '../utils/clearNav';
import logout from '../utils/logout';

export class Settings extends React.Component {

  signOut = async () => {
    let action = await logout();
    this.props.navigation.dispatch(action)
  }

  render() {
    return (
      <Container>
        <Content>
          <Body>

            <Grid>
              <Row size={1}>
                <Text style={{ color: 'rgba(33,240,211,1)', fontSize: 25, fontWeight: 'bold' }}>Settings</Text>
              </Row>
              <Row size={1}>
                <Button onPress={this.signOut}>
                  <Text>Logout</Text>
                </Button>
              </Row>
              {/* <Row size={1}>

              </Row>
              <Row size={1}>

              </Row>
              <Row size={1}>

              </Row> */}
            </Grid>
          </Body>
        </Content>
      </Container>
    );
  }
}
