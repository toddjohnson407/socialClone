import React from 'react';
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import { Button, Form, Grid, Row, Body, Title, Header, Right, Left, Icon, Container, Content, Thumbnail } from 'native-base';

import { db, auth, storage, arrayPush, arrayRemove } from '../config';
import getProfile from '../utils/getProfile';
import getProfilePosts from '../utils/getProfilePosts';
import selectPhoto from '../utils/selectPhoto';
import uploadPhoto from '../utils/uploadPhoto';

const profiles = db.collection('profiles');

export class ProfileView extends React.Component {

  state = { profile: {}, isFollowing: null }

  /** Set the new avatar in the database */
  _setAvatar = async () => {
    if (this.props.isSelf) {
      let uri = await selectPhoto();
      if (uri) {
        let avatarRef = await uploadPhoto(uri, 'avatars');
        avatarRef && db.collection('profiles').doc(this.state.id).set({ avatarRef }, { merge: true }).then(res => console.log('Avatar Updated')).catch(err => console.log('Error updating avatar', err));
      }
    }
  }

  async componentDidMount() {
    let profile = await getProfile();
    let isFollowing = this.props.info.followers.includes(profile.username);
    this.setState({profile, isFollowing});
  }

  /** Follows a profile in the database */
  toggleFollow = () => {
    let followerAction = this.props.info.followers.includes(this.state.profile.username) ? arrayRemove(this.state.profile.username) : arrayPush(this.state.profile.username);
    let followingAction = this.props.info.followers.includes(this.state.profile.username) ? arrayRemove(this.props.info.username) : arrayPush(this.props.info.username);
    Promise.all([
      profiles.doc(this.props.info.id).update({ followers: followerAction }),
      profiles.doc(this.state.profile.id).update({ following: followingAction })
    ]).then(res => console.log('Success')).catch(err => console.log('Error with toggling follow status of profile in db:', err))
  }

  getFollowStatus = () => {
    if (this.props.info.followers.includes(this.state.profile.username)) return ( <Text style={{ fontWeight: 'bold', color: 'white' }}>Following</Text> )
    else return ( <Text style={{ fontWeight: 'bold', color: 'white' }}>Follow</Text> )
  }

  render() {

    const followUser = <Button primary small onPress={this.toggleFollow} style={{paddingTop: 0, paddingBottom: 0, paddingRight: 32, paddingLeft: 32}}>{this.getFollowStatus()}</Button>

    return (
      <View style={styles.profile}>
        
        <View style={styles.username}><Text style={styles.usernameText}>{this.props.info.username}</Text></View>

        <View style={styles.header}>

          <View style={styles.profilePicture}>
            <Button transparent large onPress={this._setAvatar}>
              {this.props.info.avatarUri ? <Thumbnail style={{ height: 90, width: 90, borderRadius: 45, marginLeft: 12 }} source={{ uri: this.props.info.avatarUri }}></Thumbnail> : <Icon style={{fontSize: 90, color: 'gray', height: 90}} type="FontAwesome5" name="user-circle"></Icon>}
            </Button>
          </View>

          <View style={styles.subheader}>

            <View style={styles.headerSection}>
              <Text style={styles.sectionCounter}>{this.props.info.posts.length}</Text>
              <Text style={styles.sectionLabel}>{this.props.info.posts.length === 1 ? 'Post' : 'Posts'}</Text>
            </View>
            <View style={styles.headerSection}>
              <Text style={styles.sectionCounter}>{this.props.info.followers.length}</Text>
              <Text style={styles.sectionLabel}>Followers</Text>

            </View>
            <View style={styles.headerSection}>
              <Text style={styles.sectionCounter}>{this.props.info.following.length}</Text>
              <Text style={styles.sectionLabel}>Following</Text>
            </View>
          </View>
        </View>
        <View style={styles.followView}> 
          {this.props.isSelf ? null : followUser}
        </View>
        <View style={styles.postsCtn}>
          <FlatList numColumns={3} data={this.props.info.posts} renderItem={({item}) => 
            <Image style={styles.post} source={{ uri: item.key }}></Image>
          }/>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  followView: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
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