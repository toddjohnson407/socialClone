import React from 'react';
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import { Button, Form, Grid, Row, Body, Title, Header, Right, Left, Icon, Container, Content, Thumbnail } from 'native-base';

import { db, auth, storage } from '../config';
import getProfile from '../utils/getProfile';
import getProfilePosts from '../utils/getProfilePosts';

export class Profile extends React.Component {

  state = { posts: [], id: null, username: null, avatarRef: null, name: null, bio: null, followers: [], following: [],  }

  _loadPosts = async (data) => {
    let urls = [];
    // Push each download url to the posts []
    for (let post of data) urls.push({ key: await storage.ref(post.imageRef).getDownloadURL(), description: post.description });
    this.setState({ posts: urls });
  }

  async componentDidMount() {
    let profile = await getProfile();
    let posts = await getProfilePosts(profile.id);
    this.setState({...{posts: []}, ...profile});
    await this._loadPosts(posts);
    console.log(this.state);
    // this.setState({ posts: await this._loadPosts(posts) });
    this.setState({ avatarRef: await storage.ref('avatars/testavatar.jpg').getDownloadURL() });
  }

  render() {
    if (!this.state.avatarRef || !this.state.posts) return null
    return (
      <View style={styles.profile}>
        
        <View style={styles.username}><Text style={styles.usernameText}>{this.state.username}</Text></View>

        <View style={styles.header}>

          <View style={styles.profilePicture}>
            <Thumbnail large source={{ uri: this.state.avatarRef }}></Thumbnail>
          </View>

          <View style={styles.subheader}>

            <View style={styles.headerSection}>
              <Text style={styles.sectionCounter}>{this.state.posts.length}</Text>
              <Text style={styles.sectionLabel}>{this.state.posts.length === 1 ? 'Post' : 'Posts'}</Text>
            </View>
            <View style={styles.headerSection}>
              <Text style={styles.sectionCounter}>{this.state.following.length}</Text>
              <Text style={styles.sectionLabel}>Followers</Text>

            </View>
            <View style={styles.headerSection}>
              <Text style={styles.sectionCounter}>{this.state.following.length}</Text>
              <Text style={styles.sectionLabel}>Following</Text>
            </View>
          </View>
        </View>
        <View style={styles.postsCtn}>
          <FlatList numColumns={3} data={this.state.posts} renderItem={({item}) => 
            <Image style={styles.post} source={{ uri: item.key }}></Image>
          }/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postsCtn: {
    flex: 6,
    paddingTop: 20,
    backgroundColor: 'white'
  },
  post: {
    width: 125,
    height: 125,
  },
  username: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 0
  },
  usernameText: {
    fontSize: 20,
  },
  profile: {
    height: '100%',
    backgroundColor: 'white'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: 'white',
    paddingBottom: 20
  },
  profilePicture: {
    flex: 1,
  },
  subheader: {
    flex: 3,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  headerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionCounter: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black'
  },
  sectionLabel: {
    fontSize: 15,
  }
});
