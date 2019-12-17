import React from 'react';
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import { Button, Form, Grid, Row, Body, Title, Header, Right, Left, Icon, Container, Content, Thumbnail } from 'native-base';

import { db, auth, storage } from '../config';
import getProfile from '../utils/getProfile';
import getProfilePosts from '../utils/getProfilePosts';
import selectPhoto from '../utils/selectPhoto';
import uploadPhoto from '../utils/uploadPhoto';
import { ProfileView } from './ProfileView';

export class Profile extends React.Component {

  state = { posts: [], id: null, username: null, avatarRef: null, name: null, bio: null, followers: [], following: [],  }

  /** Load and formats posts data for the profile screen */
  _loadPosts = async (data) => {
    let urls = [];
    // Push each download url to the posts []
    for (let post of data) urls.push({ key: await storage.ref(post.imageRef).getDownloadURL(), description: post.description });
    this.setState({ posts: urls });
    return true;
  }

  async componentDidMount() {
    let profile = await getProfile();
    let posts = await getProfilePosts(profile.id);
    this.setState({...{posts: [], avatarUri: null}, ...profile});
    // Load and format posts for the screen
    await this._loadPosts(posts);
    // Set avatar image url if the user has one
    this.state.avatarRef && this.setState({ avatarUri: await storage.ref(this.state.avatarRef).getDownloadURL() });
  }

  render() {
    return ( <ProfileView info={this.state} isSelf={true} /> );
  }
}
