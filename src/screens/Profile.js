import React from 'react';
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import { Button, Form, Grid, Row, Body, Title, Header, Right, Left, Icon, Container, Content, Thumbnail } from 'native-base';

import { db, auth, storage } from '../config';
import getProfile from '../utils/getProfile';
import getProfilePosts from '../utils/getProfilePosts';
import selectPhoto from '../utils/selectPhoto';
import uploadPhoto from '../utils/uploadPhoto';

export class Profile extends React.Component {

  state = { posts: [], id: null, username: null, avatarRef: null, name: null, bio: null, followers: [], following: [],  }

  _loadPosts = async (data) => {
    let urls = [];
    // Push each download url to the posts []
    for (let post of data) urls.push({ key: await storage.ref(post.imageRef).getDownloadURL(), description: post.description });
    this.setState({ posts: urls });
  }

  _setAvatar = async () => {
    let uri = await selectPhoto();
    if (uri) {
      let avatarRef = await uploadPhoto(uri, 'avatars');
      avatarRef && db.collection('profiles').doc(this.state.id).set({ avatarRef }, { merge: true }).then(res => console.log('Avatar Updated')).catch(err => console.log('Error updating avatar', err));
    }
  }

  async componentDidMount() {
    let profile = await getProfile();
    let posts = await getProfilePosts(profile.id);
    this.setState({...{posts: [], avatarUri: null}, ...profile});
    await this._loadPosts(posts);
    this.setState({ avatarUri: await storage.ref(this.state.avatarRef).getDownloadURL() });
  }

  render() {
    if (!this.state.avatarRef || !this.state.posts) return null
    return (
      <View style={styles.profile}>
        
        <View style={styles.username}><Text style={styles.usernameText}>{this.state.username}</Text></View>

        <View style={styles.header}>

          <View style={styles.profilePicture}>
            <Button transparent large onPress={this._setAvatar}>
              {this.state.avatarUri ? <Thumbnail style={{ height: 90, width: 90, borderRadius: 45, marginLeft: 12 }} source={{ uri: this.state.avatarUri }}></Thumbnail> : <Icon style={{fontSize: 90, color: 'gray', height: 90}} type="FontAwesome5" name="user-circle"></Icon>}
            </Button>
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
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: 'white',
    paddingBottom: 20,
    marginRight: 5,
    marginLeft: 5,
  },
  profilePicture: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  subheader: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  headerSection: {
    marginRight: 8,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionCounter: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black'
  },
  sectionLabel: { fontSize: 15 }
});
