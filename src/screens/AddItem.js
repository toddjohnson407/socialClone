
import React from 'react';
import { View, Alert, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import { Icon, Text, Item, Form, Input, Button, Container, Content, Grid, Row, Body, H2 } from 'native-base';

import { db, storage } from '../config';

import getPermission from '../utils/getPermission';
import uriToBlob from '../utils/uriToBlob';
import uploadPhoto from '../utils/uploadPhoto';
import selectPhoto from '../utils/selectPhoto';

let addItem = (item, imageUrl) => {
  db.collection('posts').doc().set({
    title: item,
    image: imageUrl
  }).then(res => console.log('Success', res))
    .catch(err => console.log('Error', err))
};

export class AddItem extends React.Component {

  state = { name: '', imageUrl: '', imageUri: '', errorMessage: null };

  handleChange = e => {
    this.setState({
      name: e.nativeEvent.text
    });
  };

  handleSubmit = async () => {
    if (this.state.imageUri && this.state.name) {
      let imageUrl = await uploadPhoto(this.state.imageUri);
      this.setState({ imageUrl });
      addItem(this.state.name, this.state.imageUrl);
      Alert.alert('Item saved successfully');
    }
  };
  
  _choosePhoto = async () => {
    selectPhoto().then(uri => this.setState({ imageUri: uri }));
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <Grid>
            <Row size={2}>
              <Body>
                <Text style={styles.header}>New Post</Text>
                {this.state.errorMessage &&
                  <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                  </Text>}
              </Body>
            </Row>
            <Row size={1}>
              <Form style={styles.form}>
                <Item stackedLabel>
                  <Input
                    placeholder="Post Title"
                    autoCapitalize="none"
                    onChangeText={name => this.setState({ name })}
                    value={this.state.name}                    
                  />
                </Item>
              </Form>    
            </Row>    
            <Row size={3}>
              <Body>
                <Button bordered onPress={this._choosePhoto}>
                  <Text>Select Photo</Text>
                </Button>
              </Body>
            </Row>    
            <Row size={1}>
              <Body>
                <Button transparent onPress={this.handleSubmit}>
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
    width: 325
  }
});
