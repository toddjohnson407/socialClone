
import React from 'react';
import { View, Alert, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import { Icon, Text, Item, Form, Input, Button, Container, Content, Grid, Row, Body, H2 } from 'native-base';

import { db, storage, createTimestamp } from '../config';

import getPermission from '../utils/getPermission';
import uriToBlob from '../utils/uriToBlob';
import uploadPhoto from '../utils/uploadPhoto';
import selectPhoto from '../utils/selectPhoto';
import getProfile from '../utils/getProfile';

class Post {
  constructor(
    description, imageRef, profileId, created, 
    likes = [], comments = []
  ) { }
}

let addPost = (newPost) => {
  db.collection('posts').doc().set(newPost)
    .then(res => console.log('Success', res))
    .catch(err => console.log('Error', err))
};

export class AddItem extends React.Component {

  state = { description: '', imageUrl: '', imageUri: '', errorMessage: null, profile: null };

  handleSubmit = async () => {
    if (this.state.imageUri && this.state.name) {

      let imageUrl = await uploadPhoto(this.state.imageUri);
      let timestamp = await createTimestamp();

      let newPost = new Post(this.state.description, imageUrl, this.state.profile.id, timestamp);
      addPost(newPost);
    }
  };
  
  _choosePhoto = async () => {
    selectPhoto()
      .then(uri => this.setState({ imageUri: uri }))
      .catch(err => console.log('Error getting photo uri:', err));
  }

  async componentDidMount() {
    let profile = await getProfile();
    this.setState({ profile });
    console.log(this.state.profile);
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
                    placeholder="Post Description"
                    autoCapitalize="none"
                    onChangeText={description => this.setState({ description })}
                    value={this.state.description}                    
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
