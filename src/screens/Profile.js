import React from 'react';
import { Modal, View } from 'react-native';

import { Text, Button, Form, Grid, Row, Body, Title, Header, Right, Left, Icon, Container, Content } from 'native-base';

export class ProfileModal extends React.Component {

  closeModal = () => this.props.navigation.navigate('Home');

  render() {
    return (
      <Modal
        onPress={this.press}
        animationType="slide"
        transparent={false}
        presentationStyle="pageSheet"
        onDismiss={this.closeModal}
        onRequestClose={this.closeModal}
        onSwipe={this.closeModal}
        visible={true}
      >

        <Container>
          <Header>
            <Left style={{flex:1}}/>
            <Body style={{flex:1}}>
              <Title>Your Profile</Title>
            </Body>
            <Right style={{flex:1}}>
              <Button transparent onPress={this.closeModal}>
                <Icon name='person'/>
              </Button>
            </Right>
          </Header>
          <Content>
            <Grid>
              <Row size={1}>
                {/* <Text style={{ color: 'rgba(33,240,211,1)', fontSize: 25, fontWeight: 'bold' }}>Your Profile</Text> */}
              </Row>
              <Row size={1}>

              </Row>
              <Row size={1}>

              </Row>
              <Row size={1}>

              </Row>
              <Row size={1}>

              </Row>
            </Grid>
          </Content>
        </Container>

      </Modal>
    );
  }
}
