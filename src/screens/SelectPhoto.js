
import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import getPermission from '../utils/getPermission';
import uriToBlob from '../utils/uriToBlob';

import { storage } from '../config';



const options = {
  allowsEditing: true,
};

export class SelectPhoto extends Component {
  state = {};

  _selectPhoto = async () => {
    const status = await getPermission(Permissions.CAMERA_ROLL);
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.cancelled) this.props.navigation.navigate('NewPost', { image: result.uri });
      this._uploadImage(result.uri)
    }
  };

  _takePhoto = async () => {
    const status = await getPermission(Permissions.CAMERA);
    if (status) {
      const result = await ImagePicker.launchCameraAsync(options);
      if (!result.cancelled) this.props.navigation.navigate('NewPost', { image: result.uri });
    }
  };

  _uploadImage = async (uri) => {
    let blob = await uriToBlob(uri);
    storage.ref(`posts/${blob._data.name}`).put(blob).then(snapshot => console.log('Image uploaded')).catch(err => console.log('Error storing image in Firebase:', err));
  }



  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this._selectPhoto} style={styles.text}>
          Select Photo
        </Text>
        <Text onPress={this._takePhoto} style={styles.text}>
          Take Photo
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    padding: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});