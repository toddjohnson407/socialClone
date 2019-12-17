
import React from 'react';
import { View, Text, Alert, TextInput, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { Icon, Item, Form, Input, Button, Container, Content, Grid, Row, Col, Body, Textarea } from 'native-base';

import { db, storage, createTimestamp } from '../config';

import getPermission from '../utils/getPermission';
import uriToBlob from '../utils/uriToBlob';
import uploadPhoto from '../utils/uploadPhoto';
import selectPhoto from '../utils/selectPhoto';
import takePhoto from '../utils/takePhoto';
import getProfile from '../utils/getProfile';

class Post {
  constructor(
    description, imageRef, profileId, created, 
    likes = [], comments = []
  ) { }
}

let formatPost = (description, imageRef, profileId, created, likes = [], comments = []) => {
  let post = { description, imageRef, profileId, created, likes, comments };
  return post;
}

let addPost = (newPost) => {
  return db.collection('posts').doc().set(newPost)
    .then(res => true)
    .catch(err => false)
};

export class AddItem extends React.Component {

  state = { description: '', imageUri: '', errorMessage: null, profile: null, uploadStatus: 'Upload' };

  handleSubmit = async () => {
    if (this.state.imageUri && this.state.description) {

      let imageRef = await uploadPhoto(this.state.imageUri);
      let timestamp = await createTimestamp();

      let newPost = formatPost(this.state.description, imageRef, this.state.profile.id, timestamp);

      addPost(newPost).then(res => res && this.resetState());
    }
  };

  /** Resets the components state */
  resetState() {
    this.setState({ description: '', imageUri: '', errorMessage: null, profile: null, uploadStatus: 'Upload' });
  }
  
  _choosePhoto = async () => {
    selectPhoto()
      .then(uri => uri && this.setState({ imageUri: uri, uploadStatus: 'Uploaded' }))
      .catch(err => console.log('Error getting photo from library uri:', err));
  }

  _takePhoto = async () => {
    takePhoto()
      .then(uri => uri && this.setState({ imageUri: uri, uploadStatus: 'Uploaded' }))
      .catch(err => console.log('Error getting taken photo uri:', err));
  }

  async componentDidMount() {
    let profile = await getProfile();
    this.setState({ profile });
  }

  render() {
    return (

      <View style={styles.addPost}>
        <View style={styles.form}>
          <Input
            multiline
            blurOnSubmit
            returnKeyType="done"
            maxLength={150}
            placeholderTextColor="#6a6d6c"
            style={styles.description}
            placeholder="Post Description..."
            onChangeText={description => this.setState({ description })}
            value={this.state.description}                    
          />
          <Text style={styles.descriptionChars}>{this.state.description.length}/150</Text>
        </View>


        <View style={styles.photoWrapper}>

          <View style={styles.photoSelect}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', paddingBottom: 5 }}>
              <Button transparent onPress={this._takePhoto}>
                <Icon name="camera" style={{fontSize: 45, height: 45, marginRight: 10, marginLeft: 0}}/>
              </Button>
              <Button transparent onPress={this._choosePhoto}>
                <Icon name="images" style={{fontSize: 45, height: 45, marginRight: 0, marginLeft: 10}}/>
              </Button>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.selectLabel}>{this.state.uploadStatus}</Text>
            </View>
          </View>
          <View style={styles.photoDisplay}>
            {this.state.imageUri ? <Image style={styles.image} source={{ uri: this.state.imageUri }}/> : null}
          </View>

        </View>

        <View style={styles.submitPost}>
          {this.state.imageUri ? <Button transparent onPress={this.handleSubmit}>
            <Icon name="cloud-upload" style={{fontSize: 60, height: 60}}/>
          </Button> : null}
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  addPost: {
    height: '100%',
    backgroundColor: 'white'
  },
  descriptionChars: {
    // flex: 1,
    color: '#6a6d6c',
    alignSelf: 'center',
    width: '90%',
  },
  form: {
    flex: 2,
    width: '100%',
    marginTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: 'rgba(209, 209, 209, 0.7)',
  },
  photoWrapper: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(209, 209, 209, 0.7)',
  },
  photoDisplay: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: '5%'
  },
  photoSelect: {
    flex: 1,
    paddingLeft: '5%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  submitPost: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectLabel: {
    color: '#6a6d6c',
    fontSize: 16,
    paddingTop: 5
    // fontWeight: 'bold'
  },
  image: { height: 90, width: 90 },
  description: {
    flex: 1,
    paddingLeft: '5%'
  }
});

