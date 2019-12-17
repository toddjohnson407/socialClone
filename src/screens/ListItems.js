import React, { Component } from 'react';
import { View, FlatList, Image, StyleSheet, Text } from 'react-native';
import { Button, Thumbnail, Icon } from 'native-base'

import { db, auth, storage } from '../config';
import logout from '../utils/logout';

let posts = db.collection('posts');
let profiles = db.collection('profiles');

export class ListItems extends Component {

  state = { posts: [], profiles: {} }

  async _loadPosts(data) {
    // Set posts as an empty array
    let posts = [];
    // Push each download url to the posts []
    for (let post of data) {
      // Retrieve profile information from database if it hasn't been previously retrieved
      if (!Object.keys(this.state.profiles).find(id => id === post.profileId)) {
        // Get profile data for the given post
        let profile = await profiles.doc(post.profileId).get();
        // Get profile picture download url
        let picture = await storage.ref(profile.data().avatarRef).getDownloadURL();
        // Add profile object to existing profiles state
        this.setState(prev => ({ profiles: {
          ...prev.profiles, 
          ...{ [profile.id]: { username: profile.data().username, picture } }
        }}));
      }
      // Push the new post information to the posts Array
      posts.push({ key: await storage.ref(post.imageRef).getDownloadURL(), description: post.description, profile: post.profileId });
    }
    // Set posts state with loaded data from posts Array
    this.setState({ posts });
  }

  componentDidMount() {
    // Retrieve all posts ordered by descending date and listen for updates
    posts.orderBy('created', 'desc').onSnapshot(data => {
      // Set an empty array and push each post doc to it to be formatted
      let posts = [];
      data.forEach(doc => posts.push(doc.data()));
      // Retrieve an format relevant posts data
      this._loadPosts(posts);
    }, (error) => console.log('Error retrieving posts', error));
  }

  /** Navigates to a user with their id */
  showProfile = (id) => this.props.navigation.navigate('OtherProfile', { id });

  render() {
    return (
      <View style={styles.ctn}>
        <FlatList data={this.state.posts} renderItem={({item}) => 
          <View style={styles.post}>
            <View style={styles.header}>
              <Thumbnail source={{ uri: this.state.profiles[item.profile].picture }} style={{ height: 40, width: 40, borderRadius: 20, marginRight: 12 }}></Thumbnail>
              <Button transparent onPress={() => this.showProfile(item.profile)}>
                <Text style={styles.username}>{ this.state.profiles[item.profile].username }</Text>
              </Button>
            </View>
            <View><Image style={styles.image} source={{ uri: item.key }}/></View>
            <View style={styles.actions}>
              <Button transparent onPress={this.likePost}>
                <Icon name="heart-empty" style={{fontSize: 30}}/>
              </Button>
              <Button transparent>
                <Icon name="text" style={{fontSize: 30}}/>
              </Button>
            </View>
            <View style={styles.description}>
              <Text>{ item.description }</Text>
            </View>
          </View>
        }/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  post: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  header: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    marginBottom: 8,
    marginTop: 4
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 0,
    paddingTop: 4
  },
  ctn: { backgroundColor: 'white' },
  username: { fontWeight: 'bold' },
  image: { height: 310, width: 375 },
  description: {
    flex: 1,
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingTop: 4
  }
})

